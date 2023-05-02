import React from "react";
import { useState, useEffect } from "react";
import { useSignupMutation } from "./features/auth/authAPI";
import { useNavigate } from "react-router-dom";

const SignupForm = ({ accountInfo }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isChef, setIsChef] = useState(false);
    const [signup] = useSignupMutation();
    const navigate = useNavigate();

    const handleOnClick = () => {
        isChef ? setIsChef(false): setIsChef(true);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        signup({
            'first_name': firstName,
            'last_name': lastName,
            'username': username,
            'password': password,
            'email': email,
            'isChef': isChef
        });
        event.target.reset();
    };

    useEffect(() => {
        if (accountInfo) {
            isChef ? (
            navigate("/chef/profile/create")
        ) : (
            navigate("/home")
        )}
    }, [accountInfo, navigate, isChef])

    const canSave = Boolean(firstName) && Boolean(lastName) && Boolean(username) && Boolean(password) && Boolean(email)

    return (
     <>

      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {/* <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          /> */}
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign Up</h2>
        </div>


<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6" action="#" method="POST">
        <input
            type="text"
            placeholder="FirstName"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            required
        />
        <input
            type="text"
            placeholder="LastName"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

            required
        />
        <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            required
        />
        <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            required
        />
        <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            required
        />

        <div className="flex flex-col">
            <div className="form-control w-52">
                <label className="cursor-pointer label"  htmlFor="chef">
                <span className="label-text">Chef Account</span>
                <input
                    onClick={handleOnClick}
                    value={isChef}
                    type="checkbox"
                    placeholder="isChef"
                    name="chef"
                    className="toggle toggle-[#b05f5c]"
                     />
                </label>
            </div>
            </div>
        <button
         className="flex w-full justify-center rounded-md bg-[#b05f5c]  px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
         type="submit"
         disabled={!canSave}>Create</button>
    </form>
      <p className="mt-10 text-center text-sm text-gray-500">
            Has an account?{' '}
            <a href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
             Login
            </a>
          </p>
        </div>
      </div>
    </>
);
}

export default SignupForm
