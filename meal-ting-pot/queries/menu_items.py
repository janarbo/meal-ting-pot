from pydantic import BaseModel
from typing import List, Optional, Union
from queries.pool import pool
from decimal import Decimal


class Error(BaseModel):
    message: str


class MenuItemIn(BaseModel):
    food_type: str
    name: str
    price: Decimal
    description: str
    comment: Optional[str]
    photo: str
    spicy_level: int
    tags: Optional[str]
    calories: int
    ingredients: str
    status: bool


class MenuItemOut(BaseModel):
    menu_item_id: int
    food_type: str
    name: str
    price: Decimal
    description: str
    comment: Optional[str]
    photo: str
    spicy_level: int
    tags: Optional[str]
    calories: int
    ingredients: str
    chef_id: int
    status: bool


class MenuItemRepository:
    def get_one(self, menu_item_id: int) -> Optional[MenuItemOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
        SELECT menu_item_id,
        food_type,
        name,
        price,
        description,
        comment,
        photo,
        spicy_level,
        tags,
        calories,
        ingredients,
        chef_id,
        status
        FROM menu_items
        WHERE menu_item_id=%s
        """,
                        [menu_item_id],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_menu_item_out(record)
        except Exception as e:
            print(e)
            return {"message": "Could not get that menu item"}

    def delete(self, menu_item_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE from menu_items
                        where menu_item_id=%s
                        """,
                        [menu_item_id],
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def update(
        self, menu_item_id: int, menu_item: MenuItemIn, account_data: dict
    ) -> Union[MenuItemOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE menu_items
                        SET food_type=%s,
                        name=%s,
                        price=%s,
                        description=%s,
                        comment=%s,
                        photo=%s,
                        spicy_level=%s,
                        tags=%s,
                        calories=%s,
                        ingredients=%s,
                        chef_id=%s,
                        status=%s
                        WHERE menu_item_id=%s
                        """,
                        [
                            menu_item.food_type,
                            menu_item.name,
                            menu_item.price,
                            menu_item.description,
                            menu_item.comment,
                            menu_item.photo,
                            menu_item.spicy_level,
                            menu_item.tags,
                            menu_item.calories,
                            menu_item.ingredients,
                            account_data["id"],
                            menu_item.status,
                            menu_item_id,
                        ],
                    )
                    return self.menu_item_in_to_out(
                        menu_item_id, menu_item, account_data["id"]
                    )
        except Exception as e:
            print(e)
            return {"message": "could not update that menu item"}

    def get_all_chef(
        self, account_data: dict
    ) -> Union[Error, List[MenuItemOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT menu_item_id, food_type, name, price, description, comment, photo, spicy_level, tags, calories, ingredients, chef_id, status
                        FROM menu_items
                        WHERE chef_id = %s
                        ORDER BY food_type;
                        """,
                        (account_data["id"],),
                    )
                    result = db.fetchall()
                    return [
                        self.record_to_menu_item_out(record)
                        for record in result
                    ]
        except Exception as e:
            print(e)
        return {"message": "Could not get all menu items"}

    def get_all_customer(
        self, chef_id: int
    ) -> Union[Error, List[MenuItemOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT menu_item_id, food_type, name, price, description, comment, photo, spicy_level, tags, calories, ingredients, chef_id, status
                        FROM menu_items
                        WHERE chef_id = %s
                        ORDER BY food_type;
                        """,
                        [chef_id],
                    )
                    result = db.fetchall()
                    return [
                        self.record_to_menu_item_out(record)
                        for record in result
                    ]
        except Exception as e:
            print(e)
        return {"message": "Could not get all menu items"}

    def create(
        self, menu_item: MenuItemIn, account_data: dict
    ) -> Union[MenuItemOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
            INSERT INTO menu_items
                (food_type, name, price, description, comment, photo, spicy_level, tags, calories, ingredients, chef_id, status)
            VALUES
                (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s,%s)
            RETURNING menu_item_id;
            """,
                        [
                            menu_item.food_type,
                            menu_item.name,
                            menu_item.price,
                            menu_item.description,
                            menu_item.comment,
                            menu_item.photo,
                            menu_item.spicy_level,
                            menu_item.tags,
                            menu_item.calories,
                            menu_item.ingredients,
                            account_data["id"],
                            menu_item.status,
                        ],
                    )
                    menu_item_id = result.fetchone()[0]
                    return self.menu_item_in_to_out(
                        menu_item_id, menu_item, account_data["id"]
                    )
        except Exception as e:
            print(e)
            return {"message": "Create did not work"}

    def menu_item_in_to_out(
        self, menu_item_id: int, menu_item: MenuItemIn, chef_id
    ):
        old_data = menu_item.dict()
        return MenuItemOut(
            menu_item_id=menu_item_id, **old_data, chef_id=chef_id
        )

    def record_to_menu_item_out(self, record):
        return MenuItemOut(
            menu_item_id=record[0],
            food_type=record[1],
            name=record[2],
            price=record[3],
            description=record[4],
            comment=record[5],
            photo=record[6],
            spicy_level=record[7],
            tags=record[8],
            calories=record[9],
            ingredients=record[10],
            chef_id=record[11],
            status=record[12],
        )
