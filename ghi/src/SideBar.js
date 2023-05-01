    import React from "react";
    import { useNavigate } from "react-router-dom";
    import { useLogoutMutation } from "./features/auth/authAPI";
    import { useParams } from "react-router-dom";
    import {
        useGetOneChefProfileQuery,
        useUpdateProfileStatusMutation
    } from "./features/chef-profile/chefProfileApi";


    const SideBar = () => {
        const navigate = useNavigate();
        const [logout] = useLogoutMutation();
        const { profileId } = useParams();

        const { data, isLoading } = useGetOneChefProfileQuery(profileId);
        const [updateProfile] = useUpdateProfileStatusMutation();

        const handleHomeClick = () => {
            navigate("/home");
        };

        const handleProfileClick = () => {
            navigate(`/chef/profile/${profileId}`);
        };

        const handleCreateProfileClick = () => {
            navigate(`/chef/profile/create`);
        };

        const handleMenuClick = () => {
            navigate(`/chef/${profileId}/menu-items`);
        };

        const handleOrdersClick = () => {
            navigate(`/chef/${profileId}/orders`);
        };

        const handleAvailabilityClick = () => {
            if (data.availability) {
                let input = {
                    "profile_id": data.profile_id,
                    "availability": false
                }
                updateProfile(input);
            } else {
                let input = {
                    "profile_id": data.profile_id,
                    "availability": true
                }
                updateProfile(input);
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

        if (isLoading) {
            return (
                <div>Loading...</div>
            )
        }

    return (
    <div className="flex">
        <div>
            <ul className="list-inside">
                <li>
                    <button
                        className="bg-[#b05e5e] bg-opacity-80 hover:bg-[#b05e5e] text-black font-bold py-2 px-4 rounded-full mb-2 w-full"
                        onClick={handleHomeClick}
                    >
                        Home
                    </button>
                </li>
                <li>
                    <button
                        className="bg-[#b05e5e] bg-opacity-80 hover:bg-[#b05e5e] opacity-100 text-black font-bold py-2 px-4 rounded-full mb-2 w-full"
                        onClick={handleProfileClick}
                    >
                        My Profile
                    </button>
                </li>
                <li>
                    {!data && (
                    <button
                        className="bg-[#b05e5e] bg-opacity-80 hover:bg-[#b05e5e] opacity-100 text-black font-bold py-2 px-4 rounded-full mb-2 w-full"
                        onClick={handleCreateProfileClick}
                    >
                        Create Profile
                    </button>
                    )}
                </li>
                <li>
                    <button
                        className="bg-[#b05e5e] bg-opacity-80 hover:bg-[#b05e5e] opacity-100 text-black font-bold py-2 px-4 rounded-full mb-2 w-full"
                        onClick={handleMenuClick}
                    >
                        My Menu
                    </button>
                </li>
                <li>
                    <button
                        className="bg-[#b05e5e] bg-opacity-80 hover:bg-[#b05e5e] opacity-100 text-black font-bold py-2 px-4 rounded-full mb-2 w-full"
                        onClick={handleOrdersClick}
                    >
                        See My Orders
                    </button>
                </li>

                {data.featured_menu_item && (
                <li>
                    <button
                        className="bg-[#b05e5e] bg-opacity-80 hover:bg-[#b05e5e] opacity-100 text-black font-bold py-2 px-4 rounded-full mb-2 w-full"
                        onClick={handleAvailabilityClick}
                    >
                        {data.availability ? (
                            <div>Not Available</div>
                        ) : <div>Available</div>
                        }
                    </button>
                </li>
                )}
                    <li>
                    <button
                        className="bg-[#b05e5e] bg-opacity-80 hover:bg-[#b05e5e] opacity-100 text-black font-bold py-2 px-4 rounded-full mb-2 w-full"
                        onClick={handleLogoutClick}
                    >
                        Logout
                    </button>
                    </li>
                    <li>
                        <button
                            className="bg-[#b05e5e] bg-opacity-80 hover:bg-[#b05e5e] opacity-100 text-black font-bold py-2 px-4 rounded-full w-full"
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
