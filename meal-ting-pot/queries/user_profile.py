from pydantic import BaseModel
from typing import Union
from queries.pool import pool


class Error(BaseModel):
    message: str


class UserProfileIn(BaseModel):
    user_id: str
    full_name: str
    email: str
    phone_number: int
    address: str
    bio: str
    availability: bool


class UserProfileOut(BaseModel):
    profile_id : int
    user_id: str
    full_name: str
    email: str
    phone_number: int
    address: str
    bio: str
    availability: bool
    chef_id: int



class UserProfileRepository:
    def create(
        self, user_profile: UserProfileIn, account_data: dict
    ) -> Union[UserProfileOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
            INSERT INTO user_profiles
                (user_id, full_name, email, phone_number, address, bio, availability)
            VALUES
                (%s, %s, %s, %s, %s, %s, %s)
            RETURNING profile_id;
            """,
                        [
                            user_profile.user_id,
                            user_profile.full_name,
                            user_profile.email,
                            user_profile.phone_number,
                            user_profile.address,
                            user_profile.bio,
                            user_profile.availability,

                        ],
                    )
                    profile_id = result.fetchone()[0]
                    return self.user_profile_in_to_out(
                        profile_id, user_profile, account_data["id"]
                    )
        except Exception as e:
            print(e)
            return {"message": "Create did not work"}

    def user_profile_in_to_out(
        self, profile_id: int, user_profile: UserProfileIn, chef_id
    ):
        old_data = user_profile.dict()
        return UserProfileOut(
           profile_id=profile_id, **old_data, chef_id=chef_id
        )
