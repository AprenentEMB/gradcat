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
//  E  = Tipus             (InfoModal: SOPAR / FESTA / SOPAR + FESTA / ALTRA)
//  F  = Pack              (modal de packs)
//  G  = Data              (InfoModal: mes/any aprox.)
//  H  = Pax               (InfoModal: nombre de persones)
//  I  = Centre Educatiu   (InfoModal)
//  J  = Contacte          (InfoModal: nom)
//  K  = Whatsapp          (telèfon — formulari pas 1)
//  L  = Ciutat            (InfoModal)
//  M  = Contacte          (reservat per ús intern — buit)
//  N  = Estat             (camp intern — buit)
//  O  = Info              (missatge formulari contacte + comentaris InfoModal)
//  P–X = Local, Cost, Preu, Benefici… (camps interns — buits)
//
// COLUMNES DEL FULL "Dubtes":
//  A  = Data entrada
//  B  = Número Whatsapp
//  C  = Idioma
//  E  = El dubte (missatge)

const SHEET_SOLICITUDS = 'Sol·licituds';
const SHEET_DUBTES = 'Dubtes';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const action = data.action || 'create'; // backward compat amb enviaments antics

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheetSolicituds = ss.getSheetByName(SHEET_SOLICITUDS);

    if (!sheetSolicituds) {
      return ContentService
        .createTextOutput(JSON.stringify({ error: 'Full "Sol·licituds" no trobat' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const today = new Date();
    const dateStr = Utilities.formatDate(today, Session.getScriptTimeZone(), 'dd/MM/yyyy HH:mm:ss');

    // ── PAS 1: nova sol·licitud ──────────────────────────────────────────────
    if (action === 'create') {
      const newRow = sheetSolicituds.getLastRow() + 1;

      sheetSolicituds.getRange(newRow, 1).setValue(dateStr);             // A: Data entrada
      sheetSolicituds.getRange(newRow, 2).setValue(data.lang || '');     // B: Idioma
      sheetSolicituds.getRange(newRow, 3).setValue(data.canal || 'Web'); // C: Canal
      // D: Usuari — buit (camp intern)
      // E: Tipus — omplert per update_info
      sheetSolicituds.getRange(newRow, 6).setValue(data.pack || '');     // F: Pack
      // G–J: omplerts per update_info
      sheetSolicituds.getRange(newRow, 11).setValue(data.phone || '');   // K: Whatsapp
      // L, M: omplerts per update_info / reservat
      // N: Estat — buit (camp intern)
      if (data.message && data.message.trim() !== '') {
        sheetSolicituds.getRange(newRow, 15).setValue(data.message);     // O: Info
      }

      // Escriptura a "Dubtes" si hi ha missatge (secció de contacte)
      if (data.message && data.message.trim() !== '') {
        const sheetDubtes = ss.getSheetByName(SHEET_DUBTES);
        if (sheetDubtes) {
          const newRowD = sheetDubtes.getLastRow() + 1;
          sheetDubtes.getRange(newRowD, 1).setValue(dateStr);            // A: Data entrada
          sheetDubtes.getRange(newRowD, 2).setValue(data.phone || '');  // B: Número Whatsapp
          sheetDubtes.getRange(newRowD, 3).setValue(data.lang || '');   // C: Idioma
          sheetDubtes.getRange(newRowD, 5).setValue(data.message);      // E: El dubte
        }
      }
    }

    // ── PAS 2: informació addicional de l'InfoModal ──────────────────────────
    if (action === 'update_info') {
      const phone = data.phone || '';
      const lastRow = sheetSolicituds.getLastRow();

      // Cerquem les últimes 100 files per trobar el telèfon coincident (col K = 11)
      for (let r = lastRow; r >= Math.max(2, lastRow - 100); r--) {
        const rowPhone = sheetSolicituds.getRange(r, 11).getValue();
        if (String(rowPhone).trim() === String(phone).trim()) {
          if (data.tipus)     sheetSolicituds.getRange(r, 5).setValue(data.tipus);         // E: Tipus
          if (data.dataEvent) sheetSolicituds.getRange(r, 7).setValue(data.dataEvent);    // G: Data
          if (data.pax)       sheetSolicituds.getRange(r, 8).setValue(Number(data.pax));  // H: Pax
          if (data.centre)    sheetSolicituds.getRange(r, 9).setValue(data.centre);       // I: Centre Educatiu
          if (data.nom)       sheetSolicituds.getRange(r, 10).setValue(data.nom);         // J: Contacte (nom)
          if (data.ciutat)    sheetSolicituds.getRange(r, 12).setValue(data.ciutat);      // L: Ciutat
          // M: reservat — no s'omple
          if (data.info) {
            // Afegim als comentaris existents (p.ex. missatge del formulari de contacte)
            const existing = sheetSolicituds.getRange(r, 15).getValue();
            const combined = existing ? existing + '\n' + data.info : data.info;
            sheetSolicituds.getRange(r, 15).setValue(combined);                           // O: Info
          }
          break;
        }
      }
    }

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Funcions de test — executa manualment des d'Apps Script per verificar
function testCreate() {
  const mockEvent = {
    postData: {
      contents: JSON.stringify({
        action: 'create',
        phone: '600123456',
        message: '',
        lang: 'ca',
        pack: 'SOPAR + FESTA',
        canal: 'Web'
      })
    }
  };
  Logger.log(doPost(mockEvent).getContent());
}

function testCreateWithMessage() {
  const mockEvent = {
    postData: {
      contents: JSON.stringify({
        action: 'create',
        phone: '600123456',
        message: 'Volem saber el preu per a 100 persones',
        lang: 'ca',
        pack: '',
        canal: 'Web'
      })
    }
  };
  Logger.log(doPost(mockEvent).getContent());
}

function testUpdateInfo() {
  const mockEvent = {
    postData: {
      contents: JSON.stringify({
        action: 'update_info',
        phone: '600123456',
        nom: 'Joan Garcia',
        pax: 80,
        centre: 'IES Exemple',
        dataEvent: '06/2026',
        tipus: 'SOPAR + FESTA',
        ciutat: 'Barcelona',
        info: 'Volem DJ de reggaeton'
      })
    }
  };
  Logger.log(doPost(mockEvent).getContent());
}
