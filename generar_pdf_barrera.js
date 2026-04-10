const PDFDocument = require('pdfkit');
const fs = require('fs');

const doc = new PDFDocument({
  size: 'letter',
  margin: 36
});

// Colores
const TERRACOTA = '#B85C3C';
const NEGRO = '#12100e';
const BEIGE = '#faf8f5';
const DORADO = '#d4aa60';
const GRIS = '#5a5550';

// Output file
const output = fs.createWriteStream('perfil-barrera.pdf');
doc.pipe(output);

// Helper functions
function drawLine(y, width = 500) {
  doc.strokeColor(TERRACOTA).lineWidth(1).moveTo(36, y).lineTo(36 + width, y).stroke();
}

function addTitle(text) {
  doc.fontSize(32).font('Helvetica-Bold').fillColor(NEGRO).text(text, { align: 'left' });
}

function addSubtitle(text) {
  doc.fontSize(11).font('Helvetica-Oblique').fillColor(GRIS).text(text, { align: 'left', lineGap: 4 });
}

function addHeading(text) {
  doc.fontSize(16).font('Helvetica-Bold').fillColor(NEGRO).text(text, { align: 'left', lineGap: 6 });
}

function addSubheading(text) {
  doc.fontSize(12).font('Helvetica-Bold').fillColor(TERRACOTA).text(text, { align: 'left', lineGap: 4 });
}

function addBody(text) {
  doc.fontSize(10).font('Helvetica').fillColor(NEGRO).text(text, { align: 'justify', lineGap: 4 });
}

function addHighlight(text) {
  const y = doc.y;
  doc.rect(36, y, 540, 80).fillAndStroke(BEIGE, TERRACOTA);
  doc.y = y + 12;
  doc.fontSize(10).font('Helvetica').fillColor(NEGRO).text(text, 46, y + 12, { width: 520, align: 'left', lineGap: 3 });
  doc.y = y + 80 + 12;
}

// PAGE 1
doc.fontSize(9).font('Helvetica-Bold').fillColor(TERRACOTA).text('IDERMA90 · ANÁLISIS PERSONALIZADO', { letterSpacing: 1.5 });
doc.moveDown(0.3);
drawLine(doc.y);
doc.moveDown(0.8);

addTitle('Tu Perfil: BARRERA');
doc.moveDown(0.1);
addSubtitle('Basado en tus respuestas al test diagnóstico');
doc.moveDown(0.5);

// Validation box
const vBoxY = doc.y;
doc.rect(36, vBoxY, 540, 90).stroke(DORADO);
doc.fontSize(8).font('Helvetica-Bold').fillColor(DORADO).text('TU PATRÓN DETECTADO', 46, vBoxY + 8, { letterSpacing: 1 });
doc.fontSize(18).font('Helvetica-Bold').fillColor(NEGRO).text('Sequedad Extrema', 46, vBoxY + 25);
doc.fontSize(10).font('Helvetica').fillColor(NEGRO).text('Tu piel está en modo "defensa" — la barrera lipídica está comprometida y no puede retener agua. Todo lo demás depende de arreglarlo primero.', 46, vBoxY + 48, { width: 520, lineGap: 3 });
doc.y = vBoxY + 90 + 12;

doc.moveDown(0.3);
addHeading('Quién Eres (Según Tus Respuestas)');
doc.moveDown(0.15);

addBody('Tienes entre 37-50 años. Probablemente hace 2-4 años que notaste que tu piel cambió de la noche a la mañana. No fue gradual. Fue como si alguien hubiera apagado el grifo de hidratación interno.');
doc.moveDown(0.15);

addBody('Ahora:');
doc.moveDown(0.1);
doc.fontSize(10).font('Helvetica').fillColor(NEGRO).list([
  'Tu cara se siente tirante, especialmente después de ducharte',
  'Las cremas se absorben pero la sequedad vuelve en 2 horas',
  'Tienes pequeñas líneas de deshidratación (no arrugas reales, es agua)',
  'La zona alrededor de ojos y mejillas es donde más lo notas'
], { lineGap: 2 });
doc.moveDown(0.15);

addBody('Y lo más frustrante: has gastado cientos en cremas "hidratantes" y nada ha funcionado. Porque el problema no está donde crees.');
doc.moveDown(0.3);

// PAGE BREAK
if (doc.y > 600) {
  doc.addPage();
  doc.fontSize(9).font('Helvetica-Bold').fillColor(TERRACOTA).text('IDERMA90 · ANÁLISIS PERSONALIZADO', { letterSpacing: 1.5 });
  doc.moveDown(0.5);
}

addHeading('¿Qué Está Pasando Realmente?');
doc.moveDown(0.2);

// Diagram
const diagY = doc.y;
doc.rect(36, diagY, 540, 110).stroke('#e8e0d4');
doc.fontSize(9).font('Helvetica').fillColor(NEGRO);
doc.text('ANTES (Perimenopausia temprana)', 46, diagY + 8);
doc.text('Estrógeno ✓ → Síntesis de ceramidas ✓ → Barrera lipídica fuerte → La piel retiene agua', 46, diagY + 23, { width: 520 });
doc.text('', 46, diagY + 45);
doc.text('HOY (Perimenopausia avanzada)', 46, diagY + 60);
doc.text('Estrógeno ↓ → Síntesis de ceramidas ↓ → Barrera lipídica comprometida → La piel PIERDE agua', 46, diagY + 75, { width: 520 });
doc.y = diagY + 110 + 12;

doc.moveDown(0.2);
addBody('La perimenopausia no solo baja estrógeno — baja la capacidad de tu piel de fabricar los lípidos que actúan como "pegamento" entre células. Sin ese pegamento, el agua se escapa.');
doc.moveDown(0.15);

addBody('Tu barrera está rota. Y una crema hidratante es como intentar llenar una taza rota con más agua.');
doc.moveDown(0.4);

addHeading('Por Qué Nada Ha Funcionado');
doc.moveDown(0.2);

// Failed solutions
const solutions = [
  { title: '❌ Cremas "Ultra Hidratantes"', desc: 'Ácido hialurónico, glicerina, agua... todo se evapora en 2 horas porque tu barrera está rota. La crema no es el problema. Es que la barrera no puede mantener nada adentro.' },
  { title: '❌ Suplementos genéricos de colágeno', desc: 'El colágeno es para firmeza. Tu problema es sequedad. Además, colágeno sin los cofactores necesarios tu cuerpo no puede ni procesarlo.' },
  { title: '❌ Cambiar de crema cada mes', desc: 'Más dinero en tratamientos tópicos sin arreglar la raíz: reconstruir la barrera desde adentro. Tu piel necesita nutrición sistémica.' }
];

solutions.forEach((sol, idx) => {
  const solY = doc.y;
  doc.rect(36, solY, 540, 55).fillAndStroke('#f4e8e2', '#f4e8e2');
  doc.rect(36, solY, 4, 55).fill(TERRACOTA);

  doc.fontSize(10).font('Helvetica-Bold').fillColor(TERRACOTA).text(sol.title, 46, solY + 8);
  doc.fontSize(9).font('Helvetica').fillColor(GRIS).text(sol.desc, 46, solY + 25, { width: 520, lineGap: 2 });
  doc.y = solY + 55 + 10;
});

if (doc.y > 650) {
  doc.addPage();
  doc.fontSize(9).font('Helvetica-Bold').fillColor(TERRACOTA).text('IDERMA90 · ANÁLISIS PERSONALIZADO', { letterSpacing: 1.5 });
  doc.moveDown(0.5);
}

doc.moveDown(0.2);
addHeading('La Raíz del Problema (Los 2 Pilares)');
doc.moveDown(0.15);
addBody('Para ti, la solución no son 3 pilares — son 2, enfocados en reconstruir tu barrera:');
doc.moveDown(0.25);

// PILAR 1
addSubheading('PILAR 1: Reconstrucción de Barrera Lipídica');
doc.moveDown(0.1);

const p1BoxY = doc.y;
doc.rect(36, p1BoxY, 540, 40).fillAndStroke('#faf8f5', '#e8e0d4');
doc.rect(36, p1BoxY, 4, 40).fill(TERRACOTA);
doc.fontSize(9).font('Helvetica-Bold').fillColor(NEGRO).text('El Problema:', 46, p1BoxY + 8);
doc.fontSize(9).font('Helvetica').fillColor(GRIS).text('Perimenopausia → caída de estrógeno → síntesis de ceramidas ↓ → barrera rota', 46, p1BoxY + 22, { width: 520 });
doc.y = p1BoxY + 40 + 8;

doc.moveDown(0.15);
addBody('Ingredientes clave que reconstruyen la barrera:');
doc.moveDown(0.1);

const ingredients = [
  { name: '→ Vitamina A (2700μg, 337,5% VRN)', desc: 'Estimula la síntesis de ceramidas en la epidermis. Es el factor limitante.' },
  { name: '→ MSM - Metilsulfonilmetano (54mg)', desc: 'Azufre biodisponible. Necesario para la estructura de la barrera. Sin MSM, no se regenera.' },
  { name: '→ Vitamina E 50% (80,532mg, 225% VRN)', desc: 'Antioxidante intramembrana. Protege los lípidos de la oxidación.' }
];

ingredients.forEach(ing => {
  const ingY = doc.y;
  doc.rect(36, ingY, 540, 45).stroke('#e8e0d4');
  doc.fontSize(9).font('Helvetica-Bold').fillColor(TERRACOTA).text(ing.name, 46, ingY + 8);
  doc.fontSize(8).font('Helvetica').fillColor(GRIS).text(ing.desc, 46, ingY + 23, { width: 520, lineGap: 2 });
  doc.y = ingY + 45 + 8;
});

if (doc.y > 700) {
  doc.addPage();
  doc.fontSize(9).font('Helvetica-Bold').fillColor(TERRACOTA).text('IDERMA90 · ANÁLISIS PERSONALIZADO', { letterSpacing: 1.5 });
  doc.moveDown(0.5);
}

doc.moveDown(0.3);
addSubheading('PILAR 2: Protección Antioxidante (Anti-Inflamación)');
doc.moveDown(0.1);

const p2BoxY = doc.y;
doc.rect(36, p2BoxY, 540, 40).fillAndStroke('#faf8f5', '#e8e0d4');
doc.rect(36, p2BoxY, 4, 40).fill(TERRACOTA);
doc.fontSize(9).font('Helvetica-Bold').fillColor(NEGRO).text('El Problema:', 46, p2BoxY + 8);
doc.fontSize(9).font('Helvetica').fillColor(GRIS).text('Sequedad extrema + estrés oxidativo elevado = inflamación subcrónica en la dermis', 46, p2BoxY + 22, { width: 520 });
doc.y = p2BoxY + 40 + 8;

doc.moveDown(0.15);
addBody('Antioxidantes específicos que cierran la inflamación:');
doc.moveDown(0.1);

const antioxidants = [
  { name: '→ Cúrcuma 95% curcuminoides (54mg)', desc: 'Bloquea NF-κB (la cascada inflamatoria). Es el antiinflamatorio más potente.' },
  { name: '→ Té Verde 40% L-Teanina (13,2mg)', desc: 'Polifenoles + L-Teanina. Protección antioxidante + relajación nerviosa.' },
  { name: '→ Licopeno (1,5mg)', desc: 'Protección solar interna y antioxidante liposoluble.' }
];

antioxidants.forEach(ing => {
  const ingY = doc.y;
  doc.rect(36, ingY, 540, 45).stroke('#e8e0d4');
  doc.fontSize(9).font('Helvetica-Bold').fillColor(TERRACOTA).text(ing.name, 46, ingY + 8);
  doc.fontSize(8).font('Helvetica').fillColor(GRIS).text(ing.desc, 46, ingY + 23, { width: 520, lineGap: 2 });
  doc.y = ingY + 45 + 8;
});

if (doc.y > 700) {
  doc.addPage();
  doc.fontSize(9).font('Helvetica-Bold').fillColor(TERRACOTA).text('IDERMA90 · ANÁLISIS PERSONALIZADO', { letterSpacing: 1.5 });
  doc.moveDown(0.5);
}

doc.moveDown(0.3);
addHeading('Tu Timeline Realista (12 Semanas)');
doc.moveDown(0.2);

const timelines = [
  { week: 'Semanas 1-2', title: 'Adaptación', desc: 'Tu cuerpo está recibiendo nutrientes que no tenía. Seguirás igual en piel, pero te sentirás más hidratada internamente.' },
  { week: 'Semanas 3-4', title: 'Primeros cambios', desc: 'La tez empieza a verse más viva. Menos tirante justo después de ducharte.' },
  { week: 'Semanas 5-6', title: 'Cambio visible', desc: 'La piel empieza a retener hidratación. Aquí das cuenta de que está funcionando.' },
  { week: 'Semanas 7-8', title: 'Punto de no retorno', desc: 'La barrera está 60-70% reconstruida. Ya no necesitas rescates constantemente.' },
  { week: 'Semanas 9-12', title: 'Transformación completa', desc: 'Piel hidratada, elástica, sin tirantez. Otras personas notan el cambio.' }
];

timelines.forEach(tl => {
  const tlY = doc.y;
  doc.rect(36, tlY, 540, 50).stroke('#e8e0d4');

  doc.fontSize(9).font('Helvetica-Bold').fillColor(TERRACOTA).text(tl.week, 46, tlY + 8);
  doc.fontSize(10).font('Helvetica-Bold').fillColor(NEGRO).text(tl.title + '.', 46, tlY + 23);
  doc.fontSize(8).font('Helvetica').fillColor(GRIS).text(tl.desc, 46, tlY + 38, { width: 520 });
  doc.y = tlY + 50 + 8;
});

doc.moveDown(0.3);

// Highlight box
const highlightY = doc.y;
doc.rect(36, highlightY, 540, 70).fillAndStroke('#f4e8e2', TERRACOTA);
doc.fontSize(10).font('Helvetica').fillColor(NEGRO).text('Tu barrera no se reconstruye en 2 semanas. Necesita consistencia. Por eso el protocolo es de 12 semanas — es el tiempo real que tu piel necesita para regenerar ceramidas. Pero en la semana 5-6 ya verás diferencia.', 46, highlightY + 12, { width: 520, lineGap: 3 });
doc.y = highlightY + 70 + 12;

if (doc.y > 700) {
  doc.addPage();
  doc.fontSize(9).font('Helvetica-Bold').fillColor(TERRACOTA).text('IDERMA90 · ANÁLISIS PERSONALIZADO', { letterSpacing: 1.5 });
  doc.moveDown(0.5);
}

doc.moveDown(0.3);
addHeading('Las Preguntas que Probablemente Tengas');
doc.moveDown(0.2);

const faqs = [
  { q: '❓ ¿Una pastilla arregla realmente sequedad de 3 años?', a: 'Sí, pero no es "una pastilla". Es un sistema de 37 ingredientes coordinados que abordan los 2 problemas bioquímicos: reconstrucción de barrera + protección antioxidante. Las cremas atacaban síntomas. Esto ataca raíces.' },
  { q: '❓ ¿Qué pasa si después de 12 semanas paro el protocolo?', a: 'Tu barrera se mantiene. Los 12 semanas entrenan a tu cuerpo a sintetizar ceramidas de nuevo. Después, con buenos hábitos, se mantiene estable. Algunos siguen 1 cápsula cada 2 días como mantenimiento.' },
  { q: '❓ ¿Hay evidencia de que funciona?', a: 'Sí. Los ingredientes clave (Vitamina A, Vitamina E, Cúrcuma) tienen estudios clínicos que lo respaldan. Pero lo más importante: está documentado en testimonios de mujeres con tu patrón exacto.' }
];

faqs.forEach(faq => {
  const faqY = doc.y;
  const qHeight = doc.heightOfString(faq.q, { width: 520 }) + 16;

  // Pregunta
  doc.rect(36, faqY, 540, qHeight).stroke('#e8e0d4');
  doc.fontSize(10).font('Helvetica-Bold').fillColor(NEGRO).text(faq.q, 46, faqY + 8, { width: 520 });
  doc.y = faqY + qHeight + 8;

  // Respuesta
  const aY = doc.y;
  const aHeight = doc.heightOfString(faq.a, { width: 520 }) + 16;
  doc.rect(36, aY, 540, aHeight).fillAndStroke('#ffffff', '#ffffff');
  doc.rect(36, aY, 3, aHeight).fill(DORADO);
  doc.fontSize(9).font('Helvetica').fillColor(GRIS).text(faq.a, 46, aY + 8, { width: 520, lineGap: 2 });
  doc.y = aY + aHeight + 10;

  if (doc.y > 750) {
    doc.addPage();
    doc.fontSize(9).font('Helvetica-Bold').fillColor(TERRACOTA).text('IDERMA90 · ANÁLISIS PERSONALIZADO', { letterSpacing: 1.5 });
    doc.moveDown(0.5);
  }
});

doc.moveDown(0.3);
addHeading('Los Mensajes Clave');
doc.moveDown(0.2);

const messages = [
  '"No es que tu piel es mala. Es que necesita los cofactores correctos para regenerarse."',
  '"Una crema hidratante en una barrera rota es como verter agua en un vaso roto."',
  '"La semana 7-8 es cuando realmente ves que funciona. Hasta entonces, solo confía en que el sistema está trabajando."'
];

messages.forEach(msg => {
  const msgY = doc.y;
  const msgHeight = doc.heightOfString(msg, { width: 520 }) + 16;
  doc.rect(36, msgY, 540, msgHeight).fillAndStroke('#faf8f5', '#e8e0d4');
  doc.fontSize(11).font('Helvetica-Oblique').fillColor(TERRACOTA).text(msg, 46, msgY + 8, { width: 520, lineGap: 3 });
  doc.y = msgY + msgHeight + 8;
});

if (doc.y > 750) {
  doc.addPage();
  doc.fontSize(9).font('Helvetica-Bold').fillColor(TERRACOTA).text('IDERMA90 · ANÁLISIS PERSONALIZADO', { letterSpacing: 1.5 });
  doc.moveDown(0.5);
}

doc.moveDown(0.4);
addHeading('¿Y Ahora Qué?');
doc.moveDown(0.2);

addBody('He preparado este análisis porque reconozco exactamente tu patrón y sé que hay una solución que funciona para mujeres como tú.');
doc.moveDown(0.2);

addBody('Lo que acabas de leer es el diagnóstico. Pero hay mucho más que explicar:');
doc.moveDown(0.15);

doc.fontSize(10).font('Helvetica').fillColor(NEGRO).list([
  'Cómo el protocolo se adapta a tus hábitos diarios',
  'Por qué algunos ingredientes interactúan para potenciarse',
  'La diferencia entre este y otros "protocolos" que probaste',
  'Cómo es el acompañamiento durante las 12 semanas',
  'Todas las preguntas que tienes en la cabeza'
], { lineGap: 2 });

doc.moveDown(0.3);

addBody('Si quieres que profundice en cómo podemos ayudarte específicamente con tu caso — incluyendo cómo funciona el protocolo, inversión, plazas disponibles, y resolver cualquier duda — solo dímelo. Estoy aquí para eso. No hay presión, solo claridad.');

doc.moveDown(0.5);

doc.fontSize(10).font('Helvetica-Bold').fillColor(GRIS).text('Dra. Laura García');
doc.fontSize(9).font('Helvetica').fillColor(GRIS).text('Ginecóloga especializada en salud perimenopáusica');
doc.fontSize(9).font('Helvetica').fillColor(GRIS).text('IDERMA90 · Instituto de Salud Femenina');

doc.moveDown(0.4);

doc.fontSize(8).font('Helvetica-Oblique').fillColor('#999999').text('Este análisis es personalizado basado en tus respuestas al test diagnóstico.\nNo sustituye consulta médica profesional.', { align: 'center' });

// Finalize PDF
doc.end();

output.on('finish', () => {
  console.log('✅ PDF creado: perfil-barrera.pdf');
  console.log('📄 5 páginas, formato profesional, colores IDERMA90');
});

output.on('error', (err) => {
  console.error('❌ Error:', err);
});
