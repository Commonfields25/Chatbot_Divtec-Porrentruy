# Assistant Virtuel DIVTEC

Cet assistant virtuel a été conçu pour répondre à toutes vos questions concernant la **Division Technique (DIVTEC)** du Centre jurassien d'enseignement et de formation (CEJEF) à Porrentruy.

Ce projet est construit avec **Next.js** et sert d'interface utilisateur pour un backend plus complexe géré par n8n et Supabase.

## Table des matières

- [À propos](#à-propos)
- [Fonctionnalités](#fonctionnalités)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Configuration](#configuration)
- [Lancement](#lancement)
- [Scripts Disponibles](#scripts-disponibles)
- [Architecture](#architecture)
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

- **Node.js** : version 20.x ou supérieure
- **npm** : version 8.x ou supérieure

### Installation

1.  Clonez ce dépôt :
    ```bash
    git clone https://github.com/scail-in/chatbot-divtec-porrentruy.git
    ```
2.  Accédez au répertoire du projet :
    ```bash
    cd chatbot-divtec-porrentruy
    ```
3.  Installez les dépendances :
    ```bash
    npm install
    ```

### Configuration

Pour connecter l'application au webhook n8n, vous devez créer un fichier `.env.local` à la racine du projet avec la variable suivante :

```env
N8N_WEBHOOK_URL=VOTRE_URL_WEBHOOK_N8N
```
Cette URL est utilisée côté serveur par le BFF de Next.js et n'est jamais exposée au client.

### Lancement

-   **Mode développement** :
    ```bash
    npm run dev
    ```
    Le serveur de développement sera accessible à l'adresse `http://localhost:3000`.

-   **Mode production** :
    ```bash
    npm run build
    npm run start
    ```

### Scripts Disponibles

Dans le répertoire du projet, vous pouvez exécuter :

#### `npm run dev`

Exécute l'application en mode développement.\
Ouvrez [http://localhost:3000](http://localhost:3000) pour la voir dans le navigateur.

La page se rechargera si vous faites des modifications.\
Vous verrez également les erreurs de lint dans la console.

#### `npm test`

Lance le test runner en mode interactif.

#### `npm run build`

Construit l'application pour la production dans le dossier `.next`.\
Il regroupe correctement React en mode production et optimise la construction pour les meilleures performances.

#### `npm run start`

Démarre le serveur de production.

#### `npm run lint`

Exécute le linter.

### Architecture

Ce projet utilise une architecture **Backend For Frontend (BFF)** :

-   **Frontend** : Construit avec **Next.js** / **React**, il constitue l'interface utilisateur.
-   **BFF** : Une **API Route Next.js** (`/api/chat`) sert de proxy sécurisé. Elle reçoit les requêtes du frontend, protège les clés d'API et transmet les demandes au backend principal.
-   **Backend (Logique Métier)** : Un workflow **n8n** orchestre la logique complexe, comme l'appel au modèle de langage (Ollama) et l'intégration avec d'autres services.
-   **Base de Données** : **Supabase** est utilisé pour la persistance des données et la gestion future de l'authentification.

### Contribuer

Les contributions sont les bienvenues ! Pour toute suggestion ou amélioration, veuillez ouvrir une *issue* ou soumettre une *pull request*.
