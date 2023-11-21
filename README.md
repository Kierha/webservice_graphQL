# Gestion de Jeux Vidéo via GraphQL

## Description
Ce projet est un WebService conçu pour gérer une liste de jeux vidéo. Il utilise GraphQL pour fournir une API flexible et efficace pour interroger et manipuler des données sur les jeux, les éditeurs et les studios.

## Technologies
- Node.js
- Express
- GraphQL
- MariaDB

## Installation

### Prérequis
- Node.js (v16 ou supérieure)
- MariaDB
- Docker (optionnel)

### Configuration de la Base de Données
1. Créez une base de données MariaDB.
2. Exécutez le script SQL fourni dans `sql/schema.sql` pour créer les tables nécessaires.
3. Exécutez le script SQL fourni dans `sql/data.sql` pour insérer des données de test dans la base de données.

### Installation Locale
1. Clonez le dépôt GitHub :
   ```
   git clone https://github.com/Kierha/webservice_graphQL.git
   ```
2. Accédez au dossier du projet :
   ```
   cd webservice_graphQL
   ```
3. Installez les dépendances :
   ```
   npm install
   ```
4. Configurez vos variables d'environnement dans un fichier `.env` à la racine du projet. Exemple :
   ```
   DB_HOST=localhost
   DB_USER=votre_utilisateur
   DB_PASSWORD=votre_mot_de_passe
   DB_DATABASE=nom_de_la_base
   ```

### Lancement du Projet
Après avoir installé les dépendances et configuré la base de données, lancez le serveur avec :
```
node src/server.js ou npm start
```

### Utilisation avec Docker
1. Construisez l'image Docker :
   ```
   docker build -t webservice_graphql .
   ```
2. Lancez un conteneur à partir de l'image :
   ```
   docker run -p 4000:4000 webservice_graphql
   ```

## Utilisation de l'API
Accédez à l'interface GraphiQL en ouvrant `http://localhost:4000/graphql` dans votre navigateur. Vous pouvez y exécuter des requêtes GraphQL.

### Exemples de Requêtes
- Obtenir la liste des jeux :
  ```graphql
  query {
    games {
      id
      name
      genres
      publicationDate
      platform
    }
  }
  ```

- Obtenir des informations sur un éditeur spécifique :
  ```graphql
  query {
    editor(id: 1) {
      name
      games {
        name
      }
    }
  }
  ```

## Opérations de l'API
L'API permet les opérations suivantes :
- Interroger des jeux vidéo par genre, plateforme ou studio.
- Récupérer des détails sur un jeu spécifique par son ID.
- Lister tous les éditeurs ou studios, ou obtenir des détails sur un éditeur ou studio spécifique par son ID.

