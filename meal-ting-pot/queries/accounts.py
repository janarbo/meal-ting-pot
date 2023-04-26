from pydantic import BaseModel
from queries.pool import pool


class DuplicateAccountError(ValueError):
    pass


class AccountIn(BaseModel):
    first_name: str
    last_name: str
    username: str
    hashed_password: str
    email: str
    is_chef: bool


class AccountOut(BaseModel):
    id: str
    first_name: str
    last_name: str
    username: str
    email: str
    is_chef: bool


class AccountOutWithPassword(AccountOut):
    hashed_password: str


class AccountQueries:
    def get(self, username: str) -> AccountOutWithPassword:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                    SELECT
                        id
                        , first_name
                        , last_name
                        , username
                        , hashed_password
                        , email
                        , is_chef
                    FROM users
                    WHERE username = %s
                    """,
                        [username],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    dictionary = {
                        "id": record[0],
                        "first_name": record[1],
                        "last_name": record[2],
                        "username": record[3],
                        "hashed_password": record[4],
                        "email": record[5],
                        "is_chef": record[6],
                    }
                    return dictionary
        except Exception as e:
            print(e)
            return {"message": "Could not get account"}

    def create(
        self, info: AccountIn, hashed_password: str
    ) -> AccountOutWithPassword:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                    INSERT INTO users
                        (first_name
                        , last_name
                        , username
                        , hashed_password
                        , email
                        , is_chef)
                    VALUES
                        (%s, %s, %s, %s, %s, %s)
                    RETURNING id;
                    """,
                        [
                            info.first_name,
                            info.last_name,
                            info.username,
                            hashed_password,
                            info.email,
                            info.is_chef,
                        ],
                    )
                    id = result.fetchone()[0]
                    return AccountOutWithPassword(
                        id=id,
                        username=info.username,
                        first_name=info.first_name,
                        last_name=info.last_name,
                        email=info.email,
                        is_chef=info.is_chef,
                        hashed_password=hashed_password,
                    )
        except Exception as e:
            print(e)
            return {"message": "Create did not work"}
