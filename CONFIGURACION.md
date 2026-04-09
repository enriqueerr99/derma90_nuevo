# 🔧 Configuración DERMA90

## ✅ PASO 1: Google Sheets Webhook

### Configurar Google Sheet:

1. Ve a https://sheets.google.com
2. Crea nueva hoja llamada "DERMA90 Leads"
3. Primera fila (headers):
   ```
   A1: Timestamp
   B1: Email
   C1: Nombre
   D1: Teléfono
   E1: Perfil
   F1: Respuestas
   ```

### Configurar Apps Script:

1. En tu Sheet: **Extensiones → Apps Script**
2. Borra todo y pega el código de `google-apps-script.js`
3. Guarda (Ctrl+S)
4. Click **Implementar → Nueva implementación**
5. Tipo: **Aplicación web**
6. Configuración:
   - Ejecutar como: **Yo**
   - Quién tiene acceso: **Cualquier usuario**
7. Click **Implementar**
8. **Copia la URL** (algo como: `https://script.google.com/macros/s/XXXXXX/exec`)

### Actualizar quiz.html:

1. Abre `quiz.html`
2. Busca línea ~320: `const webhookUrl = 'TU_URL_WEBHOOK_AQUI';`
3. Reemplaza con tu URL:
   ```javascript
   const webhookUrl = 'https://script.google.com/macros/s/XXXXXX/exec';
   ```
4. Guarda

### Re-deployar:

```bash
cd ~/.openclaw/workspace/derma90-v2
vercel --prod
```

---

## ✅ PASO 2: Facebook Pixel (opcional)

Buscar en todos los HTML:
```javascript
fbq('init', '26790865950521543');
```

Reemplazar con tu Pixel ID real.

---

## ✅ PASO 3: Stripe Checkout

### Backend necesario:

Crear endpoint `/api/create-payment-intent` en Vercel:

```javascript
// api/create-payment-intent.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { amount, currency, profile, email } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: currency,
      metadata: {
        profile: profile,
        email: email
      }
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
```

### Variables de entorno Vercel:

```bash
vercel env add STRIPE_SECRET_KEY
# Pegar: sk_live_...

vercel env add STRIPE_PUBLISHABLE_KEY  
# Pegar: pk_live_...
```

### Actualizar checkout.html línea ~200:

```javascript
const stripe = Stripe('TU_PUBLISHABLE_KEY_AQUI');
```

---

## ✅ PASO 4: Imágenes

Subir a `assets/images/`:
- `logo.svg`
- `hero-main.jpg`
- `protocolo-ritual.jpg`
- `ingrediente-vitamina-c.jpg`
- etc.

---

## 📊 Testing

### Test webhook Google Sheets:

1. Ve a tu quiz: https://derma90-v2.vercel.app/quiz.html
2. Completa hasta email/nombre/teléfono
3. Mira tu Google Sheet → debería aparecer nueva fila

### Ver logs Apps Script:

En Apps Script: **Ejecuciones** (menú lateral)

---

## 🆘 Troubleshooting

### "No llegan datos al Sheet"

1. Verifica URL webhook en quiz.html
2. Ve a Apps Script → Ejecuciones → Mira errores
3. Asegúrate permisos: "Cualquier usuario"

### "Error CORS"

Normal con `mode: no-cors` — datos se envían pero no puedes leer respuesta. Ignora el error en consola si los datos llegan al Sheet.

---

**Última actualización:** Marzo 2026
