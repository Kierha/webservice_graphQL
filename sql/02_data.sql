-- Insertion des éditeurs
INSERT INTO editors (name) VALUES ('Electronic Arts'), ('Ubisoft'), ('Activision');

-- Insertion des studios
INSERT INTO studios (name) VALUES ('BioWare'), ('Ubisoft Montreal'), ('Infinity Ward');

-- Insertion des jeux
INSERT INTO games (name, publicationDate) VALUES 
('Mass Effect', 2007),
('Assassin\'s Creed', 2007),
('Call of Duty', 2003);

-- Insertion des genres
INSERT INTO game_genres (game_id, genre) VALUES 
(1, 'RPG'),
(2, 'Action'),
(3, 'FPS');

-- Insertion des relations jeu-éditeur
INSERT INTO game_editors (game_id, editor_id) VALUES 
(1, 1),
(2, 2),
(3, 3);

-- Insertion des relations jeu-studio
INSERT INTO game_studios (game_id, studio_id) VALUES 
(1, 1),
(2, 2),
(3, 3);

-- Insertion des plateformes
INSERT INTO game_platforms (game_id, platform) VALUES 
(1, 'PC'),
(1, 'Xbox 360'),
(2, 'PC'),
(2, 'PlayStation 3'),
(3, 'PC'),
(3, 'Xbox');
