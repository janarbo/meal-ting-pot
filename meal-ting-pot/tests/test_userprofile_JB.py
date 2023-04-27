from fastapi.testclient import TestClient
from main import app
from queries.user_profile import UserProfileRepository
from authenticator import authenticator


client = TestClient(app)


class EmptyProfileQueries:
    def get_all(self):
        return [all_profiles_test]


all_profiles_test = {
    "profile_id": 1,
    "user_id": 1,
    "full_name": "Janar B",
    "address": "Pasadena",
    "availability": True,
    "tags": "African",
    "featured_menu_item": "https://betsylife.com/wp-content/uploads/2019/11/pho.jpg",
}

test_account = {
    "profile_id": 1,
    "first_name": "janar",
    "last_name": "bo",
    "username": "janar",
    "hased_password": "123123",
    "email": "janar@email.com",
    "is_chef": True,
}


def account_override():
    return test_account


def test_get_all():
    app.dependency_overrides[UserProfileRepository] = EmptyProfileQueries
    response = client.get("profile/")
    app.dependency_overrides[
        authenticator.try_get_current_account_data
    ] = account_override
    print(response.status_code)
    print(response.json())
    if response.status_code == 401:
        assert response.json() == {"detail": "Invalid token"}
    elif response.status_code == 404:
        assert response.json() == {"detail": "profile not found"}
    else:
        assert response.status_code == 200
        assert response.json() == [all_profiles_test]
    app.dependency_overrides = {}
