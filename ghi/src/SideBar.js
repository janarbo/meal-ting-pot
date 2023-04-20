import React from "react";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "./features/auth/authAPI";
import { useChefAvailabilityMutation } from "./features/chef-profile/chefAPI";

const SideBar = () => {
    const navigate = useNavigate();
    const [logout] = useLogoutMutation();
    const [chefAvailability] = useChefAvailabilityMutation();

    const handleHomeClick = () => {
        navigate("/home");
    };

    const handleProfileClick = () => {
        navigate("profile/");
    };

    const handleCreateProfileClick = () => {
        navigate("/createprofile")
    };

    const handleMenuClick = () => {
        navigate("/menu");
    };

    const handleOrdersClick = () => {
        navigate("/orders");
    };

    const handleAvailableClick = async () => {
        try {
        await chefAvailability({ available: true });
        } catch (error) {
        console.log(error);
        }
    };

    const handleUnavailableClick = async () => {
        try {
        await chefAvailability({ available: false });
        } catch (error) {
        console.log(error);
        }
    };

    const handleLogoutClick = async () => {
        try {
        await logout();
        navigate("/");
        } catch (error) {
        console.log(error);
        }
    };

    const handleSupportClick = () => {
        navigate("/about");
    };

    return (
        <div>
            <ul className="list-inside">
                <li>
                    <button
                    className="bg-green-800 bg-opacity-80 hover:bg-green-200 opacity-100
                                                text-black font-bold py-2 px-4 rounded-full mb-2"
                    onClick={handleHomeClick}
                    >
                    Home
                    </button>
                </li>
                <li>
                    <button
                    className="bg-green-800 bg-opacity-80 hover:bg-green-200 opacity-100
                                                text-black font-bold py-2 px-4 rounded-full mb-2"
                    onClick={handleProfileClick}
                    >
                    My Profile
                    </button>
                </li>
                <li>
                    <button
                    className="bg-green-800 bg-opacity-80 hover:bg-green-200 opacity-100
                                                text-black font-bold py-2 px-4 rounded-full mb-2"
                    onClick={handleCreateProfileClick}
                    >
                    Create Profile
                    </button>
                </li>
                <li>
                    <button
                    className="bg-green-800 bg-opacity-80 hover:bg-green-200 opacity-100
                                                text-black font-bold py-2 px-4 rounded-full mb-2"
                    onClick={handleMenuClick}
                    >
                    My Menu
                    </button>
                </li>
                <li>
                    <button
                    className="bg-green-800 bg-opacity-80 hover:bg-green-200 opacity-100
                                                text-black font-bold py-2 px-4 rounded-full mb-2"
                    onClick={handleOrdersClick}
                    >
                    See My Orders
                    </button>
                </li>
                <li>
                    <button
                    className="bg-green-800 bg-opacity-80 hover:bg-green-200 opacity-100
                                                text-black font-bold py-2 px-4 rounded-full mb-2"
                    onClick={handleAvailableClick}
                    >
                    Available
                    </button>
                </li>
                <li>
                    <button
                    className="bg-green-800 bg-opacity-80 hover:bg-green-200 opacity-100
                                                text-black font-bold py-2 px-4 rounded-full mb-2"
                    onClick={handleUnavailableClick}
                    >
                    Unavailable
                    </button>
                </li>
                <li>
                    <button
                    className="bg-green-800 bg-opacity-80 hover:bg-green-200 opacity-100
                                                text-black font-bold py-2 px-4 rounded-full mb-2"
                    onClick={handleLogoutClick}
                    >
                    Logout
                    </button>
                </li>
                <li>
                    <button
                    className="bg-green-800 bg-opacity-80 hover:bg-green-200 opacity-100
                                                text-black font-bold py-2 px-4 rounded-full"
                    onClick={handleSupportClick}
                    >
                    Support Center
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default SideBar;
