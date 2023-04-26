from datetime import date
from main import app
from fastapi.testclient import TestClient
from unittest.mock import MagicMock
from queries.orders import OrdersOut, OrdersRepository

client = TestClient(app)

def test_get_one():
    mock_cursor = MagicMock()
    mock_conn = MagicMock()
    mock_conn.cursor.return_value = mock_cursor

    expected_sql = "SELECT order_id, customer_id, chef_id, order_date, total_price, shopping_cart_id, status FROM orders WHERE order_id=1"
    expected_result = (1, 2, 3, date(2023, 1, 1), 50, 1, 1)

    mock_repo = OrdersRepository()
    mock_repo.pool.connection.return_value = mock_conn
    mock_cursor.fetchone.return_value = expected_result
    order = OrdersOut(
        order_id=1,
        customer_id=2,
        chef_id=3,
        order_date=date(2023, 1, 1),
        total_price=50,
        shopping_cart_id=1,
        status=1,
    )

    response = client.get("/orders/1")

    mock_cursor.execute.assert_called_once_with(expected_sql, [1])
    assert response.status_code == 200
    assert response.headers["Content-Type"] == "application/json"
    assert response.json() == order.dict()

def test_get_one_not_found():
    mock_cursor = MagicMock()
    mock_conn = MagicMock()
    mock_conn.cursor.return_value = mock_cursor

    expected_sql = "SELECT order_id, customer_id, chef_id, order_date, total_price, shopping_cart_id, status FROM orders WHERE order_id=1"

    mock_repo = OrdersRepository()
    mock_repo.pool.connection.return_value = mock_conn
    mock_cursor.fetchone.return_value = None

    response = client.get("/orders/1")

    mock_cursor.execute.assert_called_once_with(expected_sql, [1])
    assert response.status_code == 404

def test_get_one_error():
    mock_cursor = MagicMock()
    mock_conn = MagicMock()
    mock_conn.cursor.return_value = mock_cursor

    expected_sql = "SELECT order_id, customer_id, chef_id, order_date, total_price, shopping_cart_id, status FROM orders WHERE order_id=1"

    mock_repo = OrdersRepository()
    mock_repo.pool.connection.return_value = mock_conn
    mock_cursor.execute.side_effect = Exception("Database connection error")

    response = client.get("/orders/1")

    mock_cursor.execute.assert_called_once_with(expected_sql, [1])
    assert response.status_code == 500
