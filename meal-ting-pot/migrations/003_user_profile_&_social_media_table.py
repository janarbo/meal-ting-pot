steps = [
    [
        """
    CREATE TABLE tags(
        id SERIAL PRIMARY KEY NOT NULL,
        name VARCHAR(100) NOT NULL
    );

    INSERT INTO tags (name) VALUES ('Indian');
    INSERT INTO tags (name) VALUES ('Italian');
    INSERT INTO tags (name) VALUES ('African');
    INSERT INTO tags (name) VALUES ('Mediterranean');
    INSERT INTO tags (name) VALUES ('Southeast Asian');
    INSERT INTO tags (name) VALUES ('Mexican');
    INSERT INTO tags (name) VALUES ('American');
    INSERT INTO tags (name) VALUES ('Southern');
    INSERT INTO tags (name) VALUES ('Japanese');
    INSERT INTO tags (name) VALUES ('Latin America');
    INSERT INTO tags (name) VALUES ('Pakistani');
    INSERT INTO tags (name) VALUES ('Kazakhstan');
    INSERT INTO tags (name) VALUES ('Carribbean');
    INSERT INTO tags (name) VALUES ('Korean');
    INSERT INTO tags (name) VALUES ('Middle Eastern');
    INSERT INTO tags (name) VALUES ('Chinese');
    """,
        """
    DROP TABLE tags
    """
    ],
    [
        """
    CREATE TABLE user_profiles(
        profile_id SERIAL PRIMARY KEY NOT NULL,
        user_id INTEGER NOT NULL REFERENCES users(id),
        full_name VARCHAR(150) NOT NULL,
        email VARCHAR(40) NOT NULL,
        photo VARCHAR(1000) NOT NULL,
        phone_number BIGINT NOT NULL,
        address VARCHAR(300) NOT NULL,
        bio VARCHAR(1000) NOT NULL,
        availability BOOL NOT NULL,
        tags INTEGER NULL REFERENCES tags(id),
        featured_menu_item INTEGER NULL REFERENCES menu_items(menu_item_id),
        CONSTRAINT unique_user_id UNIQUE(user_id)

    );
    """,
        """
    DROP TABLE user_profiles;
    """,
    ],
    [
        """
    CREATE TABLE social_media(
        id SERIAL PRIMARY KEY NOT NULL,
        url VARCHAR(1000) NOT NULL,
        user_profile_id INTEGER NOT NULL REFERENCES  user_profiles(profile_id)
    );
    """,
        """
    DROP TABLE social_media;
    """,
    ],
]
