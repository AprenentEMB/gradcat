// INSTRUCCIONS:
// 1. Obre el Google Sheet: https://docs.google.com/spreadsheets/d/1KJFAtyXUw7wwKDSk0AVejP5GTJx2ZBdVLxqlPgxabAs/
// 2. Extensions → Apps Script
// 3. Esborra el contingut per defecte i enganxa aquest codi
// 4. Clica "Desplegar" → "Nou desplegament"
//    - Tipus: Aplicació web
//    - Executar com: Jo (el teu compte)
//    - Qui pot accedir: Qualsevol
// 5. Autoritza els permisos quan et demani
// 6. Copia la URL del desplegament i afegeix-la a Vercel com a variable d'entorn:
//    Nom: PUBLIC_APPS_SCRIPT_URL
//    Valor: https://script.google.com/macros/s/XXXXXXX/exec
//
// COLUMNES DEL FULL "Sol·licituds":
//  A  = Data entrada      (auto)
//  B  = Idioma            (lang)
//  C  = Canal             ("Web")
//  D  = Usuari            (camp intern — buit)
//  E  = Tipus graduació   (InfoModal: ESO / BATXILLERAT / UNIVERSITAT)
//  F   = Curs              (Nomes apareix si el usuari escull UNIVERSITAT en el camp anterior)
//  G  = Pack              (modal de packs + InfoModal: SOPAR / FESTA / SOPAR + FESTA)
//  H  = Data              (InfoModal: data de la graduació DD/MM/YYYY)
//  I  = Pax               (InfoModal: nombre d'assistents)
//  J  = Centre Educatiu   (InfoModal)
//  K  = Contacte          (InfoModal: nom)
//  L  = Whatsapp          (telèfon — formulari pas 1)
//  M  = Ciutat            (ha de sortir al formulari despres del Centre educatiu)
//  N  = Info              (missatge formulari contacte)
//  O  = Referit           (codi d'afiliat — paràmetre ?ref= de la URL)
//  P–X = Local, Cost, Preu, Benefici… (camps interns — buits)
//
// COLUMNES DEL FULL "Dubtes":
//  A  = Data entrada
//  B  = Número Whatsapp
//  C  = Idioma
//  E  = El dubte (missatge)

const SHEET_SOLICITUDS = "Sol·licituds";
const SHEET_DUBTES = "Dubtes";
const COL_WHATSAPP = 12; // L
const ROW_WIDTH = 15; // A–O (P–X són camps interns i no es toquen)
const LOCK_TIMEOUT_MS = 30000;

// El full treballa amb els valors en català; la web en castellà envia els seus.
// Sense aquest mapa, un valor fora de la llista de validació del full fa
// petar setValue/appendRow i la petició es perd sencera.
const VALUE_ALIASES = {
  BACHILLERATO: "BATXILLERAT",
  UNIVERSIDAD: "UNIVERSITAT",
  CENA: "SOPAR",
  FIESTA: "FESTA",
  "CENA + FIESTA": "SOPAR + FESTA",
  Otros: "Altres",
};

function canonical(value) {
  const key = String(value || "").trim();
  return VALUE_ALIASES[key] || key;
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  );
}

// Deixa només dígits i treu el prefix internacional (34 / 0034) si ve inclòs.
function normalizePhone(raw) {
  let digits = String(raw || "").replace(/\D/g, "");
  if (digits.startsWith("0034") && digits.length > 9) digits = digits.slice(4);
  else if (digits.startsWith("34") && digits.length > 9) digits = digits.slice(2);
  return digits;
}

// Escriu la fila sencera en UNA sola crida: o s'escriu tot o no s'escriu res.
// Retorna el número de fila creada.
function appendSolicitud(sheet, dateStr, phone, data) {
  const row = new Array(ROW_WIDTH).fill("");
  row[0] = dateStr; // A: Data entrada
  row[1] = data.lang || ""; // B: Idioma
  row[2] = data.canal || "Web"; // C: Canal
  // D: Usuari — buit (camp intern)
  // E–F: omplerts per update_info
  row[6] = canonical(data.pack); // G: Pack
  // H–K: omplerts per update_info
  row[COL_WHATSAPP - 1] = phone; // L: Whatsapp
  // M: Ciutat — omplerta per update_info
  if (data.message && String(data.message).trim() !== "")
    row[13] = data.message; // N: Info
  if (data.referit) row[14] = data.referit; // O: Referit
  sheet.appendRow(row);
  return sheet.getLastRow();
}

// Busca (de baix a dalt) la fila més recent amb aquest telèfon a la columna L.
function findRowByPhone(sheet, phone) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return -1;
  const phones = sheet.getRange(2, COL_WHATSAPP, lastRow - 1, 1).getValues();
  for (let i = phones.length - 1; i >= 0; i--) {
    if (normalizePhone(phones[i][0]) === phone) return i + 2; // +2: base 0 + capçalera
  }
  return -1;
}

// La URL del desplegament és pública: qualsevol GET (obrir-la al navegador,
// previsualització d'enllaç, bot) arriba aquí. No escriu res al full; només
// evita l'error "Script function not found: doGet" a Execucions.
function doGet() {
  return jsonResponse({ error: "method not allowed" });
}

function doPost(e) {
  // Serialitza les execucions: sense lock, dues peticions simultànies calculen
  // la mateixa "última fila" i es trepitgen.
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(LOCK_TIMEOUT_MS);
  } catch (err) {
    console.error("No s'ha pogut obtenir el lock: " + err.message);
    return jsonResponse({ error: "lock timeout" });
  }

  try {
    const data = JSON.parse(e.postData.contents);
    const action = data.action || "create"; // backward compat amb enviaments antics
    const phone = normalizePhone(data.phone);

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheetSolicituds = ss.getSheetByName(SHEET_SOLICITUDS);

    if (!sheetSolicituds) {
      return jsonResponse({ error: 'Full "Sol·licituds" no trobat' });
    }

    const today = new Date();
    const dateStr = Utilities.formatDate(
      today,
      Session.getScriptTimeZone(),
      "dd/MM/yyyy HH:mm:ss",
    );

    // El telèfon és l'única manera de contactar el lead i la clau que lliga
    // el pas 1 amb el pas 2: mai es crea una fila sense telèfon.
    if (!phone) {
      console.error("Petició '" + action + "' sense telèfon: " + e.postData.contents);
      return jsonResponse({ error: "phone buit" });
    }

    // ── PAS 1: nova sol·licitud ──────────────────────────────────────────────
    if (action === "create") {
      appendSolicitud(sheetSolicituds, dateStr, phone, data);

      // Escriptura a "Dubtes" si hi ha missatge (secció de contacte)
      if (data.message && String(data.message).trim() !== "") {
        const sheetDubtes = ss.getSheetByName(SHEET_DUBTES);
        if (sheetDubtes) {
          sheetDubtes.appendRow([
            dateStr, // A: Data entrada
            phone, // B: Número Whatsapp
            data.lang || "", // C: Idioma
            "", // D
            data.message, // E: El dubte
          ]);
        }
      }
    }

    // ── PAS 2: informació addicional de l'InfoModal ──────────────────────────
    if (action === "update_info") {
      let foundRow = findRowByPhone(sheetSolicituds, phone);

      // Si el "create" del pas 1 no ha arribat (xarxa, pestanya tancada…),
      // creem la fila aquí mateix: el telèfon no es perd mai.
      if (foundRow === -1) {
        console.warn("update_info sense fila prèvia, es crea de nou: " + phone);
        foundRow = appendSolicitud(sheetSolicituds, dateStr, phone, data);
      }

      if (data.tipusGraduacio)
        sheetSolicituds.getRange(foundRow, 5).setValue(canonical(data.tipusGraduacio)); // E: Tipus graduació
      if (data.curs)
        sheetSolicituds.getRange(foundRow, 6).setValue(canonical(data.curs)); // F: Curs
      if (data.pack)
        sheetSolicituds.getRange(foundRow, 7).setValue(canonical(data.pack)); // G: Pack
      if (data.dataEvent)
        sheetSolicituds.getRange(foundRow, 8).setValue(data.dataEvent);      // H: Data
      if (data.pax)
        sheetSolicituds.getRange(foundRow, 9).setValue(Number(data.pax));    // I: Pax
      if (data.centre)
        sheetSolicituds.getRange(foundRow, 10).setValue(data.centre);        // J: Centre Educatiu
      if (data.nom)
        sheetSolicituds.getRange(foundRow, 11).setValue(data.nom);           // K: Contacte (nom)
      if (data.ciutat)
        sheetSolicituds.getRange(foundRow, 13).setValue(data.ciutat);        // M: Ciutat
    }

    return jsonResponse({ success: true });
  } catch (err) {
    console.error("doPost error: " + err.message);
    return jsonResponse({ error: err.message });
  } finally {
    lock.releaseLock();
  }
}

// Funcions de test — executa manualment des d'Apps Script per verificar
function testCreate() {
  const mockEvent = {
    postData: {
      contents: JSON.stringify({
        action: "create",
        phone: "600123456",
        message: "",
        lang: "ca",
        pack: "SOPAR + FESTA",
        canal: "Web",
      }),
    },
  };
  Logger.log(doPost(mockEvent).getContent());
}

function testCreateWithMessage() {
  const mockEvent = {
    postData: {
      contents: JSON.stringify({
        action: "create",
        phone: "600123456",
        message: "Volem saber el preu per a 100 persones",
        lang: "ca",
        pack: "",
        canal: "Web",
      }),
    },
  };
  Logger.log(doPost(mockEvent).getContent());
}

function testUpdateInfo() {
  const mockEvent = {
    postData: {
      contents: JSON.stringify({
        action: "update_info",
        phone: "600123456",
        nom: "Joan Garcia",
        tipusGraduacio: "UNIVERSITAT",
        curs: "2",
        pack: "SOPAR + FESTA",
        centre: "UB - Facultat de Dret",
        ciutat: "Barcelona",
        dataEvent: "29/05/2026",
        pax: 80,
      }),
    },
  };
  Logger.log(doPost(mockEvent).getContent());
}
