import React, { useContext, useState, useEffect } from "react";
import { useLogoutMutation } from "./features/auth/authAPI";
import { useNavigate } from "react-router-dom";
import { ShoppingCartContext } from "./features/shopping-cart/shoppingCartContext";
import { useGetAllChefProfilesQuery } from "./features/chef-profile/chefProfileApi";
import logo from "../src/images/styling/logopot-removebg.png";


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
      <button onClick={() => navigate(`/chef/profile/${profileId}`)}>Profile</button>
    );
  } else {
    return (
      <button onClick={() => navigate(`/chef/profile/create`)}>Create a Profile</button>
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
          <div data-theme="garden" className="navbar font-sans flex items-center justify-between px-5">
            <div className="flex items-center">
              <div className="dropdown">
                <label tabIndex={0} className="btn btn-ghost btn-circle">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                </label>
                <ul data-theme="garden" tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow rounded-box w-52">
                  <li><button onClick={handleHome}>Home</button></li>
                  <li><button onClick={handleAboutUs}>About</button></li>
                  <li>{accountInfo.account.is_chef && <ChefProfile userId={userId} />}</li>
                  <li><button onClick={handleOrders}>Orders</button></li>
                  <li><button onClick={handleLogout}>Logout</button></li>
                </ul>
              </div>
            </div>
            <div>
              <img className="w-14 h-14 object-contain" src={logo} alt="Logo" />
              <button onClick={handleHome} className="text-[#b05e5e] btn btn-ghost normal-case font-normal text-3xl">Meal-Ting Pot</button>
            </div>
            <div className="flex items-center">
              <div className="dropdown dropdown-end mr-5">
                <label tabIndex={0} className="btn btn-ghost btn-circle">
                  <div className="indicator">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                    <span className="badge badge-sm indicator-item">{productsCount}</span>
                  </div>
                </label>
                <div data-theme="garden" tabIndex={0} className="mt-3 card card-compact dropdown-content w-52 shadow">
                  <div className="card-body">
                    {productsCount <= 1 ? (
                      <span className="italic text-lg text-right">Item: {productsCount}</span>
                    ) : (
                      <span className="italic text-lg text-right">Items: {productsCount}</span>
                    )}
                    <span className="italic text-lg text-right">Total: ${shoppingCart.getTotalCost().toFixed(2)}</span>
                    <div className="card-actions">
                      <button onClick={handleCart} className="btn btn-block rounded-full">View Cart</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr className="mb-3 mt-0"></hr>
        </>
      }
    </>
  );
}

  export default Nav;
