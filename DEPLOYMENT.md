# 🚀 Guide de déploiement rapide

## Option 1 : Déploiement sur Vercel (Recommandé)

### Via l'interface web (le plus simple)

1. Va sur https://vercel.com et connecte-toi avec GitHub
2. Clique sur "Add New..." → "Project"
3. Importe ton repository GitHub `risk-blitz-simulator`
4. Vercel détecte automatiquement que c'est un site statique
5. Clique sur "Deploy"
6. ✅ Ton app est en ligne en ~30 secondes !

### Via CLI

```bash
# Installe Vercel CLI globalement
npm i -g vercel

# Dans le dossier du projet
cd risk-blitz-simulator

# Login Vercel
vercel login

# Deploy
vercel

# Pour déployer en production
vercel --prod
```

## Option 2 : Netlify

```bash
# Installe Netlify CLI
npm i -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy

# Production
netlify deploy --prod
```

Ou via l'interface web :
1. https://app.netlify.com
2. Drag & drop le dossier `risk-blitz-simulator`

## Option 3 : GitHub Pages

1. Push ton code sur GitHub
2. Va dans Settings → Pages
3. Source : Deploy from a branch
4. Branch : main, folder : / (root)
5. Save

Ton site sera disponible à : `https://[ton-username].github.io/risk-blitz-simulator/`

## Option 4 : Hébergement local

```bash
# Avec Python
python3 -m http.server 8000

# Avec Node.js
npx serve .

# Avec PHP
php -S localhost:8000
```

Puis ouvre http://localhost:8000

## 🔗 Configuration du domaine personnalisé

### Sur Vercel
1. Va dans ton projet → Settings → Domains
2. Ajoute ton domaine (ex: risk.antoine-fontaine.com)
3. Configure les DNS selon les instructions

### Sur Netlify
1. Domain settings → Add custom domain
2. Configure les DNS

## ✅ Checklist avant déploiement

- [ ] Teste l'app localement
- [ ] Vérifie que tous les fichiers sont présents
- [ ] Vérifie les liens (LinkedIn, etc.)
- [ ] Teste sur mobile
- [ ] Configure les analytics (optionnel)

## 🎯 URLs de production possibles

- Vercel : `risk-blitz-simulator.vercel.app`
- Netlify : `risk-blitz-simulator.netlify.app`
- GitHub Pages : `[username].github.io/risk-blitz-simulator`

---

**Note :** Vercel est recommandé car il offre :
- ✅ Déploiement automatique à chaque push
- ✅ HTTPS automatique
- ✅ CDN global
- ✅ Preview deployments
- ✅ 100% gratuit pour ce type de projet
