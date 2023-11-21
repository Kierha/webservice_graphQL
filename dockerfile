# Utiliser une image Node.js officielle comme image de base
FROM node:16

# Définir le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copier les fichiers package.json et package-lock.json (si disponible)
COPY package*.json ./

# Installer les dépendances du projet
RUN npm install

# Copier les fichiers et dossiers du projet dans le répertoire de travail du conteneur
COPY . .

# Exposer le port sur lequel l'application s'exécute
EXPOSE 4000

# Définir la variable d'environnement pour le mode de production
ENV NODE_ENV production

# Commande pour démarrer l'application
CMD ["node", "src/server.js"]
