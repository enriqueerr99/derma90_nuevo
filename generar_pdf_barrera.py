from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY
from reportlab.pdfgen import canvas
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, Table, TableStyle, Image
from reportlab.lib import colors
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
import os

# Colores de marca
COLOR_TERRACOTA = colors.HexColor("#B85C3C")
COLOR_NEGRO = colors.HexColor("#12100e")
COLOR_BEIGE = colors.HexColor("#faf8f5")
COLOR_DORADO = colors.HexColor("#d4aa60")
COLOR_GRIS = colors.HexColor("#5a5550")

# Crear documento
output_path = "C:\\Users\\Enrique\\OneDrive\\Documentos\\Claude\\Projects\\IDERMA\\perfil-barrera.pdf"
doc = SimpleDocTemplate(output_path, pagesize=letter,
                       topMargin=0.5*inch, bottomMargin=0.5*inch,
                       leftMargin=0.75*inch, rightMargin=0.75*inch)

# Estilos personalizados
styles = getSampleStyleSheet()

style_logo = ParagraphStyle(
    'Logo',
    parent=styles['Normal'],
    fontSize=10,
    textColor=COLOR_TERRACOTA,
    spaceAfter=20,
    alignment=TA_LEFT,
    letterSpacing=2,
    fontName='Helvetica-Bold'
)

style_h1 = ParagraphStyle(
    'CustomH1',
    parent=styles['Heading1'],
    fontSize=36,
    textColor=COLOR_NEGRO,
    spaceAfter=10,
    fontName='Helvetica-Bold',
    leading=40
)

style_subtitle = ParagraphStyle(
    'Subtitle',
    parent=styles['Normal'],
    fontSize=13,
    textColor=COLOR_GRIS,
    spaceAfter=30,
    italic=True,
    fontName='Helvetica'
)

style_h2 = ParagraphStyle(
    'CustomH2',
    parent=styles['Heading2'],
    fontSize=20,
    textColor=COLOR_NEGRO,
    spaceAfter=12,
    spaceBefore=20,
    fontName='Helvetica-Bold'
)

style_h3 = ParagraphStyle(
    'CustomH3',
    parent=styles['Heading3'],
    fontSize=13,
    textColor=COLOR_TERRACOTA,
    spaceAfter=8,
    spaceBefore=12,
    fontName='Helvetica-Bold'
)

style_body = ParagraphStyle(
    'CustomBody',
    parent=styles['Normal'],
    fontSize=11,
    textColor=COLOR_NEGRO,
    spaceAfter=10,
    alignment=TA_JUSTIFY,
    leading=16,
    fontName='Helvetica'
)

style_highlight = ParagraphStyle(
    'Highlight',
    parent=styles['Normal'],
    fontSize=11,
    textColor=COLOR_NEGRO,
    spaceAfter=8,
    fontName='Helvetica',
    leading=14
)

# Construir contenido
story = []

# ============ PÁGINA 1 ============

story.append(Paragraph("IDERMA90 · ANÁLISIS PERSONALIZADO", style_logo))

# Línea separadora
from reportlab.platypus import Spacer
story.append(Spacer(1, 0.15*inch))

story.append(Paragraph("Tu Perfil: BARRERA", style_h1))
story.append(Paragraph("Basado en tus respuestas al test diagnóstico", style_subtitle))

# Validación box
validation_data = [
    [Paragraph("<b>Tu Patrón Detectado</b>", ParagraphStyle('VHead', parent=styles['Normal'], fontSize=10, textColor=COLOR_DORADO, fontName='Helvetica-Bold')),
     Paragraph("<b>Sequedad Extrema</b>", ParagraphStyle('VTitle', parent=styles['Normal'], fontSize=18, textColor=COLOR_NEGRO, fontName='Helvetica-Bold'))],
    [Paragraph("", styles['Normal']),
     Paragraph("Tu piel está en modo \"defensa\" — la barrera lipídica está comprometida y no puede retener agua. Todo lo demás depende de arreglarlo primero.", style_body)]
]

validation_table = Table(validation_data, colWidths=[2*inch, 3.5*inch])
validation_table.setStyle(TableStyle([
    ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
    ('VALIGN', (0, 0), (-1, -1), 'TOP'),
    ('LEFTPADDING', (0, 0), (-1, -1), 15),
    ('RIGHTPADDING', (0, 0), (-1, -1), 15),
    ('TOPPADDING', (0, 0), (-1, -1), 12),
    ('BOTTOMPADDING', (0, 0), (-1, -1), 12),
    ('BORDER', (0, 0), (-1, -1), 2, COLOR_DORADO),
    ('BACKGROUND', (0, 0), (-1, -1), colors.white),
]))
story.append(validation_table)
story.append(Spacer(1, 0.2*inch))

story.append(Paragraph("Quién Eres (Según Tus Respuestas)", style_h2))

content_p1 = """Tienes entre 37-50 años. Probablemente hace 2-4 años que notaste que <b>tu piel cambió de la noche a la mañana</b>. No fue gradual. Fue como si alguien hubiera apagado el grifo de hidratación interno."""

story.append(Paragraph(content_p1, style_body))
story.append(Spacer(1, 0.1*inch))

story.append(Paragraph("Ahora:", style_highlight))

bullets = [
    "Tu cara se siente tirante, especialmente después de ducharte",
    "Las cremas se absorben pero la sequedad vuelve en 2 horas",
    "Tienes pequeñas líneas de deshidratación (no arrugas reales, es agua)",
    "La zona alrededor de ojos y mejillas es donde más lo notas"
]

for bullet in bullets:
    story.append(Paragraph(f"• {bullet}", style_body))

story.append(Spacer(1, 0.15*inch))

p_frustration = """Y lo más frustrante: <b>has gastado cientos en cremas "hidratantes"</b> y nada ha funcionado. Porque el problema no está donde crees."""
story.append(Paragraph(p_frustration, style_body))

story.append(Spacer(1, 0.2*inch))
story.append(Paragraph("¿Qué Está Pasando Realmente?", style_h2))

diagram_text = """<b>ANTES (Perimenopausia temprana)</b><br/>
Estrógeno ✓ → Síntesis de ceramidas ✓ → Barrera lipídica fuerte → La piel retiene agua → Te ves hidratada<br/>
<br/>
<b>HOY (Perimenopausia avanzada)</b><br/>
Estrógeno ↓ → Síntesis de ceramidas ↓ → Barrera lipídica comprometida → La piel PIERDE agua → Sequedad extrema"""

diagram_style = ParagraphStyle('Diagram', parent=styles['Normal'], fontSize=10, textColor=COLOR_NEGRO,
                               family='Courier', alignment=TA_LEFT, leading=13)
story.append(Paragraph(diagram_text, diagram_style))

story.append(PageBreak())

# ============ PÁGINA 2 ============

story.append(Paragraph("IDERMA90 · ANÁLISIS PERSONALIZADO", style_logo))
story.append(Spacer(1, 0.15*inch))

story.append(Paragraph("Por Qué Nada Ha Funcionado", style_h2))
story.append(Spacer(1, 0.1*inch))

# Boxes de fallidas
fallidas = [
    ("❌ Cremas \"Ultra Hidratantes\"",
     "Ácido hialurónico, glicerina, agua... todo se evapora en 2 horas porque tu barrera está rota. La crema no es el problema. Es que la barrera no puede mantener nada adentro."),
    ("❌ Suplementos genéricos de colágeno",
     "El colágeno es para firmeza. Tu problema es sequedad. Además, colágeno sin los cofactores necesarios tu cuerpo no puede ni procesarlo."),
    ("❌ Cambiar de crema cada mes",
     "Más dinero en tratamientos tópicos sin arreglar la raíz: reconstruir la barrera desde adentro. Tu piel necesita nutrición sistémica.")
]

for title, desc in fallidas:
    fallida_data = [[Paragraph(title, ParagraphStyle('FTitle', parent=styles['Normal'], fontSize=11, textColor=COLOR_TERRACOTA, fontName='Helvetica-Bold')),
                     Paragraph(desc, ParagraphStyle('FDesc', parent=styles['Normal'], fontSize=10, textColor=COLOR_GRIS, leading=12))]]
    fallida_table = Table(fallida_data, colWidths=[5.5*inch])
    fallida_table.setStyle(TableStyle([
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('LEFTPADDING', (0, 0), (-1, -1), 12),
        ('RIGHTPADDING', (0, 0), (-1, -1), 12),
        ('TOPPADDING', (0, 0), (-1, -1), 10),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 10),
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor("#f4e8e2")),
        ('BORDER', (0, 0), (-1, -1), 1, colors.HexColor("#f4e8e2")),
        ('LEFTBORDER', (0, 0), (0, 0), 4, COLOR_TERRACOTA),
    ]))
    story.append(fallida_table)
    story.append(Spacer(1, 0.1*inch))

story.append(Spacer(1, 0.2*inch))
story.append(Paragraph("La Raíz del Problema (Los 2 Pilares)", style_h2))
story.append(Paragraph("Para ti, la solución no son 3 pilares — <b>son 2, enfocados en reconstruir tu barrera</b>:", style_body))
story.append(Spacer(1, 0.15*inch))

# PILAR 1
story.append(Paragraph("PILAR 1: Reconstrucción de Barrera Lipídica", style_h3))

pilar_data = [
    [Paragraph("<b>El Problema:</b><br/>Perimenopausia → caída de estrógeno → síntesis de ceramidas ↓ → barrera rota",
               ParagraphStyle('P', parent=styles['Normal'], fontSize=10, leading=12))]
]
pilar_table = Table(pilar_data, colWidths=[5.5*inch])
pilar_table.setStyle(TableStyle([
    ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor("#faf8f5")),
    ('LEFTPADDING', (0, 0), (-1, -1), 12),
    ('RIGHTPADDING', (0, 0), (-1, -1), 12),
    ('TOPPADDING', (0, 0), (-1, -1), 10),
    ('BOTTOMPADDING', (0, 0), (-1, -1), 10),
    ('BORDER', (0, 0), (-1, -1), 1, colors.HexColor("#e8e0d4")),
    ('LEFTBORDER', (0, 0), (0, 0), 4, COLOR_TERRACOTA),
]))
story.append(pilar_table)
story.append(Spacer(1, 0.1*inch))

story.append(Paragraph("<b>Ingredientes clave que reconstruyen la barrera:</b>", style_highlight))

ingredients_p1 = [
    ("Vitamina A (2700μg, 337,5% VRN)",
     "Estimula la síntesis de ceramidas en la epidermis. Es el factor limitante para reconstruir barrera."),
    ("MSM - Metilsulfonilmetano (54mg)",
     "Azufre biodisponible. Necesario para la estructura de la barrera lipídica y colágeno. Sin MSM, la barrera no se regenera."),
    ("Vitamina E 50% (80,532mg, 225% VRN)",
     "Antioxidante intramembrana. Protege los lípidos de la barrera de la oxidación.")
]

for ing_name, ing_desc in ingredients_p1:
    ing_data = [[Paragraph(f"<b>→ {ing_name}</b>", ParagraphStyle('IngName', parent=styles['Normal'], fontSize=10, textColor=COLOR_TERRACOTA, fontName='Helvetica-Bold')),
                 Paragraph(ing_desc, ParagraphStyle('IngDesc', parent=styles['Normal'], fontSize=9, textColor=COLOR_GRIS, leading=11))]]
    ing_table = Table(ing_data, colWidths=[5.5*inch])
    ing_table.setStyle(TableStyle([
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('LEFTPADDING', (0, 0), (-1, -1), 10),
        ('RIGHTPADDING', (0, 0), (-1, -1), 10),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
        ('BACKGROUND', (0, 0), (-1, -1), colors.white),
        ('BORDER', (0, 0), (-1, -1), 1, colors.HexColor("#e8e0d4")),
    ]))
    story.append(ing_table)

story.append(PageBreak())

# ============ PÁGINA 3 ============

story.append(Paragraph("IDERMA90 · ANÁLISIS PERSONALIZADO", style_logo))
story.append(Spacer(1, 0.15*inch))

# PILAR 2
story.append(Paragraph("PILAR 2: Protección Antioxidante (Anti-Inflamación)", style_h3))

pilar2_data = [
    [Paragraph("<b>El Problema:</b><br/>Sequedad extrema + estrés oxidativo elevado = inflamación subcrónica en la dermis",
               ParagraphStyle('P', parent=styles['Normal'], fontSize=10, leading=12))]
]
pilar2_table = Table(pilar2_data, colWidths=[5.5*inch])
pilar2_table.setStyle(TableStyle([
    ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor("#faf8f5")),
    ('LEFTPADDING', (0, 0), (-1, -1), 12),
    ('RIGHTPADDING', (0, 0), (-1, -1), 12),
    ('TOPPADDING', (0, 0), (-1, -1), 10),
    ('BOTTOMPADDING', (0, 0), (-1, -1), 10),
    ('BORDER', (0, 0), (-1, -1), 1, colors.HexColor("#e8e0d4")),
    ('LEFTBORDER', (0, 0), (0, 0), 4, COLOR_TERRACOTA),
]))
story.append(pilar2_table)
story.append(Spacer(1, 0.1*inch))

story.append(Paragraph("<b>Antioxidantes específicos que cierran la inflamación:</b>", style_highlight))

ingredients_p2 = [
    ("Cúrcuma 95% curcuminoides (54mg)",
     "Bloquea NF-κB (la cascada inflamatoria de perimenopausia). Es el antiinflamatorio más potente para barrera comprometida."),
    ("Té Verde 40% L-Teanina (13,2mg)",
     "Polifenoles + L-Teanina. Protección antioxidante + relajación nerviosa."),
    ("Licopeno (1,5mg)",
     "Protección solar interna y antioxidante liposoluble.")
]

for ing_name, ing_desc in ingredients_p2:
    ing_data = [[Paragraph(f"<b>→ {ing_name}</b>", ParagraphStyle('IngName', parent=styles['Normal'], fontSize=10, textColor=COLOR_TERRACOTA, fontName='Helvetica-Bold')),
                 Paragraph(ing_desc, ParagraphStyle('IngDesc', parent=styles['Normal'], fontSize=9, textColor=COLOR_GRIS, leading=11))]]
    ing_table = Table(ing_data, colWidths=[5.5*inch])
    ing_table.setStyle(TableStyle([
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('LEFTPADDING', (0, 0), (-1, -1), 10),
        ('RIGHTPADDING', (0, 0), (-1, -1), 10),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
        ('BACKGROUND', (0, 0), (-1, -1), colors.white),
        ('BORDER', (0, 0), (-1, -1), 1, colors.HexColor("#e8e0d4")),
    ]))
    story.append(ing_table)

story.append(Spacer(1, 0.2*inch))

story.append(Paragraph("Tu Timeline Realista (12 Semanas)", style_h2))

timeline_data = [
    [Paragraph("<b>Semanas 1-2</b>", ParagraphStyle('T', parent=styles['Normal'], fontSize=10, textColor=COLOR_TERRACOTA, fontName='Helvetica-Bold', width=1*inch)),
     Paragraph("<b>Adaptación.</b> Tu cuerpo está recibiendo nutrientes que no tenía. Seguirás igual en piel, pero te sentirás más hidratada internamente.", style_body)],
    [Paragraph("<b>Semanas 3-4</b>", ParagraphStyle('T', parent=styles['Normal'], fontSize=10, textColor=COLOR_TERRACOTA, fontName='Helvetica-Bold')),
     Paragraph("<b>Primeros cambios.</b> La tez empieza a verse más viva. Menos tirante justo después de ducharte.", style_body)],
    [Paragraph("<b>Semanas 5-6</b>", ParagraphStyle('T', parent=styles['Normal'], fontSize=10, textColor=COLOR_TERRACOTA, fontName='Helvetica-Bold')),
     Paragraph("<b>Cambio visible.</b> La piel empieza a retener hidratación. <i>Aquí das cuenta de que está funcionando.</i>", style_body)],
    [Paragraph("<b>Semanas 7-8</b>", ParagraphStyle('T', parent=styles['Normal'], fontSize=10, textColor=COLOR_TERRACOTA, fontName='Helvetica-Bold')),
     Paragraph("<b>Punto de no retorno.</b> La barrera está 60-70% reconstruida. Ya no necesitas rescates constantemente.", style_body)],
    [Paragraph("<b>Semanas 9-12</b>", ParagraphStyle('T', parent=styles['Normal'], fontSize=10, textColor=COLOR_TERRACOTA, fontName='Helvetica-Bold')),
     Paragraph("<b>Transformación completa.</b> Piel hidratada, elástica, sin tirantez. Otras personas notan el cambio.", style_body)]
]

timeline_table = Table(timeline_data, colWidths=[1.2*inch, 4.3*inch])
timeline_table.setStyle(TableStyle([
    ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
    ('VALIGN', (0, 0), (-1, -1), 'TOP'),
    ('LEFTPADDING', (0, 0), (-1, -1), 10),
    ('RIGHTPADDING', (0, 0), (-1, -1), 10),
    ('TOPPADDING', (0, 0), (-1, -1), 8),
    ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
    ('BACKGROUND', (0, 0), (-1, -1), colors.white),
    ('ROWBACKGROUNDS', (0, 0), (-1, -1), [colors.white, colors.HexColor("#faf8f5")]),
    ('BORDER', (0, 0), (-1, -1), 1, colors.HexColor("#e8e0d4")),
]))
story.append(timeline_table)

story.append(Spacer(1, 0.2*inch))

# Lo más importante
highlight_box = [[Paragraph(
    "<b>Tu barrera no se reconstruye en 2 semanas.</b> Necesita consistencia. Por eso el protocolo es de 12 semanas — es el tiempo real que tu piel necesita para regenerar ceramidas. Pero en la semana 5-6 ya verás diferencia.",
    ParagraphStyle('HBox', parent=styles['Normal'], fontSize=11, textColor=COLOR_NEGRO, leading=14, fontName='Helvetica')
)]]
highlight_table = Table(highlight_box, colWidths=[5.5*inch])
highlight_table.setStyle(TableStyle([
    ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor("#f4e8e2")),
    ('LEFTPADDING', (0, 0), (-1, -1), 15),
    ('RIGHTPADDING', (0, 0), (-1, -1), 15),
    ('TOPPADDING', (0, 0), (-1, -1), 12),
    ('BOTTOMPADDING', (0, 0), (-1, -1), 12),
    ('BORDER', (0, 0), (-1, -1), 4, COLOR_TERRACOTA),
]))
story.append(highlight_table)

story.append(PageBreak())

# ============ PÁGINA 4 ============

story.append(Paragraph("IDERMA90 · ANÁLISIS PERSONALIZADO", style_logo))
story.append(Spacer(1, 0.15*inch))

story.append(Paragraph("Las Preguntas que Probablemente Tengas", style_h2))
story.append(Spacer(1, 0.1*inch))

faqs = [
    ("❓ ¿Una pastilla arregla realmente sequedad de 3 años?",
     "Sí, pero no es \"una pastilla\". Es un sistema de 37 ingredientes coordinados que abordan los 2 problemas bioquímicos: reconstrucción de barrera + protección antioxidante. Las cremas atacaban síntomas. Esto ataca raíces."),
    ("❓ ¿Qué pasa si después de 12 semanas paro el protocolo?",
     "Tu barrera se mantiene. Los 12 semanas entrenan a tu cuerpo a sintetizar ceramidas de nuevo. Después, con buenos hábitos, se mantiene estable. Algunos siguen 1 cápsula cada 2 días como mantenimiento."),
    ("❓ ¿Hay evidencia de que funciona?",
     "Sí. Los ingredientes clave (Vitamina A, Vitamina E, Cúrcuma) tienen estudios clínicos que lo respaldan. Pero lo más importante: está documentado en testimonios de mujeres con tu patrón exacto.")
]

for q, a in faqs:
    q_data = [[Paragraph(q, ParagraphStyle('Q', parent=styles['Normal'], fontSize=11, textColor=COLOR_NEGRO, fontName='Helvetica-Bold', leading=13))]]
    q_table = Table(q_data, colWidths=[5.5*inch])
    q_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.white),
        ('LEFTPADDING', (0, 0), (-1, -1), 12),
        ('RIGHTPADDING', (0, 0), (-1, -1), 12),
        ('TOPPADDING', (0, 0), (-1, -1), 10),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
        ('BORDER', (0, 0), (-1, -1), 1, colors.HexColor("#e8e0d4")),
    ]))
    story.append(q_table)

    a_data = [[Paragraph(a, ParagraphStyle('A', parent=styles['Normal'], fontSize=10, textColor=COLOR_GRIS, leading=13, leftIndent=15, borderColor=COLOR_DORADO))]]
    a_table = Table(a_data, colWidths=[5.5*inch])
    a_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.white),
        ('LEFTPADDING', (0, 0), (-1, -1), 12),
        ('RIGHTPADDING', (0, 0), (-1, -1), 12),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 10),
        ('BORDER', (0, 0), (-1, -1), 1, colors.HexColor("#e8e0d4")),
        ('LEFTBORDER', (0, 0), (0, 0), 3, COLOR_DORADO),
    ]))
    story.append(a_table)
    story.append(Spacer(1, 0.08*inch))

story.append(Spacer(1, 0.2*inch))

story.append(Paragraph("Los Mensajes Clave", style_h2))

messages = [
    '"No es que tu piel es mala. Es que necesita los cofactores correctos para regenerarse."',
    '"Una crema hidratante en una barrera rota es como verter agua en un vaso roto."',
    '"La semana 7-8 es cuando realmente ves que funciona. Hasta entonces, solo confía en que el sistema está trabajando."'
]

for msg in messages:
    msg_data = [[Paragraph(msg, ParagraphStyle('Msg', parent=styles['Normal'], fontSize=12, textColor=COLOR_TERRACOTA, italic=True, leading=14, fontName='Helvetica-Oblique'))]]
    msg_table = Table(msg_data, colWidths=[5.5*inch])
    msg_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor("#faf8f5")),
        ('LEFTPADDING', (0, 0), (-1, -1), 15),
        ('RIGHTPADDING', (0, 0), (-1, -1), 15),
        ('TOPPADDING', (0, 0), (-1, -1), 12),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 12),
        ('BORDER', (0, 0), (-1, -1), 0),
    ]))
    story.append(msg_table)
    story.append(Spacer(1, 0.08*inch))

story.append(PageBreak())

# ============ PÁGINA 5 ============

story.append(Paragraph("IDERMA90 · ANÁLISIS PERSONALIZADO", style_logo))
story.append(Spacer(1, 0.15*inch))

story.append(Paragraph("¿Y Ahora Qué?", style_h2))

closing_text = """He preparado este análisis porque <b>reconozco exactamente tu patrón y sé que hay una solución</b> que funciona para mujeres como tú.<br/><br/>
Lo que acabas de leer es el <b>diagnóstico</b>. Pero hay mucho más que explicar:"""

story.append(Paragraph(closing_text, style_body))
story.append(Spacer(1, 0.1*inch))

next_steps = [
    "Cómo el protocolo se adapta a tus hábitos diarios",
    "Por qué algunos ingredientes interactúan para potenciarse",
    "La diferencia entre este y otros \"protocolos\" que probaste",
    "Cómo es el acompañamiento durante las 12 semanas",
    "Todas las preguntas que tienes en la cabeza"
]

for step in next_steps:
    story.append(Paragraph(f"• {step}", style_body))

story.append(Spacer(1, 0.2*inch))

final_text = """<b>Si quieres que profundice en cómo podemos ayudarte específicamente con tu caso</b> — incluyendo cómo funciona el protocolo, inversión, plazas disponibles, y resolver cualquier duda — <b>solo dímelo.</b><br/><br/>Estoy aquí para eso. No hay presión, solo claridad."""

story.append(Paragraph(final_text, style_body))

story.append(Spacer(1, 0.3*inch))

# Firma
signature = """<b>Dra. Laura García</b><br/>Ginecóloga especializada en salud perimenopáusica<br/>IDERMA90 · Instituto de Salud Femenina"""
signature_style = ParagraphStyle('Sig', parent=styles['Normal'], fontSize=10, textColor=COLOR_GRIS, leading=13, fontName='Helvetica')
story.append(Paragraph(signature, signature_style))

story.append(Spacer(1, 0.3*inch))

# Footer
footer = """Este análisis es personalizado basado en tus respuestas al test diagnóstico.<br/>No sustituye consulta médica profesional."""
footer_style = ParagraphStyle('Footer', parent=styles['Normal'], fontSize=8, textColor=colors.HexColor("#999999"), italic=True, alignment=TA_CENTER, leading=11)
story.append(Paragraph(footer, footer_style))

# Construir PDF
doc.build(story)
print(f"✅ PDF creado: {output_path}")
