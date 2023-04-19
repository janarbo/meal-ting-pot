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
## Start Frontend auth
Ted piloted starting our frontend auth for our project. We got decently far but started running into several errors that took awhile to work through and fix. After getting through a lot of errors we got to a good point where we felt like stopping for the day was better than running into some more errors because we were running out of class time.

## 4/10/23
## More Frontend auth
We decided to tackle frontend during our spring break to allow us more time on the frontend when we're back in class. Ted decided to pilot again to keep it consistent with our previous work. We worked through a couple errors but ultimately felt like we all needed to review the material and resources a bit more to better understand what we need to do. We took the rest of the time to look through and read material and decided to work together again on Wednesday giving us the next day to study more and be ready to fully tackle frontend auth.


## 4/12/23
## Frontend auth working
We worked again on the frontend auth for a few hours as a group. We ended up getting signup working pretty quick. After some more time consuming errors we were able to finally get our login and logout working together on the frontend. So our frontend and backend auth were now fully functional and working which we were very happy about.


## 4/17/23
## Start of Deployment
Instead of immediately working on our frontend components we wanted to tackle deployment and get it out of the way so that it's not something we have to worry about or get stuck on last minute. We got through the first two steps of setting up caprover and editing our gitlab.yml file to get it up. However once we got to the third step we starting hitting some errors and really took some time to figure out and work through since it was our first time working will this.


##  4/18/23
## Deployment
Today we took some time to decide on a color theme using daisyui which we installed along with tailwindcss to use together on our frontend. After that we went straight back to tackling deployment. We continued to work through step 3 after getting through some minor errors in our code that passed over and ultimately got stuck on step 4 similar to 3. After getting some guidance from other groups we fixed a few things in our code such as typos or just simply missing code. Then we ran into several errors with auth where it was saying it was on gitlabs side and not ours. We did our best to figure it out but called it a day deciding to finish it up tomorrow with a clear head space.


## 4/19/23
## Finishing Deployment
