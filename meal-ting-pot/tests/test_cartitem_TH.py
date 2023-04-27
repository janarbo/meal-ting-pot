from fastapi.testclient import TestClient
from main import app
from queries.cart_items import (
    CartItemRepository,
)
from authenticator import authenticator


client = TestClient(app)


def get_current_account_data_test():
    return {
        "id": 1,
        "first_name": "ted",
        "last_name": "hwang",
        "username": "teddd",
        "hased_password": "password",
        "email": "ted@example.com",
        "is_chef": True,
    }


class GetCartItemRepository:
    def create(self, cart_item):
        result = {
            "id": 1,
            "shopping_cart_id": 1,
            "menu_item_id": 1,
            "quantity": 5,
        }
        result.update(cart_item)
        return result


input = {"id": 1, "shopping_cart_id": 1, "menu_item_id": 1, "quantity": 5}

result = {"id": 1, "shopping_cart_id": 1, "menu_item_id": 1, "quantity": 5}


def test_create():
    app.dependency_overrides[CartItemRepository] = GetCartItemRepository

    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = get_current_account_data_test

    response = client.post("/cart-item", json=input)

    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() == result
