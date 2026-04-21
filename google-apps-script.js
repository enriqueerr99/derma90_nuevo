// Google Apps Script para capturar leads DERMA90
// Copia este código en Extensiones → Apps Script

function doPost(e) {
  try {
    // Parse datos del POST
    const data = JSON.parse(e.postData.contents);
    
    // Conecta con tu Sheet (usa la primera hoja)
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Prepara la fila con datos
    const timestamp = new Date();
    const email = data.email || '';
    const nombre = data.nombre || '';
    const telefono = data.telefono || '';
    const perfil = data.perfil || '';
    const respuestas = JSON.stringify(data.respuestas || {});
    const landing_url = data.landing_url || '';
    const utm_source = data.utm_source || '';
    const utm_medium = data.utm_medium || '';
    const utm_campaign = data.utm_campaign || '';
    const utm_content = data.utm_content || '';
    
    // Añade fila al sheet
    sheet.appendRow([
      timestamp,
      email,
      nombre,
      telefono,
      perfil,
      landing_url,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_content,
      respuestas
    ]);

    // Envía el lead a GHL
    const ghlResult = sendToGHL(email, nombre, telefono, perfil, respuestas, data.respuestas);

    // Envía notificación por email
    sendNotificationEmails(email, nombre, telefono, perfil, timestamp);

    // Respuesta exitosa (con info de GHL para debugging)
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Lead guardado correctamente',
        ghlResponse: ghlResult
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Si hay error, devolver mensaje
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Función para testing (opcional)
function testWebhook() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        email: 'test@example.com',
        nombre: 'Test',
        telefono: '+34 600 000 000',
        perfil: 'somaplus',
        respuestas: { q1: 'test' },
        landing_url: 'https://derma90-v2.vercel.app/index-premium.html',
        utm_source: 'meta',
        utm_medium: 'cpc',
        utm_campaign: 'leads-test',
        utm_content: 'premium'
      })
    }
  };
  
  const result = doPost(testData);
  Logger.log(result.getContent());
}

// ─── doGet para el Dashboard de Leads ───────────────────────────────
function doGet(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = sheet.getDataRange().getValues();

    if (data.length < 2) {
      return ContentService
        .createTextOutput(JSON.stringify([]))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const headers = data[0];
    const rows = data.slice(1).map(row => {
      const obj = {};
      headers.forEach((h, i) => { obj[h] = row[i]; });
      return obj;
    });

    return ContentService
      .createTextOutput(JSON.stringify(rows))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ─── Envía leads a GHL + Asigna tag del perfil ───────────────────────────────
function sendToGHL(email, nombre, telefono, perfil, respuestas_json, respuestas_obj) {
  try {
    const ghlApiUrl = 'https://services.leadconnectorhq.com/contacts/';
    const locationId = 'HQHKWr2W3GrzB0yCYF6R';
    const apiToken = 'pit-5d4ed751-459c-4bc1-a353-9d314fe67009';

    Logger.log('=== INICIANDO CREACIÓN DE CONTACTO EN GHL ===');
    Logger.log('Email: ' + email);
    Logger.log('Nombre: ' + nombre);
    Logger.log('Teléfono: ' + telefono);
    Logger.log('Perfil/Tag: ' + perfil);

    // Separa nombre en firstName y lastName
    const [firstName, ...lastNameParts] = nombre.split(' ');
    const lastName = lastNameParts.join(' ') || '';

    // Payload con locationId INCLUIDO
    const payload = {
      locationId: locationId,
      firstName: firstName || '',
      lastName: lastName || '',
      email: email || '',
      phone: telefono || ''
    };

    Logger.log('Payload: ' + JSON.stringify(payload));

    // Opciones del fetch para crear contacto
    const options = {
      method: 'post',
      headers: {
        'Authorization': 'Bearer ' + apiToken,
        'Content-Type': 'application/json',
        'Version': '2021-07-28'
      },
      payload: JSON.stringify(payload),
      muteHttpExceptions: true
    };

    // Crea el contacto en GHL
    Logger.log('Enviando request a: ' + ghlApiUrl);
    const response = UrlFetchApp.fetch(ghlApiUrl, options);
    const responseCode = response.getResponseCode();
    const responseText = response.getContentText();

    Logger.log('GHL Response Code: ' + responseCode);
    Logger.log('GHL Response Text: ' + responseText);

    let contactId = null;
    let result = {};

    try {
      result = JSON.parse(responseText);

      // Buscar contactId en diferentes estructuras posibles
      if (result.contact && result.contact.id) {
        contactId = result.contact.id;
        Logger.log('✅ Contacto creado - ID: ' + contactId);
      } else if (result.id) {
        contactId = result.id;
        Logger.log('✅ Contacto creado - ID: ' + contactId);
      } else if (responseCode === 201) {
        Logger.log('⚠️ Status 201 pero no se encontró ID en response');
        Logger.log('Response estructura: ' + JSON.stringify(result));
      }

      // Si encontramos el contactId, agregar el tag
      if (contactId) {
        Logger.log('Procediendo a agregar tag: ' + perfil);
        const tagResult = addTagToContact(contactId, perfil, apiToken);
        Logger.log('Tag Result: ' + JSON.stringify(tagResult));
      }

      return result;
    } catch(parseError) {
      Logger.log('❌ Parse Error: ' + parseError.toString());
      return { error: 'Parse error', rawResponse: responseText, code: responseCode };
    }
  } catch (error) {
    Logger.log('❌ Error enviando a GHL: ' + error.toString());
    return { error: error.toString() };
  }
}

// ─── Agrega el tag del perfil al contacto en GHL ───────────────────────────────
function addTagToContact(contactId, perfil, apiToken) {
  try {
    const locationId = 'HQHKWr2W3GrzB0yCYF6R';
    const tagUrl = 'https://services.leadconnectorhq.com/contacts/' + contactId + '/tags';
    const tagName = perfil.toUpperCase().trim();

    Logger.log('=== ASIGNANDO TAG ===');
    Logger.log('URL: ' + tagUrl);
    Logger.log('Tag: ' + tagName);

    // Payload para agregar el tag
    const tagPayload = {
      tags: [tagName]
    };

    Logger.log('Tag Payload: ' + JSON.stringify(tagPayload));

    const tagOptions = {
      method: 'post',
      headers: {
        'Authorization': 'Bearer ' + apiToken,
        'Content-Type': 'application/json',
        'Version': '2021-07-28'
      },
      payload: JSON.stringify(tagPayload),
      muteHttpExceptions: true
    };

    // Agrega el tag
    const tagResponse = UrlFetchApp.fetch(tagUrl, tagOptions);
    const tagResponseCode = tagResponse.getResponseCode();
    const tagResponseText = tagResponse.getContentText();

    Logger.log('Tag Response Code: ' + tagResponseCode);
    Logger.log('Tag Response Text: ' + tagResponseText);

    if (tagResponseCode === 200 || tagResponseCode === 201) {
      Logger.log('✅ Tag asignado correctamente');
    }

    return JSON.parse(tagResponseText);
  } catch (error) {
    Logger.log('❌ Error agregando tag a GHL: ' + error.toString());
    return { error: error.toString() };
  }
}

// ─── Envía notificación por email cuando entra un nuevo lead ───────────────────────────────
function sendNotificationEmails(email, nombre, telefono, perfil, timestamp) {
  try {
    const recipients = [
      'info@iderma90.com',
      'cristina102001@gmail.com'
    ];

    const subject = '🔔 NUEVO LEAD - ' + nombre + ' (' + perfil.toUpperCase() + ')';

    const body = `¡Nuevo lead ha llegado!

📋 INFORMACIÓN DEL LEAD:
─────────────────────────────
Nombre: ${nombre}
Email: ${email}
Teléfono: ${telefono}
Perfil: ${perfil.toUpperCase()}
Fecha/Hora: ${timestamp}

🎯 ACCIONES:
→ Responder por WhatsApp: https://wa.me/${telefono.replace(/[^\d+]/g, '')}
→ Contactar por email: ${email}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Mensaje automático de IDERMA90
`;

    recipients.forEach(function(recipient) {
      try {
        GmailApp.sendEmail(
          recipient,
          subject,
          body,
          {
            name: 'IDERMA90 Leads',
            replyTo: 'noreply@iderma90.com'
          }
        );
        Logger.log('✅ Email enviado a: ' + recipient);
      } catch (emailError) {
        Logger.log('❌ Error enviando email a ' + recipient + ': ' + emailError.toString());
      }
    });

  } catch (error) {
    Logger.log('❌ Error en sendNotificationEmails: ' + error.toString());
  }
}
