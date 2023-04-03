steps=[
    [
    """
    CREATE TABLE user_profiles(
        profile_id SERIAL PRIMARY KEY NOT NULL,
        user_id INTEGER NOT NULL REFERENCES users(id),
        full_name VARCHAR(150) NOT NULL,
        email VARCHAR(40) NOT NULL REFERENCES users(email),
        phone_number INTEGER NOT NULL,
        address VARCHAR(300) NOT NULL,
        bio VARCHAR(1000) NOT NULL,
        availability BOOL NOT NULL
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
    ]
]
