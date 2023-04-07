from fastapi.testclient import TestClient
from main import app
from queries.shopping_carts import ShoppingCartRepository, ShoppingCartOut, ShoppingCartWithCartItemsOut
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
        "is_chef": True
    }


class GetShoppingCartRepository:
    def get_one(self, shopping_cart_id: int) -> ShoppingCartOut:
        if shopping_cart_id == 1:
            return ShoppingCartOut(
                shopping_cart_id=1,
                status=1
            )
        else:
            return None

    def get_one_with_cart_items(self, shopping_cart_id: int) -> ShoppingCartWithCartItemsOut:
        if shopping_cart_id == 1:
            return ShoppingCartWithCartItemsOut(
                    id=1,
                    photo="photo.com",
                    name="food item",
                    quantity=1,
                    price=1
            )
        else:
            return None

def test_get_one():
    app.dependency_overrides[ShoppingCartRepository] = GetShoppingCartRepository
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = get_current_account_data_test

    response = client.get("/cart/1")

    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() == {
        "shopping_cart_id": 1,
        "status": 1
    }

def test_get_one_with_cart_items():
    app.dependency_overrides[ShoppingCartRepository] = GetShoppingCartRepository
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = get_current_account_data_test

    response = client.get("cart/1/items")

    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() == [{
      "id": 1,
      "photo": "photo.com",
      "name": "food item",
      "quantity": 1,
      "price": 1
    }]
