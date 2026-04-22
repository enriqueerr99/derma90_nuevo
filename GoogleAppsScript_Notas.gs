// Google Apps Script para manejar notas de leads en IDERMA Dashboard
// Instrucciones:
// 1. Ir a https://script.google.com
// 2. Crear un nuevo proyecto
// 3. Copiar este código
// 4. Guardar y desplegar como Web App (ejecutar como tu usuario, acceso "Cualquier persona")
// 5. Copiar la URL del web app y reemplazarla en dashboard.html

const SHEET_ID = "1Hz_cY0e_nr263HGSRMc8kNf1Efo6hxx1kB6CnF8gnrw";
const NOTES_SHEET_NAME = "Notas";
const HISTORY_SHEET_NAME = "Historial";

// Obtener referencia a las hojas
function getNotesSheet() {
  const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
  let sheet = spreadsheet.getSheetByName(NOTES_SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(NOTES_SHEET_NAME);
    sheet.appendRow(["Email", "Estado", "Notas", "Fecha Actualización"]);
  }

  return sheet;
}

function getHistorySheet() {
  const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
  let sheet = spreadsheet.getSheetByName(HISTORY_SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(HISTORY_SHEET_NAME);
    sheet.appendRow(["Email", "Tipo", "Descripcion", "Usuario", "Fecha"]);
  }

  return sheet;
}

// Obtener notas de un lead
function getNotes(email) {
  try {
    const sheet = getNotesSheet();
    const data = sheet.getDataRange().getValues();

    for (let i = 1; i < data.length; i++) {
      if (String(data[i][0]).trim() === String(email).trim()) {
        return {
          estado: String(data[i][1] || "nuevo").trim(),
          notas: String(data[i][2] || "").trim(),
          fechaActualizacion: String(data[i][3] || "")
        };
      }
    }

    return {
      estado: "nuevo",
      notas: "",
      fechaActualizacion: ""
    };
  } catch (e) {
    Logger.log("Error en getNotes: " + e);
    throw e;
  }
}

// Obtener historial de un lead
function getHistory(email) {
  try {
    const sheet = getHistorySheet();
    const data = sheet.getDataRange().getValues();
    const history = [];

    for (let i = 1; i < data.length; i++) {
      if (String(data[i][0]).trim() === String(email).trim()) {
        history.push({
          tipo: String(data[i][1] || ""),
          descripcion: String(data[i][2] || ""),
          usuario: String(data[i][3] || ""),
          fecha: String(data[i][4] || "")
        });
      }
    }

    return history.reverse();
  } catch (e) {
    Logger.log("Error en getHistory: " + e);
    throw e;
  }
}

// Obtener notas + historial en una sola llamada (más rápido)
function getFullData(email) {
  try {
    return {
      notes: getNotes(email),
      history: getHistory(email)
    };
  } catch (e) {
    Logger.log("Error en getFullData: " + e);
    throw e;
  }
}

// Agregar entrada al historial
function addHistoryEntry(email, tipo, descripcion, usuario) {
  try {
    const sheet = getHistorySheet();
    const ahora = new Date().toLocaleString('es-ES');
    sheet.appendRow([email, tipo, descripcion, usuario, ahora]);
  } catch (e) {
    Logger.log("Error en addHistoryEntry: " + e);
    throw e;
  }
}

// Guardar notas de un lead
function saveNotes(email, estado, notas, usuario) {
  try {
    const sheet = getNotesSheet();
    const data = sheet.getDataRange().getValues();
    const ahora = new Date().toLocaleString('es-ES');

    email = String(email).trim();
    estado = String(estado || "nuevo").trim();
    notas = String(notas || "").trim();
    usuario = String(usuario || "Sistema").trim();

    let descripcion = "";

    // Buscar si existe
    for (let i = 1; i < data.length; i++) {
      if (String(data[i][0]).trim() === email) {
        const estadoAntiguo = String(data[i][1] || "nuevo").trim();
        const notasAnteriores = String(data[i][2] || "").trim();

        // Detectar cambios
        const estadoCambió = estadoAntiguo !== estado;
        const notasCambiaron = notasAnteriores !== notas;

        if (estadoCambió && notasCambiaron) {
          descripcion = `Estado: "${estadoAntiguo}" → "${estado}" | Nota: "${notasAnteriores}" → "${notas}"`;
        } else if (estadoCambió) {
          descripcion = `Estado cambió de "${estadoAntiguo}" a "${estado}"`;
        } else if (notasCambiaron) {
          descripcion = `Nota: "${notasAnteriores}" → "${notas}"`;
        }

        // Actualizar valores
        sheet.getRange(i + 1, 2).setValue(estado);
        sheet.getRange(i + 1, 3).setValue(notas);
        sheet.getRange(i + 1, 4).setValue(ahora);

        // Registrar en historial si hay cambios
        if (descripcion) {
          addHistoryEntry(email, "ACTUALIZACIÓN", descripcion, usuario);
        }

        return { success: true, message: "Notas guardadas correctamente" };
      }
    }

    // Si no existe, crear una nueva fila
    sheet.appendRow([email, estado, notas, ahora]);
    addHistoryEntry(email, "CREACIÓN", `Lead creado con estado "${estado}"`, usuario);
    return { success: true, message: "Notas creadas correctamente" };
  } catch (e) {
    Logger.log("Error en saveNotes: " + e);
    throw e;
  }
}

// Handle GET/POST requests
function doGet(e) {
  return handleRequest(e);
}

function doPost(e) {
  return handleRequest(e);
}

function handleRequest(e) {
  try {
    const action = e.parameter.action;
    const email = e.parameter.email;
    const estado = e.parameter.estado;
    const notas = e.parameter.notas;
    const usuario = e.parameter.usuario || "Sistema";

    if (action === "getNotes") {
      const result = getNotes(email);
      return ContentService.createTextOutput(JSON.stringify(result))
        .setMimeType(ContentService.MimeType.JSON);
    }
    else if (action === "saveNotes") {
      const result = saveNotes(email, estado, notas, usuario);
      return ContentService.createTextOutput(JSON.stringify(result))
        .setMimeType(ContentService.MimeType.JSON);
    }
    else if (action === "getHistory") {
      const result = getHistory(email);
      return ContentService.createTextOutput(JSON.stringify(result))
        .setMimeType(ContentService.MimeType.JSON);
    }
    else if (action === "getFullData") {
      const result = getFullData(email);
      return ContentService.createTextOutput(JSON.stringify(result))
        .setMimeType(ContentService.MimeType.JSON);
    }
    else {
      return ContentService.createTextOutput(JSON.stringify({ error: "Acción no válida" }))
        .setMimeType(ContentService.MimeType.JSON);
    }
  } catch (error) {
    Logger.log("Error en handleRequest: " + error);
    return ContentService.createTextOutput(JSON.stringify({ error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
