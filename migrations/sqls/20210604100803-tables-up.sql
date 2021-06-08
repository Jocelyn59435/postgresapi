CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    product_name VARCHAR(64) NOT NULL,
    product_price integer NOT NULL,
    product_category VARCHAR(64) NOT NULL
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(60) UNIQUE NOT NULL,
    firstname VARCHAR(60) NOT NULL,
    lastname VARCHAR(60) NOT NULL,
    user_password VARCHAR NOT NULL
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    order_status VARCHAR(15) NOT NULL,
    order_time DATE DEFAULT CURRENT_DATE,
    user_id bigint REFERENCES users(id)
);

CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    quantity integer NOT NULL,
    order_id bigint REFERENCES orders(id),
    product_id bigint REFERENCES products(id)
);