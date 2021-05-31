CREATE TABLE movies (
    id SERIAL PRIMARY  KEY,
    title VARCHAR(150),
    duration integer,
    director VARCHAR(255),
    type VARCHAR(100),
    summary text
);
