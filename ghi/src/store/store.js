import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { authApi } from "../features/auth/authAPI";
import { userSlice }  from "../features/auth/user";
import { menuItemApi } from "../features/menu-items/menuItemApi";
<<<<<<< HEAD
=======
import { shoppingCartApi } from "../features/shopping-cart/shoppingCartApi";
import { chefProfileApi } from "../features/chef-profile/chefProfileApi";
import { orderApi } from "../features/orders/orderApi";
>>>>>>> main

const store = configureStore({
  reducer: {
    auth: userSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [menuItemApi.reducerPath]: menuItemApi.reducer,
<<<<<<< HEAD
=======
    [chefProfileApi.reducerPath]: chefProfileApi.reducer,
    [shoppingCartApi.reducerPath]: shoppingCartApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
>>>>>>> main
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
    .concat(authApi.middleware)
<<<<<<< HEAD
    .concat(menuItemApi.middleware),
=======
    .concat(menuItemApi.middleware)
    .concat(chefProfileApi.middleware)
    .concat(shoppingCartApi.middleware)
    .concat(orderApi.middleware)
>>>>>>> main
});

setupListeners(store.dispatch);
export default store
