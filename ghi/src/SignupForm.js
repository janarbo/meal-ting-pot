import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSignupMutation } from "./features/auth/authAPI";
import { useNavigate } from "react-router-dom";

const SignupForm = ({ accountInfo }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isChef, setIsChef] = useState(false);
    const [signup, result] = useSignupMutation();
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
            // Need to change this link to chef profile page
            navigate("/home")
        ) : (
            navigate("/home")
        )}
    }, [accountInfo, navigate, isChef])

    const canSave = Boolean(firstName) && Boolean(lastName) && Boolean(username) && Boolean(password) && Boolean(email)

    return (
    <form onSubmit={handleSubmit}>
        <h1>Signup</h1>
        <input
            type="text"
            placeholder="FirstName"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            required
        />
        <input
            type="text"
            placeholder="LastName"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            required
        />
        <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
        />
        <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
        />
        <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
        />
        <input
            onClick={handleOnClick}
            value={isChef}
            type="checkbox"
            placeholder="isChef"
            name="chef"
        />
        <label htmlFor="chef">Chef account</label>
        <button className="dbg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" type="submit" disabled={!canSave}>Create</button>
    </form>
    );
}

export default SignupForm
