from fastapi import FastAPI
from authenticator import authenticator
from fastapi.middleware.cors import CORSMiddleware
import os
from routers import menu_items, accounts, shopping_carts, user_profile, cart_items, orders, social_media

app = FastAPI()
app.include_router(menu_items.router)
app.include_router(authenticator.router)
app.include_router(accounts.router)
app.include_router(user_profile.router)
app.include_router(shopping_carts.router)
app.include_router(cart_items.router)
app.include_router(orders.router)
app.include_router(social_media.router)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.environ.get("CORS_HOST", "http://localhost:3000")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
