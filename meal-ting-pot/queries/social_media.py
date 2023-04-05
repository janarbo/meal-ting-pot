from pydantic import BaseModel
from typing import Optional, Union
from queries.pool import pool


class Error(BaseModel):
    message: str

class SocialMediaIn(BaseModel):
    url : str
    user_profile_id: int

class SocialMediaOut(BaseModel):
    id: int
    url: str
    user_profile_id : int


class SocialMediaRepository:
    def delete(self, id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE from social_media
                        WHERE id = %s
                        """,
                        [id]
                    )
                    return True
        except Exception as e:
            print(e)
            return False


    def update(self, id: int, social_media: SocialMediaIn) -> Union[SocialMediaOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE social_media
                        SET url= %s
                          , user_profile_id= %s
                        WHERE id = %s;
                        """,
                        [
                            social_media.url,
                            social_media.user_profile_id,
                            id
                        ]
                    )
                    return self.social_media_in_to_out(id, social_media)
        except Exception as e:
            print(e)
            return {"message": "Could not update cart item"}


    def create(self, social_media: SocialMediaIn) -> Union[SocialMediaOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO social_media (url, user_profile_id)
                        VALUES (%s, %s)
                        RETURNING id
                        """,
                        [
                            social_media.url,
                            social_media.user_profile_id
                        ]
                    )
                    id = result.fetchone()[0]
                    return self.social_media_in_to_out(
                        id, social_media
                    )
        except Exception as e:
            return {"message": "Create did not work"}

    def social_media_in_to_out(
            self, id:int, social_media: SocialMediaIn
    ):
        old_data = social_media.dict()
        return SocialMediaOut(
            id=id, **old_data
        )
