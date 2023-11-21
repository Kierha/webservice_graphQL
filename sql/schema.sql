-- Script SQL permettant de créer la base de données et les tables nécessaires au projet

CREATE DATABASE IF NOT EXIST videogames;

USE DATABASE videogames;

CREATE TABLE editors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE studios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE games (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    publicationDate INT
);

CREATE TABLE game_genres (
    game_id INT,
    genre VARCHAR(255),
    FOREIGN KEY (game_id) REFERENCES games(id)
);

CREATE TABLE game_editors (
    game_id INT,
    editor_id INT,
    FOREIGN KEY (game_id) REFERENCES games(id),
    FOREIGN KEY (editor_id) REFERENCES editors(id)
);

CREATE TABLE game_studios (
    game_id INT,
    studio_id INT,
    FOREIGN KEY (game_id) REFERENCES games(id),
    FOREIGN KEY (studio_id) REFERENCES studios(id)
);

CREATE TABLE game_platforms (
    game_id INT,
    platform VARCHAR(255),
    FOREIGN KEY (game_id) REFERENCES games(id)
);



