from fastapi.testclient import TestClient
from main import app
from queries.menu_items import MenuItemRepository
from authenticator import authenticator

client = TestClient(app)

def get_current_account_data_test():
    return {
        "id": 1,
        "first_name": "derek",
        "last_name": "wang",
        "username": "derekwang",
        "hashed_password": "password",
        "email": "derek@mail.com",
        "is_chef": True,
    }


class EmptyMenuItemQueries:
    def get_all_chef(self, account_data):
        return []

class CreateMenuItemQueries:
    def create(self, menu_item, account_data):
        result={
            "menu_item_id": 1,
            "food_type": "string",
            "name": "string",
            "price": 0,
            "description": "string",
            "comment": "string",
            "photo": "string",
            "spicy_level": 0,
            "tags": "string",
            "calories": 0,
            "ingredients": "string",
            "chef_id": 1,
            "status": True
        }

        result.update(menu_item)
        return result

# class UpdateMenuItemQueries:
#     def update(self, menu_item_id, menu_item, account_data):
#         result={
#             "menu_item_id": 1,
#             "food_type": "string2",
#             "name": "string2",
#             "price": 0,
#             "description": "string2",
#             "comment": "string2",
#             "photo": "string2",
#             "spicy_level": 0,
#             "tags": "string2",
#             "calories": 0,
#             "ingredients": "string2",
#             "chef_id": 1,
#             "status": True
#         }

def test_get_all_menu_items():
    app.dependency_overrides[MenuItemRepository] = EmptyMenuItemQueries
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = get_current_account_data_test
    response=client.get("/chef/1/menu_items")
    app.dependency_overrides={}
    assert response.status_code==200
    assert response.json()==[]

def test_create_menu_item():
    app.dependency_overrides[MenuItemRepository]=CreateMenuItemQueries
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = get_current_account_data_test

    json_payload={
        "menu_item_id": 1,
        "food_type": "string",
        "name": "string",
        "price": 0,
        "description": "string",
        "comment": "string",
        "photo": "string",
        "spicy_level": 0,
        "tags": "string",
        "calories": 0,
        "ingredients": "string",
        "status": True
    }
    expected={
    "menu_item_id": 1,
    "food_type": "string",
    "name": "string",
    "price": 0,
    "description": "string",
    "comment": "string",
    "photo": "string",
    "spicy_level": 0,
    "tags": "string",
    "calories": 0,
    "ingredients": "string",
    "chef_id": 1,
    "status": True
    }
    response=client.post("/menu-items", json=json_payload)
    app.dependency_overrides={}

    assert response.status_code == 200
    assert response.json() == expected

# def test_update_menu_item():
#     app.dependency_overrides[MenuItemRepository]=UpdateMenuItemQueries
#     app.dependency_overrides[
#         authenticator.get_current_account_data
#     ]= get_current_account_data_test
#     create_test_data={
#         "menu_item_id": 1,
#         "food_type": "string",
#         "name": "string",
#         "price": 0,
#         "description": "string",
#         "comment": "string",
#         "photo": "string",
#         "spicy_level": 0,
#         "tags": "string",
#         "calories": 0,
#         "ingredients": "string",
#         "status": True
#     }
#     json_payload={
#         "menu_item_id": 1,
#         "food_type": "string2",
#         "name": "string2",
#         "price": 0,
#         "description": "string2",
#         "comment": "string2",
#         "photo": "string2",
#         "spicy_level": 0,
#         "tags": "string2",
#         "calories": 0,
#         "ingredients": "string2",
#         "chef_id": 1,
#         "status": True
#     }
#     expected={
#         "menu_item_id": 1,
#         "food_type": "string2",
#         "name": "string2",
#         "price": 0,
#         "description": "string2",
#         "comment": "string2",
#         "photo": "string2",
#         "spicy_level": 0,
#         "tags": "string2",
#         "calories": 0,
#         "ingredients": "string2",
#         "chef_id": 1,
#         "status": True
#     }
#     client
#     response=client.put("/menu-items/1/", json=json_payload)
#     app.dependency_overrides={}
#     assert response.status_code==200
#     assert response.json()==expected
