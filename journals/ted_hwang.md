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

#### (Wednesday) 4/5/2023

#### (Thursday) 4/6/2023

#### (Friday) 4/7/2023

</details>
