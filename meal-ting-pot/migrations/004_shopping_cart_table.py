<<<<<<< HEAD
steps=[
    [
    """
=======
steps = [
    [
        """
>>>>>>> cf79f95f0da3c1ef8da5ce82c6e48eb5de999dd1
    CREATE TABLE cart_status(
        status_id SERIAL PRIMARY KEY NOT NULL,
        name VARCHAR(100) NOT NULL
    );
<<<<<<< HEAD
    """,
    """
    DROP TABLE cart_status;
    """
    ],
    [
    """
=======

    INSERT INTO cart_status (name) VALUES ('OPEN');
    INSERT INTO cart_status (name) VALUES ('CLOSED');
    """,
        """
    DROP TABLE cart_status;
    """,
    ],
    [
        """
>>>>>>> cf79f95f0da3c1ef8da5ce82c6e48eb5de999dd1
    CREATE TABLE shopping_carts(
        shopping_cart_id SERIAL PRIMARY KEY NOT NULL,
        status INTEGER NOT NULL REFERENCES cart_status(status_id)
    );
    """,
<<<<<<< HEAD
    """
    DROP TABLE shopping_carts;
    """
    ],
    [
    """
=======
        """
    DROP TABLE shopping_carts;
    """,
    ],
    [
        """
>>>>>>> cf79f95f0da3c1ef8da5ce82c6e48eb5de999dd1
    CREATE TABLE cart_items(
        id SERIAL PRIMARY KEY NOT NULL,
        shopping_cart_id INTEGER NOT NULL REFERENCES shopping_carts(shopping_cart_id),
        menu_item_id INTEGER NOT NULL REFERENCES menu_items(menu_item_id),
        quantity INTEGER NOT NULL
    );
    """,
<<<<<<< HEAD
    """
    DROP TABLE cart_items;
    """
    ]
=======
        """
    DROP TABLE cart_items;
    """,
    ],
>>>>>>> cf79f95f0da3c1ef8da5ce82c6e48eb5de999dd1
]
