/**
 * Ce fichier contient les résolveurs GraphQL pour interagir avec la base de données MariaDB.
 */

// Importez la fonction de connexion à la base de données depuis le fichier de configuration.
const { getConnection } = require("../db/config");

const resolvers = {
  /**
   * Résolveur pour la requête GraphQL 'games', permet de rechercher des jeux en fonction de certains critères.
   * @param {Object} args - Arguments de la requête (genre, platform, studio).
   * @returns {Promise<Array>} - Une promesse qui résout en un tableau de jeux.
   */
  games: async ({ genre, platform, studio }) => {
    const conn = await getConnection();
    try {
      let query = `
        SELECT g.* FROM games g
        LEFT JOIN game_genres gg ON g.id = gg.game_id
        LEFT JOIN game_platforms gp ON g.id = gp.game_id
        LEFT JOIN game_studios gs ON g.id = gs.game_id
        LEFT JOIN studios s ON gs.studio_id = s.id
      `;
      let conditions = [];
      let params = [];

      if (genre || platform || studio) {
        if (genre) {
          conditions.push(" gg.genre = ?");
          params.push(genre);
        }

        if (platform) {
          conditions.push(" gp.platform = ?");
          params.push(platform);
        }

        if (studio) {
          conditions.push(" s.name = ?");
          params.push(studio);
        }

        if (conditions.length > 0) {
          query += " WHERE" + conditions.join(" AND");
        }
      }

      query += " GROUP BY g.id";

      const games = await conn.query(query, params);

      for (let game of games) {
        const genresQuery = "SELECT genre FROM game_genres WHERE game_id = ?";
        const genresResult = await conn.query(genresQuery, [game.id]);
        game.genres = genresResult.map((g) => g.genre);

        const platformsQuery =
          "SELECT platform FROM game_platforms WHERE game_id = ?";
        const platformsResult = await conn.query(platformsQuery, [game.id]);
        game.platform = platformsResult.map((p) => p.platform);
      }

      return games;
    } finally {
      if (conn) conn.release();
    }
  },

  /**
   * Résolveur pour la requête GraphQL 'game', permet de rechercher un jeu par ID.
   * @param {Object} args - Arguments de la requête (id).
   * @returns {Promise<Object|null>} - Une promesse qui résout en un jeu ou null si non trouvé.
   */
  game: async ({ id }) => {
    const conn = await getConnection();
    try {
      const query = "SELECT * FROM games WHERE id = ?";
      const rows = await conn.query(query, [id]);
      const game = rows[0];

      // Récupérer les genres associés au jeu
      const genresQuery = "SELECT genre FROM game_genres WHERE game_id = ?";
      const genresResult = await conn.query(genresQuery, [id]);
      game.genres = genresResult.map((g) => g.genre);

      return game;
    } finally {
      if (conn) conn.release();
    }
  },

  /**
   * Résolveur pour la requête GraphQL 'editors', permet de rechercher des éditeurs de jeux.
   * @returns {Promise<Array>} - Une promesse qui résout en un tableau d'éditeurs.
   */
  editors: async () => {
    const conn = await getConnection();
    try {
      const query = "SELECT * FROM editors";
      const editors = await conn.query(query);

      for (let editor of editors) {
        const gamesQuery = `
          SELECT g.* FROM games g
          JOIN game_editors ge ON g.id = ge.game_id
          WHERE ge.editor_id = ?
        `;
        const gamesResult = await conn.query(gamesQuery, [editor.id]);
        editor.games = gamesResult;
      }

      return editors;
    } finally {
      if (conn) conn.release();
    }
  },

  /**
   * Résolveur pour la requête GraphQL 'editor', permet de rechercher un éditeur de jeu par ID.
   * @param {Object} args - Arguments de la requête (id).
   * @returns {Promise<Object|null>} - Une promesse qui résout en un éditeur de jeu ou null si non trouvé.
   */
  editor: async ({ id }) => {
    const conn = await getConnection();
    try {
      const editorQuery = "SELECT * FROM editors WHERE id = ?";
      const editorResult = await conn.query(editorQuery, [id]);
      const editor = editorResult[0];

      const gamesQuery = `
        SELECT g.* FROM games g
        JOIN game_editors ge ON g.id = ge.game_id
        WHERE ge.editor_id = ?
      `;
      const gamesResult = await conn.query(gamesQuery, [id]);
      editor.games = gamesResult;

      return editor;
    } finally {
      if (conn) conn.release();
    }
  },

  /**
   * Résolveur pour la requête GraphQL 'studios', permet de rechercher des studios de développement.
   * @returns {Promise<Array>} - Une promesse qui résout en un tableau de studios.
   */
  studios: async () => {
    const conn = await getConnection();
    try {
      const query = "SELECT * FROM studios";
      const studios = await conn.query(query);

      for (let studio of studios) {
        const gamesQuery = `
          SELECT g.* FROM games g
          JOIN game_studios gs ON g.id = gs.game_id
          WHERE gs.studio_id = ?
        `;
        const gamesResult = await conn.query(gamesQuery, [studio.id]);
        studio.games = gamesResult;
      }

      return studios;
    } finally {
      if (conn) conn.release();
    }
  },

  /**
   * Résolveur pour la requête GraphQL 'studio', permet de rechercher un studio de développement par ID.
   * @param {Object} args - Arguments de la requête (id).
   * @returns {Promise<Object|null>} - Une promesse qui résout en un studio de développement ou null si non trouvé.
   */
  studio: async ({ id }) => {
    const conn = await getConnection();
    try {
      const studioQuery = "SELECT * FROM studios WHERE id = ?";
      const studioResult = await conn.query(studioQuery, [id]);
      const studio = studioResult[0];

      const gamesQuery = `
        SELECT g.* FROM games g
        JOIN game_studios gs ON g.id = gs.game_id
        WHERE gs.studio_id = ?
      `;
      const gamesResult = await conn.query(gamesQuery, [id]);
      studio.games = gamesResult;

      return studio;
    } finally {
      if (conn) conn.release();
    }
  },
};

module.exports = resolvers;
