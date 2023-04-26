### Monday 3-27-2023
* Modified wireframe, added some features.


### Tuesday 3-28-2023
* Finished issue creating.


### Wednesday 3-29-2023
* Derek led as driver we collabrated as a team.
* Edited our docker-compose.yml.
* Got beekeeper studio connected.
* Created our user/menu tables.
* Made one endpoint with mock data responding.


### Thursday 3-30-2023
* Ted led as a driver we tackled the authentication task as a team.
* We followed the video in learn, but the video is for mongodb, we have to search other resources get the auth done.
* Big shout out to my teammates, they were able to resolve all issues promptly and in a very professional manner.


### Monday 4-03-2023
* Derek led as driver.
* Created table for user profiles and social media.
* Created table for shopping cart, cart status, and cart items.
* Created table for orders and order status
* Created queries in beekeeper to join tables together, we faced some challenges with joining the tables due to their complex relationships, but thanks to the expertise of our amazing teammates, we were able to figure it out and write queries using Beekeeper.
* Tomorrow we will be working on the endpoints.

### Tuesday 4-04-2023
* Finished create, update, get one profile for user_profile table endpoint.
* Finished create, update, delete for social_media table endpoint.
* Tomorrow we will be working on the frontend.

### Wednesday 4-04-2023
* Combined social_media and use_profile table for get_one endpoint, got stuck on how to return a list with all social_media included.
* Updated create and update function for user_profile table endpoint.

### Thursday 4-05-2023
* With my teammates help, I got get_one profile function worked.
* Ted led as driver we started our frontend auth.

###  Monday 4-10-2023
* Ted led as driver we finished our frontend auth.

###  Wednesday 4-12-2023
* Ted led as driver we worked together on frontend for menu_item.
* We installed tailwindcss together.

###  Thurday 4-13-2023
* I finished frontend of get all profiles by using redux, and made it rendered as card style,this feature allows customer users to be able to choose their prefered chef and order food from chef profile detail page.

### Friday 4-14-2023
* I finished frontend of profile form by using redux, this feature allows chef users to edit their profile information after they logged in.
* When I input the phone number, I found that the phone number type is integer which has limited max size, so I changed the data type to BIGINT.
* I also created the endpoint for get all tags, which can populate the tags for drop down menu in profile form.

### Monday 4-17-2023
* We worked as a group, Ted led as driving, we worked on the deployment today, we ran into a CORS issue in the deployment logs.

### Tuesday 4-18-2023
* Ted led as driving, we worked on the deployment, we were able to get our backend running, but got CORS error from gitlab authentication.

### Wednesday 4-19-2023
* We asked instructions on our deployment issue, and it was a typo in our CORS_HOST environment variable.
* After running deployment wo issue, we started working on the frontend.
* I did some css to profile form.
* Added some css to landing page.

### Thursday 4-20-2023
* Today we continued working on the frontend, I was able to get GetOneProfilePage done.

### Friday 4-21-2023
* I started the edit profile frontend, watched the redux instruction video, it was helpful.

### Monday 4-24-2023
* I finished the edit profile frontend today, I was ran into an issue that profile_id is not valid integer, I tried parse it to int, but it didn't help, when Ted trouble shooting Derek's code, I found that my APIslice query url is not passing correctly, we change the profileId to profile_id, and it solved the profileId issue!

### Tuesday 4-25-2023
* Today I worked on the chef order list frontend, it is quite chanlenging for me cuz there are 4 filter button to handle, I get the order_id is not valid interger error again, and my teammates helped me debug, we pass value as params to the handle update order function, and also deleted unused chefId params, also modified the providetag to providestag in the ApiSlice file, it was a typo, then fixed the issue. Big shout out to my teamates!
* I also finished a unit test for the get all profile function today.
* I fixed the order list problem,  seperated multiple items to different row in one order.
* Hopefully tmr we will start CSS for the frontend.
