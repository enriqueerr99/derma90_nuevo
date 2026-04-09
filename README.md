# Instituto DERMA90 — Protocolo SŌMA V2

Landing page optimizada con research de consumer psychology para mujeres hispanohablantes 37-50 en perimenopausia.

## 🎯 Mejoras clave vs V1

### Gaps cerrados:
1. ✅ **Pain dominante "No me reconozco"** intensificado (hero + sección dedicada)
2. ✅ **Framework "Por qué nada funcionó"** (3 puntos de falla simultáneos)
3. ✅ **Naming de soluciones fallidas** (Colágeno, ClimaFort, cremas, etc.)
4. ✅ **Neutralización "otro timo más"** (belief destruction antes de vender)
5. ✅ **Explicación markup PRETTIFY retail** (FAQ transparente sobre precio)
6. ✅ **Testimonios two-sided** (honestidad = mayor credibilidad)
7. ✅ **Contexto dosis ingredientes** (mantenimiento vs terapéuticas)

### Funnel completo:
- **Landing** → **Quiz (12 preguntas)** → **Captura email** → **Resultado personalizado** → **Checkout Stripe** → **Confirmación**

---

## 📁 Estructura

```
derma90-v2/
├── index.html              # Landing page optimizada
├── quiz.html               # Test diagnóstico (captura lead antes de resultado)
├── resultado.html          # Página resultado + recomendación personalizada
├── checkout.html           # Checkout con Stripe
├── confirmacion.html       # Post-purchase confirmation
├── assets/
│   ├── css/
│   │   └── styles.css      # Estilos base (identidad visual mejorada)
│   └── js/
│       └── main.js         # JavaScript principal
├── vercel.json             # Configuración Vercel
└── README.md               # Este archivo
```

---

## 🚀 Deploy en Vercel

### Opción 1: CLI (recomendado)
```bash
cd derma90-v2
vercel --prod
```

### Opción 2: GitHub
1. Push a repositorio GitHub
2. Conecta repo en vercel.com
3. Deploy automático

---

## ⚙️ Configuración pendiente

### 1. Facebook Pixel
Actualizar ID en cada HTML:
```javascript
fbq('init', 'TU_PIXEL_ID_AQUI');
```

### 2. Stripe
Actualizar `checkout.html` línea ~200:
```javascript
const stripe = Stripe('pk_live_TU_PUBLISHABLE_KEY');
```

**Backend necesario:**
- Endpoint `/api/create-payment-intent` (Node.js + Stripe)
- Ver: https://stripe.com/docs/payments/accept-a-payment

### 3. Backend para leads
Quiz guarda en `localStorage` pero necesitas:
- Endpoint para guardar leads con email + respuestas
- Integración con CRM (HubSpot, ActiveCampaign, etc.)

### 4. Imágenes
Crear carpeta `assets/images/` con:
- `logo.svg` (logo DERMA90)
- `hero-main.jpg`
- `protocolo-ritual.jpg`
- `ingrediente-*.jpg` (vitamina C, A, cúrcuma, etc.)

O usar placeholders temporales.

---

## 🎨 Identidad visual

**Colores:**
- Primary: `#c67856` (terracota)
- Primary Dark: `#a25f42`
- Primary Light: `#f4e8e2`
- Background: `#fafaf9` (beige claro)
- Text: `#1a1a1a`

**Tipografía:**
- Font: Inter (Google Fonts)
- Base: 17px / 1.6 line-height

---

## 📊 Tracking events (Facebook Pixel)

- `PageView` → Landing cargada
- `ViewContent` → Quiz iniciado
- `Lead` → Email capturado en quiz
- `AddToCart` → Resultado mostrado
- `InitiateCheckout` → Checkout iniciado
- `Purchase` → Compra confirmada

---

## 🔧 Personalización por perfil

El quiz calcula 4 perfiles:
1. **Barrera** → Sequedad extrema
2. **Densidad** → Pérdida firmeza
3. **Estrés** → Fatiga visible
4. **SŌMA+** → Múltiples síntomas (más común)

`resultado.html` muestra contenido dinámico según perfil.

---

## 📝 Notas importantes

### PRETTIFY retail
- El suplemento está disponible retail ~€20/bote
- FAQ explica transparentemente que pagas por protocolo (coaching + portal + seguimiento)
- **Nunca ocultar esto** — es crítico para trust

### Dosis subclinicas
- Copy contextualiza que son dosis de mantenimiento, no terapéuticas
- Énfasis en **sistema de 3 pilares** (no mega-dosis individual)

### Garantía 30 días
- Repetida múltiples veces (reduce risk perception)
- "Devolución sin preguntas" = trust builder crítico

---

## 🛠️ Próximos pasos técnicos

1. [ ] Configurar Stripe backend
2. [ ] Conectar leads a CRM
3. [ ] Añadir imágenes reales
4. [ ] Setup email transaccional (confirmaciones)
5. [ ] Analytics completo (GA4 + Pixel)
6. [ ] A/B testing (headlines, CTAs)

---

## 📞 Soporte

Para dudas técnicas:
- Email: info@iderma90.com

---

**Versión:** 2.0.0  
**Última actualización:** Marzo 2026  
**Research-driven optimization basado en 900+ testimonios consumidores**
