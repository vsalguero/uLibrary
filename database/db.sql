CREATE DATABASE librarybd

CREATE TABLE books(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    author VARCHAR(255),
    publish_year SMALLINT,
    genre VARCHAR(100)
)