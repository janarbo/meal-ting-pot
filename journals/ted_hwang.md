## Ted Hwang

<details>
    <summary>Week 14</summary>

#### (Monday) 3/27/2023
As a group, we reevaluated our API design after receiving feedback from our instructors. For instance, users can select which account they are signing up for using a checkbox. Before, users would have to submit a chef application form upon signup. Another change was we would have an availability boolean property in our chef profile that would prevent customers from seeing their menu items if it was set to false. Before, when the chef creates a menu item, a date needed to be specified. We were considering this feature to be a stretch goal instead of our MVP.

For the remainder of the day, we continued working on our database schemas.

#### (Tuesday) 3/28/2023
After finalizing our API design and database schema, we worked on creating our issue tickets in trello to sync with gitlab. Each ticket would complete a part of the user story in our application.

#### (Wednesday) 3/29/2023
Derek led as the driver for our first coding session and we edited our docker-compose.yaml to create a postgres database container. Addditionally, we were able to hook up our database to beekeeper and begin creating user/menu item tables.

#### (Thursday) 3/30/2023
Today, I led as the driver and our group started on backend authentication. We were able to create signup/login/logout endpoints using the jwtdown-fastapi package a Hack Reactor instructor has created. Also, we edited the create-menu-item endpoint to only allow users that are signed in. In the future, users with the is_chef boolean property set to True will only be able to use this endpoint.

</details>

<details>
    <summary>Week 15</summary>

#### (Monday) 4/3/2023
Derek led as the driver to finalize creating our postgres tables. We finished creating the following tables ___.
- user profile
- social media
- shopping cart
- cart status
- cart items
- order,
- order status

Additionally, for tables that had references to another table, we created queries in beekeeper to join tables together. Tomorrow, we plan on pairing up to finalize our backend endpoints.

#### (Tuesday) 4/4/2023
We ended up working individually to work on our backend endpoints. I completed the create, update, and delete endpoint for the cart_item table. Additionally, I created a get endpoint for shopping cart to include the cart_item table and menu_item table. I had trouble figuring out how to join the tables together but eventually got the output I wanted in beekeeper studio.

#### (Wednesday) 4/5/2023
We made a few revisions to our database schema for our user story. For instance, a chef was supposed to be able to delete a menu item from their list, however, it was used as a foreign key in the orders table. Therefore, if a customer created an order with that menu item, the chef was unable to delete the menu item. To resolve this, we added a status property to menu item which is a boolean. The chef can set it to false to "delete" (hide the item from customers and the chef). Perhaps MongoDb would have been a better implementation because there are no foreign key constraints.

Afterwards, we worked individually to continue our backend endpoints. I revised the GET endpoint for our orders table to include further details from other tables like the name, price, quantity, and photo of each cart item in the shopping cart. Additionally, revise the UPDATE endpoint to only take in the status input from the user. After an order is created, users should not be able to change the shopping cart id, total price, or order date in the order instance.

#### (Thursday) 4/6/2023
Janar and Jacob finished the remaining backend endpoints as drivers and, since Derek and I finished, we helped navigate if they ran into any issues. We were getting a value type error for one of the properties and fixed the issue by revising the pydantic model.

Although we finished, in the near future, I want to revise the create order endpoint so that, if multiple menu items in the shopping cart come from different chefs, the shopping cart items will be grouped by chef and have an order for each.

In the remaining time, we got started on frontend authentication for Redux by looking into documentation. The material is very dense and we definitely need to research more to finish front-end authentication.

#### (Friday) 4/7/2023
Yesterday, Derek did some research after class and got the login portion for frontend auth working. Today, I led as the driver for frontend auth for creating an account. I was running into an issue where the value that was expected was a dictionary. Instead of using FormData, i created a dictionary based on the info provided from each form input. This resolved the issue and we were able to have the user create an account and receive a JWT token in their cookies.

Since we're having Spring Break next week, we discussed whether if we wanted to do any project work. We agreed that we wanted to finish the Frontend auth so that we are able to protect and work on any components after break.

</details>
