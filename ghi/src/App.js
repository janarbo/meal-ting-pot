import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './LoginForm.js';
import ErrorNotification from './ErrorNotification';
import LandingPage from './LandingPage.js';
import SignupForm from './SignupForm.js';
import MainPage from './MainPage.js';
import Nav from './Nav.js';
import { useGetTokenQuery } from './features/auth/authAPI.js';
import Protected from './features/auth/protected.js';
import GetAllChefMenuList from './chefMenuList.js';

function App() {
  const [error, setError] = useState(null);
  const { data } = useGetTokenQuery();

  if ( data === undefined ) {
    return null;
  }

  return (
    <div>
      <ErrorNotification error={error} />
      <BrowserRouter>
        <Nav accountInfo={data}/>
          <Routes>
            <Route element={<Protected token={data} />}>
              <Route path="home" element={<MainPage />} />
              <Route path="chef/menu-items" element={<GetAllChefMenuList />} />
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
