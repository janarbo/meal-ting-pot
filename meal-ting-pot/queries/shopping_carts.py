from pydantic import BaseModel
from typing import Union, List
from queries.pool import pool


class Error(BaseModel):
    message: str


class ShoppingCartOut(BaseModel):
    shopping_cart_id: int


class ShoppingCartWithCartItemsOut(BaseModel):
    id: int
    photo: str
    name: str
    quantity: int
    price: int


class ShoppingCartRepository:
    def get_one_with_cart_items(
        self, shopping_cart_id: int
    ) -> Union[List[ShoppingCartWithCartItemsOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                            SELECT ci.id
                                , mi.photo
                                , mi.name
                                , ci.quantity
                                , mi.price
                            FROM cart_items ci
                            JOIN menu_items mi ON ci.menu_item_id = mi.menu_item_id
                            WHERE ci.shopping_cart_id = %s;
                        """,
                        [shopping_cart_id],
                    )
                    results = db.fetchall()
                    if results is None:
                        return None
                    result = []
                    for record in results:
                        cart_item = ShoppingCartWithCartItemsOut(
                            id=record[0],
                            photo=record[1],
                            name=record[2],
                            quantity=record[3],
                            price=record[4],
                        )
                        result.append(cart_item)
                    return result
        except Exception as e:
            print(e)
            return {"message": "Invalid shopping cart ID"}

    def create(self) -> Union[ShoppingCartOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO shopping_carts DEFAULT VALUES
                        RETURNING shopping_cart_id
                        """
                    )
                    row = result.fetchone()
                    shopping_cart_id = row[0]
                    return ShoppingCartOut(shopping_cart_id=shopping_cart_id)
        except Exception as e:
            print(e)
            return {"message": "Create did not work"}
