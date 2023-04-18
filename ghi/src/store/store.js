import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { authApi } from "../features/auth/authAPI";
import { userSlice }  from "../features/auth/user";
import { menuItemApi } from "../features/menu-items/menuItemApi";
import { shoppingCartApi } from "../features/shopping-cart/shoppingCartApi";

const store = configureStore({
  reducer: {
    auth: userSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [menuItemApi.reducerPath]: menuItemApi.reducer,
    [shoppingCartApi.reducerPath]: shoppingCartApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
    .concat(authApi.middleware)
    .concat(menuItemApi.middleware)
    .concat(shoppingCartApi.middleware)
});

setupListeners(store.dispatch);
export default store
