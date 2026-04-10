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
//  F  = Pack              (modal de packs + InfoModal: SOPAR / FESTA / SOPAR + FESTA)
//  G  = Data              (InfoModal: data de la graduació DD/MM/YYYY)
//  H  = Pax               (InfoModal: nombre d'assistents)
//  I  = Centre Educatiu   (InfoModal)
//  J  = Contacte          (InfoModal: nom)
//  K  = Whatsapp          (telèfon — formulari pas 1)
//  L  = Ciutat            (camp intern — buit)
//  M  = Contacte          (reservat per ús intern — buit)
//  N  = Referit           (codi d'afiliat — paràmetre ?ref= de la URL)
//  O  = Info              (missatge formulari contacte)
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
      if (data.referit) sheetSolicituds.getRange(newRow, 14).setValue(data.referit); // N: Referit
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
      const phone = String(data.phone || '').replace(/\s+/g, '').trim();

      Logger.log('update_info rebut, phone: ' + phone);

      if (!phone) {
        return ContentService
          .createTextOutput(JSON.stringify({ error: 'phone buit' }))
          .setMimeType(ContentService.MimeType.JSON);
      }

      const lastRow = sheetSolicituds.getLastRow();
      if (lastRow < 2) {
        Logger.log('No hi ha files de dades');
        return ContentService
          .createTextOutput(JSON.stringify({ error: 'cap fila' }))
          .setMimeType(ContentService.MimeType.JSON);
      }

      // Llegim tota la columna K d'una sola vegada (molt més ràpid)
      const phones = sheetSolicituds
        .getRange(2, 11, lastRow - 1, 1)
        .getValues();

      let foundRow = -1;
      for (let i = phones.length - 1; i >= 0; i--) {
        const stored = String(phones[i][0] || '').replace(/\s+/g, '').trim();
        if (stored === phone) {
          foundRow = i + 2; // +2: array base 0 + fila 1 és capçalera
          break;
        }
      }

      Logger.log('Fila trobada: ' + foundRow);

      if (foundRow === -1) {
        return ContentService
          .createTextOutput(JSON.stringify({ error: 'telèfon no trobat' }))
          .setMimeType(ContentService.MimeType.JSON);
      }

      if (data.tipusGraduacio) sheetSolicituds.getRange(foundRow, 5).setValue(data.tipusGraduacio); // E: Tipus graduació
      if (data.pack)           sheetSolicituds.getRange(foundRow, 6).setValue(data.pack);           // F: Pack
      if (data.dataEvent)      sheetSolicituds.getRange(foundRow, 7).setValue(data.dataEvent);      // G: Data
      if (data.pax)            sheetSolicituds.getRange(foundRow, 8).setValue(Number(data.pax));    // H: Pax
      if (data.centre)         sheetSolicituds.getRange(foundRow, 9).setValue(data.centre);         // I: Centre Educatiu
      if (data.nom)            sheetSolicituds.getRange(foundRow, 10).setValue(data.nom);           // J: Contacte (nom)
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
        tipusGraduacio: 'BATXILLERAT',
        pack: 'SOPAR + FESTA',
        centre: 'IES Exemple',
        dataEvent: '29/05/2026',
        pax: 80
      })
    }
  };
  Logger.log(doPost(mockEvent).getContent());
}
