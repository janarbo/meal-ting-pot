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

Additionally, I created two unit tests for my get_one and get_one_with_cart_items endpoint in the shopping cart query. I wanted to check if the response is in the correct format as the pydantic model and if the response gives an error message when the id does not exist.

Since we're having Spring Break next week, we discussed whether if we wanted to do any project work. We agreed that we wanted to finish the Frontend auth so that we are able to protect and work on any components after break.

</details>

<details>
    <summary>Spring Break</summary>

#### (Monday) 4/10/2023
We agreed as a group to take some time over break to work on our projects. Today, we continued working on frontend authentication. We were able to protect any routes and also set up a userSlice to store user information from payload. Lastly, we wrote the logout and getToken query for our authAPI.

</details>

<details>
    <summary>Week 16</summary>

#### (Monday) 4/17/2023
We learned how to use caprover to deploy our application. We decided to work on that today and then start the frontend components afterwards.

We ended today by revising our .gitlab-ci.yml file to include jobs for testing, building, and deployment. We were able to pass all tests on our latest commit but ran into a CORS issue and an "authenticator module was not found" in the deployment logs.

We plan on asking for guidance from our instructors as we are unsure whether this is a bug in our backend, frontend, or caprover configurations.

#### (Tuesday) 4/18/2023
We resolved our bug from yesterday by revising our production dockerfile. Although the errors were from cors, we had to look more closely at the caprover logs to debug.

We continued working on deployment and was able to get our backend build server running w/o bugs. Though we are getting a cors issue in our frontend service from gitlab.com. We'll continue looking into it tomorrow and plan to get guidance from an instructor.

#### (Wednesday) 4/19/2023
The error was from a small typo in our CORS_HOST environment variable not matching our server in our gitlab yml file. After we resolved that issue, we started our frontend components. I began working on the nav component and did research on tailwind css to make it prettier. Tomorrow, I plan to start on the shopping cart component.

#### (Thursday) 4/20/2023
I spent time researching how others implemented a shopping cart in their front-end and I am deciding on between using createSlice or createContext for my component. There were a lot of informative videos and it helped further my understanding about the state management in redux. I plan on working over the weekend to finish this so that I can make time to do additional css next week.

#### (Sunday) 4/23/2023
I was able to get my shopping cart component finished! I ended up using createContext because it allowed me to share the shopping cart data across my component tree effectively by wrapping it with the provider that was returned. Since chef users will be able to look at their order list and update the status of the order, I also allowed customers to add menu items from different chefs into the cart by creating multiple orders separated by chef_id during checkout.

To reflect, I'm surprised by the amount of progress we made and knowledge we gained from this project. Initially, I was worried I would not pass module 3 because the mvp for our project seemed difficult when we started. Additionally, we would have to get familiar using fastapi, writing sql queries, redux, and frontend-auth.

I'm proud and excited to see where we're at now with our project/growth. I don't think we were expecting to have finished some of these components and deployment early and now we can spend more time on css/readMe documentation. Looking forward to see how this project turns out before we submit it this Friday.

</details>

<details>
    <summary>Week 16</summary>

#### (Monday) 4/24/2023
I resolved some bugs regarding my state for the shoppingCartList component. Afterwards, I worked on the chef store component so that their profile information will be displayed. Lastly, I worked on css for the card components to use tailwind instead of react-bootstrap

</details>
