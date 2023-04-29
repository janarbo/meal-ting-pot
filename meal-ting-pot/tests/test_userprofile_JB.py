from fastapi.testclient import TestClient
from main import app
from queries.user_profile import UserProfileRepository, UserProfileDetailOut
from authenticator import authenticator
from typing import List


client = TestClient(app)


def get_current_account_data_test():
    return {
        "first_name": "string",
        "last_name": "string",
        "username": "janar3",
        "hashed_password": "123123",
        "email": "janar@email.com",
        "is_chef": True,
    }


class EmptyProfileQueries:
    def get_all(self) -> List[UserProfileDetailOut]:
        return [
            UserProfileDetailOut(
                profile_id=1,
                user_id=1,
                full_name="Janar B",
                photo="string",
                address="Pasadena",
                availability=True,
                tags="1",
                featured_menu_item="2",
            )
        ]


def test_get_all():
    app.dependency_overrides[UserProfileRepository] = EmptyProfileQueries
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = get_current_account_data_test

    response = client.get("profile/")

    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() == [
        {
            "profile_id": 1,
            "user_id": 1,
            "full_name": "Janar B",
            "photo": "string",
            "address": "Pasadena",
            "availability": True,
            "tags": "1",
            "featured_menu_item": "2",
        }
    ]
