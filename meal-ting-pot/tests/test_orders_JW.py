from main import app
from fastapi.testclient import TestClient
from queries.orders import OrdersDetailOut, OrdersRepository
from authenticator import authenticator
from typing import List

client = TestClient(app)


def get_current_account_data_test():
    return {
        "first_name": "string",
        "last_name": "string",
        "username": "jacob",
        "hashed_password": "jacob",
        "email": "jacob@email.com",
        "is_chef": True,
    }


class GetOrdersRepository:
    def get_all_orders(self) -> List[OrdersDetailOut]:
        return [
            OrdersDetailOut(
                order_id=1,
                customer_id=2,
                order_date="2023-04-26",
                total_price=100,
                shopping_cart=[],
                status=3,
                chef_id=1,
                chef_email="chef@email.com",
                chef_phone=1111111111,
                chef_address="1111 address ave",
            )
        ]


def test_get_all_orders():
    app.dependency_overrides[OrdersRepository] = GetOrdersRepository
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = get_current_account_data_test

    response = client.get("orders/")

    app.dependency_overrides = {}

    if response.status_code == 404:
        assert response.json() == {"detail": "order not found"}
    else:
        assert response.status_code == 200
        assert response.json() == [
            {
                "order_id": 1,
                "customer_id": 2,
                "order_date": "2023-04-26",
                "total_price": 100,
                "shopping_cart": [],
                "status": 3,
                "chef_id": 1,
                "chef_email": "chef@email.com",
                "chef_phone": 1111111111,
                "chef_address": "1111 address ave",
            }
        ]
