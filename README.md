# 🧴 IDERMA — Protocolo SŌMA | Suplementación + Coaching

**Instituto DERMA90** | Plataforma de venta B2C de protocolo de suplementación sistémica + coaching personalizado + comunidad + seguimiento para mujeres hispanohablantes 37-50 años en perimenopausia.

## 📋 ¿Qué es IDERMA?

IDERMA es un **protocolo de suplementación único (SŌMA)** que combina:

✅ **Suplemento SŌMA** — 92 ingredientes formulados para atacar 3 problemas sistémicos simultáneamente:
1. **Síntesis de colágeno** (Vitamina C + Zinc + Cobre)
2. **Protección antioxidante** (Vitamina E + Cúrcuma + Licopeno)
3. **Absorción y cofactores** (MSM + Selenio + Vitaminas B)

✅ **Coaching personalizado** — Seguimiento de 12 semanas (duración del protocolo)

✅ **Comunidad** — Acceso a grupo de mujeres en el mismo proceso

✅ **Seguimiento** — Dashboard + checklists + resultados medibles

---

## 🎭 La Estrategia: "Personalización" (Marketing)

El quiz diagnostica **4 perfiles** para crear sensación de personalización:

| Perfil | Síntoma Dominante | Énfasis en Resultado |
|--------|-------------------|---------------------|
| **BARRERA** | Sequedad extrema | "Tu piel necesita restitución lipídica urgente" |
| **DENSIDAD** | Pérdida firmeza | "Tu colágeno está comprometido, aquí va tu plan" |
| **ESTRÉS** | Fatiga visible | "Tu piel está inflamada por oxidative stress" |
| **SOMA+** | Múltiples síntomas | "Tu situación es sistémica, esto es lo que necesitas" |

**Realidad:** Todos reciben el **MISMO SUPLEMENTO SŌMA**. Los perfiles son una **excusa para personalización psicológica**, no productos diferentes.

---

## 🚀 Funnel de Conversión

```
Landing (index.html)
    ↓ [CTA: "Hacer el test"]
    ↓
Quiz Diagnóstico (quiz.html)
    → Calcula perfil del cliente
    → Captura email
    ↓
Resultado Personalizado (resultado.html)
    → "Tu perfil es BARRERA/DENSIDAD/ESTRÉS/SOMA+"
    → Descarga PDF del diagnóstico
    → CTA: "Envía al WhatsApp"
    ↓
Lead Sync (Google Sheets + GHL)
    → Webhook automático
    → Guarda respuestas + perfil
    → Sincroniza con CRM
    ↓
WhatsApp Flow (pipeline.md)
    → PDF del diagnóstico
    → Audio introducción
    → AI Agent recopila info emocional
    ↓
Checkout (checkout.html)
    → UN ÚNICO PRECIO (€49 o el que sea)
    → Protocolo SŌMA (12 semanas)
    ↓
Confirmación (confirmacion.html)
    → Acceso a dashboard
    → Instrucciones de coaching
    → Acceso a comunidad
```

---

## 📁 Estructura del Proyecto

```
IDERMA/
├── 📄 Páginas de Conversión
│   ├── index.html                 # Landing (hero + validación de pain)
│   ├── index-premium.html         # Variante premium (A/B test)
│   ├── index-hormozi.html         # Variante Hormozi (escasez)
│   ├── quiz.html                  # Test diagnóstico (identifica perfil)
│   ├── resultado.html             # Resultado + PDF descargable
│   ├── resultado_FINAL.html       # Versión alternativa resultado
│   ├── checkout.html              # Stripe checkout
│   ├── confirmacion.html          # Post-compra + acceso dashboard
│   ├── dashboard.html             # Portal cliente (coaching + seguimiento)
│   ├── perfil-barrera.html        # Página específica BARRERA
│   ├── prettify-library.html      # Componentes UI reutilizables
│   └── [Legal]
│       ├── aviso-legal.html
│       ├── politica-privacidad.html
│       ├── politica-cookies.html
│       ├── politica-devoluciones.html
│       └── terminos-y-condiciones.html
│
├── 🔧 Backend & Automatización
│   ├── google-apps-script.js      # Webhook para captura de leads
│   ├── pipeline.md                # Detalles del sales automation
│   ├── actualizar-webhook.sh      # Script para actualizar URLs
│   └── vercel.json                # Config Vercel
│
├── 📚 Documentación del Proyecto
│   ├── BLUEPRINT-REPLICABLE.md    # Guía de implementación completa
│   ├── QUICK-START-48h.md         # MVP en 48 horas
│   ├── CHEAT-SHEET.md             # Resumen de procesos
│   ├── TEMPLATES-COPY.md          # Copy templates probados
│   ├── INDEX-BLUEPRINT.md         # Índice y navegación
│   ├── CONFIGURACION.md           # Setup técnico paso a paso
│   ├── ACTUALIZAR-GOOGLE-SHEETS.md # Instrucciones GH Sheets
│   ├── META-ADS-SETUP.md          # Ads en Meta
│   ├── BRANDBOOK-DERMA90.md       # Identidad visual
│   ├── VISUAL-ROADMAP.md          # Roadmap visual
│   ├── ingredientes.md            # Detalle del suplemento SŌMA
│   └── sintomas.md                # Correlaciones síntomas-ingredientes
│
├── 📊 PDFs de Diagnóstico (resultado descargable)
│   ├── PERFIL SOMA+.pdf
│   ├── PERFIL BARRERA.pdf
│   ├── PERFIL DENSIDAD.pdf
│   └── PERFIL ESTRÉS.pdf
│
├── 🛠️ Configuración
│   ├── package.json               # Dependencias (pdfkit)
│   ├── package-lock.json
│   ├── .gitignore
│   └── .claude/                   # Config Claude Code
│
└── 📖 README.md (este archivo)
```

---

## 🧬 El Suplemento SŌMA

**Ver `ingredientes.md` para detalles técnicos completos**

### Especificaciones:
- **Formato:** Cápsula (1 cápsula = 1 dosis diaria)
- **Total ingredientes activos:** 33 + excipientes
- **Duración protocolo:** 12 semanas (90 días)
- **Período de adaptación:** 3-4 semanas antes de notar cambios
- **Mejor con:** Desayuno (proteína + luz natural)

### Los 3 Pilares del Suplemento:

**1. Síntesis de Colágeno**
- Vitamina C (36mg)
- Zinc (3mg)
- Cobre (0,3mg)
- MSM (54mg)

**2. Protección Antioxidante**
- Vitamina E (80,532mg) — 225% VRN
- Cúrcuma 95% (54mg)
- Licopeno (1,5mg)
- Té verde 40% (13,2mg)
- Astaxantina (1,2mg)

**3. Absorción y Cofactores**
- Selenio (60μg) — 109% VRN
- Vitamina A (2700μg) — 337,5% VRN
- Vitamina D (18μg) — 360% VRN
- Vitaminas B (B6, B3, B5)

---

## 🎯 Los 4 Perfiles (Segmentación de Marketing)

Todos son el **MISMO producto SŌMA**, el perfil solo cambia el ángulo de venta:

### 1️⃣ **BARRERA** 🏜️
*"Tu piel está deshidratada. Tu barrera cutánea está comprometida."*
- **Síntoma dominante:** Sequedad extrema
- **Causa validada:** Barrera lipídica comprometida
- **Énfasis en SŌMA:** "Restitución de lípidos + MSM + vitaminas"
- **Trigger:** Score BARRERA > 6/10

### 2️⃣ **DENSIDAD** 💪
*"Tu piel perdió firmeza. Tu colágeno está degradado."*
- **Síntoma dominante:** Pérdida de firmeza/elasticidad
- **Causa validada:** Degradación colágeno + elastina
- **Énfasis en SŌMA:** "Síntesis de colágeno + vitamina C + cobre"
- **Trigger:** Score DENSIDAD > 6/10

### 3️⃣ **ESTRÉS** 😰
*"Tu piel está inflamada. Tu cuerpo está en estrés oxidativo."*
- **Síntoma dominante:** Fatiga visible (ojorosas, piel apagada)
- **Causa validada:** Inflamación sistémica + oxidative stress
- **Énfasis en SŌMA:** "Antioxidantes potentes + desinflamación"
- **Trigger:** Score ESTRÉS > 6/10

### 4️⃣ **SOMA+** ⚡
*"Tu situación es sistémica. Necesitas los 3 pilares simultáneamente."*
- **Síntoma dominante:** Múltiples síntomas combinados (90% de las mujeres)
- **Causa validada:** Disfunción hormonal + metabólica
- **Énfasis en SŌMA:** "Protocolo integral de 3 pilares"
- **Trigger:** 2+ perfiles > 5/10

---

## 🛒 El Producto

**SŌMA Protocol** — €49 (precio ejemplo)

**Incluye:**
- ✅ Suplemento SŌMA (cápsulas para 12 semanas)
- ✅ Acceso a dashboard de seguimiento (90 días)
- ✅ Coaching personalizado (whatsapp + audios)
- ✅ Acceso a comunidad cerrada
- ✅ PDF diagnóstico personalizado descargable
- ✅ Garantía de 30 días (devolución sin preguntas)

**Nota:** No hay 4 productos. El mismo SŌMA se vende a todos, solo que con narrativa diferente según perfil.

---

## ⚙️ Configuración Técnica Necesaria

### 1. **Google Apps Script** (Lead Capture)

Archivo: `google-apps-script.js`

Captura del quiz:
- Respuestas del cliente
- Email
- Perfil calculado
- Timestamp

Salva en: Google Sheets + Sincroniza con GHL

```javascript
// URL del webhook (copiado en quiz.html)
https://script.google.com/macros/d/YOUR_SCRIPT_ID/userweb?v=1

// El webhook:
// 1. Recibe datos POST del quiz
// 2. Guarda en Google Sheets
// 3. Envía a GHL API con tags de perfil
// 4. Envía email de confirmación
```

---

### 2. **Google Sheets** (Database de Leads)

Columnas recomendadas:

| Campo | Tipo | Propósito |
|-------|------|----------|
| Timestamp | Fecha | Cuándo completó quiz |
| Email | Texto | Lead capture |
| Nombre | Texto | Personalización coaching |
| Perfil | Texto | BARRERA \| DENSIDAD \| ESTRÉS \| SOMA+ |
| Score BARRERA | Número | 0-10 |
| Score DENSIDAD | Número | 0-10 |
| Score ESTRÉS | Número | 0-10 |
| Respuestas JSON | Texto | Datos completos quiz |
| Sincronizado GHL | Sí/No | Para tracking |
| Compró | Sí/No | Si convirtió |

---

### 3. **GoHighLevel (GHL)** - CRM

Sincronización automática de leads con tags:
- `perfil_barrera`
- `perfil_densidad`
- `perfil_estres`
- `perfil_soma_plus`

Endpoint: `POST /contacts/` via Google Apps Script

---

### 4. **Stripe** - Pago (1 SKU)

**UN ÚNICO PRODUCTO:**
- Nombre: "SŌMA Protocol"
- Precio: €49
- Descripción: "12 semanas de suplementación + coaching"

```javascript
// checkout.html (línea ~50)
const stripe = Stripe('pk_live_YOUR_KEY');

// Backend necesario:
// POST /api/create-payment-intent
// {
//   amount: 4900,      // €49 en céntimos
//   email: "user@",
//   perfil: "BARRERA"  // Solo para tracking
// }
```

---

### 5. **Meta Pixel** - Tracking

Actualizar cada HTML:
```javascript
fbq('init', 'YOUR_PIXEL_ID');

// Events:
// PageView → Landing visto
// ViewContent → Quiz iniciado
// Lead → Email capturado (en quiz)
// AddToCart → Resultado visto
// InitiateCheckout → Checkout abierto
// Purchase → Compra confirmada
```

---

## 📊 Quiz: Cómo Funciona

### 12 Preguntas:

**Preguntas 1-8:** Síntomas específicos (escala 1-5)
- Sequedad extrema (BARRERA)
- Pérdida de firmeza (DENSIDAD)
- Ojorosas/fatiga visible (ESTRÉS)
- Etc.

**Preguntas 9-10:** Contexto
- ¿Cuánto tiempo llevas con esto?
- ¿Qué soluciones ya probaste?

**Preguntas 11-12:** Conversión
- Email (LEAD CAPTURE)
- ¿Estás dispuesto a probar?

### Scoring (Algoritmo):

```javascript
barreraScore = (q1 + q2 + q3) / 15    // Max 5 pts c/u
densidadScore = (q4 + q5 + q6) / 15
estresScore = (q7 + q8 + q9) / 15

// Lógica final:
if (barreraScore > 6 && densidadScore < 5 && estresScore < 5) {
  perfil = "BARRERA"
} else if (2+ scores > 5) {
  perfil = "SOMA+"  // Múltiples síntomas
} else {
  perfil = perfil dominante
}
```

---

## 📱 Responsive Design

✅ Mobile (375px+)  
✅ Tablet (768px+)  
✅ Desktop (1280px+)

---

## 🔄 Pipeline de Ventas (Sales Automation)

**Ver `pipeline.md` para detalles completos**

1. Quiz completado → Datos a Google Sheets + GHL
2. Resultado mostrado → PDF descargable
3. Botón WhatsApp → Envío inmediato del PDF
4. Audio automático → Introducción del coaching
5. AI Agent → Recopila contexto emocional
6. Closer manual → Cierre consultivo

---

## 🎨 Identidad Visual

**Ver `BRANDBOOK-DERMA90.md`**

**Colores:**
- Primary (Terracota): `#c67856`
- Primary Dark: `#a25f42`
- Primary Light (Beige): `#f4e8e2`
- Background: `#fafaf9`
- Text: `#1a1a1a`

**Tipografía:** Inter (Google Fonts), 17px base

---

## 🚀 Quick Start Local

```bash
# Clonar
git clone https://github.com/enriqueerr99/derma90_nuevo.git
cd iderma

# Instalar deps
npm install

# Servir localmente
python -m http.server 8000
# o
vercel dev

# Deploy a producción
vercel --prod
```

---

## 📚 Documentación Disponible

| Archivo | Propósito |
|---------|-----------|
| `BLUEPRINT-REPLICABLE.md` | Implementación completa (3 fases) |
| `QUICK-START-48h.md` | MVP mínimo en 48h |
| `ingredientes.md` | Detalles químicos del SŌMA |
| `sintomas.md` | Mapeo síntomas → ingredientes |
| `pipeline.md` | Sales automation detallado |
| `BRANDBOOK-DERMA90.md` | Identidad visual |
| `CONFIGURACION.md` | Setup técnico |
| `META-ADS-SETUP.md` | Ads en Meta |

---

## 🐛 Troubleshooting

**Quiz no sincroniza con Google Sheets**
→ Verificar URL de Google Apps Script en quiz.html (~línea 400)

**Perfil no se calcula correctamente**
→ Revisar algorithm en quiz.html (~línea 200-250)

**Stripe falla**
→ Verificar Publishable Key y que endpoint `/api/create-payment-intent` exista

**No llegan emails**
→ Configurar SendGrid o Mailgun en google-apps-script.js

---

## 🛡️ Compliance

✅ GDPR (política privacidad incluida)
✅ No guardamos passwords
✅ Stripe PCI-DSS compliant
✅ HTTPS only en producción

---

## 🎯 Métricas Esperadas

| Etapa | Target |
|-------|--------|
| Landing → Quiz | 40%+ |
| Quiz → Email capturado | 60%+ |
| Email → Checkout | 5-10% |
| Checkout → Compra | 70%+ |
| **Landing → Compra** | **0.8-2%** |

---

## 📞 Contacto

- **Email:** info@iderma90.com
- **Repo:** https://github.com/enriqueerr99/derma90_nuevo

---

**Versión:** 2.0.0  
**Última actualización:** Abril 2026  
**Estado:** 🟢 Producción activa  
**Producto único:** SŌMA Protocol
