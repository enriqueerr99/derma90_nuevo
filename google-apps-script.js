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
    
    // Respuesta exitosa
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Lead guardado correctamente'
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
