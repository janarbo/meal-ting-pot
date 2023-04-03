steps=[
    [
    """
    CREATE TABLE cart_status(
        status_id SERIAL PRIMARY KEY NOT NULL,
        name VARCHAR(100) NOT NULL
    );
    """,
    """
    DROP TABLE cart_status;
    """
    ],
    [
    """
    CREATE TABLE shopping_carts(
        shopping_cart_id SERIAL PRIMARY KEY NOT NULL,
        status INTEGER NOT NULL REFERENCES cart_status(status_id)
    );
    """,
    """
    DROP TABLE shopping_carts;
    """
    ],
    [
    """
    CREATE TABLE cart_items(
        id SERIAL PRIMARY KEY NOT NULL,
        shopping_cart_id INTEGER NOT NULL REFERENCES shopping_carts(shopping_cart_id),
        menu_item_id INTEGER NOT NULL REFERENCES menu_items(menu_item_id),
        quantity INTEGER NOT NULL
    );
    """,
    """
    DROP TABLE cart_items;
    """
    ]
]
