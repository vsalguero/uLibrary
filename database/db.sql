CREATE DATABASE LibraryDB;

CREATE TABLE books(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    publish_year SMALLINT NOT NULL,
    genre VARCHAR(100) NOT NULL,
    created_at DATE NOT NULL DEFAULT CURRENT_DATE,
    updated_at DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(55) NOT NULL,
    last_name VARCHAR(55) NOT NULL,
    email VARCHAR(60) NOT NULL,
    password VARCHAR(100) NOT NULL,
    role VARCHAR(20),
    created_at DATE NOT NULL DEFAULT CURRENT_DATE,
    updated_at DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE loans (
   id SERIAL PRIMARY KEY,                  
   id_user INT NOT NULL,                
   id_book INT NOT NULL,
   loan_date DATE NOT NULL,
   limit_date DATE NOT NULL,
   delivered BOOLEAN DEFAULT 0,
   FOREIGN KEY (id_book)                          
   REFERENCES books (id)                  
   ON DELETE CASCADE,
   FOREIGN KEY (id_user)
   REFERENCES users (id)
   ON DELETE CASCADE
);

