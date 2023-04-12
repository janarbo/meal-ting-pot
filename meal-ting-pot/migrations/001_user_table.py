steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE users (
            id SERIAL PRIMARY KEY NOT NULL,
            first_name VARCHAR(100) NOT NULL,
            last_name VARCHAR(100) NOT NULL,
            username VARCHAR(18) NOT NULL UNIQUE,
            hashed_password VARCHAR(250),
            email VARCHAR(40) NOT NULL UNIQUE,
            is_chef BOOL NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE users;
        """,
    ]
]
