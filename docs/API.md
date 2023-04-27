### Accounts
![image info](api/createAccount.png)
* This action creates an account tied to a specific user and stores it within the database.

<details>
<summary><strong>JSON Request Body:</strong></summary>
<br>

```
    {
        "first_name": "string",
        "last_name": "string",
        "username": "string",
        "hashed_password": "string",
        "email": "string",
        "is_chef": true
    }
```
</details>

<details>
<summary><strong>Returns (Status Code 200):</strong></summary>
<br>

```
    {
        "access_token": "string",
        "token_type": "Bearer",
        "account": {
            "id": "string",
            "first_name": "string",
            "last_name": "string",
            "username": "string",
            "email": "string",
            "is_chef": true
        }
        }
```
</details>


![image info](api/login.png)
* This action logs an existing user into the application.

Request Body:
![image info](api/requestbody.png)

<summary><strong>Returns (Status Code 200):</strong></summary>
<br>

```
    {
    "access_token": "string",
    "token_type": "Bearer"
    }
```
</details>

![image info](api/logout.png)
* This action logs an existing user out of the application.

Returns (Status Code 200):
true

![image info](api/gettoken.png)
* This action gets token stored within the database.

<summary><strong>Returns (Status Code 200):</strong></summary>
<br>

```
  {
    "access_token": "string",
    "token_type": "Bearer",
    "account": {
        "id": "string",
        "first_name": "string",
        "last_name": "string",
        "username": "string",
        "email": "string",
        "is_chef": true
  }
}
```
</details>


### Menu Items
![image info](https://gyazo.com/c5322901e68320541bb4abf3d48ae10f)
* This action get all orders for the chef.

<details>
<summary><strong>Returns (Status Code 200):</strong></summary>
<br>

```
    [
        {
            "menu_item_id": 8,
            "food_type": "main",
            "name": "egg",
            "price": 12,
            "description": "123",
            "comment": "123",
            "photo": "http://images.bigoven.com/image/upload/v1435854425/perfect-soft-boiled-eggs-f87fbe.jpg",
            "spicy_level": 0,
            "tags": "halal",
            "calories": 123,
            "ingredients": "123",
            "chef_id": 6,
            "status": true
        }
    ]
```
</details>
