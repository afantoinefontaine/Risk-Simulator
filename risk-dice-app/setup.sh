#!/bin/bash

echo "🎲 Configuration du simulateur de dés Risk"
echo "=========================================="
echo ""

# Vérifier si npm est installé
if ! command -v npm &> /dev/null; then
    echo "❌ npm n'est pas installé. Installe Node.js d'abord : https://nodejs.org/"
    exit 1
fi

echo "📦 Installation des dépendances..."
npm install

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Installation réussie !"
    echo ""
    echo "🚀 Options disponibles :"
    echo ""
    echo "1. Lancer en local (développement) :"
    echo "   npm run dev"
    echo ""
    echo "2. Builder pour production :"
    echo "   npm run build"
    echo ""
    echo "3. Déployer sur Vercel (gratuit) :"
    echo "   npm install -g vercel"
    echo "   vercel"
    echo ""
    echo "4. Déployer sur Netlify (gratuit) :"
    echo "   - Build avec 'npm run build'"
    echo "   - Va sur netlify.com et drag & drop le dossier 'dist/'"
    echo ""
    echo "📖 Consulte README.md pour plus de détails"
else
    echo "❌ Erreur lors de l'installation"
    exit 1
fi
