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
![image info](https://i.gyazo.com/2c6d149b253d2b1671e5cdd5ee8584c9.png)
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


![image info](https://i.gyazo.com/3f8bc426064e128ab2eb913c2a29209f.png)
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




![image info](https://i.gyazo.com/e026ff11c2067cb2aa47f1e97cf069b2.png)
This action updates a profile and stores it within the database.

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



![image info](https://i.gyazo.com/f91fefc8599473e0056ef348a93164fc.png)
This action updates a profile availability and stores it within the database.

<details>
<summary><strong>JSON Request Body:</strong></summary>
<br>

```
    {
     "Availability": true
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
            "Availability": true,
            "tags": "string",
            "featured_menu_item": "string",
            "social_media": [
                "string"
            ]
        }
```
</details>


![image info](https://i.gyazo.com/1d7196fc1529159ef98fc1d0b6fcecc8.png)
 This action gets all profile data.

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

![image info](https://i.gyazo.com/85a293d8398ae4cc87be156df23bed60.png)
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



![image info](https://i.gyazo.com/d3f41d4e0fe8f37eaad0c4afc71e88fa.png)
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

![image info](https://i.gyazo.com/0ee90b78970e52447707b4966a4ff2f7.png)
This action gets one cart item.

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

![image info](https://i.gyazo.com/978a2a665af5ad57e708aadaf862791d.png)
This action updates one cart item.
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

![image info](https://i.gyazo.com/a1c257ef8500e746711ce9734f55faa9.png)
This action delete cart item.

Returns (Status Code 200):
true

![image info](https://i.gyazo.com/2027b2694597d16cf7113c5218d75f06.png)
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
![image info](https://i.gyazo.com/9e4596649383554d0d4f9cd587f378ea.png)
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


![image info](https://i.gyazo.com/d200fccc3cd0013ae747222dfad40053.png)
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


![image info](https://i.gyazo.com/9763b9d855766621839b22929276fda1.png)
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



![image info](https://i.gyazo.com/ab3a63e7732fca7cb6e62a2161136efe.png)
This action creates orders and stores them in the database.

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
![image info](https://i.gyazo.com/780ae9747d22af4599ac2461d623d1f3.png)
This action gets all tags.
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
