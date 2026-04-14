const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
        HeadingLevel, AlignmentType, WidthType, BorderStyle, ShadingType,
        LevelFormat, PageBreak } = require('docx');
const fs = require('fs');

const border = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
const borders = { top: border, bottom: border, left: border, right: border };

const doc = new Document({
  styles: {
    default: {
      document: { run: { font: "Arial", size: 22 } }
    },
    paragraphStyles: [
      {
        id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 32, bold: true, font: "Arial", color: "2E75B6" },
        paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 0 }
      },
      {
        id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 28, bold: true, font: "Arial", color: "2E75B6" },
        paragraph: { spacing: { before: 180, after: 100 }, outlineLevel: 1 }
      }
    ]
  },
  numbering: {
    config: [
      {
        reference: "bullets",
        levels: [
          { level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 720, hanging: 360 } } } }
        ]
      },
      {
        reference: "numbers",
        levels: [
          { level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 720, hanging: 360 } } } }
        ]
      }
    ]
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
      }
    },
    children: [
      new Paragraph({ children: [new TextRun("")], spacing: { before: 1200 } }),
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "BLUEPRINT REPLICABLE", bold: true, size: 44, color: "2E75B6" })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 240 },
        children: [new TextRun({ text: "Funnel de Conversión: Lead → Checkout", bold: true, size: 28 })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 600 },
        children: [new TextRun({ text: "Documentación COMPLETA para Replicar tu Proyecto", size: 24, italic: true })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 800 },
        children: [new TextRun({ text: "Basado en IDERMA — Instituto DERMA90", size: 22, italic: true, color: "666666" })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "Suplementación + Coaching + Comunidad + Automatización", size: 20, color: "666666" })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 200 },
        children: [new TextRun({ text: "Abril 2026", size: 20, color: "999999" })]
      }),

      new PageBreak(),

      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("ÍNDICE")] }),
      new Paragraph({ numbering: { reference: "numbers", level: 0 }, children: [new TextRun("Visión General: ¿Qué es IDERMA?")] }),
      new Paragraph({ numbering: { reference: "numbers", level: 0 }, children: [new TextRun("La Fórmula Replicable: 7 Componentes")] }),
      new Paragraph({ numbering: { reference: "numbers", level: 0 }, children: [new TextRun("Arquitectura del Funnel: 8 Pasos")] }),
      new Paragraph({ numbering: { reference: "numbers", level: 0 }, children: [new TextRun("Estructura de Carpetas")] }),
      new Paragraph({ numbering: { reference: "numbers", level: 0 }, children: [new TextRun("Componentes Técnicos")] }),
      new Paragraph({ numbering: { reference: "numbers", level: 0 }, children: [new TextRun("Contenido de Páginas")] }),
      new Paragraph({ numbering: { reference: "numbers", level: 0 }, children: [new TextRun("Sistema de Scoring")] }),
      new Paragraph({ numbering: { reference: "numbers", level: 0 }, children: [new TextRun("Ejemplos Replicables")] }),
      new Paragraph({ numbering: { reference: "numbers", level: 0 }, children: [new TextRun("Checklist de Lanzamiento")] }),
      new Paragraph({ numbering: { reference: "numbers", level: 0 }, children: [new TextRun("Métricas Esperadas")] }),

      new PageBreak(),

      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("1. VISIÓN GENERAL")] }),
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("¿Qué es IDERMA?")] }),
      new Paragraph({ spacing: { after: 240 }, children: [new TextRun("IDERMA es un funnel de conversión completo para vender un suplemento sistémico. El MISMO PRODUCTO (€49) se vende bajo 4 narrativas diferentes según las respuestas de un quiz diagnóstico.")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("El Dolor Validado")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("Piel seca extrema (barrera comprometida)")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("Pérdida de firmeza/elasticidad (colágeno degradado)")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, spacing: { after: 240 }, children: [new TextRun("Fatiga visible, ojorosas (estrés oxidativo)")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("El Producto")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("SŌMA Protocol: 92 ingredientes (suplemento único)")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("Precio: €49 por 12 semanas (90 días)")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, spacing: { after: 240 }, children: [new TextRun("Incluye: Cápsulas + Dashboard + Coaching + Comunidad + Garantía 30 días")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("La Estrategia")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("Quiz con SCORING en 3-4 dimensiones")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("Calcula 1 de 4 perfiles (narrativas psicológicas)")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("Captura email + contexto emocional")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, spacing: { after: 360 }, children: [new TextRun("AI Agent recopila contexto antes del closer")] }),

      new PageBreak(),

      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("2. LA FÓRMULA REPLICABLE")] }),
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("7 Componentes Esenciales")] }),

      new Paragraph({ numbering: { reference: "numbers", level: 0 }, children: [new TextRun({ text: "Validación del Dolor: SISTÉMICO (no cosmético)", bold: true })] }),
      new Paragraph({ spacing: { after: 240 }, children: [new TextRun("Debe afectar la vida diaria y tener componente emocional (círculo vicioso)")] }),

      new Paragraph({ numbering: { reference: "numbers", level: 0 }, children: [new TextRun({ text: "Producto Único con Narrativas Múltiples", bold: true })] }),
      new Paragraph({ spacing: { after: 240 }, children: [new TextRun("1 producto, 4 ángulos de venta = menos costos + más personalización")] }),

      new Paragraph({ numbering: { reference: "numbers", level: 0 }, children: [new TextRun({ text: "Quiz Diagnóstico con Scoring", bold: true })] }),
      new Paragraph({ spacing: { after: 240 }, children: [new TextRun("12-15 preguntas → Scores en 3-4 dimensiones → Perfil calculado")] }),

      new Paragraph({ numbering: { reference: "numbers", level: 0 }, children: [new TextRun({ text: "Lead Capture + Sincronización", bold: true })] }),
      new Paragraph({ spacing: { after: 240 }, children: [new TextRun("Quiz → Google Sheets → GHL → Tags automáticos por perfil")] }),

      new Paragraph({ numbering: { reference: "numbers", level: 0 }, children: [new TextRun({ text: "AI Agent + Contexto Emocional", bold: true })] }),
      new Paragraph({ spacing: { after: 240 }, children: [new TextRun("Chatbot que recopila círculo vicioso")] }),

      new Paragraph({ numbering: { reference: "numbers", level: 0 }, children: [new TextRun({ text: "Closer Manual (Venta Consultiva)", bold: true })] }),
      new Paragraph({ spacing: { after: 240 }, children: [new TextRun("Follow-up 1-1 con contexto completo → Link checkout")] }),

      new Paragraph({ numbering: { reference: "numbers", level: 0 }, children: [new TextRun({ text: "Checkout Minimalista", bold: true })] }),
      new Paragraph({ spacing: { after: 360 }, children: [new TextRun("1 producto, 1 precio, Stripe → Post-compra acceso dashboard")] }),

      new PageBreak(),

      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("3. ARQUITECTURA DEL FUNNEL")] }),
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("8 Pasos")] }),

      new Paragraph({ numbering: { reference: "numbers", level: 0 }, children: [new TextRun("LANDING (index.html): Validación de dolor + CTA \"Hacer el test\"")] }),
      new Paragraph({ numbering: { reference: "numbers", level: 0 }, children: [new TextRun("QUIZ (quiz.html): 12 preguntas → Email capturado → Perfil calculado")] }),
      new Paragraph({ numbering: { reference: "numbers", level: 0 }, children: [new TextRun("RESULTADO (resultado.html): Perfil + PDF descargable + CTA WhatsApp")] }),
      new Paragraph({ numbering: { reference: "numbers", level: 0 }, children: [new TextRun("WHATSAPP: PDF diagnóstico + Audio continuidad")] }),
      new Paragraph({ numbering: { reference: "numbers", level: 0 }, children: [new TextRun("AI AGENT: 5-10 min conversación para contexto emocional")] }),
      new Paragraph({ numbering: { reference: "numbers", level: 0 }, children: [new TextRun("CLOSER: Follow-up 1-1 → Link checkout personalizado")] }),
      new Paragraph({ numbering: { reference: "numbers", level: 0 }, children: [new TextRun("CHECKOUT (checkout.html): Stripe payment, €49")] }),
      new Paragraph({ numbering: { reference: "numbers", level: 0 }, spacing: { after: 360 }, children: [new TextRun("CONFIRMACIÓN (confirmacion.html): Dashboard + Instrucciones")] }),

      new PageBreak(),

      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("4. ESTRUCTURA DE CARPETAS")] }),

      new Paragraph({ spacing: { after: 120 }, children: [new TextRun("TU_PROYECTO/")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("📄 PÁGINAS: index.html, quiz.html, resultado.html, checkout.html, confirmacion.html, dashboard.html, [legal pages]")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("🔧 BACKEND: google-apps-script.js, api/create-payment-intent.js, vercel.json")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("📚 DOCS: README.md, CONFIGURACION.md, TEMPLATES-COPY.md, BRANDBOOK.md, META-ADS-SETUP.md")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("📊 ASSETS: assets/css/, assets/js/, assets/images/")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, spacing: { after: 360 }, children: [new TextRun("🎁 PDFs: PERFIL_1.pdf, PERFIL_2.pdf, PERFIL_3.pdf, PERFIL_4.pdf")] }),

      new PageBreak(),

      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("5. COMPONENTES TÉCNICOS")] }),

      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [2340, 3510, 3510],
        rows: [
          new TableRow({
            children: [
              new TableCell({ borders, shading: { fill: "2E75B6", type: ShadingType.CLEAR }, children: [new Paragraph({ children: [new TextRun({ text: "Herramienta", bold: true, color: "FFFFFF" })] })] }),
              new TableCell({ borders, shading: { fill: "2E75B6", type: ShadingType.CLEAR }, children: [new Paragraph({ children: [new TextRun({ text: "Propósito", bold: true, color: "FFFFFF" })] })] }),
              new TableCell({ borders, shading: { fill: "2E75B6", type: ShadingType.CLEAR }, children: [new Paragraph({ children: [new TextRun({ text: "Descripción", bold: true, color: "FFFFFF" })] })] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ borders, children: [new Paragraph("Google Sheets")] }),
              new TableCell({ borders, children: [new Paragraph("Base de datos")] }),
              new TableCell({ borders, children: [new Paragraph("Almacena leads, respuestas, perfiles")] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ borders, children: [new Paragraph("Apps Script")] }),
              new TableCell({ borders, children: [new Paragraph("Webhook")] }),
              new TableCell({ borders, children: [new Paragraph("Quiz → Sheets + GHL")] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ borders, children: [new Paragraph("GoHighLevel")] }),
              new TableCell({ borders, children: [new Paragraph("CRM")] }),
              new TableCell({ borders, children: [new Paragraph("Tags automáticos por perfil")] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ borders, children: [new Paragraph("Stripe")] }),
              new TableCell({ borders, children: [new Paragraph("Pago")] }),
              new TableCell({ borders, children: [new Paragraph("€49, checkout simple")] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ borders, children: [new Paragraph("WhatsApp API")] }),
              new TableCell({ borders, children: [new Paragraph("Mensajería")] }),
              new TableCell({ borders, children: [new Paragraph("PDF + Audios automáticos")] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ borders, children: [new Paragraph("AI Agent")] }),
              new TableCell({ borders, children: [new Paragraph("Chatbot")] }),
              new TableCell({ borders, children: [new Paragraph("Contexto emocional")] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ borders, children: [new Paragraph("Vercel")] }),
              new TableCell({ borders, children: [new Paragraph("Hosting")] }),
              new TableCell({ borders, children: [new Paragraph("HTML + APIs serverless")] })
            ]
          })
        ]
      }),

      new Paragraph({ spacing: { before: 240, after: 360 }, children: [new TextRun("")] }),

      new PageBreak(),

      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("6. CONTENIDO DE PÁGINAS")] }),
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("index.html — Landing")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("Hero + Validación de dolor")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("Propuesta de valor sistémica")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, spacing: { after: 240 }, children: [new TextRun("CTA: \"Descubre tu perfil\" → quiz.html")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("quiz.html — Diagnóstico")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("Q1-8: Síntomas (escala 1-5)")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("Q9-10: Contexto")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, spacing: { after: 240 }, children: [new TextRun("Q11-12: Email + CTA")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("resultado.html")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("Muestra perfil calculado")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("Botón descargar PDF")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, spacing: { after: 240 }, children: [new TextRun("CTA: \"Cuéntame por WhatsApp\"")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("checkout.html")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("Resumen producto + Stripe.js")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, spacing: { after: 240 }, children: [new TextRun("Redirect post-compra a confirmacion.html")] }),

      new PageBreak(),

      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("7. SISTEMA DE SCORING")] }),
      new Paragraph({ children: [new TextRun("barreraScore = (q1 + q2 + q3) / 15 × 10 = 0-10")] }),
      new Paragraph({ children: [new TextRun("densidadScore = (q4 + q5 + q6) / 15 × 10 = 0-10")] }),
      new Paragraph({ children: [new TextRun("estresScore = (q7 + q8 + q9) / 15 × 10 = 0-10")] }),
      new Paragraph({ spacing: { after: 240 }, children: [new TextRun("")] }),

      new Paragraph({ children: [new TextRun("if (barrera > 6 && densidad < 5 && estres < 5) → BARRERA")] }),
      new Paragraph({ children: [new TextRun("else if (densidad > 6 && ...) → DENSIDAD")] }),
      new Paragraph({ children: [new TextRun("else if (estres > 6 && ...) → ESTRÉS")] }),
      new Paragraph({ spacing: { after: 360 }, children: [new TextRun("else if (2+ scores > 5) → SOMA+")] }),

      new PageBreak(),

      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("8. EJEMPLOS REPLICABLES")] }),
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Ejemplo 1: Dolor Articular (Hombres 50+)")] }),

      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [2340, 3510, 3510],
        rows: [
          new TableRow({
            children: [
              new TableCell({ borders, shading: { fill: "2E75B6", type: ShadingType.CLEAR }, children: [new Paragraph({ children: [new TextRun({ text: "Variable", bold: true, color: "FFFFFF" })] })] }),
              new TableCell({ borders, shading: { fill: "2E75B6", type: ShadingType.CLEAR }, children: [new Paragraph({ children: [new TextRun({ text: "IDERMA", bold: true, color: "FFFFFF" })] })] }),
              new TableCell({ borders, shading: { fill: "2E75B6", type: ShadingType.CLEAR }, children: [new Paragraph({ children: [new TextRun({ text: "Dolor Articular", bold: true, color: "FFFFFF" })] })] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ borders, children: [new Paragraph("Público")] }),
              new TableCell({ borders, children: [new Paragraph("Mujeres 37-50")] }),
              new TableCell({ borders, children: [new Paragraph("Hombres 50+")] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ borders, children: [new Paragraph("Dolor")] }),
              new TableCell({ borders, children: [new Paragraph("Piel seca")] }),
              new TableCell({ borders, children: [new Paragraph("Rodillas, cuello, espalda")] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ borders, children: [new Paragraph("Producto")] }),
              new TableCell({ borders, children: [new Paragraph("€49")] }),
              new TableCell({ borders, children: [new Paragraph("€39")] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ borders, children: [new Paragraph("Perfiles")] }),
              new TableCell({ borders, children: [new Paragraph("BARRERA, DENSIDAD, ESTRÉS, SOMA+")] }),
              new TableCell({ borders, children: [new Paragraph("INFLAMACIÓN, RIGIDEZ, DÉBIL, COMBO")] })
            ]
          })
        ]
      }),

      new Paragraph({ spacing: { before: 240, after: 360 }, children: [new TextRun("")] }),

      new PageBreak(),

      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("9. CHECKLIST DE LANZAMIENTO")] }),

      new Paragraph({ numbering: { reference: "numbers", level: 0 }, children: [new TextRun("☐ Google Sheets + Headers")] }),
      new Paragraph({ numbering: { reference: "numbers", level: 0 }, children: [new TextRun("☐ Google Apps Script desplegado + URL copiada")] }),
      new Paragraph({ numbering: { reference: "numbers", level: 0 }, children: [new TextRun("☐ quiz.html con URL webhook")] }),
      new Paragraph({ numbering: { reference: "numbers", level: 0 }, children: [new TextRun("☐ GHL conectado + API key")] }),
      new Paragraph({ numbering: { reference: "numbers", level: 0 }, children: [new TextRun("☐ Stripe keys")] }),
      new Paragraph({ numbering: { reference: "numbers", level: 0 }, children: [new TextRun("☐ Vercel /api/create-payment-intent")] }),
      new Paragraph({ numbering: { reference: "numbers", level: 0 }, children: [new TextRun("☐ WhatsApp API")] }),
      new Paragraph({ numbering: { reference: "numbers", level: 0 }, children: [new TextRun("☐ PDFs de diagnóstico (4 perfiles)")] }),
      new Paragraph({ numbering: { reference: "numbers", level: 0 }, children: [new TextRun("☐ AI Agent configurado")] }),
      new Paragraph({ numbering: { reference: "numbers", level: 0 }, children: [new TextRun("☐ Meta Pixel ID")] }),
      new Paragraph({ numbering: { reference: "numbers", level: 0 }, children: [new TextRun("☐ Testeadas todas las páginas (mobile + desktop)")] }),
      new Paragraph({ numbering: { reference: "numbers", level: 0 }, children: [new TextRun("☐ Quiz completo → Google Sheets")] }),
      new Paragraph({ numbering: { reference: "numbers", level: 0 }, children: [new TextRun("☐ Resultado muestra perfil correcto")] }),
      new Paragraph({ numbering: { reference: "numbers", level: 0 }, children: [new TextRun("☐ Checkout con test payment")] }),
      new Paragraph({ numbering: { reference: "numbers", level: 0 }, children: [new TextRun("☐ Confirmación envía email")] }),
      new Paragraph({ numbering: { reference: "numbers", level: 0 }, children: [new TextRun("☐ HTTPS en dominio")] }),
      new Paragraph({ numbering: { reference: "numbers", level: 0 }, spacing: { after: 360 }, children: [new TextRun("☐ Vercel deploy final")] }),

      new PageBreak(),

      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("10. MÉTRICAS ESPERADAS")] }),

      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [3120, 3120, 3120],
        rows: [
          new TableRow({
            children: [
              new TableCell({ borders, shading: { fill: "2E75B6", type: ShadingType.CLEAR }, children: [new Paragraph({ children: [new TextRun({ text: "Etapa", bold: true, color: "FFFFFF" })] })] }),
              new TableCell({ borders, shading: { fill: "2E75B6", type: ShadingType.CLEAR }, children: [new Paragraph({ children: [new TextRun({ text: "Métrica", bold: true, color: "FFFFFF" })] })] }),
              new TableCell({ borders, shading: { fill: "2E75B6", type: ShadingType.CLEAR }, children: [new Paragraph({ children: [new TextRun({ text: "Target", bold: true, color: "FFFFFF" })] })] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ borders, children: [new Paragraph("Landing → Quiz")] }),
              new TableCell({ borders, children: [new Paragraph("CTR")] }),
              new TableCell({ borders, children: [new Paragraph("40%+")] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ borders, children: [new Paragraph("Quiz → Email")] }),
              new TableCell({ borders, children: [new Paragraph("Completion")] }),
              new TableCell({ borders, children: [new Paragraph("60%+")] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ borders, children: [new Paragraph("Email → AI")] }),
              new TableCell({ borders, children: [new Paragraph("Engagement")] }),
              new TableCell({ borders, children: [new Paragraph("40%+")] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ borders, children: [new Paragraph("Closer → Checkout")] }),
              new TableCell({ borders, children: [new Paragraph("Follow-up")] }),
              new TableCell({ borders, children: [new Paragraph("20-30%")] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ borders, children: [new Paragraph("Checkout → Compra")] }),
              new TableCell({ borders, children: [new Paragraph("Completion")] }),
              new TableCell({ borders, children: [new Paragraph("70%+")] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ borders, shading: { fill: "FFF2CC", type: ShadingType.CLEAR }, children: [new Paragraph({ children: [new TextRun({ text: "Landing → Compra", bold: true })] })] }),
              new TableCell({ borders, shading: { fill: "FFF2CC", type: ShadingType.CLEAR }, children: [new Paragraph({ children: [new TextRun({ text: "Overall", bold: true })] })] }),
              new TableCell({ borders, shading: { fill: "FFF2CC", type: ShadingType.CLEAR }, children: [new Paragraph({ children: [new TextRun({ text: "0.8-2%", bold: true })] })] })
            ]
          })
        ]
      }),

      new Paragraph({ spacing: { before: 360, after: 120 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: "---", color: "CCCCCC" })] }),
      new Paragraph({ spacing: { after: 360 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: "BLUEPRINT REPLICABLE | Versión 1.0 | Abril 2026", italic: true, color: "999999" })] }),
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("BLUEPRINT_REPLICABLE_COMPLETO.docx", buffer);
  console.log("✓ Documento creado: BLUEPRINT_REPLICABLE_COMPLETO.docx");
});
