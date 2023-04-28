### Accounts
![image info](https://gyazo.com/50457fd65b67d1eea1afaa961ed6c95d)
This action creates an account tied to a specific user and stores it within the database.

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


![image info](https://gyazo.com/ca46996d1bc4522fcb0166f9efc6266c)
This action logs an existing user into the application.

Request Body:
![image info](https://gyazo.com/25bbe1936d6e1b57e0f9c104e7d2cb31)

<details>
<summary><strong>Returns (Status Code 200):</strong></summary>
<br>

```
    {
    "access_token": "string",
    "token_type": "Bearer"
    }
```
</details>

![image info](https://gyazo.com/e3668c21142e2a99fa061e923e1b5964)
This action logs an existing user out of the application.

Returns (Status Code 200):
true

![image info](https://gyazo.com/96c042a08b0c8ed6641cc5c47643818d)
This action gets token stored within the database.
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


### Menu Items
![image info](https://gyazo.com/5574e4136313f0e7286fd12c7c9c4bad)
This action creates an menu item and stores it within the database.

<details>
<summary><strong>JSON Request Body:</strong></summary>
<br>

```
        {
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
            "status": true
        }
```
</details>


<details>
<summary><strong>Returns (Status Code 200):</strong></summary>
<br>

```
        {
            "menu_item_id": 0,
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
            "chef_id": 0,
            "status": true
        }
```
</details>


![image info](https://gyazo.com/c5322901e68320541bb4abf3d48ae10f)
This action get all orders for the chef.

<details>
<summary><strong>Returns (Status Code 200):</strong></summary>
<br>

```
    [
        {
            "menu_item_id": 0,
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
            "chef_id": 0,
            "status": true
        }
]
```
</details>

![image info](https://gyazo.com/88be1523796d9eabcea2751b36e970f2)
This action get all orders for the customer.

<details>
<summary><strong>Returns (Status Code 200):</strong></summary>
<br>

```
    [
        {
            "menu_item_id": 0,
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
            "chef_id": 0,
            "status": true
        }
]
```
</details>

![image info](https://gyazo.com/1b842b990a15dd1670ceb76514d1988b)
* This action get one menu item detail for the customer.
<details>
<summary><strong>Returns (Status Code 200):</strong></summary>
<br>

```
        {
            "menu_item_id": 0,
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
            "chef_id": 0,
            "status": true
        }
```
</details>

![image info](https://gyazo.com/fe4c0649992fbe495d47f5f60abfed1c)
This action update menu item data in the database.

<details>
<summary><strong>JSON Request Body:</strong></summary>
<br>

```
            {
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
                "status": true
            }
```
</details>


<details>
<summary><strong>Returns (Status Code 200):</strong></summary>
<br>

```
            {
                    "menu_item_id": 0,
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
                    "chef_id": 0,
                    "status": true
            }
```
</details>



![image info](https://gyazo.com/81acd2db9f7975be1f92daffa25aeb86)
Returns (Status Code 200):
true

### Profile Page
![image info](https://gyazo.com/9c6edeec347f19b45cc65b047670b3dd)
This action creates an profile and stores it within the database.

<details>
<summary><strong>JSON Request Body:</strong></summary>
<br>

```
     {
        "full_name": "string",
        "email": "string",
        "photo": "string",
        "phone_number": 0,
        "address": "string",
        "bio": "string",
        "availability": true,
        "tags": "string",
        "featured_menu_item": "string"
}
```
</details>


<details>
<summary><strong>Returns (Status Code 200):</strong></summary>
<br>

```
        {
            "profile_id": 0,
            "user_id": 0,
            "full_name": "string",
            "email": "string",
            "photo": "string",
            "phone_number": 0,
            "address": "string",
            "bio": "string",
            "availability": true,
            "tags": "string",
            "featured_menu_item": "string",
            "social_media": [
                "string"
            ]
        }
```
</details>


![image info](https://gyazo.com/96e56b86b386da81c00f58329fd72da3)
This action get one profile data.

<details>
<summary><strong>Returns (Status Code 200):</strong></summary>
<br>

```
        {
            "profile_id": 0,
            "user_id": 0,
            "full_name": "string",
            "email": "string",
            "photo": "string",
            "phone_number": 0,
            "address": "string",
            "bio": "string",
            "availability": true,
            "tags": "string",
            "featured_menu_item": "string",
            "social_media": [
                "string"
            ]
        }
```
</details>




![image info](https://gyazo.com/71552b3b22769c33b0ed2602530ff437)
This action update an profile and stores it within the database.

<details>
<summary><strong>JSON Request Body:</strong></summary>
<br>

```
     {
        "full_name": "string",
        "email": "string",
        "photo": "string",
        "phone_number": 0,
        "address": "string",
        "bio": "string",
        "availability": true,
        "tags": "string",
        "featured_menu_item": "string"
}
```
</details>


<details>
<summary><strong>Returns (Status Code 200):</strong></summary>
<br>

```
        {
            "profile_id": 0,
            "user_id": 0,
            "full_name": "string",
            "email": "string",
            "photo": "string",
            "phone_number": 0,
            "address": "string",
            "bio": "string",
            "availability": true,
            "tags": "string",
            "featured_menu_item": "string",
            "social_media": [
                "string"
            ]
        }
```
</details>



![image info](https://gyazo.com/d5c8b02c8638041fc9c9462f36ef403b)
This action update an profile availabilty and stores it within the database.

<details>
<summary><strong>JSON Request Body:</strong></summary>
<br>

```
    {
     "availability": true
    }

```
</details>


<details>
<summary><strong>Returns (Status Code 200):</strong></summary>
<br>

```
        {
            "profile_id": 0,
            "user_id": 0,
            "full_name": "string",
            "email": "string",
            "photo": "string",
            "phone_number": 0,
            "address": "string",
            "bio": "string",
            "availability": true,
            "tags": "string",
            "featured_menu_item": "string",
            "social_media": [
                "string"
            ]
        }
```
</details>


![image info](https://gyazo.com/3792ab2a2626ca3a8371172f5f2409e6)
 This action get all profiles data.

<details>
<summary><strong>Returns (Status Code 200):</strong></summary>
<br>

```
        {
            "message": "string"
        }
```
</details>



### Shopping Cart

![image info](https://gyazo.com/0135fa60b587f58f70324299efbca7c6)
This action create one shopping cart and stores it within the database.



<details>
<summary><strong>Returns (Status Code 200):</strong></summary>
<br>

```
        {
            "shopping_cart_id": 0
        }
```
</details>



![image info](https://gyazo.com/f4c8a2964aab56233f0f604a580d6409)
This action get one shopping cart with items.

<details>
<summary><strong>Returns (Status Code 200):</strong></summary>
<br>

```
       [
            {
                "id": 0,
                "photo": "string",
                "name": "string",
                "quantity": 0,
                "price": 0
            }
        ]
```
</details>


### Cart Items

![image info](https://gyazo.com/4f5a5c8f82c012048f5d673746778f07)
This action get one cart item.

<details>
<summary><strong>Returns (Status Code 200):</strong></summary>
<br>

```
       {
            "id": 0,
            "shopping_cart_id": 0,
            "menu_item_id": 0,
            "quantity": 0
    }
```
</details>

![image info](https://gyazo.com/5eea55b86262fc8fbbe742fdbf3efc89)
This action update one cart item.
<details>
<summary><strong>JSON Request Body:</strong></summary>
<br>

```
        {
             "quantity": 0
        }

```
</details>

<details>
<summary><strong>Returns (Status Code 200):</strong></summary>
<br>

```
      {
        "id": 0,
        "shopping_cart_id": 0,
        "menu_item_id": 0,
        "quantity": 0
      }
```
</details>

![image info](https://gyazo.com/5eb5d3eb1cfc2e0a4cf12dc58b3c249b)
This action delete cart item.

Returns (Status Code 200):
true

![image info](https://gyazo.com/93bfb5bcdad16f1ff307a8cfbb7abc26)
This action create cart item.

<details>
<summary><strong>JSON Request Body:</strong></summary>
<br>

```
        {
            "shopping_cart_id": 0,
            "menu_item_id": 0,
            "quantity": 0
        }
```
</details>


<details>
<summary><strong>Returns (Status Code 200):</strong></summary>
<br>

```
        {
            "id": 0,
            "shopping_cart_id": 0,
            "menu_item_id": 0,
            "quantity": 0
        }
```
</details>

### Orders
![image info](https://gyazo.com/052509332988063824b05ef2286a6de1)
This action get one order.
<details>
<summary><strong>Returns (Status Code 200):</strong></summary>
<br>

```
        {
            "order_id": 0,
            "customer_id": 0,
            "chef_id": 0,
            "order_date": "2023-04-27",
            "total_price": 0,
            "shopping_cart_id": 0,
            "status": 0
        }
```
</details>


![image info](https://gyazo.com/8c6b0ab05d6fa8effbac82676849273b)
This action update one order and  stors in the database.
<details>
<summary><strong>JSON Request Body:</strong></summary>
<br>

```
        {
            "status": 0
        }
```
</details>


<details>
<summary><strong>Returns (Status Code 200):</strong></summary>
<br>

```
        {
            "order_id": 0,
            "customer_id": 0,
            "chef_id": 0,
            "order_date": "2023-04-27",
            "total_price": 0,
            "shopping_cart_id": 0,
            "status": 0
        }
```
</details>


![image info](https://gyazo.com/d89e354aa225c15e78b41b9be1cef486)
This action get all orders data.
<details>
<summary><strong>Returns (Status Code 200):</strong></summary>
<br>

```
        [
            {
                "order_id": 0,
                "customer_id": 0,
                "order_date": "2023-04-27",
                "total_price": 0,
                "shopping_cart": [
                {
                    "name": "string",
                    "price": 0,
                    "photo": "string",
                    "quantity": 0
                }
                ],
                "status": 0,
                "chef_id": 0,
                "chef_email": "string",
                "chef_phone": 0,
                "chef_address": "string"
            }
        ]
```
</details>



![image info](https://gyazo.com/73ed186b8a2ca932089377cf292df374)
This action create order and stores in database.

<details>
<summary><strong>JSON Request Body:</strong></summary>
<br>

```
       {
            "order_date": "2023-04-27",
            "total_price": 0,
            "shopping_cart_id": 0,
            "chef_id": 0
        }
```
</details>


<details>
<summary><strong>Returns (Status Code 200):</strong></summary>
<br>

```
        {
            "order_id": 0,
            "customer_id": 0,
            "chef_id": 0,
            "order_date": "2023-04-27",
            "total_price": 0,
            "shopping_cart_id": 0,
            "status": 0
        }
```
</details>


### Tags
![image info](https://gyazo.com/98ecc422f82d6af290ffbb60cf736f88)
This action get all tags.
<details>
<summary><strong>Returns (Status Code 200):</strong></summary>
<br>

```
        [
            {
                "id": 0,
                "name": "string"
            }
        ]
```
</details>
