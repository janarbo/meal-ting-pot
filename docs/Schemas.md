## Users Table
---------------------------------
| Field            | Type |
| ---------- | ------------------------ |
| id  | SERIAL, PRIMARY KEY NOT NULL|
| first_name | VARCHAR(100) NOT NULL|
| last_name | VARCHAR(100) NOT NULL|
| username | VARCHAR(18) NOT NULL UNIQUE|
| email | VARCHAR(40) NOT NULL UNIQUE|
| is_chef | BOOL NOT NULL|

## Menu Item Table
---------------------------------
| Field            | Type |
| ------------------- | ------ |
|menu_item_id |SERIAL PRIMARY KEY NOT NULL|
|food_type |VARCHAR(100) NOT NULL|
|name |VARCHAR(100) NOT NULL|
|price |REAL NOT NULL|
|description |VARCHAR(1000) NOT NULL|
|comment |VARCHAR(200) NULL|
|photo |VARCHAR(1000) NOT NULL|
|spicy_level |INTEGER NULL|
|tags |VARCHAR(200) NULL|
|calories |INTEGER NOT NULL|
|ingredients |VARCHAR(300) NOT NULL|
|status |BOOL NOT NULL|
|chef_id |INTEGER NOT NULL REFERENCES users(id)|

##  Tags Table
---------------------------------
| Field            | Type |
| ------------------- | ------ |
|id |SERIAL PRIMARY KEY NOT NULL|
|name |VARCHAR(100) NOT NULL|
----------------------------------
| INSERT INTO tags (name)| VALUES |
| ------------------- | ------ |
||Indian|
||Italian|
||African|
||Mediterranean|
||Southeast Asian|
||Mexican|
||American|
||Southern|
||Japanese|
||Latin America|
||Pakistani|
||Kazakhstan|
||Carribbean|
||Korean|
||Middle Eastern|
||Chinese|

## User Profiles Table
---------------------------------
| Field            | Type |
| ------------------- | ------ |
|profile_id |SERIAL PRIMARY KEY NOT NULL|
|user_id |VARCHAR(100) NOT NULL|
|full_name |VARCHAR(100) NOT NULL|
|email |REAL NOT NULL|
|photo |VARCHAR(1000) NOT NULL|
|phone_number |VARCHAR(200) NULL|
|address |VARCHAR(1000) NOT NULL|
|bio |INTEGER NULL|
|availability |VARCHAR(200) NULL|
|tags |INTEGER NOT NULL|
|featured_menu_item |VARCHAR(300) NOT NULL|
|status |BOOL NOT NULL|
|chef_id |INTEGER NOT NULL REFERENCES users(id)|

## Shopping Carts Table
---------------------------------
| Field            | Type |
| ------------------- | ------ |
|shopping_cart_id|SERIAL PRIMARY KEY NOT NULL|

## Cart Items Table
---------------------------------
| Field            | Type |
| ------------------- | ------ |
|id|SERIAL PRIMARY KEY NOT NULL|
|shopping_cart_id| INTEGER NOT NULL REFERENCES shopping_carts(shopping_cart_id)|
|menu_item_id| INTEGER NOT NULL REFERENCES menu_items(menu_item_id)|
|quantity| INTEGER NOT NULL|

## Order Status Table
---------------------------------
| Field            | Type |
| ------------------- | ------ |
|status_id| SERIAL PRIMARY KEY NOT NULL|
|name |VARCHAR(100) NOT NULL|
----------------------------------
| INSERT INTO Order Status (name)| VALUES |
| ------------------- | ------ |
||SUBMITTED|
||CONFIRMED|
||READY_FOR_PICKUP|
||COMPLETED|
||DECLINED|

## Orders Table
---------------------------------
| Field            | Type |
| ------------------- | ------ |
|order_id| SERIAL PRIMARY KEY NOT NULL|
|customer_id |INTEGER references users(id)|
|chef_id |INTEGER references users(id)|
|order_date |DATE NOT NULL|
|total_price |REAL NOT NULL|
|shopping_cart_id| INTEGER NOT NULL REFERENCES shopping_carts(shopping_cart_id)|
|status| INTEGER NOT NULL REFERENCES order_status(status_id)|
