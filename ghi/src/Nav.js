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
        navigate("/cart");
    }

    const handleHome = async (e) => {
        navigate("/home");
    }

    const handleAboutUs = async (e) => {
        navigate("/about")
    }

    const handleOrders = async (e) => {
        if (accountInfo.account.is_chef) {
            navigate("/chef/orders");
        } else {
            navigate("/orders");
        }
    }

    const handleProfile = async (e) => {
        navigate("/chef/profile");
    }

    return (
        <>
            {accountInfo &&
                <>
                    <Navbar data-theme="garden" expand="sm">
                        <Navbar.Brand style={{ color: '#5C7F67'}} className="font-extrabold pl-5 hover:cursor-pointer" onClick={ handleHome }>Meal-Ting-Pot</Navbar.Brand>
                            <button onClick={ handleHome } className="text-lg ml-10 mr-10 hover:text-lime-600 font-bold">Home</button>
                            <button className="text-lg mr-10 hover:text-lime-600 font-bold" onClick={ handleAboutUs }>About Us</button>
                            {accountInfo.account.is_chef && <button className="text-lg hover:text-lime-600 font-bold" onClick= { handleProfile }>Profile</button>}
                            <Navbar.Toggle />
                            <Navbar.Collapse className="justify-content-end pr-10">
                                <button className="mr-10 text-lg hover:text-lime-600 font-bold" onClick={ handleLogout }>Sign Out</button>
                                <button className="mr-10 text-lg hover:text-lime-600 font-bold" onClick={ handleOrders }>Orders</button>
                                <IconButton style={{color: '#b05e5e'}} className="mr-10 text-lg font-bold" onClick={ handleCart }>
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
