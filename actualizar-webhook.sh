#!/bin/bash
# Script para actualizar webhook URL en quiz.html

echo "🔧 Actualizador de Webhook DERMA90"
echo ""
echo "Pega tu URL de Google Apps Script (termina en /exec):"
read WEBHOOK_URL

if [ -z "$WEBHOOK_URL" ]; then
    echo "❌ Error: No se proporcionó URL"
    exit 1
fi

# Actualizar quiz.html
sed -i.bak "s|const webhookUrl = 'TU_URL_WEBHOOK_AQUI';|const webhookUrl = '$WEBHOOK_URL';|g" quiz.html

echo ""
echo "✅ quiz.html actualizado con tu webhook"
echo ""
echo "Ahora re-deploya:"
echo "  vercel --prod"
echo ""
