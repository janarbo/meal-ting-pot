from fastapi import APIRouter, Depends, Response
from typing import Union
from queries.menu_items import MenuItemIn, MenuItemRepository, MenuItemOut, Error

router=APIRouter()

@router.post("/menu_items", response_model=Union[MenuItemOut, Error])
def create_menu_item(
    menu_item: MenuItemIn,
    response: Response,
    repo:MenuItemRepository=Depends()
):

    return repo.create(menu_item)
