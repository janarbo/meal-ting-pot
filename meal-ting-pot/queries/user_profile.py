from pydantic import BaseModel
from typing import Optional, Union
from queries.pool import pool


class Error(BaseModel):
    message: str


class UserProfileIn(BaseModel):
    full_name: str
    email: str
    phone_number: int
    address: str
    bio: str
    availability: bool


class UserProfileOut(BaseModel):
    profile_id : int
    user_id: int
    full_name: str
    email: str
    phone_number: int
    address: str
    bio: str
    availability: bool




class UserProfileRepository:
    def update(self, profile_id: int, user_profile: UserProfileIn, account_data: dict) ->  Union[UserProfileOut, Error]:
        try:
              with pool.connection() as conn:
                with conn.cursor() as db:
                     db.execute(
                        """
                        UPDATE user_profiles
                        SET  full_name = %s
                            ,email = %s
                            ,phone_number = %s
                            ,address = %s
                            ,bio = %s
                            ,availability = %s
                        WHERE profile_id = %s
                        """,
                        [
                         user_profile.full_name,
                         user_profile.email,
                         user_profile.phone_number,
                         user_profile.address,
                         user_profile.bio,
                         user_profile.availability,
                         profile_id],
                    )
                return self.user_profile_in_to_out(profile_id, user_profile, account_data["id"])
        except Exception as e:
            print(e)
            return {"message": "Could not update the user profile"}




    def get_one(self, profile_id: int) -> Optional[UserProfileOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT profile_id
                             , user_id
                             , full_name
                             , email
                             , phone_number
                             , address
                             , bio
                             , availability
                        FROM user_profiles
                        WHERE profile_id = %s
                        """,
                        [profile_id],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.user_profile_to_out(record)
        except Exception as e:
            return {"message": "Could not get the user profile"}

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
                            account_data["id"],
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
        self, profile_id: int, user_profile: UserProfileIn, user_id
    ):
        old_data = user_profile.dict()
        return UserProfileOut(
           profile_id=profile_id, **old_data, user_id=user_id
        )
    def user_profile_to_out(self, record):
        return UserProfileOut(
                              profile_id=record[0],
                              user_id=record[1],
                              full_name=record[2],
                              email=record[3],
                              phone_number=record[4],
                              address=record[5],
                              bio=record[6],
                              availability=record[7]
                            )
