from fastapi import FastAPI
from authenticator import authenticator
from fastapi.middleware.cors import CORSMiddleware
import os
<<<<<<< HEAD
from routers import menu_items, accounts, shopping_carts, user_profile, cart_items
=======
from routers import menu_items, accounts, shopping_carts, user_profile, cart_items, orders
>>>>>>> 9486c0f2c03983b04ef9e661b2845c1b0055c7f9

app = FastAPI()
app.include_router(menu_items.router)
app.include_router(authenticator.router)
app.include_router(accounts.router)
app.include_router(user_profile.router)
app.include_router(shopping_carts.router)
app.include_router(cart_items.router)
<<<<<<< HEAD
=======
app.include_router(orders.router)

>>>>>>> 9486c0f2c03983b04ef9e661b2845c1b0055c7f9

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.environ.get("CORS_HOST", "http://localhost:3000")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
