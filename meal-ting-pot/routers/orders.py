from fastapi import APIRouter, Depends, Response
from typing import Union, List, Optional
from queries.orders import (
    CreateOrderIn,
    UpdateOrderIn,
    OrdersRepository,
    OrdersOut,
    OrdersDetailOut,
    Error,
)

from authenticator import authenticator

router = APIRouter()


@router.post("/orders", response_model=Union[OrdersOut, Error])
def create_order(
    orders: CreateOrderIn,
    response: Response,
    repo: OrdersRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    response.status = 400
    return repo.create(orders, account_data)

@router.get("/orders", response_model=List[OrdersDetailOut])
def get_all_orders(
    response: Response,
    repo: OrdersRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> List[OrdersDetailOut]:
    response.status = 400
    orders = repo.get_all()
    return orders

@router.put("/orders/{order_id}", response_model=Union[OrdersOut, Error])
def update_order(
    order_id: int,
    orders: UpdateOrderIn,
    repo: OrdersRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[OrdersOut, Error]:
    return repo.update(order_id, orders)
