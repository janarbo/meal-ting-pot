import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "./store/authAPI";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const[login, result] = useLoginMutation();
  const dispatch = useDispatch();

  // If user is logged in, we want to
  // prevent them from seeing this page

  const handleSubmit = (event) => {
    event.preventDefault();
    login({'username': username, 'password': password});
    event.target.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
};


export default LoginForm
