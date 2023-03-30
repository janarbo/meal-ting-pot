from pydantic import BaseModel
from typing import Optional, Union
from queries.pool import pool

class Error(BaseModel):
    message: str

class MenuItemIn(BaseModel):
    food_type: str
    name: str
    price: int
    description: str
    comment: Optional[str]
    photo: str
    spicy_level: int
    tags: Optional[str]
    calories: int
    ingredients: str
    chef_id: int

class MenuItemOut(BaseModel):
    menu_item_id: int
    food_type: str
    name: str
    price: int
    description: str
    comment: Optional[str]
    photo: str
    spicy_level: int
    tags: Optional[str]
    calories: int
    ingredients: str
    chef_id: int

class MenuItemRepository:
    def create(self, menu_item: MenuItemIn)-> Union[ MenuItemOut, Error ]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
            """
            INSERT INTO menu_items
                (food_type, name, price, description, comment, photo, spicy_level, tags, calories, ingredients, chef_id)
            VALUES
                (%s, %s, %s, %s,%s, %s,%s, %s,%s, %s,%s)
            RETURNING menu_item_id;
            """,
            [menu_item.food_type, menu_item.name, menu_item.price, menu_item.description, menu_item.comment, menu_item.photo, menu_item.spicy_level, menu_item.tags, menu_item.calories, menu_item.ingredients, menu_item.chef_id]
                    )
                    menu_item_id=result.fetchone()[0]
                    print(menu_item_id)
                    return self.menu_item_in_to_out(menu_item_id, menu_item)
        except Exception as e:
            print(e)
            return{"message": "Create did not work"}

    def menu_item_in_to_out(self, menu_item_id: int, menu_item:MenuItemIn):
        old_data=menu_item.dict()
        return MenuItemOut(menu_item_id=menu_item_id, **old_data)
