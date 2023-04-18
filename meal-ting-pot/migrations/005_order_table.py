steps = [
    [
        """
    CREATE TABLE order_status(
        status_id SERIAL PRIMARY KEY NOT NULL,
        name VARCHAR(100) NOT NULL
    );
    INSERT INTO order_status (name) VALUES ('SUBMITTED');
    INSERT INTO order_status (name) VALUES ('CONFIRMED');
    INSERT INTO order_status (name) VALUES ('READY_FOR_PICKUP');
    INSERT INTO order_status (name) VALUES ('COMPLETED');
    INSERT INTO order_status (name) VALUES ('DECLINED');
    """,
        """
    DROP TABLE order_status;
    """,
    ],
    [
        """
    CREATE TABLE orders(
        order_id SERIAL PRIMARY KEY NOT NULL,
        customer_id INTEGER references users(id),
        order_date DATE NOT NULL,
        total_price REAL NOT NULL,
        shopping_cart_id INTEGER NOT NULL REFERENCES shopping_carts(shopping_cart_id),
        status INTEGER NOT NULL REFERENCES order_status(status_id)
    );
    """,
        """
    DROP TABLE orders;
    """,
    ],
]
