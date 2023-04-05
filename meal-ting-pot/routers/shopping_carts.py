from fastapi import APIRouter, Depends, Response
from typing import Union, Optional, List
from queries.shopping_carts import (
    Error,
    ShoppingCartIn,
    ShoppingCartOut,
    ShoppingCartWithCartItemsOut,
    ShoppingCartRepository,
)
from authenticator import authenticator

router = APIRouter()


@router.post("/cart", response_model=Union[ShoppingCartOut, Error])
def create_shopping_cart(
    response: Response,
    repo: ShoppingCartRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    response.status = 400
    return repo.create()


@router.get(
    "/cart/{shopping_cart_id}", response_model=Optional[ShoppingCartOut]
)
def get_one_shopping_cart(
    shopping_cart_id: int,
    response: Response,
    repo: ShoppingCartRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> ShoppingCartOut:
    shopping_cart = repo.get_one(shopping_cart_id)
    if shopping_cart is None:
        response.status_code = 404
    return repo.get_one(shopping_cart_id)


@router.get(
        "/cart/{shopping_cart_id}/items", response_model=Union[Optional[List[ShoppingCartWithCartItemsOut]], Error]
)
def get_one_shopping_cart_w_items(
    shopping_cart_id: int,
    response: Response,
    repo: ShoppingCartRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    shopping_cart = repo.get_one_with_cart_items(shopping_cart_id)
    if shopping_cart is None:
        response.status_code = 400
    return shopping_cart

@router.put(
    "/cart/{shopping_cart_id}", response_model=Union[ShoppingCartOut, Error]
)
def update_shopping_cart(
    shopping_cart_id: int,
    shopping_cart: ShoppingCartIn,
    repo: ShoppingCartRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[Error, ShoppingCartOut]:
    return repo.update(shopping_cart_id, shopping_cart)
