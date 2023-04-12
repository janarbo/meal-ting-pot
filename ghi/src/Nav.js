import { NavLink } from 'react-router-dom'
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "./features/auth/authAPI";
import { useNavigate } from "react-router-dom";

function Nav() {
    const navigate = useNavigate();
    const [logout, setLogout] = useLogoutMutation();

    function handleLogout() {
        navigate('')
    }

    return (
        <button onClick={async () => {
            await logout();
            handleLogout();
        }}>
            Logout
        </button>
    );
  }

  export default Nav;
