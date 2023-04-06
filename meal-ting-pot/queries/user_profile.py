from pydantic import BaseModel
from typing import Optional, Union, List
from queries.pool import pool


class Error(BaseModel):
    message: str

class SocialMedia(BaseModel):
    url : str

class UserProfileIn(BaseModel):
    full_name: str
    email: str
    photo: str
    phone_number: int
    address: str
    bio: str
    availability: bool
    tags: Optional[int]
    featured_menu_item: Optional[int]




class UserProfileOut(BaseModel):
    profile_id : int
    user_id: int
    full_name: str
    email: str
    photo : str
    phone_number: int
    address: str
    bio: str
    availability: bool
    tags: Optional[int]
    featured_menu_item: Optional[int]
    social_media: List[SocialMedia]





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
                            ,photo = %s
                            ,phone_number = %s
                            ,address = %s
                            ,bio = %s
                            ,availability = %s
                            ,tags = %s
                            ,featured_menu_item = %s
                        WHERE profile_id = %s
                        """,
                        [
                            user_profile.full_name,
                            user_profile.email,
                            user_profile.photo,
                            user_profile.phone_number,
                            user_profile.address,
                            user_profile.bio,
                            user_profile.availability,
                            user_profile.tags,
                            user_profile.featured_menu_item,
                            profile_id
                        ],
                    )
                return self.user_profile_in_to_out(profile_id, user_profile, account_data["id"])
        except Exception as e:
            print(e)
            return {"message": "Could not update the user profile"}




    # def get_one(self, profile_id: int) -> Optional[UserProfileOut]:
    #     try:
    #         with pool.connection() as conn:
    #             with conn.cursor() as db:
    #                 result = db.execute(
    #                     """
    #                     SELECT up.profile_id,
    #                         up.user_id,
    #                         up.full_name,
    #                         up.email,
    #                         up.photo,
    #                         up.phone_number,
    #                         up.address,
    #                         up.bio,
    #                         up.availability,
    #                         up.tags,
    #                         up.featured_menu_item,
    #                         sm.url
    #                     FROM user_profiles up
    #                     LEFT OUTER JOIN social_media sm
    #                     ON up.profile_id = sm.user_profile_id
    #                     WHERE up.profile_id = %s;
    #                     """,
    #                     [profile_id],
    #                 )
    #                 records = result.fetchall()
    #                 print(records)
    #                 if not records:
    #                     return None
    #                 social_media = [url for url in records[0][11:] if url is not None]
    #                 print(social_media)
    #                 return self.user_profile_to_out(records[0], social_media)
    #     except Exception as e:
    #         return {"message": "Could not get the user profile"}


    def get_one(self, profile_id: int) -> Optional[UserProfileOut]:
            try:
                with pool.connection() as conn:
                    with conn.cursor() as db:
                        result = db.execute(
                            """
                            SELECT up.* as user_profiles, ARRAY_AGG(s.url) as social_media
                            FROM users as u
                            LEFT OUTER JOIN user_profiles up
                                on (u.id=up.user_id)
                            LEFT OUTER JOIN social_media s
                                on (up.profile_id=s.user_profile_id)
                            WHERE u.id = %s
                            GROUP BY up.profile_id
                            ORDER BY up.profile_id;

                            """,
                            [profile_id],
                        )
                        records = result.fetchall()
                        print(records)
                        if not records:
                            return None
                        # social_media = [url for url in records[0][11:] if url is not None]
                        # print(social_media)
                        return self.user_profile_to_out(records[0])
            except Exception as e:
                print(e)
                return {"message": "Could not get the user profile"}

    # def get_one(self, profile_id: int, ) -> Union[List[UserProfileOut],Error]:
    #         try:
    #             with pool.connection() as conn:
    #                  with conn.cursor() as db:
    #                     db.execute(
    #                         """
    #                             SELECT up.* as user_profiles, ARRAY_AGG(s.url) as social_media
    #                             FROM users as u
    #                             LEFT OUTER JOIN user_profiles up
    #                                 on (u.id=up.user_id)
    #                             LEFT OUTER JOIN social_media s
    #                                 on (up.profile_id=s.user_profile_id)
    #                             WHERE u.id = %s
    #                             GROUP BY up.profile_id

    #                         """,
    #                         [profile_id],
    #                     )
    #                     results = db.fetchall()
    #                     print(results)
    #                     if results is None:
    #                         return None
    #                     result = []
    #                     for record in results:
    #                         user_profile = UserProfileOut(
    #                         profile_id=record[0],
    #                         user_id=record[1],
    #                         full_name=record[2],
    #                         email=record[3],
    #                         photo=record[4],
    #                         phone_number=record[5],
    #                         address=record[6],
    #                         bio=record[7],
    #                         availability=record[8],
    #                         tags=record[9],
    #                         featured_menu_item=record[10],


    #                     )
    #                     result.append(user_profile)
    #                     return result

            except Exception as e:
                print(e)
                return {"message": "can not get the profile"}



    def create(
            self, user_profile: UserProfileIn, account_data: dict

        ) -> Union[UserProfileOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO user_profiles
                            (user_id, full_name, email, photo, phone_number, address, bio, availability, tags, featured_menu_item)
                        VALUES
                            (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                        RETURNING profile_id;
                        """,
                        [
                            account_data["id"],
                            user_profile.full_name,
                            user_profile.email,
                            user_profile.photo,
                            user_profile.phone_number,
                            user_profile.address,
                            user_profile.bio,
                            user_profile.availability,
                            user_profile.tags,
                            user_profile.featured_menu_item,
                        ],
                    )
                    profile_id = result.fetchone()[0]
                    return self.user_profile_in_to_out(
                        profile_id,
                        user_profile,
                        account_data["id"],
                    )
        except Exception as e:
            print(e)
            return {"message": "Create did not work"}

    def user_profile_in_to_out(
        self, profile_id: int, user_profile: UserProfileIn, user_id: int
    ) -> UserProfileOut:
        old_data = user_profile.dict()
        return UserProfileOut(
            profile_id=profile_id,
            user_id=user_id,
            **old_data,
            social_media=[],
        )
    # def user_profile_to_out(self, record, social_media) -> UserProfileOut:
    #     return UserProfileOut(
    #         profile_id=record[0],
    #         user_id=record[1],
    #         full_name=record[2],
    #         email=record[3],
    #         photo=record[4],
    #         phone_number=record[5],
    #         address=record[6],
    #         bio=record[7],
    #         availability=record[8],
    #         tags=record[9],
    #         featured_menu_item=record[10],
    #         social_media=social_media,
    #     )
    def user_profile_to_out(self, record) -> UserProfileOut:
        return UserProfileOut(
            profile_id=record[0],
            user_id=record[1],
            full_name=record[2],
            email=record[3],
            photo=record[4],
            phone_number=record[5],
            address=record[6],
            bio=record[7],
            availability=record[8],
            tags=record[9],
            featured_menu_item=record[10],
            social_media=record[11]
        )
