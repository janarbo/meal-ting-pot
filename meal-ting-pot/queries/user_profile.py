from pydantic import BaseModel
from typing import Optional, Union, List
from queries.pool import pool


class Error(BaseModel):
    message: str


class UserProfileIn(BaseModel):
    full_name: str
    email: str
    photo: str
    phone_number: int
    address: str
    bio: str
    availability: bool
    tags: Optional[str]
    featured_menu_item: Optional[str]


class UserProfileDetailOut(BaseModel):
    profile_id: int
    user_id: int
    full_name: str
    photo: str
    address: str
    availability: bool
    tags: Optional[str]
    featured_menu_item: Optional[str]


class UserProfileOut(BaseModel):
    profile_id: int
    user_id: int
    full_name: str
    email: str
    photo: str
    phone_number: int
    address: str
    bio: str
    availability: bool
    tags: Optional[str]
    featured_menu_item: Optional[str]
    social_media: Optional[List[str]]


class UserProfileRepository:
    def update(
        self, profile_id: int, user_profile: UserProfileIn, account_data: dict
    ) -> Union[UserProfileOut, Error]:
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
                            profile_id,
                        ],
                    )
                return self.user_profile_in_to_out(
                    profile_id, user_profile, account_data["id"]
                )
        except Exception as e:
            print(e)
            return {"message": "Could not update the user profile"}

    def get_all(self) -> Union[Error, List[UserProfileDetailOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT
                        up.profile_id,
                        up.user_id,
                        up.full_name,
                        up.photo,
                        up.address,
                        up.availability,
                        t.name AS tag_name,
                        mi.photo AS featured_menu_item_photo
                        FROM
                        user_profiles up
                        LEFT JOIN tags t ON up.tags = t.id
                        LEFT JOIN menu_items mi ON up.featured_menu_item = mi.menu_item_id
                        WHERE up.availability = true AND mi.photo is not null
                        """,
                    )
                    results = db.fetchall()
                    if results is None:
                        return None
                    result = []
                    for record in results:
                        user_profile = UserProfileDetailOut(
                            profile_id=record[0],
                            user_id=record[1],
                            full_name=record[2],
                            photo=record[3],
                            address=record[4],
                            availability=record[5],
                            tags=record[6],
                            featured_menu_item=record[7],
                        )
                        result.append(user_profile)
                    return result
        except Exception as e:
            print(e)
            return {"message": "Could not get the user profile"}

    def get_one(self, profile_id: int) -> Optional[UserProfileOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT
                        up.profile_id,
                        up.user_id,
                        up.full_name,
                        up.email,
                        up.photo,
                        up.phone_number,
                        up.address,
                        up.bio,
                        up.availability,
                        t.name AS tag_name,
                        m.name AS menu_item_name,
                        ARRAY_AGG(s.url) AS social_media
                        FROM user_profiles AS up
                        LEFT JOIN social_media AS s ON up.profile_id = s.user_profile_id
                        LEFT JOIN tags AS t ON up.tags = t.id
                        LEFT JOIN menu_items AS m ON up.featured_menu_item = m.menu_item_id
                        WHERE up.profile_id = %s
                        GROUP BY up.profile_id, t.name, m.name;
                        """,
                        [profile_id],
                    )
                    records = result.fetchall()
                    if not records:
                        return None
                    profile = self.user_profile_to_out(records[0])
                    if not profile.social_media:
                        profile.social_media = None
                    return profile
        except Exception as e:
            print(e)
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
                            (user_id,
                            full_name,
                            email,
                            photo,
                            phone_number,
                            address,
                            bio,
                            availability,
                            tags,
                            featured_menu_item)
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
        )

    def user_profile_to_out(self, record) -> UserProfileOut:
        social_media = record[11]
        if None in social_media:
            social_media = []
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
            social_media=social_media
        )
