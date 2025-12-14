# 🎲 Simulateur de Dés Risk

Application web pour simuler automatiquement les lancers de dés dans le jeu Risk.

## Installation locale

1. Installe les dépendances :
```bash
npm install
```

2. Lance en mode développement :
```bash
npm run dev
```

3. Ouvre ton navigateur sur `http://localhost:5173`

## Build pour production

```bash
npm run build
```

Les fichiers de production seront dans le dossier `dist/`

## Déploiement gratuit

### Option 1 : Vercel (Recommandé - le plus simple)

1. Installe Vercel CLI :
```bash
npm install -g vercel
```

2. Déploie :
```bash
vercel
```

3. Suis les instructions (appuie sur Entrée pour accepter les valeurs par défaut)

4. Pour mettre en production :
```bash
vercel --prod
```

### Option 2 : Netlify

1. Build le projet :
```bash
npm run build
```

2. Va sur [netlify.com](https://netlify.com)

3. Drag & drop le dossier `dist/` sur Netlify

### Option 3 : GitHub Pages

1. Installe gh-pages :
```bash
npm install --save-dev gh-pages
```

2. Ajoute dans `package.json` :
```json
"scripts": {
  "deploy": "gh-pages -d dist"
}
```

3. Modifie `vite.config.js` pour ajouter la base :
```javascript
export default defineConfig({
  plugins: [react()],
  base: '/risk-dice-simulator/'  // Remplace par le nom de ton repo
})
```

4. Déploie :
```bash
npm run build
npm run deploy
```

### Option 4 : Cloudflare Pages

1. Va sur [pages.cloudflare.com](https://pages.cloudflare.com)

2. Connecte ton repo GitHub ou upload le dossier `dist/`

3. Configure :
   - Build command: `npm run build`
   - Build output directory: `dist`

## Technologies utilisées

- React 18
- Vite
- Tailwind CSS
- Lucide React (pour les icônes)

## Fonctionnalités

- ✅ Simulation de combats Risk avec 1-3 dés attaquant vs 1-2 dés défenseur
- ✅ Affichage visuel des résultats avec couleurs
- ✅ Statistiques cumulées de la session
- ✅ Interface responsive et moderne
