# Assistant Virtuel DIVTEC

Cet assistant virtuel a été conçu pour répondre à toutes vos questions concernant la **Division Technique (DIVTEC)** du Centre jurassien d'enseignement et de formation (CEJEF) à Porrentruy.

## Table des matières

- [À propos](#à-propos)
- [Fonctionnalités](#fonctionnalités)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Configuration](#configuration)
- [Lancement](#lancement)
- [Aperçu](#aperçu)
- [Contribuer](#contribuer)

---

### À propos

Cet outil est un chatbot intelligent, spécialisé dans le domaine de la DIVTEC. Il a été développé pour fournir des réponses précises et rapides, facilitant ainsi l'accès à l'information pour les étudiants, enseignants et toute personne intéressée.

### Fonctionnalités

- **Réponses instantanées** : Obtenez des réponses 24/7 sur les formations, les horaires, les événements, etc.
- **Reconnaissance vocale** : Posez vos questions à voix haute pour une expérience plus fluide.
- **Synthèse vocale** : Écoutez les réponses du chatbot pour une meilleure accessibilité.
- **Interface intuitive** : Discutez avec le chatbot de manière naturelle et conviviale.
- **Graphiques interactifs** : Visualisez des données complexes grâce à des graphiques dynamiques.

### Prérequis

- **Node.js** : version 12.x ou supérieure
- **npm** : version 6.x ou supérieure

### Installation

1. Clonez ce dépôt :
   ```bash
   git clone https://github.com/scail-in/chatbot-divtec-porrentruy.git
   ```
2. Accédez au répertoire du projet :
   ```bash
   cd chatbot-divtec-porrentruy
   ```
3. Installez les dépendances :
   ```bash
   npm install
   ```

### Configuration

Pour connecter l'application à l'API de Google et au webhook n8n, vous devez créer un fichier `.env` à la racine du projet avec les variables suivantes :

```env
API_KEY=VOTRE_CLÉ_API_GOOGLE
N8N_WEBHOOK_URL=VOTRE_URL_WEBHOOK_N8N
```

### Lancement

- **Mode développement** :
  ```bash
  npm run dev
  ```
  Le serveur de développement sera accessible à l'adresse `http://localhost:5173`.

- **Mode production** :
  ```bash
  npm run build
  npm run preview
  ```

### Aperçu

![Aperçu du chatbot](https://user-images.githubusercontent.com/11363391/182069688-033618a8-4448-44f2-984f-e218b958f35e.png)

### Contribuer

Les contributions sont les bienvenues ! Pour toute suggestion ou amélioration, veuillez ouvrir une *issue* ou soumettre une *pull request*.
