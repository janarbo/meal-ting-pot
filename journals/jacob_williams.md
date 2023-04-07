## 3/27/23

## API Design/Wireframe:

Took feedback and fixed our API design and wireframe to better fit our mvp/goals.

## 3/28/23

## Data schema/Issues:

Made a spreadsheet for our database schema. Started on/finished writing all of our issues using trello.

## 3/29/23

## Database/Tables/Endpoint:

Our group setup our database using PostgreSQL with docker compose. Added migrations for our User Table/Menu Item Table. Created our first endpoint for POST menu item.

## 3/30/23

## Authentication/User login required:

We started on the user authentication which allows users to signup, login, and logout. Updated the POST menu item endpoint to only allow users that are logged in to create a menu item. Modified the user database to include the hashed password.

## 4/3/23

## Added Migrations/Updated description to 1000 char limit in menu item table

Today as a group we added Migrations 003 - User Profile and Social Media, 004 - shopping cart, 005 - order, and updated description to 1000 char limit in menu item table.

## 4/4/23

## Backend endpoint revision

As a group we had one person pilot as the rest followed along and helped out. Worked on revising several backend endpoints after brainstorming in certain areas making we have everything we need on our backend. Ted got redux setup, installed, and ready for when we need it on the frontend.

## 4/5/23

## Orders backend endpoint

Created queries/routers files for the orders endpoint and started implementing the needed features: create order/get all orders/update order. Was able to get it all working after a few tweaks and error shooting with the group. We may need to update it depending on where we go from here but for now its good. The rest of my group worked on getting all their endpoints started and working.

## 4/6/23

## More backend endpoint revision

I piloted for my group as we revised the "update" cart_items to only have the quantity field. After working through some minor errors we were able to get it all working how we wanted. I also piloted on writing the "get all" endpoint for user_profile, so that we can use it to populate the main page. As a group we got a few other revisions done ultimately getting our backend done and then started on frontend auth.

## 4/7/23

## Frontend auth


