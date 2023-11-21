const mariadb = require("mariadb");
const path = require("path");

// Chargement des variables d'environnement pour le fichier .env (basé à la racine du projet)
const envPath = path.resolve(__dirname, "../../.env");
require("dotenv").config({ path: envPath });

/**
 * Configuration et création du pool de connexions à la base de données MariaDB.
 * @type {Pool}
 */
const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  supportBigNumbers: true,
  bigNumberStrings: true,
});

async function getConnection() {
  try {
    const connection = await pool.getConnection();
    console.log("Connected to the database!");
    return connection;
  } catch (error) {
    console.error("Erreur de connexion à la base de données:", error);
    throw error;
  }
}

module.exports = { pool, getConnection };
