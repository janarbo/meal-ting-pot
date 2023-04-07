import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSignupMutation } from "./store/authAPI";

const SignupForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isChef, setIsChef] = useState(false);
    const [signup, result] = useSignupMutation();

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
        <button type="submit">Create</button>
    </form>
    );
}

export default SignupForm
