import React from "react";
import { useLogoutMutation } from "./features/auth/authAPI";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Navbar } from 'react-bootstrap';

function Nav({ accountInfo }) {
    const navigate = useNavigate();

    const [logout] = useLogoutMutation();
    const handleLogout = async (e) => {
        e.preventDefault();
        await logout();
        navigate("/");
    }

    const handleCart = async (e) => {
        e.preventDefault();
        navigate("/cart");
    }

    const handleHome = async (e) => {
        e.preventDefault();
        navigate("/home");
    }

    return (
        <>
            {accountInfo &&
                <>
                    <Navbar data-theme="garden" expand="sm">
                        <Navbar.Brand style={{ color: '#5C7F67'}} className="font-extrabold pl-5 hover:cursor-pointer" onClick={ handleHome }>Meal-Ting-Pot</Navbar.Brand>
                            <button onClick={ handleHome } className="text-lg ml-10 mr-10 hover:text-lime-600 font-bold">Home</button>
                            <button className="text-lg mr-10 hover:text-lime-600 font-bold">About Us</button>
                            {accountInfo.account.is_chef && <button className="text-lg hover:text-lime-600 font-bold">Profile</button>}
                            <Navbar.Toggle />
                            <Navbar.Collapse className="justify-content-end pr-10">
                                <button className="mr-10 text-lg hover:text-lime-600 font-bold" onClick={ handleLogout }>Sign Out</button>
                                <button className="mr-10 text-lg hover:text-lime-600 font-bold">Orders</button>
                                <IconButton className="mr-10 text-lg hover:text-lime-600 font-bold" onClick={ handleCart }>
                                    <ShoppingCartIcon className="mr-1"/> Cart
                                </IconButton>
                            </Navbar.Collapse>
                    </Navbar>
                </ >
            }
        </ >
    );
  }

  export default Nav;
