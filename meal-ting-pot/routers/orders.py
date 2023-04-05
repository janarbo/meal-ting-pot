from fastapi import APIRouter, Depends, Response
from typing import Union, List, Optional
from queries.orders import (
    OrdersIn,
    OrdersRepository,
    OrdersOut,
    Error,
)

from authenticator import authenticator

router = APIRouter()


@router.post("/orders", response_model=Union[OrdersOut, Error])
def create_order(
    orders: OrdersIn,
    response: Response,
    repo: OrdersRepository = Depends(),
    account_data: dict = Depends(authenticator.try_get_current_account_data),
):
    response.status = 400
    return repo.create(orders, account_data)

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
    return orders

@router.put("/orders/{order_id}", response_model=Union[OrdersOut, Error])
def update_order(
    order_id: int,
    orders: OrdersIn,
    response: Response,
    repo: OrdersRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[OrdersOut, Error]:
    order = repo.get_all(order_id)
    if order is None:
        response.status_code = 404
        return {"message": "Order not found"}
    return repo.update(order_id, orders)
