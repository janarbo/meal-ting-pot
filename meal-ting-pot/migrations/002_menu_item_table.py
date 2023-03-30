steps =[
        [
    """
    CREATE TABLE menu_items(
        menu_item_id SERIAL PRIMARY KEY NOT NULL,
        food_type VARCHAR(100) NOT NULL,
        name VARCHAR(100) NOT NULL,
        price REAL NOT NULL,
        description VARCHAR(200) NOT NULL,
        comment VARCHAR(200) NULL,
        photo VARCHAR(1000) NOT NULL,
        spicy_level INTEGER NULL,
        tags VARCHAR(200) NULL,
        calories INTEGER NOT NULL,
        ingredients VARCHAR(300) NOT NULL,
        chef_id INTEGER NOT NULL REFERENCES users(id)
    );
    """,
    """
    DROP TABLE menu_items;
    """
    ]
]
