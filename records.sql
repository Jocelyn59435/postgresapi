INSERT INTO products (id, product_name, product_price, product_category) VALUES (1, 'Fresh Strawberry 250g', 5, 'Fruit');
INSERT INTO products (id, product_name, product_price, product_category) VALUES (2, 'Solanato Tomato 200g', 4, 'Fruit');
INSERT INTO products (id, product_name, product_price, product_category) VALUES (3, 'Kiwi Fruit Gold 500g punnet', 6, 'Fruit');
INSERT INTO products (id, product_name, product_price, product_category) VALUES (4, 'H2coco 100% Natural Pure Coconut Water 1l', 4, 'Drink');
INSERT INTO products (id, product_name, product_price, product_category) VALUES (5, 'Nudie Nothing But Aloha Blend 400ml', 3, 'Drink');
INSERT INTO products (id, product_name, product_price, product_category) VALUES (6, 'Tu Bao Zi Flaky Scallion Pancake 480g', 4, 'Food');
INSERT INTO products (id, product_name, product_price, product_category) VALUES (7, 'Spam Ham Lite 340g', 3, 'Food');
INSERT INTO products (id, product_name, product_price, product_category) VALUES (8, 'Toscano Chocolate Chip Brioche Rolls 280g', 5, 'Bakery');
INSERT INTO products (id, product_name, product_price, product_category) VALUES (9, 'Toscano Tiramisu 500g', 7, 'Backery');
INSERT INTO products (id, product_name, product_price, product_category) VALUES (10, 'Perfection Chinese Wombok Baby whole each', 3, 'Veggie');

INSERT INTO users (id, firstname, lastname, user_password) VALUES (1, 'Chadwick','Boseman', '123abc');
INSERT INTO users (id, firstname, lastname, user_password) VALUES (2, 'Loki', 'Thor', '123ang');

INSERT INTO orders (id, order_status, order_time, user_id) VALUES (1, 'complete', current_timestamp, 2);

INSERT INTO order_products (id, quantity, order_id, product_id) VALUES (1, 3, 2, 2);