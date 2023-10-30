### Accounts
![image info](https://i.gyazo.com/f50f9b0a09cce9cc2d13d4ff49972049.png)
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


![image info](https://i.gyazo.com/7423b304f47858ce199f02e16add1db9.png)
This action logs an existing user into the application.

Request Body:
![image info](https://i.gyazo.com/87b209f2d5d3f8927a6a0bf5e17c9cad.png)

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

![image info](https://i.gyazo.com/19ad65ce4e8afd9adeb4e513c327b294.png)
This action logs an existing user out of the application.

Returns (Status Code 200):
true

![image info](https://i.gyazo.com/383157896b4432be848bbde9d64018ae.png)
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
![image info](https://i.gyazo.com/78171ba96bc2745703376506aa03f573.png)
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


![image info](https://i.gyazo.com/4c392e013e995939f6e2572a64fce1b5.png)
This action get all menu items for the chef.

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

![image info](https://i.gyazo.com/c793044867b291c499dc0b51c0f55c53.png)
This action get all menu items for the customer.

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

![image info](https://i.gyazo.com/b005bdd71ca59defcc1cfbe0ec200aaf.png)
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

![image info](https://i.gyazo.com/2c1092878d4c1db59cae3ff7ee0137a7.png)
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



![image info](https://i.gyazo.com/0755708bd90fd35a12613553417a9855.png)
This action deletes menu item data in the database.
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
