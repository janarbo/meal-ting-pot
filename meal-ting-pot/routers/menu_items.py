from fastapi import APIRouter, Depends, Response
from typing import Union
from queries.menu_items import (
    MenuItemIn,
    MenuItemRepository,
    MenuItemOut,
    Error,
)

from authenticator import authenticator

router = APIRouter()


@router.post("/menu_items", response_model=Union[MenuItemOut, Error])
def create_menu_item(
    menu_item: MenuItemIn,
    response: Response,
    repo: MenuItemRepository = Depends(),
    account_data: dict = Depends(authenticator.try_get_current_account_data),
):
    response.status = 400
    return repo.create(menu_item, account_data)
