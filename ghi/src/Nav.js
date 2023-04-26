<<<<<<< HEAD
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
=======
import React, { useContext } from "react";
import { useLogoutMutation } from "./features/auth/authAPI";
import { useNavigate, NavLink } from "react-router-dom";
import { IconButton } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Navbar } from 'react-bootstrap';
import { ShoppingCartContext } from "./features/shopping-cart/shoppingCartContext";


function Nav({ accountInfo }) {
    const navigate = useNavigate();

    const [logout] = useLogoutMutation();
    const handleLogout = async (e) => {
        e.preventDefault();
        await logout();
        navigate("/");
    }

    const handleCart = async (e) => {
        navigate("/cart");
    }

    const handleHome = async (e) => {
        navigate("/home");
    }

    const handleAboutUs = async (e) => {
        navigate("/about")
    }

    const handleOrders = async (e) => {
        navigate("/orders");
    }

    const handleProfile = async (e) => {
        navigate("/chef/profile/create");
    }

    const shoppingCart = useContext(ShoppingCartContext);
    const productsCount = shoppingCart.items.reduce((sum, product) => sum + product.quantity, 0);

    return (
        <>
            {accountInfo &&
                <>
                    <Navbar className="bg-white font-sans pt-4 pb-4" expand="sm">
                        <h2 className="text-[#b05e5e] font-semibold pl-5 hover:cursor-pointer text-3xl mb-0" onClick={ handleHome }>Meal-Ting-Pot</h2>
                        <Navbar.Toggle />
                        <Navbar.Collapse className="justify-content-between pr-10">
                            <div className="flex">
                                <button onClick={ handleHome } className="text-2xl ml-10 mr-10 hover:underline font-medium">Home</button>
                                <button className="text-2xl mr-10 hover:underline font-medium" onClick={ handleAboutUs }>About Us</button>
                                {accountInfo.account.is_chef && <button className="text-2xl hover:underline font-medium" onClick= { handleProfile }>Profile</button>}
                            </div>
                            <div className="flex">
                                <button className="mr-10 text-2xl hover:underline font-medium" onClick={ handleOrders }>Orders</button>
                                <button className="mr-10 text-2xl hover:underline font-medium" onClick={ handleLogout }>Sign Out</button>
                                <IconButton className="mr-10 text-black text-2xl font-semibold" onClick={ handleCart }>
                                    <ShoppingCartIcon className="mr-1"/> Cart ({productsCount} items)
                                </IconButton>
                            </div>
                        </Navbar.Collapse>
                    </Navbar>
                    <hr className="mb-3 mt-0"></hr>
                </>
            }
        </ >
>>>>>>> main
    );
  }

  export default Nav;
