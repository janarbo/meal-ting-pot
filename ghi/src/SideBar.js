    import React from "react";
    import { useState } from "react";
    import { useNavigate } from "react-router-dom";
    import { useLogoutMutation } from "./features/auth/authAPI";
    import { useParams } from "react-router-dom";

    const SideBar = () => {
        const navigate = useNavigate();
        const [logout] = useLogoutMutation();
        const [availability, setAvailability] = useState(false);
        const { profileId } = useParams();


        const handleHomeClick = () => {
            navigate("/home");
        };

        const handleProfileClick = () => {
            navigate(`/chef/profile/${profileId}`);
        };

        const handleCreateProfileClick = () => {
            navigate("");
        };

        const handleMenuClick = () => {
            navigate("/chef/menu-items");
        };

        const handleOrdersClick = () => {
            navigate("/orders");
        };

        const handleAvailabilityClick = () => {
            availability ? setAvailability(false) : setAvailability(true);
            console.log(availability);
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
    <div className="flex">
        <div>
            <ul className="list-inside">
                <li>
                    <button
                        className="bg-green-800 bg-opacity-80 hover:bg-green-200 opacity-100 text-black font-bold py-2 px-4 rounded-full mb-2"
                        onClick={handleHomeClick}
                    >
                        Home
                    </button>
                </li>
                <li>
                    <button
                        className="bg-green-800 bg-opacity-80 hover:bg-green-200 opacity-100 text-black font-bold py-2 px-4 rounded-full mb-2"
                        onClick={handleProfileClick}
                    >
                        My Profile
                    </button>
                </li>
                <li>
                    <button
                        className="bg-green-800 bg-opacity-80 hover:bg-green-200 opacity-100 text-black font-bold py-2 px-4 rounded-full mb-2"
                        onClick={handleCreateProfileClick}
                    >
                        Create Profile
                    </button>
                </li>
                <li>
                    <button
                        className="bg-green-800 bg-opacity-80 hover:bg-green-200 opacity-100 text-black font-bold py-2 px-4 rounded-full mb-2"
                        onClick={handleMenuClick}
                    >
                        My Menu
                    </button>
                </li>
                <li>
                    <button
                        className="bg-green-800 bg-opacity-80 hover:bg-green-200 opacity-100 text-black font-bold py-2 px-4 rounded-full mb-2"
                        onClick={handleOrdersClick}
                    >
                        See My Orders
                    </button>
                </li>
                <li>
                    <button
                        className="bg-green-800 bg-opacity-80 hover:bg-green-200 opacity-100 text-black font-bold py-2 px-4 rounded-full mb-2"
                        onClick={handleAvailabilityClick}
                    >
                        Available/Unavailable
                    </button>
                </li>
                    <li>
                    <button
                        className="bg-green-800 bg-opacity-80 hover:bg-green-200 opacity-100 text-black font-bold py-2 px-4 rounded-full mb-2"
                        onClick={handleLogoutClick}
                    >
                        Logout
                    </button>
                    </li>
                    <li>
                        <button
                            className="bg-green-800 bg-opacity-80 hover:bg-green-200 opacity-100 text-black font-bold py-2 px-4 rounded-full"
                            onClick={handleSupportClick}
                        >
                            Support Center
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
    }

export default SideBar;
