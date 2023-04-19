import React from "react";
import { useLogoutMutation } from "./features/auth/authAPI";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import {
//     useCreateShoppingCartMutation,
//     useGetOneShoppingCartQuery,
//     useUpdateShoppingCartMutation,
//     useGetOneShoppingCartWithItemsQuery
// } from './features/shopping-cart/shoppingCartApi';

function Nav({ accountInfo }) {
    const navigate = useNavigate();
    const [logout] = useLogoutMutation();

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
