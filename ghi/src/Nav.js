import React, { useContext, useState, useEffect } from "react";
import { useLogoutMutation } from "./features/auth/authAPI";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Navbar } from 'react-bootstrap';
import { ShoppingCartContext } from "./features/shopping-cart/shoppingCartContext";
import { useGetAllChefProfilesQuery } from "./features/chef-profile/chefProfileApi";


function ChefProfile({ userId }) {
  const [profileId, setProfileId] = useState(null);
  const { data, isLoading } = useGetAllChefProfilesQuery();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && data) {
      for (let profile of data) {
        if (userId === profile.user_id) {
          setProfileId(profile.profile_id);
          break;
        }
      }
    }
  }, [isLoading, data, userId]);

  if (profileId) {
    return (
      <button className="text-2xl hover:underline font-medium" onClick={() => navigate(`/chef/profile/${profileId}`)}>Profile</button>
    );
  } else {
    return (
      <button className="text-2xl hover:underline font-medium" onClick={() => navigate(`/chef/profile/create`)}>Create a Profile</button>
    );
  }
}

function Nav({ accountInfo }) {
  const userId = accountInfo && parseInt(accountInfo.account.id);

  const shoppingCart = useContext(ShoppingCartContext);
  const productsCount = shoppingCart.items.reduce((sum, product) => sum + product.quantity, 0);

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

  return (
    <>
      {accountInfo &&
        <>
          <Navbar className="bg-white font-sans pt-4 pb-4" expand="sm">
            <h2 className="text-[#b05e5e] font-semibold pl-5 hover:cursor-pointer text-3xl mb-0" onClick={handleHome}>Meal-Ting-Pot</h2>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-between pr-10">
              <div className="flex">
                <button onClick={handleHome} className="text-2xl ml-10 mr-10 hover:underline font-medium">Home</button>
                <button className="text-2xl mr-10 hover:underline font-medium" onClick={handleAboutUs}>About Us</button>
                {accountInfo.account.is_chef && <ChefProfile userId={userId} />}
              </div>
              <div className="flex">
                <button className="mr-10 text-2xl hover:underline font-medium" onClick={handleOrders}>Orders</button>
                <button className="mr-10 text-2xl hover:underline font-medium" onClick={handleLogout}>Sign Out</button>
                <IconButton className="mr-10 text-black text-2xl font-semibold" onClick={handleCart}>
                  <ShoppingCartIcon className="mr-1" /> Cart ({productsCount} items)
                </IconButton>
              </div>
            </Navbar.Collapse>
          </Navbar>
          <hr className="mb-3 mt-0"></hr>
        </>
      }
    </>
  );
}

  export default Nav;
