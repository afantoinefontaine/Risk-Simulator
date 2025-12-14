# 🎲 Risk - Simulateur Blitz

**Parce qu'une partie de Risk ne doit pas forcément durer 4h**

Un simulateur de combat Blitz pour le jeu de société Risk, avec humour noir et commentaires cinglants.

## ✨ Fonctionnalités

- ⚔️ Simulation automatique de combats complets en mode Blitz équilibré
- 🎯 Respect des règles officielles du Risk (1 dé le plus haut comparé par round)
- 💬 50 commentaires sarcastiques différents selon les résultats
- 📊 Historique détaillé de tous les rounds
- 🎨 Design aux couleurs authentiques du Risk (rouge vif / bleu royal)
- 📱 Interface responsive (desktop & mobile)
- 🧪 Test de qualité de l'aléatoire des dés

## 🚀 Déploiement sur Vercel

### Déploiement automatique

1. Push le code sur GitHub
2. Connecte-toi sur [Vercel](https://vercel.com)
3. Importe ton repository GitHub
4. Vercel détecte automatiquement les paramètres
5. Clique sur "Deploy"

### Déploiement manuel

```bash
# Installe Vercel CLI
npm i -g vercel

# Dans le dossier du projet
vercel

# Pour déployer en production
vercel --prod
```

## 🛠️ Développement local

```bash
# Clone le repository
git clone https://github.com/[ton-username]/risk-blitz-simulator.git
cd risk-blitz-simulator

# Lance un serveur local
npm run dev
# ou simplement ouvre index.html dans ton navigateur
```

## 📁 Structure du projet

```
risk-blitz-simulator/
├── index.html          # Page principale
├── styles.css          # Styles CSS
├── app.js             # Logique JavaScript
├── package.json       # Configuration npm
├── vercel.json        # Configuration Vercel
├── README.md          # Documentation
└── .gitignore         # Fichiers à ignorer
```

## 🎮 Comment utiliser

1. Sélectionne le nombre de troupes pour l'attaquant (2-50)
2. Sélectionne le nombre de troupes pour le défenseur (1-50)
3. Clique sur "LANCER"
4. Découvre le résultat avec un commentaire sarcastique !

## 🎲 Règles du mode Blitz équilibré

- L'attaquant lance 1-3 dés selon ses troupes (garde 1 sur territoire)
- Le défenseur lance 1-2 dés selon ses troupes
- Seuls les dés les plus hauts sont comparés
- En cas d'égalité, le défenseur gagne
- Le combat continue jusqu'à ce que l'attaquant arrive à 1 troupe OU le défenseur à 0

## 📊 Probabilités (simulées sur 100 000 rounds)

- 1 dé vs 1 dé : Défenseur gagne ~58%
- 2 dés vs 1 dé : Attaquant gagne ~58%
- 3 dés vs 1 dé : Attaquant gagne ~66%
- 3 dés vs 2 dés : Défenseur gagne ~53%

## 👨‍💻 Auteur

**Antoine Fontaine** - Product Manager fabuleusement génial

[LinkedIn](https://linkedin.com/in/antoine-fontaine-8389168a)

## 📝 License

MIT - Fais ce que tu veux avec ce code !

## 🎯 Roadmap

- [ ] Mode multi-combats pour conquête de continent
- [ ] Statistiques avancées et graphiques
- [ ] Sauvegarde de l'historique des parties
- [ ] Mode comparaison de stratégies
- [ ] Thèmes alternatifs

## 🐛 Bugs connus

Aucun pour le moment ! Si tu en trouves, ouvre une issue.

---

Fait avec ❤️ et beaucoup de sarcasme 🎲
