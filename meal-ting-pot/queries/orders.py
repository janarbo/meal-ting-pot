from pydantic import BaseModel
from typing import Optional, Union, List
from queries.pool import pool
from datetime import date


class Error(BaseModel):
    message: str


class CreateOrderIn(BaseModel):
    order_date: date
    total_price: int
    shopping_cart_id: int
    chef_id: int


class UpdateOrderIn(BaseModel):
    status: int


class CartItemDetail(BaseModel):
    name: str
    price: int
    photo: str
    quantity: int


class OrdersOut(BaseModel):
    order_id: int
    customer_id: int
    chef_id: int
    order_date: date
    total_price: int
    shopping_cart_id: int
    status: int


class OrdersDetailOut(BaseModel):
    order_id: int
    customer_id: int
    chef_id: int
    order_date: date
    total_price: int
    shopping_cart: list[CartItemDetail]
    status: int
    chef_id: int
    chef_email: str
    chef_phone: int
    chef_address: str


class OrdersRepository:
    def get_one(self, order_id: int) -> Optional[OrdersOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT order_id
                        , customer_id
                        , chef_id
                        , order_date
                        , total_price
                        , shopping_cart_id
                        , status
                        FROM orders
                        WHERE order_id=%s
                        """,
                        [order_id],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    customer_id = record[1]
                    chef_id = record[2]
                    order_date = record[3]
                    total_price = record[4]
                    shopping_cart_id = record[5]
                    status = record[6]
                    return OrdersOut(
                        order_id=order_id,
                        customer_id=customer_id,
                        chef_id=chef_id,
                        order_date=order_date,
                        total_price=total_price,
                        shopping_cart_id=shopping_cart_id,
                        status=status,
                    )
        except Exception as e:
            print(e)
            return {"message": "Could not get order"}

    def create(
        self, orders: CreateOrderIn, account_data: dict
    ) -> Union[OrdersOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT ci.id
                        FROM cart_items ci
                        WHERE ci.shopping_cart_id = %s
                        """,
                        [orders.shopping_cart_id],
                    )
                    cart = db.fetchall()
                    if len(cart) == 0:
                        return {"message": "Shopping cart is empty"}

                    result = db.execute(
                        """
                        INSERT INTO orders
                            (customer_id, chef_id, order_date, total_price, shopping_cart_id, status)
                        VALUES
                        (%s, %s, %s, %s, %s, 1)
                        RETURNING order_id, chef_id, order_date, status;
                        """,
                        [
                            account_data["id"],
                            orders.chef_id,
                            orders.order_date,
                            orders.total_price,
                            orders.shopping_cart_id,
                        ],
                    )
                    row = result.fetchone()
                    order_id = row[0]
                    chef_id = row[1]
                    order_date = row[2]
                    status = row[3]
                    return OrdersOut(
                        order_id=order_id,
                        customer_id=account_data["id"],
                        chef_id=chef_id,
                        order_date=order_date,
                        total_price=orders.total_price,
                        shopping_cart_id=orders.shopping_cart_id,
                        status=status,
                    )
        except Exception as e:
            print(e)
            return {"message": "Create did not work"}

    def get_all(self) -> Union[List[OrdersDetailOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT
                            o.order_id as order_id,
                            o.customer_id as customer_id,
                            o.order_date as order_date,
                            o.total_price as total_price,
                            ARRAY_AGG(json_build_object(
                                'name', mi.name,
                                'price', mi.price,
                                'photo', mi.photo,
                                'quantity', ci.quantity
                            )) as shopping_cart,
                            os.status_id as status,
                            MAX(mi.chef_id) as chef_id,
                            up.email as chef_email,
                            up.phone_number as chef_phone,
                            up.address as chef_address
                        FROM
                            orders as o
                        LEFT OUTER JOIN
                            order_status os
                            ON o.status = os.status_id
                        LEFT OUTER JOIN
                            cart_items ci
                            ON o.shopping_cart_id = ci.shopping_cart_id
                        LEFT OUTER JOIN
                            menu_items mi
                            ON ci.menu_item_id = mi.menu_item_id
                        LEFT OUTER JOIN
                            user_profiles up
                            ON mi.chef_id = up.user_id
                        GROUP BY
                            o.order_id,
                            os.status_id,
                            up.email,
                            up.phone_number,
                            up.address;
                        """,
                    )
                    results = db.fetchall()
                    if results is None:
                        return None
                    result = []
                    for record in results:
                        cart_item = OrdersDetailOut(
                            order_id=record[0],
                            customer_id=record[1],
                            order_date=record[2],
                            total_price=record[3],
                            shopping_cart=record[4],
                            status=record[5],
                            chef_id=record[6],
                            chef_email=record[7],
                            chef_phone=record[8],
                            chef_address=record[9],
                        )
                        result.append(cart_item)
                    return result
        except Exception as e:
            print(e)
            return {"message": "error in query, check console"}

    def update(
        self, order_id: int, orders: UpdateOrderIn
    ) -> Union[OrdersOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        UPDATE orders
                        SET status = %s
                        WHERE order_id = %s
                        RETURNING customer_id, chef_id, order_date, total_price, shopping_cart_id
                        """,
                        [orders.status, order_id],
                    )
                    row = result.fetchone()
                    customer_id = row[0]
                    chef_id = row[1]
                    order_date = row[2]
                    total_price = row[3]
                    shopping_cart_id = row[4]
                    return OrdersOut(
                        order_id=order_id,
                        customer_id=customer_id,
                        chef_id=chef_id,
                        order_date=order_date,
                        total_price=total_price,
                        shopping_cart_id=shopping_cart_id,
                        status=orders.status,
                    )
        except Exception as e:
            print(e)
            return {"message": "Could not update orders"}
