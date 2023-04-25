import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './LoginForm.js';
import LandingPage from './LandingPage.js';
import SignupForm from './SignupForm.js';
import MainPage from './MainPage.js';
import Nav from './Nav.js';
import { useGetTokenQuery } from './features/auth/authAPI.js';
import Protected from './features/auth/protected.js';
import GetAllChefMenuList from './features/menu-items/chefMenuList.js';
import ProfileForm from './ChefProfileForm.js';
import FilteredProfiles from './FilteredProfiles.js';
import CreateMenuItemForm from './features/menu-items/createMenuItemForm.js';
import UpdateMenuItemForm from './features/menu-items/chefUpdateMenuItem.js';


function App() {
  const { data } = useGetTokenQuery();

  if ( data === undefined ) {
    return null;
  }

  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, '');

  return (
    <div>
      <BrowserRouter basename={basename}>
        <Nav accountInfo={data}/>
          <Routes>
            <Route element={<Protected token={data} />}>
              <Route path="home" element={<MainPage />} />
              <Route path="chef">
                <Route path="menu-items" element={<GetAllChefMenuList />} />
                <Route path="menu-items/new" element={<CreateMenuItemForm/>}/>
                <Route path="menu-items/edit/:menuItemId" element={<UpdateMenuItemForm/>}/>
                <Route path="profile" element={<ProfileForm />} />
              </Route>
            <Route path="/filtered/:tagName" element={<FilteredProfiles />} />
            </Route>
            <Route path="" element={<LandingPage />} />
            <Route path="login" element={<LoginForm accountInfo={data} />}/>
            <Route path="signup" element={<SignupForm accountInfo={data} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
