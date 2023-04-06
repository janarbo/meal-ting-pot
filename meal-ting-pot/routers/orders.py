from fastapi import APIRouter, Depends, Response
from typing import Union, List, Optional
from queries.orders import (
<<<<<<< HEAD
    CreateOrderIn,
    UpdateOrderIn,
    OrdersRepository,
    OrdersOut,
    OrdersDetailOut,
=======
    OrdersIn,
    OrdersRepository,
    OrdersOut,
>>>>>>> main
    Error,
)

from authenticator import authenticator

router = APIRouter()


@router.post("/orders", response_model=Union[OrdersOut, Error])
def create_order(
<<<<<<< HEAD
    orders: CreateOrderIn,
    response: Response,
    repo: OrdersRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
=======
    orders: OrdersIn,
    response: Response,
    repo: OrdersRepository = Depends(),
    account_data: dict = Depends(authenticator.try_get_current_account_data),
>>>>>>> main
):
    response.status = 400
    return repo.create(orders, account_data)

<<<<<<< HEAD
@router.get("/orders", response_model=List[OrdersDetailOut])
def get_all_orders(
    response: Response,
    repo: OrdersRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> List[OrdersDetailOut]:
    response.status = 400
    orders = repo.get_all()
=======
@router.get("/orders", response_model=List[OrdersOut])
def get_all_orders(
    response: Response,
    repo: OrdersRepository = Depends(),
    customer_id: Optional[int] = None,
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> List[OrdersOut]:
    orders = repo.get_all(customer_id=customer_id)
    if not orders:
        response.status_code = 404
>>>>>>> main
    return orders

@router.put("/orders/{order_id}", response_model=Union[OrdersOut, Error])
def update_order(
    order_id: int,
<<<<<<< HEAD
    orders: UpdateOrderIn,
    repo: OrdersRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[OrdersOut, Error]:
=======
    orders: OrdersIn,
    response: Response,
    repo: OrdersRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[OrdersOut, Error]:
    order = repo.get_all(order_id)
    if order is None:
        response.status_code = 404
        return {"message": "Order not found"}
>>>>>>> main
    return repo.update(order_id, orders)
