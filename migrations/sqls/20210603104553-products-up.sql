CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    product_name VARCHAR(64) NOT NULL,
    product_price integer NOT NULL,
    product_category VARCHAR(64) NOT NULL
);