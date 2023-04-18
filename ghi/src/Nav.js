import { NavLink } from 'react-router-dom'
import React from "react";
import { useState, useEffect } from "react";
import { useGetTokenQuery, useLogoutMutation } from "./features/auth/authAPI";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {
    useCreateShoppingCartMutation,
    useGetOneShoppingCartQuery,
    useUpdateShoppingCartMutation,
    useGetOneShoppingCartWithItemsQuery
} from './features/shopping-cart/shoppingCartApi';

function Nav({ accountInfo }) {
    const navigate = useNavigate();
    const [logout, setLogout] = useLogoutMutation();

    const handleLogout = async (e) => {
        e.preventDefault();
        await logout();
        navigate("/");
    }

    return (
        <nav>
            {accountInfo &&
                <div>
                    <button onClick={handleLogout}>
                    Logout
                    </button>
                    <IconButton>
                    </IconButton>
                    <ShoppingCartIcon />
                </div>
            }
        </nav>
    );
  }

  export default Nav;
