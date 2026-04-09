# Meta Ads - Configuración Tracking DERMA90

## ✅ Facebook Pixel Configurado

**Pixel ID:** `26790865950521543`

### Eventos Implementados

| Evento | Dónde se dispara | Qué hace |
|--------|------------------|----------|
| **PageView** | Todas las páginas | Tracking general de visitas |
| **ViewContent** | quiz.html (al cargar) | Usuario inicia el test |
| **Lead** 🎯 | quiz.html (al completar form) | **Usuario calificado** - envió nombre, email, teléfono |
| **AddToCart** | resultado.html (al ver perfil) | Usuario vio su resultado personalizado |

---

## 🎯 Configurar Campaña de Captación de Leads en Meta

### 1. **Crear Campaña en Meta Ads Manager**

**Objetivo de campaña:** **Leads** (no tráfico, no conversiones)

**Ubicación del evento:** Tu sitio web

**Evento de conversión:** `Lead`

### 2. **Audiencia Objetivo**

- **Edad:** 37-50 años
- **Género:** Mujeres
- **Intereses sugeridos:**
  - Menopausia
  - Salud de la mujer
  - Suplementos alimenticios
  - Bienestar
  - Cuidado de la piel
  - Envejecimiento saludable
  
### 3. **Configuración del Pixel en Meta**

1. Ve a **Meta Events Manager** → https://business.facebook.com/events_manager
2. Selecciona tu Pixel ID: `26790865950521543`
3. Verifica que ves estos eventos en "Test Events":
   - PageView
   - ViewContent (quiz)
   - **Lead** (cuando alguien completa el formulario)
   - AddToCart (resultado)

### 4. **Configurar Evento Lead como Conversión**

1. En Events Manager → **Eventos de Conversión**
2. Añade el evento **Lead**
3. Prioridad: **Alta** (es tu evento principal)

### 5. **Crear Audiencia Personalizada (Retargeting)**

**Audiencia 1: Gente que vio el quiz pero NO completó**
- Evento: `ViewContent` (quiz.html)
- Excluir: `Lead` (últimos 30 días)

**Audiencia 2: Leads calificados (completaron quiz)**
- Evento: `Lead` (últimos 30 días)
- Estos son **hot leads** para retargeting

**Audiencia 3: Vio resultado pero no compró**
- Evento: `AddToCart` (vio resultado)
- Excluir: Purchase (cuando configures Stripe)

---

## 📊 Métricas a Monitorizar

### En Meta Ads Manager:

| Métrica | Qué significa | Objetivo |
|---------|---------------|----------|
| **Coste por Lead** | Cuánto pagas por cada formulario completado | < €5-10 (varía por país) |
| **Tasa de conversión Lead** | % de gente que completa el formulario | > 5-10% |
| **CTR** | % clicks en el anuncio | > 2% |

### En Google Sheets (tu CRM):

- Verás todos los leads con: nombre, email, teléfono, perfil detectado
- Webhook: `https://script.google.com/macros/s/AKfycbxcZWeu99dTautLTB-0onFfUip9tO73RoG5PHm_DCxExkRrBvvJSgqb18ciWms2D1w/exec`

---

## 🧪 Testear que el Pixel Funciona

### Opción 1: Extension Facebook Pixel Helper (Chrome)
1. Instala: https://chrome.google.com/webstore (busca "Facebook Pixel Helper")
2. Visita tu landing: https://derma90-v2.vercel.app/index-premium.html
3. Icono verde = Pixel detectado ✅
4. Completa el quiz → Deberías ver evento **Lead** dispararse

### Opción 2: Test Events en Meta
1. Meta Events Manager → **Test Events**
2. Abre tu landing en una pestaña
3. Completa el quiz
4. Verás el evento Lead aparecer en tiempo real en Meta

---

## 🚀 Flujo Completo de Usuario (con tracking)

1. **Usuario ve anuncio** → Click
2. **Llega a landing** → `PageView` disparado
3. **Click "Hacer el test"** → Va a quiz.html
4. **Quiz carga** → `ViewContent` disparado
5. **Completa quiz y envía datos** → 🎯 **`Lead` disparado** ← Meta detecta lead calificado
6. **Ve su resultado** → `AddToCart` disparado (resultado.html)
7. **Click opciones de pago** → Envía a Stripe
8. (Futuro) **Completa pago** → `Purchase` disparado

---

## 💡 Tips para Campañas

### Landing Pages disponibles:
- **index-premium.html** (luxury long-form) ← Recomendada para cold traffic
- **index-hormozi.html** (value-stack agresivo) ← Para warm traffic
- **index.html** (research-driven original)

### Copy para Anuncios (Sugerencias):

**Título:** "¿37-50 años? Tu piel cambió y no sabes por qué"
**Texto:** "Haz el test gratuito de 2 minutos y descubre qué le está pasando realmente a tu cuerpo en perimenopausia."
**CTA:** "Hacer el test" / "Descubrir mi perfil"

---

## 🔧 Próximos Pasos (Opcional)

- [ ] Configurar evento `Purchase` cuando integres Stripe real
- [ ] Crear Lookalike Audience basada en tus Leads
- [ ] A/B test entre index-premium vs index-hormozi
- [ ] Configurar conversiones avanzadas (CAPI) si escala

---

**Última actualización:** 2 abril 2026
**Pixel instalado en:** index-premium.html, quiz.html, resultado.html
