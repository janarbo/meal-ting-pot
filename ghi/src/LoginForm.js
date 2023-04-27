import React from "react";
import { useState, useEffect } from "react";
import { useLoginMutation } from "./features/auth/authAPI";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


const LoginForm = ({ accountInfo }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login] = useLoginMutation();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await login({'username': username, 'password': password});
    setUsername("");
    setPassword("");
  };

  useEffect(() => {
    if (accountInfo) {
      navigate('/home');
    }
  }, [accountInfo, navigate])


  return (
    <div className="container">
        <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Login</h1>
              <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    className="form-control"
                  />
                  <label htmlFor="password">Username</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="form-control"
                  />
                  <label htmlFor="password">Password</label>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
  );
};


export default LoginForm
