import React from "react";
import { useState, useEffect } from "react";
import { useLoginMutation } from "./features/auth/authAPI";
import { useNavigate } from "react-router-dom";
import logo from "./images/styling/logo-removebg.png"
// import funny from "./images/styling/funny.gif"
// import loginbg from "./images/styling/loginbg.JPG"





const LoginForm = ({ accountInfo }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  // const backgroundImage = loginbg

  const handleSubmit = async (event) => {
    event.preventDefault();
    await login({'username': username, 'password': password});
    setUsername("");
    setPassword("");
  };

  const handleSignup = () => {
    navigate('/signup')
  }

  useEffect(() => {
    if (accountInfo) {
      navigate('/home');
    }
  }, [accountInfo, navigate])


  return (
    <>

{/* <div className="flex min-h-screen flex-1 flex-col  px-6 py-12 lg:px-8" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover", backgroundAttachment: "fixed", backgroundPosition: "center top"}}> */}
        <div className="flex min-h-screen flex-1 flex-col px-6 py-12 lg:px-8 font-sans" >
        <div className="sm:mx-auto sm:w-full sm:max-w-sm"  >

          <img
            className="mx-auto"
            alt={logo}
            src={logo}
            style={{ height: "150px", width: "150px", marginBottom: "20px !important" }}
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Login
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm" >
          <form onSubmit={handleSubmit} className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
              Username
              </label>
              <div className="mt-2">
                <input
                 type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>

              </div>
              <div className="mt-2">
                <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-[#b05f5c]  px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Don't have an account?{' '}
            <button onClick={handleSignup} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
             Signup
            </button>
          </p>

          {/* <img
            className="mx-auto"
            src={funny}
            style={{ height: "200px", width: "300px", marginBottom: "20px !important" }}
          /> */}
        </div>
      </div>
    </>
  );
};


export default LoginForm
