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
We spent most of the day working slowly through the bugs/errors we still had. For the big issue where it was saying the error was on gitlabs side, we ended up realizing that we probably had some urls wrong that would be directing us there instead of where we want to go. After changing one of the urls we pushed the changes and tried and it worked! It was basically the one thing we didn't really check because we figured we'd have them all correct but we definitely learned from it. While the 3 of us were working towards the end of the day Janar wanted to start on the landing page component and signup/login which she ended up getting done as we fixed the url error.

## 4/20/23
## Frontend Components
Today we all started on the frontend components as it's pretty much the last thing we need to do. I worked on the sidebar component that displays on two of our other pages or components. It requires having several buttons such as Home, My profile, Create profile, My menu, See My Orders, Available/Unavailable, Log out, and Support Center. I got everything up and looking alright for the time being but I'm stopping for today because the functionality behind the available/unavailable button was confusing me and class is over.

## 4/24/23
## More Frontend Components
I picked up the about us/footer component ticket as well for today because I knew I'd figure out the button situation on the sidebar. Which I did and it was just me approaching the problem wrong, I realized once I shared my screen and Tedd helped guide me in the right direction and from there I got it functioning how we wanted. After that I went straight to working on the about us/footer which were pretty easy as well. Was just a matter of getting everything we wanted to show up on the screen to show up and messing with tailwindcss to get it somewhat in the right area so that it's ready for when we really dive into the css. Once I got everything onto the about us page such as a mission statement, promise/pledge, and a team members section I put some placeholder info so that I could at least see where it was showing up. I was able to also add links to our gitlab/linkedin accounts under each little profile. After that I pushed it to main with the merge request. On the footer honestly what took the most time was just getting it on the bottom of the main page like an actual footer, for some reason it was more challenging than I thought lol. Once I did I just had to add a few things like our website name with a little paragraph about who we are and what we do. Along with a featured links section on the left that has an "about us" under it redirecting to the about us page. On the right of the footer I added a contact us section that has a placeholder email and phone number for us for now. I then pushed that to main as well followed by the sidebar using separate merge requests. I ended up getting everything done I wanted to and picked up one of the last two tickets which was the customer order history page that I plan to work on tomorrow.

## 4/25/23
## Customer Orders History Page
Starting off today I got some code onto the customer order history page and then realized that I'd have to create an order and everything that entails in the backend to see it show up in my frontend component. This is because we don't quite have all the functionality to do it all in the frontend yet. After I did so (not a fun process lol) I saw the orders pop up and ran into a mapping error which I fixed, I was mapping over "orders" instead of mapping through the orders using "orders_id" as the key. After that everything showed up how I wanted it to. However I realized after looking at our wireframes that I needed to include the chefs email, phone number, and address inside of each order column. So I added that and realized that for the status of the order I was displaying the integer instead of the word that we want associated with the integer. I looked in our backend migration tables and found the 5 status keywords we wanted to use. I then created a function that maps the integer value to the corresponding status word, and then called that function to display the word instead of the integer. After that everything was how we wanted it so I pushed to main with a merge request.

## 4/26/23
## Revises and TailwindCSS
Today all of the work we got done was either revising some code, fixing some edge cases, and adding some basic tailwindcss for the styling/flow of our website. I made it so that the customer order history page is filtered by customer_id with guidance from my group to ensure it only displays the orders for whoever is logged in. I also wrote my orders unit test that's required and got it passing. After all of that I just worked on some tailwindcss for our about us page component.

## 4/27/23
## TailwindCSS and final tweaks
We got all of our functionality up and deployed today as it's passing the pipeline in gitlab. I worked on some minor changes to our styling with tailwindcss on the customer order history page component, and sidebar component. That way our website flows a bit better and has an actual color scheme for now at least. I fixed some minor import issues, and lastly as a group we're working on getting our api design, wireframe, and database scheme documentation implemented into our project. We'll be adding the GHI documentation next week as it's not apart of our grade, plus we want to make some changes to improve our website/add better css to ultimately have a professional looking website.
