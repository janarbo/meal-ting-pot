from fastapi import APIRouter, Depends, Response
from typing import Union, Optional
from queries.cart_items import (
    Error,
    CartItemIn,
    CartItemOut,
    CartItemRepository
)
from authenticator import authenticator

router = APIRouter()


@router.post("/cart_item", response_model=Union[CartItemOut, Error])
def create_cart_item(
    cart_item: CartItemIn,
    response: Response,
    repo: CartItemRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    response.status = 400
    return repo.create(cart_item)
