from pydantic import BaseModel
from typing import Optional, Union, List
from queries.pool import pool
from datetime import date


class Error(BaseModel):
    message: str


class OrdersIn(BaseModel):
    customer_id: int
    order_date: date
    total_price: int
    shopping_cart_id: int


class OrdersOut(BaseModel):
    order_id: int
    customer_id: int
    order_date: date
    total_price: int
    shopping_cart_id: int
    status: int


class OrdersRepository:
    def create(
        self, orders: OrdersIn, account_data: dict
    ) -> Union[OrdersOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO orders
                            (order_date, total_price, customer_id, shopping_cart_id, status)
                        VALUES
                        (%s, %s, %s, %s, %s)
                        RETURNING order_id, status;
                        """,
                            [
                                orders.order_date,
                                orders.total_price,
                                orders.customer_id,
                                orders.shopping_cart_id,
                                orders.status,
                                account_data["id"],
                            ],
                    )
                    row = result.fetchone()
                    order_id = row[0]
                    status = row[1]
                    return self.orders_in_to_out(
                        account_data["id"],
                        order_id=order_id,
                        orders=orders,
                        shopping_cart_id=orders.shopping_cart_id,
                        customer_id=orders.customer_id,
                    )
        except Exception as e:
            print(e)
            return {"message": "Create did not work"}

    def get_all(self, customer_id: Optional[int] = None) -> List[OrdersOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    if customer_id is None:
                        db.execute(
                            """
                            SELECT order_id, order_date, total_price, customer_id, shopping_cart_id, status
                            FROM orders
                            """
                        )
                    else:
                        db.execute(
                            """
                            SELECT order_id, order_date, total_price, customer_id, shopping_cart_id, status
                            FROM orders
                            WHERE customer_id = %s
                            """,
                            [customer_id],
                        )
                    return [self.orders_to_out(record) for record in db.fetchall()]
        except Exception as e:
            print(e)
            return []

    def update(
        self, order_id: int, orders: OrdersIn
    ) -> Union[OrdersOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE orders
                        SET status = %s
                        WHERE order_id = %s
                        """,
                        [orders.status, order_id],
                    )
                    return self.orders_in_to_out(
                        order_id, orders, orders.shopping_cart_id, orders.customer_id
                    )
        except Exception as e:
            print(e)
            return {"message": "Could not update orders"}

    def orders_in_to_out(
        self, order_id: int, orders: OrdersIn, shopping_cart_id: int, customer_id: int
    ):
        old_data = orders.dict(exclude={"shopping_cart_id", "customer_id"})
        return OrdersOut(
            order_id=order_id,
            **old_data,
            shopping_cart_id=shopping_cart_id,
            customer_id=customer_id
    )

    def orders_to_out(self, record):
        return OrdersOut(order_id=record[0], status=record[1])
