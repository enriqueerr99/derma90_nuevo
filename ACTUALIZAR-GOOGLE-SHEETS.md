# ⚠️ ACTUALIZAR Google Apps Script - Tracking de Landings

## ¿Qué ha cambiado?

Ahora el quiz captura **de dónde vino cada lead** y lo guarda en Google Sheets.

Esto te permite saber:
- ✅ Qué landing convierte mejor (premium vs original)
- ✅ Qué campaña de Meta trae más leads
- ✅ Qué anuncio específico funciona

---

## 📋 Paso 1: Actualizar Google Apps Script

1. **Abre tu Google Sheet** de leads DERMA90
2. Ve a **Extensiones** → **Apps Script**
3. **Reemplaza TODO el código** con el nuevo de `google-apps-script.js` (este archivo)
4. Haz click en **💾 Guardar**
5. Haz click en **▶️ Ejecutar** → Selecciona `testWebhook`
6. (Primera vez) Te pedirá permisos → **Revisar permisos** → **Permitir**

---

## 📊 Paso 2: Añadir headers a tu Sheet

Tu Google Sheet ahora tendrá **más columnas**. Añade estos headers en la **fila 1**:

| A | B | C | D | E | F | G | H | I | J | K |
|---|---|---|---|---|---|---|---|---|---|---|
| **Timestamp** | **Email** | **Nombre** | **Teléfono** | **Perfil** | **Landing URL** | **UTM Source** | **UTM Medium** | **UTM Campaign** | **UTM Content** | **Respuestas** |

---

## 🎯 Paso 3: Configurar URLs de campañas con UTM

### Para testear landing PREMIUM vs ORIGINAL:

**Landing Premium (luxury):**
```
https://derma90-v2.vercel.app/index-premium.html?utm_source=meta&utm_medium=cpc&utm_campaign=leads-q2-2026&utm_content=premium
```

**Landing Original (research-driven):**
```
https://derma90-v2.vercel.app/?utm_source=meta&utm_medium=cpc&utm_campaign=leads-q2-2026&utm_content=original
```

### Para testear diferentes anuncios:

**Anuncio A:**
```
https://derma90-v2.vercel.app/index-premium.html?utm_source=meta&utm_medium=cpc&utm_campaign=leads-q2-2026&utm_content=anuncio-a
```

**Anuncio B:**
```
https://derma90-v2.vercel.app/index-premium.html?utm_source=meta&utm_medium=cpc&utm_campaign=leads-q2-2026&utm_content=anuncio-b
```

---

## 📈 Cómo analizar los datos

Una vez tengas leads en el Sheet, puedes hacer:

### Ver qué landing convierte mejor:
1. Filtra por columna **F (Landing URL)**
2. Cuenta cuántos leads vienen de cada una
3. Compara con el coste por lead en Meta

### Ver qué campaña/anuncio funciona:
1. Filtra por columna **I (UTM Campaign)** o **J (UTM Content)**
2. Identifica cuál trae más leads calificados

---

## 🧪 Testear que funciona

1. **Abre esta URL** (con UTM test):
   ```
   https://derma90-v2.vercel.app/index-premium.html?utm_source=test&utm_medium=manual&utm_campaign=test-campaign&utm_content=test-ad
   ```

2. **Completa el quiz** con datos de prueba

3. **Mira tu Google Sheet** → Deberías ver una nueva fila con:
   - Landing URL: `https://derma90-v2.vercel.app/index-premium.html`
   - UTM Source: `test`
   - UTM Medium: `manual`
   - UTM Campaign: `test-campaign`
   - UTM Content: `test-ad`

Si ves esos datos → **✅ Todo funciona**

---

## ⚙️ Parámetros UTM explicados

| Parámetro | Qué es | Ejemplo |
|-----------|--------|---------|
| **utm_source** | De dónde viene (plataforma) | `meta`, `google`, `instagram` |
| **utm_medium** | Tipo de tráfico | `cpc` (pago), `organic`, `email` |
| **utm_campaign** | Nombre de campaña | `leads-q2-2026`, `retargeting-marzo` |
| **utm_content** | Variante específica | `premium`, `original`, `anuncio-a` |

---

## 🚨 Problemas comunes

**"No veo los datos nuevos en el Sheet"**
- → Asegúrate de haber actualizado el Google Apps Script
- → Verifica que los headers están en fila 1

**"Aparece 'direct' en Landing URL"**
- → Significa que el usuario llegó directo (sin pasar por otra landing)
- → Normal si alguien va directo a quiz.html

**"UTM Source/Medium/Campaign están vacíos"**
- → Significa que la URL no tenía parámetros UTM
- → Usa las URLs con `?utm_source=...` de arriba

---

## 💡 Tip Pro

En Meta Ads Manager, puedes usar **parámetros de URL dinámicos**:

```
https://derma90-v2.vercel.app/index-premium.html?utm_source=meta&utm_medium=cpc&utm_campaign={{campaign.name}}&utm_content={{ad.name}}
```

Meta reemplazará automáticamente `{{campaign.name}}` y `{{ad.name}}` con los nombres reales. Así no tienes que crear URLs manualmente para cada anuncio.

---

**Última actualización:** 2 abril 2026  
**Webhook URL:** https://script.google.com/macros/s/AKfycbxcZWeu99dTautLTB-0onFfUip9tO73RoG5PHm_DCxExkRrBvvJSgqb18ciWms2D1w/exec
