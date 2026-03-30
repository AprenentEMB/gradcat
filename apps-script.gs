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

const SHEET_SOLICITUDS = 'Sol·licituds';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const phone = data.phone || '';
    const message = data.message || '';
    const lang = data.lang || 'ca';
    const pack = data.pack || '';

    const ss = SpreadsheetApp.getActiveSpreadsheet();

    // Creem un format de data i hora per saber exactament quan han fet el submit
    const today = new Date();
    const dateStr = Utilities.formatDate(today, Session.getScriptTimeZone(), 'dd/MM/yyyy HH:mm:ss');

    // --- 1. ESCRIPTURA A SOL·LICITUDS ---
    const sheetSolicituds = ss.getSheetByName(SHEET_SOLICITUDS);
    if (sheetSolicituds) {
      const newRowS = sheetSolicituds.getLastRow() + 1;

      sheetSolicituds.getRange(newRowS, 1).setValue(dateStr); // A: Data d'entrada
      sheetSolicituds.getRange(newRowS, 2).setValue(phone);   // B: Número Whatsapp
      sheetSolicituds.getRange(newRowS, 3).setValue(lang);    // C: Idioma
      sheetSolicituds.getRange(newRowS, 4).setValue(pack);    // D: Pack escollit
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

// Funció de test (pots executar-la manualment des d'Apps Script per verificar)
function testDoPost() {
  const mockEvent = {
    postData: {
      contents: JSON.stringify({ phone: '600123456', message: '', lang: 'ca', pack: 'SOPAR + FESTA' })
    }
  };
  const result = doPost(mockEvent);
  Logger.log(result.getContent());
}
