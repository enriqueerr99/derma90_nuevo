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

// Inicializar la hoja de notas si no existe
function initializeNotesSheet() {
  const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
  let sheet = spreadsheet.getSheetByName(NOTES_SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(NOTES_SHEET_NAME);
    // Headers: Email, Estado, Notas, Fecha Actualización
    sheet.appendRow(["Email", "Estado", "Notas", "Fecha Actualización"]);
  }

  return sheet;
}

// Inicializar la hoja de historial si no existe
function initializeHistorySheet() {
  const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
  let sheet = spreadsheet.getSheetByName(HISTORY_SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(HISTORY_SHEET_NAME);
    // Headers: Email, Tipo, Descripcion, Usuario, Fecha
    sheet.appendRow(["Email", "Tipo", "Descripcion", "Usuario", "Fecha"]);
  }

  return sheet;
}

// Agregar entrada al historial
function addHistoryEntry(email, tipo, descripcion, usuario) {
  const sheet = initializeHistorySheet();
  const ahora = new Date().toLocaleString('es-ES');
  sheet.appendRow([email, tipo, descripcion, usuario, ahora]);
}

// Obtener notas de un lead
function getNotes(email) {
  const sheet = initializeNotesSheet();
  const data = sheet.getDataRange().getValues();

  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === email) {
      return {
        estado: data[i][1] || "nuevo",
        notas: data[i][2] || "",
        fechaActualizacion: data[i][3] || ""
      };
    }
  }

  return {
    estado: "nuevo",
    notas: "",
    fechaActualizacion: ""
  };
}

// Guardar notas de un lead
function saveNotes(email, estado, notas, usuario, estadoAnterior) {
  const sheet = initializeNotesSheet();
  const data = sheet.getDataRange().getValues();
  const ahora = new Date().toLocaleString('es-ES');
  let descripcion = "";

  // Buscar si existe
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === email) {
      const estadoAntiguo = data[i][1];

      // Crear descripción del cambio
      if (estadoAniguo !== estado && notas !== data[i][2]) {
        descripcion = `Estado cambió de "${estadoAniguo}" a "${estado}" y se actualizó nota`;
      } else if (estadoAniguo !== estado) {
        descripcion = `Estado cambió de "${estadoAniguo}" a "${estado}"`;
      } else if (notas !== data[i][2]) {
        descripcion = `Nota actualizada`;
      }

      sheet.getRange(i + 1, 2).setValue(estado); // Estado
      sheet.getRange(i + 1, 3).setValue(notas);  // Notas
      sheet.getRange(i + 1, 4).setValue(ahora);  // Fecha

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
}

// Obtener historial de un lead
function getHistory(email) {
  const sheet = initializeHistorySheet();
  const data = sheet.getDataRange().getValues();
  const history = [];

  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === email) {
      history.push({
        tipo: data[i][1],
        descripcion: data[i][2],
        usuario: data[i][3],
        fecha: data[i][4]
      });
    }
  }

  return history.reverse(); // Mostrar más reciente primero
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
    const estadoAnterior = e.parameter.estadoAnterior;

    if (action === "getNotes") {
      const result = getNotes(email);
      return ContentService.createTextOutput(JSON.stringify(result))
        .setMimeType(ContentService.MimeType.JSON);
    }
    else if (action === "saveNotes") {
      const result = saveNotes(email, estado, notas, usuario, estadoAnterior);
      return ContentService.createTextOutput(JSON.stringify(result))
        .setMimeType(ContentService.MimeType.JSON);
    }
    else if (action === "getHistory") {
      const result = getHistory(email);
      return ContentService.createTextOutput(JSON.stringify(result))
        .setMimeType(ContentService.MimeType.JSON);
    }
    else {
      return ContentService.createTextOutput(JSON.stringify({ error: "Acción no válida" }))
        .setMimeType(ContentService.MimeType.JSON);
    }
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
