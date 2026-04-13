# 🔄 IDERMA Pipeline de Leads a Venta

## Flujo Completo

1️⃣ **QUIZ COMPLETADO**
   - Datos → Google Sheets + GHL
   - Sistema automático de captura vía webhook

2️⃣ **PANTALLA POST-QUIZ**
   - CTA: "Hablanos por WhatsApp" + botón
   - Mensaje template: "Quiero mi resultado"

3️⃣ **AL CLIC DEL BOTÓN** ⚡ [OPTIMIZADO]
   - ENVÍO INMEDIATO del PDF
   - Trigger: `sendProfilePdfViaWhatsapp()`
   - Perfiles:
     - SOMA+ → `PERFIL SOMA+.pdf`
     - BARRERA → `PERFIL BARRERA.pdf`
     - DENSIDAD → `PERFIL DENSIDAD.pdf`
     - ESTRÉS → `PERFIL ESTRÉS.pdf`

4️⃣ **AUTOMATICAMENTE (sin delay)**
   - Envío de AUDIO personalizado
   - Mensaje: 
     ```
     "Acabo de enviarte tu diagnóstico. 
      Ahora voy a hacerte unas preguntas para 
      entender mejor tu situación, ¿vale?"
     ```
   - Tono: continuidad, misma persona
   - Personalización: según perfil del quiz

5️⃣ **AI AGENT ENTRA AUTOMÁTICAMENTE**
   - Sigue naturalmente la conversación
   - Apertura: "Cuéntame, ¿qué síntomas has tenido?"
   - Objetivos:
     - Recopila información emocional
     - Entiende círculo vicioso (síntomas → emociones → comportamiento)
     - Prepara contexto para closer

6️⃣ **CLOSER MANUAL**
   - Acceso a:
     - Perfil del diagnóstico (SOMA+, BARRERA, DENSIDAD, ESTRÉS)
     - Respuestas completas del quiz
     - Conversación con AI Agent (contexto emocional)
   - Cierra la venta

---

## 📊 Puntos Clave de Mejora Implementados

✅ **Envío inmediato del PDF** → experiencia sin fricción
✅ **Audio mantiene continuidad** → no parece que llegó un "bot" diferente
✅ **AI Agent como continuación** → lead cree que sigue hablando con la misma persona
✅ **Contexto emocional para closer** → mejor cierre de venta

---

## 🔧 Implementación Técnica

- **Quiz captura datos** vía webhook a Google Sheets
- **GHL integración** para gestión de contactos
- **WhatsApp API** para envío de mensajes + archivos
- **Google Drive** almacena los PDFs
- **AI Agent** (implementación pendiente de especificar)
- **Dashboard Closer** acceso en tiempo real
