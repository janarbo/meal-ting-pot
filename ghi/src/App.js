import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import LoginForm from './LoginForm.js';
import LandingPage from './LandingPage.js';
import SignupForm from './SignupForm.js';
import MainPage from './MainPage.js';
import Nav from './Nav.js';
import { useGetTokenQuery } from './features/auth/authAPI.js';
import Protected from './features/auth/protected.js';
import ProfileForm from './features/chef-profile/ChefProfileForm.js';
import ChefProfilePage from './features/chef-profile/ChefProfilePage.js'
import UpdateProfileForm from './features/chef-profile/UpdateProfile.js';
import GetAllChefMenuList from './features/menu-items/chefMenuList.js';
import CreateMenuItemForm from './features/menu-items/createMenuItemForm.js';
import UpdateMenuItemForm from './features/menu-items/chefUpdateMenuItem.js';
import ShoppingCartList from './components/shopping-cart/ShoppingCartList.js';
import AboutUs from './AboutUs.js';
import ChefOrderList from './ChefOrderList.js';
import CustomerOrderList from './components/orders/CustomerOrderList.js';
import ShoppingCartProvider from './features/shopping-cart/shoppingCartContext.js';
import ChefStore from './components/chef/ChefStore.js';


function App() {
  const { data } = useGetTokenQuery();

  if ( data === undefined ) {
    return null;
  }

  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, '');

  return (
    <>
      <ShoppingCartProvider>
        <BrowserRouter basename={basename}>
          <Nav accountInfo={data} />
          <Routes>
            <Route element={<Protected token={data} />}>
              <Route path="home" element={<MainPage />} />
              <Route path="chef">
                <Route path="menu-items" element={<GetAllChefMenuList />} />
                <Route path="menu-items/new" element={<CreateMenuItemForm/>}/>
                <Route path="menu-items/edit/:menuItemId" element={<UpdateMenuItemForm/>}/>
              <Route path="profile/create" element={<ProfileForm />} />
              <Route path="profile/:profileId" element={<ChefProfilePage/>} />
              <Route path="profile/:profileId/edit" element={<UpdateProfileForm />} />
              <Route path="orders" element={<ChefOrderList />} />
            </Route>
              <Route path="chef/orders" element={<ChefOrderList />} />
              <Route path="chef/:fullName/:userId/:profileId" element={<ChefStore />} />
              <Route path="cart" element={<ShoppingCartList />} />
              <Route path="about" element={<AboutUs />} />
              <Route path="orders" element={<CustomerOrderList />} />
            </Route>
            <Route path="" element={<LandingPage />} />
            <Route path="login" element={<LoginForm accountInfo={data} />} />
            <Route path="signup" element={<SignupForm accountInfo={data} />} />
          </Routes>
        </BrowserRouter>
      </ShoppingCartProvider>
    </>
  );
}

export default App;
