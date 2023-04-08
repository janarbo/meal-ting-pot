from fastapi import APIRouter, Depends, Response
from typing import Union, Optional, List
from queries.cart_items import (
    Error,
    CartItemIn,
    CartItemOut,
    CartItemRepository,
<<<<<<< HEAD
<<<<<<< HEAD
=======
    UpdateCartItemIn
>>>>>>> main
=======
    UpdateCartItemIn
>>>>>>> 97b48929edb7ae83260268069499d4987de75c7d
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


@router.put("/cart_item/{id}", response_model=Union[CartItemOut, Error])
def update_cart_item(
    id: int,
<<<<<<< HEAD
<<<<<<< HEAD
    cart_item: CartItemIn,
=======
    cart_item: UpdateCartItemIn,
>>>>>>> main
=======
    cart_item: UpdateCartItemIn,
>>>>>>> 97b48929edb7ae83260268069499d4987de75c7d
    repo: CartItemRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[CartItemOut, Error]:
    return repo.update(id, cart_item)


@router.delete("/cart_item/{id}", response_model=bool)
def delete_cart_item(
    id: int,
    repo: CartItemRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> bool:
    return repo.delete(id)
