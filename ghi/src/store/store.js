import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { authApi } from "../features/auth/authAPI";
import { userSlice }  from "../features/auth/user";
import { menuItemApi } from "../features/menu-items/menuItemApi";
import { chefProfileApi } from "../features/chef-profile/chefProfileApi";
// import profilesReducer from "../features/chef-profile/profilesSlice";

const store = configureStore({
  reducer: {
    auth: userSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [menuItemApi.reducerPath]: menuItemApi.reducer,
    [chefProfileApi.reducerPath]: chefProfileApi.reducer,
    // profiles: profilesReducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
    .concat(authApi.middleware)
    .concat(menuItemApi.middleware)
    .concat(chefProfileApi.middleware),
});

setupListeners(store.dispatch);
export default store
