from pydantic import BaseModel
from typing import Optional, Union, List
from queries.pool import pool

class Error(BaseModel):
    message: str


class CartItemIn(BaseModel):
    shopping_cart_id: int
    menu_item_id: int
    quantity: int


class CartItemOut(BaseModel):
    id: int
    shopping_cart_id: int
    menu_item_id: int
    quantity: int


class CartItemRepository:
    def delete(self, id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE from cart_items
                        WHERE id = %s
                        """,
                        [id]
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def update(self, id: int, cart_item: CartItemIn) -> Union[CartItemOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE cart_items
                        SET shopping_cart_id = %s
                            , menu_item_id = %s
                            , quantity = %s
                        WHERE id = %s;
                        """,
                        [
                            cart_item.shopping_cart_id,
                            cart_item.menu_item_id,
                            cart_item.quantity,
                            id
                        ]
                    )
                    return self.cart_item_in_to_out(id, cart_item)
        except Exception as e:
            print(e)
            return {"message": "Could not update cart item"}

    def create(self, cart_item: CartItemIn) -> Union[CartItemOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO cart_items (shopping_cart_id, menu_item_id, quantity)
                        VALUES (%s, %s, %s)
                        RETURNING id
                        """,
                        [
                            cart_item.shopping_cart_id,
                            cart_item.menu_item_id,
                            cart_item.quantity
                        ]
                    )
                    id = result.fetchone()[0]
                    return self.cart_item_in_to_out(
                        id, cart_item
                    )
        except Exception as e:
            print(e)
            return {"message": "Create did not work"}

    def cart_item_in_to_out(
            self, id: int, cart_item: CartItemIn
    ):
        old_data = cart_item.dict()
        return CartItemOut(
            id=id, **old_data
        )

