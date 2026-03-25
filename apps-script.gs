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

const SHEET_NAME = 'Sol·licituds';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const phone = data.phone || '';
    const message = data.message || '';

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet) {
      return ContentService
        .createTextOutput(JSON.stringify({ error: 'Full no trobat' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const lastRow = sheet.getLastRow();
    const newRow = lastRow + 1;

    // Columnes: Número, Contacte, Centre Educatiu, Tipus, Data, Persones, Local, Cost, Preu, Benefici por pax, Benefici total, Benefici net, Estat, Missatge
    const today = new Date();
    const dateStr = Utilities.formatDate(today, Session.getScriptTimeZone(), 'dd/MM/yyyy');

    sheet.getRange(newRow, 1).setValue(newRow - 1);   // Número (descompta la capçalera)
    sheet.getRange(newRow, 2).setValue(phone);         // Contacte
    sheet.getRange(newRow, 5).setValue(dateStr);       // Data
    sheet.getRange(newRow, 13).setValue('A l\'espera'); // Estat
    sheet.getRange(newRow, 14).setValue(message);      // Missatge (columna extra)

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
      contents: JSON.stringify({ phone: '600123456', message: 'Test des d\'Apps Script' })
    }
  };
  const result = doPost(mockEvent);
  Logger.log(result.getContent());
}
