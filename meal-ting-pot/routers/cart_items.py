from fastapi import APIRouter, Depends, Response, HTTPException
from typing import Union
from queries.cart_items import (
    Error,
    CartItemIn,
    CartItemOut,
    CartItemRepository,
    UpdateCartItemIn,
)
from authenticator1 import authenticator

router = APIRouter()


@router.get("/cart-item/{id}", response_model=Union[CartItemOut, Error])
def get_one_cart_item(
    id: int,
    response: Response,
    repo: CartItemRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    cart_item = repo.get_one(id)
    if cart_item is None:
        raise HTTPException(status_code=404, detail="cart item not found")
    return cart_item


@router.post("/cart-item", response_model=Union[CartItemOut, Error])
def create_cart_item(
    cart_item: CartItemIn,
    response: Response,
    repo: CartItemRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    response.status = 400
    return repo.create(cart_item)


@router.put("/cart-item/{id}", response_model=Union[CartItemOut, Error])
def update_cart_item(
    id: int,
    cart_item: UpdateCartItemIn,
    repo: CartItemRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[CartItemOut, Error]:
    cart_item_instance = repo.get_one(id)
    if cart_item_instance is None:
        raise HTTPException(status_code=404, detail="cart item not found")
    return repo.update(id, cart_item)


@router.delete("/cart-item/{id}", response_model=bool)
def delete_cart_item(
    id: int,
    repo: CartItemRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> bool:
    cart_item = repo.get_one(id)
    if cart_item is None:
        raise HTTPException(status_code=404, detail="cart item not found")
    return repo.delete(id)
