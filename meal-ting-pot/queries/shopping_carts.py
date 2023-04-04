from pydantic import BaseModel
from typing import Optional, Union
from queries.pool import pool


class Error(BaseModel):
    message: str


class ShoppingCartIn(BaseModel):
    status: int


class ShoppingCartOut(BaseModel):
    shopping_cart_id: int
    status: int


class ShoppingCartRepository:
    def get_one(self, shopping_cart_id: int) -> Optional[ShoppingCartOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT shopping_cart_id
                            , status
                        FROM shopping_carts
                        WHERE shopping_cart_id = %s
                        """,
                        [shopping_cart_id],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.shopping_cart_to_out(record)
        except Exception as e:
            return {"message": "Could not get shopping cart"}

    def update(
        self, shopping_cart_id: int, shopping_cart: ShoppingCartIn
    ) -> Union[ShoppingCartOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE shopping_carts
                        SET status = %s
                        WHERE shopping_cart_id = %s
                        """,
                        [shopping_cart.status, shopping_cart_id],
                    )
                    return self.shopping_cart_in_to_out(
                        shopping_cart_id, shopping_cart
                    )
        except Exception as e:
            print(e)
            return {"message": "Could not update shopping cart"}

    def create(self) -> Union[ShoppingCartOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO shopping_carts (status)
                        VALUES (1)
                        RETURNING shopping_cart_id, status
                        """
                    )
                    row = result.fetchone()
                    shopping_cart_id = row[0]
                    status = row[1]
                    return ShoppingCartOut(
                        shopping_cart_id=shopping_cart_id, status=status
                    )
        except Exception as e:
            print(e)
            return {"message": "Create did not work"}

    def shopping_cart_in_to_out(
        self, shopping_cart_id: int, shopping_cart: ShoppingCartIn
    ):
        old_data = shopping_cart.dict()
        return ShoppingCartOut(shopping_cart_id=shopping_cart_id, **old_data)

    def shopping_cart_to_out(self, record):
        return ShoppingCartOut(shopping_cart_id=record[0], status=record[1])