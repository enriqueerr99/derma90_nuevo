# ⚡ Quick Start: Replicar DERMA90 en 48 Horas

**Objetivo:** Tener un landing page funcional + quiz básico en 2 días para validar tu idea  
**Nivel:** No necesita experiencia técnica  
**Costo:** $0 (herramientas gratuitas)

---

## Día 1: Validación + Setup (4 horas)

### HORA 1-2: Define tu oferta (Worksheet)

**Rellenar esto:**

```
1. PROBLEMA:
   - Quiénes sufren: _______________ (edad, género, contexto)
   - Cuál es el problema: _______________
   - Por cuánto tiempo lo tienen: _______________
   - Cuánto gastan intentando resolverlo: $_____ (anual)

2. SOLUCIÓN:
   - Nombre del protocolo: _______________
   - Duración: _____ semanas/meses
   - Precio: $_____ (debe estar entre 2-5x el gasto anual divisido por frecuencia)
   - Incluye: _____, _____, _____

3. LOS 3 PILARES:
   1. _________________ (el pilar 1 y por qué falla solo)
   2. _________________ (el pilar 2 y por qué falla solo)
   3. _________________ (el pilar 3 y por qué falla solo)

4. PERFILES (3-4 segmentos):
   - Perfil A: _____________ (síntoma dominante)
   - Perfil B: _____________ (síntoma dominante)
   - Perfil C: _____________ (síntoma dominante)
   - Perfil D (multi): _____________ (múltiples síntomas)

5. GARANTÍA:
   - Oferta: _____________
   - Condición: _____________
   - Duración: _____ días
```

**Tiempo:** 30 min si conoces tu nicho, 1.5h si necesitas research

---

### HORA 2-3: Copy básico (Usa los templates)

**Escribe esto (total 300 palabras max):**

1. **Hero headline** (usa patrón 1 ó 2 de TEMPLATES-COPY.md)
   - Copia una estructura, personaliza para tu nicho
   - Prueba: ¿Alguien en tu target lo lee y piensa "sí, eso soy yo"?

2. **Subheadline** (usa patrón 2 de templates)
   - Explica POR QUÉ nada funcionó
   - Máximo 20 palabras

3. **3 puntos de falla** (tabla simple)
   ```
   ✗ Solución A → Falla porque _______
   ✗ Solución B → Falla porque _______
   ✗ Solución C → Falla porque _______
   ```

4. **Los 3 pilares** (1 párrafo por pilar)
   - Qué es el pilar
   - Por qué falla aislado
   - Qué haces tú

5. **Garantía** (1 oración)
   - Usa template de sección 7

6. **CTA** (3 palabras max)
   - "Hacer el test" no "Más información"

**Tiempo:** 30 min escribiendo, 30 min editando

---

### HORA 3-4: Setup técnico mínimo

**Opción A: No-code (Recomendado para empezar)**

1. **Landing:** 
   - Crea cuenta en Webflow (gratis con limitaciones)
   - O usa Carrd.co ($19 one-time, muy fácil)
   - O copia el HTML de DERMA90 y personaliza

2. **Quiz:**
   - Usa Typeform (gratis hasta 100 respuestas)
   - O Jotform
   - O simplemente Google Forms (funciona)

3. **Email:**
   - Crea cuenta SendGrid (gratis 100 emails/día)
   - O Mailchimp

4. **Pagos (si vendes):**
   - Stripe (setup: 15 min)
   - O Gumroad (más fácil si es digital)

**Opción B: Code (Si sabes programar)**

- Usa el HTML/CSS de DERMA90 como base
- Deploy a Vercel (gratis)
- Backend mínimo: Clerk (auth) + Supabase (DB) + Stripe (pagos)

**Tiempo:** 1 hora si eliges no-code, 2h si codeas

---

## Día 2: Landing + Quiz Live (3 horas)

### HORA 1: Crear landing page

**Workflow (usando Carrd, es lo más rápido):**

1. Carrd.co → New Site
2. Sección 1: Hero
   ```
   Heading: [Tu hero headline]
   Subheading: [Tu subheadline]
   Image: cualquier foto relacionada (Unsplash.com)
   Button: "Hacer el test" → Link a tu quiz
   ```

3. Sección 2: "Tres fallas comunes"
   ```
   Card 1: [Solución A]
            Falla: [Razón]
   
   Card 2: [Solución B]
            Falla: [Razón]
   
   Card 3: [Solución C]
            Falla: [Razón]
   ```

4. Sección 3: "Los 3 pilares"
   ```
   Card 1: [Pilar 1]
           Explicación + solución
   
   Card 2: [Pilar 2]
           Explicación + solución
   
   Card 3: [Pilar 3]
           Explicación + solución
   ```

5. Sección 4: "Garantía"
   ```
   Heading: "Sin riesgo"
   Body: [Tu garantía]
   ```

6. Sección 5: CTA final
   ```
   Heading: "[Acción] en [tiempo]"
   Button: "Hacer el test"
   ```

**Tiempo:** 45 min (Carrd es muy intuitivo)

---

### HORA 2: Crear quiz básico

**En Typeform:**

1. Crear formulario nuevo
2. Título: "[Tu nombre] — Quiz Diagnóstico"
3. Añadir 12 preguntas:

```
Q1: ¿Cuáles de estos síntomas tienes? [Múltiple opción]
    ☐ Síntoma A
    ☐ Síntoma B
    ☐ Síntoma C
    ☐ Síntoma D

Q2-Q8: Escala 1-5 para cada síntoma dominante

Q9: ¿Cuánto llevas con esto? [Opción única]
    ○ < 1 año
    ○ 1-2 años
    ○ 2-5 años
    ○ 5+ años

Q10: ¿Qué soluciones ya probaste? [Múltiple]
     ☐ Solución A
     ☐ Solución B
     ☐ Solución C

Q11: ¿Tu email? [Texto corto]

Q12: ¿Estás dispuesto a [COMPROMISOTUYO]? [Sí/No]
```

**Configuración:**
- Logic: Si responde "perfil A" → show logic branch A
- En el final: "Tu perfil es [A], haz clic aquí para ver tu plan"
- Link de salida: a tu resultado page

**Tiempo:** 45 min

---

### HORA 3: Conectar flujo + test

**Setup:**

1. **Landing → Quiz**
   - Botón de landing apunta a URL de quiz

2. **Quiz → Resultado**
   - Crea 1 página de resultado (simple, en Carrd)
   - Por ahora: "Tu perfil es [X]. Aquí está tu plan."
   - Link salida quiz apunta aquí

3. **Test end-to-end**
   - Abre landing en móvil y desktop
   - Completa quiz
   - Verifica email llega

4. **Compartir link de landing**
   - Tu.dominio.com o carrd link temporal
   - Esto es tu "private beta"

**Tiempo:** 30 min

---

## Antes de publicar (Checklist 30 min)

```
CONTENIDO:
[ ] ¿El hero headline valida el pain? (leerlo como cliente)
[ ] ¿El subheadline explica por qué nada funcionó?
[ ] ¿Los 3 pilares tienen sentido? (leerlo como cliente)
[ ] ¿La garantía es clara y repetida?
[ ] ¿El CTA es específico?

TÉCNICO:
[ ] ¿Landing carga en < 2 segundos?
[ ] ¿Quiz funciona en móvil?
[ ] ¿Emails llegan a inbox (no spam)?
[ ] ¿Botones clican?

UX:
[ ] ¿Se ve profesional (o al menos intentado)?
[ ] ¿Tiene imágenes?
[ ] ¿Es fácil entender qué hago?
```

---

## Día 3 (Opcional): Early Validation (1 hora)

### Cómo conseguir primeros 50 leads sin ad spend

**Opción 1: Tu red (30 min)**
- Email a 20-30 conocidos: "Hey, creé algo. ¿Me das 2 min de feedback?"
- Link a landing
- Pide que completen el quiz
- Pide feedback directo

**Opción 2: Comunidades relevantes (30 min)**
- Reddit: encuentra subreddit de tu nicho
- Facebook groups: grupos relevantes
- LinkedIn: posts relevantes con link
- Nota: No hagas hard sell. Pide feedback genuino.

**Opción 3: Paid ($20-50)**
- Facebook ads micro-campaign
- Objetivo: Conversión a quiz (no compra)
- Audience: Lookalike de 1-2 personas en tu red que sean "perfect fit"
- Daily budget: $10
- Duración: 3 días

**Análisis de datos:**
```
Métrica            Target    Alarma
Landing → Quiz     > 40%     < 30%
Quiz → Email       > 60%     < 40%
Email capture      100%      (rastrear fallos)
Time on landing    > 30s     < 15s
Mobile CTR         > 3%      < 1%
```

---

## Próximos pasos (después de validación)

```
SI conversión > 3%:
→ Escala ads, mejora copy, construye lista

SI conversión 1-3%:
→ A/B test headlines, mejorar subheadline, simplificar quiz

SI conversión < 1%:
→ Reconsider nicho O reframe completamente el problema
```

---

## Herramientas usadas (costo total para MVP)

| Herramienta | Función | Costo | Alternativa |
|------------|---------|-------|------------|
| Carrd | Landing | Gratis/€19 | Webflow free |
| Typeform | Quiz | Gratis | Jotform/Google Forms |
| SendGrid | Email | Gratis 100/día | Mailchimp |
| Stripe | Pagos | Gratis (2.9% cuando venda) | Gumroad |
| Unsplash | Imágenes | Gratis | Pexels |
| Vercel | Deploy | Gratis | Railway |
| **TOTAL** | | **€19 one-time** | |

---

## Calendario 48h

```
DAY 1 (Thursday)
├─ 9:00-10:00  Worksheet: Define oferta
├─ 10:00-11:00 Escribe copy básico
├─ 11:00-12:00 Setup técnico
├─ LUNCH
├─ 13:00-14:00 Crea landing en Carrd
├─ 14:00-15:00 Crea quiz en Typeform
├─ 15:00-15:30 Conecta flujo
└─ 15:30-16:00 Checklist & test

DAY 2 (Friday)
├─ 10:00-11:00 Mejora copy basado en feedback
├─ 11:00-12:00 Añade imágenes/diseño
├─ 12:00-13:00 Soft launch (red + 50 personas)
└─ 13:00+      Monitor & iterate

RESULTADO: Landing + quiz live, primeras 20-50 respuestas analizadas
```

---

## Si te atascas (troubleshooting)

**"No sé escribir el copy"**
→ Usa directamente los templates de TEMPLATES-COPY.md
→ Reemplaza solo los [PLACEHOLDERS]
→ 80% de los templatesya funcionan, es 20% tu twist

**"Mi quiz no genera perfiles claros"**
→ Simplifica a 2 preguntas principales
→ Primero valida si el problema existe
→ Después complica la segmentación

**"¿Necesito un producto real?"**
→ Para soft launch: NO
→ Completa el quiz, muestra resultado personalizado
→ Luego defines qué es exactamente lo que vendes

**"¿Necesito fotos profesionales?"**
→ Ahora: NO, usa stock (Unsplash)
→ Cuando escales: Sí, necesitarás reales
→ Primero valida con stock

**"¿Y si nadie clica?"**
→ Problema: headline no valida el pain
→ Solución: Reescribe usando templates patrón 1
→ Test en red primero, feedback directo

---

## Métrica de éxito (48h)

```
ÉXITO MÍNIMO:
- Landing live
- Quiz funcional
- 10-20 respuestas

ÉXITO REAL:
- 50+ respuestas
- > 2% conversión landing → quiz
- > 1 persona lista a comprar (si vendes)
- Feedback consistente (1+ personas dicen "wow, es exactamente mi problema")
```

---

## Después de 48h

```
SI tienes feedback positivo:
→ Avanza a GUÍA DE IMPLEMENTACIÓN (BLUEPRINT-REPLICABLE.md)
→ Fase 1: Product definition completa
→ Fase 2: Mejorar landing + quiz
→ Fase 3: Escalar con ads

SI tienes feedback mixed:
→ Reframing: ¿El problema es real pero el positioning es diferente?
→ Iterate: Prueba otra headline, otro público, otro ángulo

SI tienes feedback negativo:
→ Analiza: ¿El problema no existe? ¿O tu solución no es clara?
→ Pivotea: Otro nicho, otro problema, otra angle
```

---

## Recurso bonus: Análisis competitivo en 30 min

```
Objetivo: Entender qué hace bien tu competencia

Para cada competidor principal:
1. ¿Cuál es su headline? (cópialo)
2. ¿Qué pain valida? (anota)
3. ¿Cuál es su precio? (verifica)
4. ¿Qué garantía ofrecen? (importante)
5. ¿Qué testimonios usan? (analiza patrón)

Resultado: Matriz comparativa simple
- Ellos usan X, yo uso Y
- Ellos prometen A, yo prometo B
- Diferencial claro: ______

Nota: No copies. Analiza para diferenciarte.
```

---

**Versión:** 1.0  
**Tiempo total:** 8 horas (distribuidas en 2-3 días)  
**Próximo paso:** Si validas (>2% conversión), sigue BLUEPRINT-REPLICABLE.md Phase 1

