# 🧴 IDERMA — Protocolo de Skincare SŌMA V2

**Instituto DERMA90** | Landing page + quiz diagnóstico + funnel de ventas para mujeres hispanohablantes 37-50 años en perimenopausia.

## 📋 Descripción General

IDERMA es una plataforma digital de diagnóstico y venta de un protocolo de skincare especializado en los 4 perfiles dermatológicos más comunes durante la perimenopausia:

- **BARRERA** → Sequedad extrema y deshidratación
- **DENSIDAD** → Pérdida de firmeza y elasticidad
- **ESTRÉS** → Fatiga visible y síntomas de estrés dérmico
- **SOMA+** → Múltiples síntomas combinados (perfil más común)

El proyecto está basado en **research de psychology del consumidor** y **900+ testimonios de usuarios** para validar el problema y la solución.

---

## 🎯 Funnel de Conversión

```
Landing (index.html)
    ↓ [CTA: "Hacer el test"]
    ↓
Quiz Diagnóstico (quiz.html)
    ↓ [Recopila 12 preguntas + email]
    ↓
Google Sheets + GHL (webhook automático)
    ↓ [Captura de lead + tags de perfil]
    ↓
Resultado Personalizado (resultado.html)
    ↓ [Muestra PDF del perfil + contexto]
    ↓
WhatsApp → PDF + Audio + AI Agent (pipeline.md)
    ↓
Checkout Stripe (checkout.html)
    ↓ [Pago del protocolo]
    ↓
Confirmación (confirmacion.html)
    ↓ [Email transaccional + acceso a dashboard]
```

---

## 📁 Estructura del Proyecto

```
IDERMA/
├── 📄 Páginas Principales
│   ├── index.html                 # Landing principal optimizada
│   ├── index-premium.html         # Variante premium (alternative)
│   ├── index-hormozi.html         # Variante con framework Hormozi
│   ├── quiz.html                  # Quiz diagnóstico (12 preguntas)
│   ├── resultado.html             # Resultado personalizado por perfil
│   ├── resultado_FINAL.html       # Versión final de resultado
│   ├── checkout.html              # Checkout con Stripe
│   ├── confirmacion.html          # Página post-compra
│   ├── dashboard.html             # Dashboard para usuarios registrados
│   ├── perfil-barrera.html        # Página específica perfil BARRERA
│   ├── aviso-legal.html           # Legal: Aviso Legal
│   ├── politica-privacidad.html   # Legal: Privacidad
│   ├── politica-cookies.html      # Legal: Cookies
│   ├── politica-devoluciones.html # Legal: Devoluciones
│   ├── terminos-y-condiciones.html # Legal: Términos
│   ├── prettify-library.html      # Biblioteca de componentes UI
│   └── validacion-legal.html      # Validación de términos
│
├── 🔧 Backend & Automatización
│   ├── google-apps-script.js      # Google Apps Script para webhooks
│   ├── pipeline.md                # Documentación del sales pipeline
│   ├── actualizar-webhook.sh      # Script para actualizar URLs webhooks
│   └── vercel.json                # Configuración Vercel
│
├── 📚 Documentación
│   ├── BLUEPRINT-REPLICABLE.md    # Guía completa de implementación
│   ├── QUICK-START-48h.md         # Startup rápido en 48 horas
│   ├── CHEAT-SHEET.md             # Resumen rápido de procesos
│   ├── TEMPLATES-COPY.md          # Plantillas de copy probadas
│   ├── INDEX-BLUEPRINT.md         # Índice de blueprint
│   ├── CONFIGURACION.md           # Configuraciones técnicas
│   ├── ACTUALIZAR-GOOGLE-SHEETS.md # Instrucciones Google Sheets
│   ├── META-ADS-SETUP.md          # Setup de Meta Ads
│   ├── BRANDBOOK-DERMA90.md       # Identidad visual
│   ├── VISUAL-ROADMAP.md          # Hoja de ruta visual
│   ├── ingredientes.md            # Detalle de ingredientes del protocolo
│   └── sintomas.md                # Diccionario de síntomas
│
├── 📊 Resultados & PDFs (Diagnósticos)
│   ├── PERFIL SOMA+.pdf           # Diagnóstico SOMA+
│   ├── PERFIL BARRERA.pdf         # Diagnóstico BARRERA
│   ├── PERFIL DENSIDAD.pdf        # Diagnóstico DENSIDAD
│   ├── PERFIL ESTRÉS.pdf          # Diagnóstico ESTRÉS
│   └── perfil-barrera.pdf         # Versión alternativa BARRERA
│
├── 📦 Assets
│   └── assets/                    # Imágenes, CSS, JS
│
├── 🛠️ Configuración
│   ├── package.json               # Dependencias (pdfkit)
│   ├── package-lock.json
│   ├── .gitignore
│   └── .claude/                   # Configuración Claude Code
│
└── 📖 Este archivo
    └── README.md
```

---

## 🚀 Quick Start

### Requisitos Previos

- **Node.js** 18+ (para pdfkit si usas generación de PDFs)
- **Vercel CLI** (para deployment)
- **Google Account** (para Google Sheets + Apps Script)
- **Stripe Account** (para pagos)
- **GoHighLevel Account** (para gestión de leads)

### Instalación Local

```bash
# Clonar repositorio
git clone https://github.com/tu-usuario/iderma.git
cd iderma

# Instalar dependencias
npm install

# Correr servidor local (opcional, para testing)
python -m http.server 8000
# O usar Vercel CLI
vercel dev
```

### Deployment en Vercel

```bash
# Opción 1: CLI (recomendado)
vercel --prod

# Opción 2: Push a GitHub + Connect en vercel.com
git push origin main
# Luego conecta repo en dashboard de Vercel
```

---

## ⚙️ Configuración Necesaria

### 1. **Google Apps Script** (Lead Capture)

El archivo `google-apps-script.js` contiene la lógica de webhook que:
- Recibe datos del quiz
- Guarda en Google Sheets
- Envía a GoHighLevel (GHL) con tags de perfil
- Genera emails de confirmación

**Pasos:**
1. Crear Google Apps Script en Google Drive
2. Copiar contenido de `google-apps-script.js`
3. Deploy como Web App (ejecutable como usuario)
4. Copiar URL del web app
5. Actualizar URL en `quiz.html` (línea ~400)

**URL necesaria en quiz.html:**
```javascript
fetch('https://script.google.com/macros/d/YOUR_SCRIPT_ID/userweb?v=1', {
  method: 'POST',
  body: JSON.stringify(formData)
})
```

---

### 2. **Google Sheets** (Database de Leads)

**Estructura recomendada:**

| Columna | Tipo | Propósito |
|---------|------|----------|
| Timestamp | Fecha | Cuándo completó quiz |
| Email | Texto | Para emails transaccionales |
| Nombre | Texto | Personalización |
| Perfil | Texto | SOMA+ \| BARRERA \| DENSIDAD \| ESTRÉS |
| Score BARRERA | Número | Puntuación del síntoma |
| Score DENSIDAD | Número | Puntuación del síntoma |
| Score ESTRÉS | Número | Puntuación del síntoma |
| Score SOMA+ | Número | Puntuación del síntoma |
| Respuestas Completas | JSON | Todos los datos del quiz |
| Estado GHL | Texto | Para tracking de sincronización |
| Última Actualización | Fecha | Para auditoría |

---

### 3. **GoHighLevel (GHL)** - Integración de CRM

**Setup:**
1. Conectar GHL API en `google-apps-script.js`
2. Usar token: `GOGOGLE_APPS_SCRIPT_API_TOKEN` (en línea ~50)
3. Tags automáticos por perfil:
   - `perfil_soma_plus`
   - `perfil_barrera`
   - `perfil_densidad`
   - `perfil_estres`

**Endpoints usados:**
- `POST /contacts/` → Crear/actualizar lead
- Contactos sincronizados automáticamente

---

### 4. **Stripe** (Pagos)

**Setup en checkout.html:**

```javascript
// Línea ~50
const stripe = Stripe('pk_live_YOUR_PUBLISHABLE_KEY');

// Backend endpoint necesario
// POST /api/create-payment-intent
// {
//   amount: 4900,  // €49 en centavos
//   email: "user@example.com",
//   perfil: "SOMA+"
// }
```

**Productos en Stripe:**
- Protocolo SOMA+: €49
- Protocolo BARRERA: €49
- Protocolo DENSIDAD: €49
- Protocolo ESTRÉS: €49

---

### 5. **Meta Pixel** (Tracking)

Actualizar en cada HTML:
```javascript
// Línea ~20 en cada archivo
fbq('init', 'YOUR_PIXEL_ID');

// Events automáticos:
// PageView → Página cargada
// ViewContent → Quiz iniciado
// Lead → Email capturado
// AddToCart → Resultado mostrado
// InitiateCheckout → Checkout iniciado
// Purchase → Compra confirmada
```

---

## 📊 Los 4 Perfiles Diagnósticos

### 1️⃣ **BARRERA** 🏜️
- **Síntoma dominante:** Sequedad extrema
- **Causa:** Barrera lipídica comprometida
- **Solución:** Restitución de lípidos + hidratación profunda
- **Cuando se activa:** Score BARRERA > 6/10

### 2️⃣ **DENSIDAD** 💪
- **Síntoma dominante:** Pérdida de firmeza
- **Causa:** Degradación de colágeno + elastina
- **Solución:** Restitución de matriz extracelular
- **Cuando se activa:** Score DENSIDAD > 6/10

### 3️⃣ **ESTRÉS** 😰
- **Síntoma dominante:** Fatiga visible (ojorosas, apagado)
- **Causa:** Inflamación + oxidative stress
- **Solución:** Antioxidación + desinflamación
- **Cuando se activa:** Score ESTRÉS > 6/10

### 4️⃣ **SOMA+** ⚡
- **Síntoma dominante:** Múltiples síntomas combinados
- **Causa:** Disfunción sistémica (hormonal + metabólica)
- **Solución:** Protocolo de 3 pilares simultáneos
- **Cuando se activa:** 2+ perfiles > 5/10

---

## 🔄 Pipeline de Ventas (Sales Automation)

**Ver `pipeline.md` para detalles completos**

### Flujo:
1. Quiz completado → Datos a Google Sheets + GHL
2. Pantalla de resultado → PDF descargable + CTA WhatsApp
3. Botón WhatsApp → Envío inmediato del PDF
4. Audio automático → Mantiene continuidad
5. AI Agent → Recopila información emocional
6. Closer manual → Cierre consultivo

---

## 🎨 Identidad Visual (Brand)

**Ver `BRANDBOOK-DERMA90.md` para detalles completos**

### Colores Corporativos:
```
Primary (Terracota):      #c67856
Primary Dark:              #a25f42
Primary Light (Beige):     #f4e8e2
Background (Blanco roto):  #fafaf9
Text (Negro):              #1a1a1a
Success:                   #10b981
Warning:                   #f59e0b
Error:                     #ef4444
```

### Tipografía:
- **Font:** Inter (Google Fonts)
- **Base size:** 17px
- **Line height:** 1.6
- **Font weights:** 400, 500, 600, 700

### Componentes UI:
- Ver `prettify-library.html` para componentes reutilizables

---

## 🧠 Cómo funciona el Quiz

### 12 Preguntas (estructura):

**Preguntas 1-8:** Síntomas específicos (escala 1-5)
- ¿Sequedad extrema?
- ¿Falta de firmeza?
- ¿Ojorosas/fatiga?
- ¿Etc.

**Preguntas 9-10:** Contexto
- ¿Cuánto tiempo llevas con esto?
- ¿Qué soluciones ya probaste?

**Preguntas 11-12:** Conversión
- ¿Tu email? (LEAD CAPTURE)
- ¿Estás dispuesto a probar?

### Scoring Algorithm:
```javascript
// score = sum(respuestas_relacionadas) / max_possible
barreraScore = (q1 + q2 + q3) / 15  // max 5 pts c/u
densidadScore = (q4 + q5 + q6) / 15
estresScore = (q7 + q8 + q9) / 15
somaScore = max(barreraScore, densidadScore, estresScore)

// Si 2+ perfiles > 50%, perfil = SOMA+
```

---

## 🔐 Variantes del Proyecto

El repo incluye 3 variantes de landing:

| Archivo | Enfoque | Uso |
|---------|---------|-----|
| `index.html` | Empático + Educational | Producción actual |
| `index-premium.html` | Lujo + Premium positioning | Test A/B |
| `index-hormozi.html` | Framework Hormozi (escasez) | Test A/B agresivo |

---

## 📱 Responsive Design

Todas las páginas están optimizadas para:
- ✅ Mobile (375px+)
- ✅ Tablet (768px+)
- ✅ Desktop (1280px+)

**Puntuación Lighthouse (target):**
- Performance: > 90
- Accessibility: > 95
- Best Practices: > 95
- SEO: > 95

---

## 🛡️ Seguridad & Privacidad

- ✅ GDPR compliant (política de privacidad incluida)
- ✅ No guardamos passwords
- ✅ Stripe PCI-DSS (sin exposición de datos sensibles)
- ✅ Google Sheets encriptada
- ✅ HTTPS only en producción

---

## 📈 Métricas de Éxito

**Funnel esperado:**

| Etapa | Conversión | Target |
|-------|-----------|--------|
| Landing → Quiz | 40%+ | Interés en el problema |
| Quiz → Email | 60%+ | Quieren resultado |
| Email capturado → Checkout | 5-10% | High intent |
| Checkout → Compra | 70%+ | Payment friction |
| **Overall:** Landing → Compra | **0.8-2%** | Excelente |

---

## 🔧 Stack Técnico

```
Frontend:
  - HTML5 / CSS3 / Vanilla JavaScript
  - No frameworks (vanilla para rapidez)
  - PDFKit para generación de PDFs

Backend:
  - Google Apps Script (webhooks)
  - No backend custom (serverless)

Integraciones:
  - Stripe (pagos)
  - GoHighLevel (CRM)
  - Google Sheets (database)
  - Meta Pixel (analytics)
  - WhatsApp API (mensajería)

Hosting:
  - Vercel (producción)
  - GitHub (versionamiento)
```

---

## 📚 Documentación Disponible

| Documento | Propósito |
|-----------|----------|
| `BLUEPRINT-REPLICABLE.md` | Guía completa de implementación (3 fases) |
| `QUICK-START-48h.md` | Startup en 48 horas (para nuevos nichos) |
| `CHEAT-SHEET.md` | Resumen de procesos y URLs |
| `TEMPLATES-COPY.md` | Plantillas de copy probadas |
| `pipeline.md` | Detalles del sales automation |
| `BRANDBOOK-DERMA90.md` | Identidad visual completa |
| `CONFIGURACION.md` | Setup técnico paso a paso |
| `META-ADS-SETUP.md` | Configuración de anuncios |
| `ingredientes.md` | Información de ingredientes activos |
| `sintomas.md` | Diccionario de síntomas y correlaciones |

---

## 🐛 Troubleshooting

### El quiz no envía datos a Google Sheets
**Solución:** Verificar URL de Google Apps Script en quiz.html (línea ~400)

### Los perfiles no se calculan correctamente
**Solución:** Revisar scoring algorithm en quiz.html (línea ~200-250)

### Stripe falla en checkout
**Solución:** Verificar Publishable Key y endpoint `/api/create-payment-intent`

### No llegan emails transaccionales
**Solución:** Configurar SendGrid o similar en google-apps-script.js

### Landing se ve cortada en móvil
**Solución:** Revisar CSS media queries en assets/css/styles.css

---

## 👥 Contribuciones

Para cambios en el proyecto:
1. Crear rama feature (`git checkout -b feature/nombre`)
2. Hacer commit (`git commit -am 'Add feature'`)
3. Push a rama (`git push origin feature/nombre`)
4. Crear Pull Request

**Nota:** Incluir en PR:
- Descripción de cambios
- Testing realizado
- Screenshots si hay cambios visuales

---

## 📞 Soporte & Contacto

- **Email:** info@iderma90.com
- **Documentación:** Ver carpeta raíz (todos los `.md`)
- **Issues:** Reportar en GitHub issues

---

## 📄 Licencia

Contenido propietario de Instituto DERMA90. Uso restringido a equipo interno y colaboradores autorizados.

---

## 🚦 Roadmap

**Próximas features:**
- [ ] App móvil nativa (iOS/Android)
- [ ] Integración con wearables (tracking de síntomas)
- [ ] Chatbot AI mejorado (más contexto emocional)
- [ ] Membership/suscripción recurrente
- [ ] Marketplace de productos complementarios
- [ ] Análisis de ADN dermatológico

---

## 📊 Estadísticas del Proyecto

- **Total HTMLs:** 16
- **Documentación:** 12 archivos `.md`
- **Líneas de código:** ~25,000+
- **Integraciones activas:** 5 (Stripe, GHL, Google Sheets, Meta, WhatsApp)
- **Perfiles diagnósticos:** 4
- **PDFs generados:** 4
- **Último deploy:** 2026-04-13

---

**Versión:** 2.0.0  
**Última actualización:** Abril 2026  
**Estado:** Producción activa  
**Mantenedor:** Instituto DERMA90

---

*Este proyecto fue construido con research de 900+ testimonios de consumidores y principios de consumer psychology aplicados a perimenopausia.*
