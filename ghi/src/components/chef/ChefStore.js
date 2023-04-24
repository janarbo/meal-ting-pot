import React from "react";
import { useParams } from "react-router-dom";
import { useGetAllCustomerQuery } from "../../features/menu-items/menuItemApi";
import { Row, Col } from 'react-bootstrap';
import { useGetOneChefProfileQuery } from "../../features/chef-profile/chefProfileApi";
import MenuItemCard from "./MenuItemCard";
import NoAvatar from "../../images/NoAvatar.png"

function ChefStore() {
    const profileImage = NoAvatar;
    const addDefaultSrc = (event) => {
        event.target.src = profileImage;
    }

    const { userId, profileId } = useParams();
    const { data: profileData, isLoading: profileLoading } = useGetOneChefProfileQuery(profileId);
    const { data: menuData, isLoading: menuLoading } = useGetAllCustomerQuery(userId);

    if (profileLoading || menuLoading ) {
        return <p>Loading...</p>
    }

    console.log(profileData)

    return (
        <>
            <div className="pt-5 font-sans flex-col justify-start bg-white pl-5 pr-5 max-w-screen-2xl mx-auto">
                <div className="flex mb-5">
                    <img onError={addDefaultSrc} className="max-h-72 max-w-72 w-40 h-40 rounded-full" src={profileData.photo}></img>
                    <div className="flex flex-col">
                        <h1 align="left" className="p-3 mb-0 font-light">{profileData.full_name}</h1>
                        <h5></h5>
                        <p className="indent-5 ml-4 mb-2 mr-5 font-light">{profileData.bio}</p>
                    </div>
                    <div className="pl-2 pt-2 flex flex-col">
                        {profileData.social_media && profileData.social_media.map((url) => (
                            <h7 className="text-gray-800 py-2 px-2 border rounded mb-2">{url}</h7>
                        ))}
                    </div>
                </div>
                <div data-theme="garden" className="p-4">
                    <Row xs={1} md={3} className="g-4">
                    {menuData.map((product, idx) => (
                        <Col align="center" key={idx}>
                            <MenuItemCard product={product}/>
                        </Col>
                    ))}
                    </Row>
                </div>
            </div>
        </>
    );
}

export default ChefStore;
