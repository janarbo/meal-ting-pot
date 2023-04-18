from fastapi import APIRouter, Depends, Response
from typing import List, Union, Optional
from queries.menu_items import (
    MenuItemIn,
    MenuItemRepository,
    MenuItemOut,
    Error,
)

from authenticator import authenticator

router = APIRouter()


@router.post("/menu-items", tags=["MENU ITEMS"], response_model=Union[MenuItemOut, Error])
def create_menu_item(
    menu_item: MenuItemIn,
    response: Response,
    repo: MenuItemRepository = Depends(),
    account_data: dict = Depends(authenticator.try_get_current_account_data),
):
    response.status = 400
    return repo.create(menu_item, account_data)

@router.get("/chef/{chef_id}/menu_items", tags=["MENU ITEMS"], response_model=Union[List[MenuItemOut], Error])
def get_all_chef(
    repo: MenuItemRepository = Depends(),
    account_data:dict=Depends(authenticator.get_current_account_data),
):
    return repo.get_all_chef(account_data)

@router.get("/menu-items", response_model=Union[List[MenuItemOut], Error])
def get_all_customer(
    chef_id:int,
    repo:MenuItemRepository=Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
):
    return repo.get_all_customer(chef_id)

@router.put("/menu-items/{menu_item_id}", response_model=Union[MenuItemOut, Error])
def update_menu_item(
    menu_item_id:int,
    menu_item: MenuItemIn,
    repo: MenuItemRepository = Depends(),
    account_data: dict= Depends(authenticator.get_current_account_data),
)-> Union[Error, MenuItemOut]:
    return repo.update(menu_item_id, menu_item, account_data)

@router.delete("/menu-items/{menu_item_id}", response_model=bool)
def delete_menu_item(
    menu_item_id: int,
    repo: MenuItemRepository=Depends(),
    account_data: dict= Depends(authenticator.get_current_account_data),
)->bool:
    return repo.delete(menu_item_id)

@router.get("/menu-items/{menu_item_id}", response_model=Optional[MenuItemOut])
def get_one_menu_item(
    menu_item_id: int,
    response: Response,
    repo: MenuItemRepository=Depends(),
    account_data: dict= Depends(authenticator.get_current_account_data),
)->MenuItemOut:
    menu_item=repo.get_one(menu_item_id)
    if menu_item is None:
        response.status_code=404
        return menu_item
