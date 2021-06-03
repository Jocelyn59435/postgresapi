CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    order_status VARCHAR(15),
    order_time DATE,
    user_id bigint REFERENCES users(id)
);