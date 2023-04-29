import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import LoginForm from './LoginForm.js';
import LandingPage from './LandingPage.js';
import SignupForm from './SignupForm.js';
import MainPage from './MainPage.js';
import Nav from './Nav.js';
import { useGetTokenQuery } from './features/auth/authAPI.js';
import Protected from './features/auth/protected.js';
import ChefProtected from './features/auth/chefProtected.js';
import ProtectChefFromChef from './features/auth/protectChefFromChef.js';
import ProfileForm from './components/chef-profile/ChefProfileForm.js';
import ChefProfilePage from './components/chef-profile/ChefProfilePage.js'
import UpdateProfileForm from './components/chef-profile/UpdateProfile.js';
import GetAllChefMenuList from './components/menu-items/chefMenuList.js';
import CreateMenuItemForm from './components/menu-items/createMenuItemForm.js';
import UpdateMenuItemForm from './components/menu-items/chefUpdateMenuItem.js';
import ShoppingCartList from './components/shopping-cart/ShoppingCartList.js';
import AboutUs from './AboutUs.js';
import ChefOrderList from './components/orders/ChefOrderList.js';
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
              <Route path="cart" element={<ShoppingCartList />} />
              <Route path="about" element={<AboutUs />} />
              <Route path="orders" element={<CustomerOrderList />} />
              <Route path="chef/:fullName/:userId/:profileId" element={<ChefStore />} />
              <Route element={<ChefProtected token={data} />}>
                <Route path="chef">
                  <Route path="profile/create" element={<ProfileForm />} />
                  <Route element={<ProtectChefFromChef token={data}/>}>
                    <Route path=":profileId/menu-items" element={<GetAllChefMenuList />} />
                    <Route path=":profileId/menu-items/new" element={<CreateMenuItemForm/>}/>
                    <Route path=":profileId/menu-items/edit/:menuItemId" element={<UpdateMenuItemForm/>}/>
                    <Route path="profile/:profileId" element={<ChefProfilePage/>} />
                    <Route path="profile/:profileId/edit" element={<UpdateProfileForm />} />
                    <Route path=":profileId/orders" element={<ChefOrderList />} />
                  </Route>
                </Route>
              </Route>
            </Route>
            <Route path="/" element={<LandingPage />} />
            <Route path="login" element={<LoginForm accountInfo={data} />} />
            <Route path="signup" element={<SignupForm accountInfo={data} />} />
          </Routes>
        </BrowserRouter>
      </ShoppingCartProvider>
    </>
  );
}

export default App;
