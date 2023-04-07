import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './LoginForm.js';
import ErrorNotification from './ErrorNotification';
import { Provider } from "react-redux";
import { store } from '@reduxjs/toolkit';
import SignupForm from './SignupForm.js';

function App() {
  const [error, setError] = useState(null);

  return (

    <div>
      <ErrorNotification error={error} />
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<LoginForm />}/>
          <Route path="signup" element={<SignupForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
