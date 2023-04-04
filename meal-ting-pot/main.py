from fastapi import FastAPI
from authenticator import authenticator
from fastapi.middleware.cors import CORSMiddleware
import os
<<<<<<< HEAD
<<<<<<< HEAD
from routers import menu_items, accounts
=======
from routers import menu_items, accounts, shopping_carts
>>>>>>> cf79f95f0da3c1ef8da5ce82c6e48eb5de999dd1
=======
from routers import menu_items, accounts, shopping_carts, user_profile
>>>>>>> 097a156ea7f40fde98712fbafbb6c5f00c194e83

app = FastAPI()
app.include_router(menu_items.router)
app.include_router(authenticator.router)
app.include_router(accounts.router)
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
app.include_router(user_profile.router)
>>>>>>> 097a156ea7f40fde98712fbafbb6c5f00c194e83
app.include_router(shopping_carts.router)
>>>>>>> cf79f95f0da3c1ef8da5ce82c6e48eb5de999dd1

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.environ.get("CORS_HOST", "http://localhost:3000")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
