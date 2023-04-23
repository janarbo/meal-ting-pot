import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import LoginForm from './LoginForm.js';
import LandingPage from './LandingPage.js';
import SignupForm from './SignupForm.js';
import MainPage from './MainPage.js';
import Nav from './Nav.js';
import { useGetTokenQuery } from './features/auth/authAPI.js';
import Protected from './features/auth/protected.js';
import GetAllChefMenuList from './chefMenuList.js';
import ProfileForm from './features/chef-profile/ChefProfileForm.js';
import ShoppingCartList from './ShoppingCartList.js';
import AboutUs from './AboutUs.js';
import ChefOrderList from './ChefOrderList.js';
import CustomerOrderList from './CustomerOrderList.js';
import ChefProfilePage from './features/chef-profile/ChefProfilePage.js'
import ChefProfileUpdate from './features/chef-profile/ChefProfileUpdate.js';

function App() {
  const { data } = useGetTokenQuery();

  if ( data === undefined ) {
    return null;
  }

  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, '');

  return (
    <>
      <BrowserRouter basename={basename}>
        <Nav accountInfo={data}/>
        <Routes>
          <Route element={<Protected token={data} />}>
            <Route path="home" element={<MainPage />} />
            <Route path="chef">
              <Route path="menu-items" element={<GetAllChefMenuList />} />
              <Route path="profile/create" element={<ProfileForm />} />
              <Route path="profile/:profileId" element={<ChefProfilePage/>} />
              <Route path="profile/:profileId/edit" element={<ChefProfileUpdate/>} />
              <Route path="orders" element={<ChefOrderList />} />
            </Route>
            <Route path="cart" element={<ShoppingCartList />} />
            <Route path="about" element={<AboutUs />} />
            <Route path="orders" element={<CustomerOrderList />} />
          </Route>
          <Route path="" element={<LandingPage />} />
          <Route path="login" element={<LoginForm accountInfo={data} />}/>
          <Route path="signup" element={<SignupForm accountInfo={data} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
