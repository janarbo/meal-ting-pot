import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetAllCustomerQuery } from "../../features/menu-items/menuItemApi";
import { Row, Col } from 'react-bootstrap';
import { useGetOneChefProfileQuery } from "../../features/chef-profile/chefProfileApi";
import MenuItemCard from "./MenuItemCard";
import MenuItemCardDetail from "./MenuItemCardDetail";
import Footer from "../../Footer"
import NoAvatar from "../../images/styling/NoAvatar.png"


function ChefStore() {
    const profileImage = NoAvatar;
    const addDefaultSrc = (event) => {
        event.target.src = profileImage;
    }

    const [selectedItem, setSelectedItem] = useState(null);
    const [showCardDetail, setShowCardDetail] = useState(false);

    function handleCardClick(product) {
        setSelectedItem(product);
        setShowCardDetail(true);
    }

    const mainRef = useRef(null);
    const sideRef = useRef(null);
    const dessertRef = useRef(null);

    const { userId, profileId } = useParams();
    const { data: profileData, isLoading: profileLoading } = useGetOneChefProfileQuery(profileId);
    const { data: menuData, isLoading: menuLoading } = useGetAllCustomerQuery(userId);

    if (profileLoading || menuLoading ) {
        return <p>Loading...</p>
    }

    const filteredMenuData = menuData.filter(product => product.status === true);

    const handleButtonClick = (event) => {
        const value = event.target.value;
        if (value === "main") {
            mainRef.current.scrollIntoView({ behavior: "smooth" });
        } else if (value === "side") {
            sideRef.current.scrollIntoView({ behavior: "smooth"});
        } else {
            dessertRef.current.scrollIntoView({ behavior: "smooth"});
        }
    }

    return (
        <>
            <div className="pt-1 font-sans flex-col justify-start bg-white pl-5 pr-5 max-w-7xl mx-auto">
                <div className="flex mb-4">
                    <img onError={addDefaultSrc} alt={profileData.photo} className="mt-4 max-h-72 max-w-72 w-40 h-40 rounded-full" src={profileData.photo}></img>
                    <div className="flex flex-col">
                        <h1 align="left" className="p-3 mb-0 font-light">{profileData.full_name}</h1>
                        <p className="ml-4 mb-2 mr-5 font-light">{profileData.bio}</p>
                    </div>
                    <div className="pl-2 pt-2 flex flex-col">
                        {profileData.social_media && profileData.social_media.map((url) => (
                            <a href={`https://${url}`} key={url} className="no-underline text-gray-800 py-2 px-2 border rounded mb-2 hover:bg-gray-100">{url}</a>
                        ))}
                    </div>
                </div>

                <hr></hr>
                {filteredMenuData.filter(product => product).length > 0 && (
                <h6 className="text-xl font-normal mt-6 mb-3">Browse By Meal Type</h6>
                )}
                <div>
                    {filteredMenuData.filter(product => product.food_type === 'main').length > 0 && (
                    <>
                        <button onClick={handleButtonClick} value="main" className="text-gray-800 py-3 px-3 border rounded mb-4 hover:bg-gray-100 mr-4">Main</button>
                    </>
                    )}
                    {filteredMenuData.filter(product => product.food_type === 'side').length > 0 && (
                    <>
                        <button onClick={handleButtonClick} value="side" className="text-gray-800 py-3 px-3 border rounded mb-4 hover:bg-gray-100 mr-4">Side</button>
                    </>
                    )}
                    {filteredMenuData.filter(product => product.food_type === 'dessert').length > 0 && (
                    <>
                        <button onClick={handleButtonClick} value="dessert" className="text-gray-800 py-3 px-3 border rounded mb-4 hover:bg-gray-100 mr-4">Dessert</button>
                    </>
                    )}
                </div>

                {filteredMenuData.filter(product => product.food_type === 'main').length > 0 && (
                    <>
                        <div ref={mainRef} className="pb-5">
                            <h6 className="text-xl font-normal decoration-[#b05e5e] underline decoration-2 underline-offset-4">Main Items</h6>
                            <div data-theme="garden" className="p-4">
                                <Row xs={1} md={3} className="g-4">
                                {filteredMenuData.filter(product => product.food_type === 'main').map((product) => (
                                    <Col align="center" key={product.menu_item_id}>
                                        {showCardDetail && selectedItem.menu_item_id === product.menu_item_id ? (
                                            <MenuItemCardDetail product={product} />
                                        ) : (
                                            <MenuItemCard onClick={() => handleCardClick(product)} product={product}/>
                                        )}
                                    </Col>
                                ))}
                                </Row>
                            </div>
                        </div>
                    </>
                )}

                {filteredMenuData.filter(product => product.food_type === 'side').length > 0 && (
                    <>
                        <div ref={sideRef} className="pb-5">
                            <h6 className="text-xl font-normal decoration-[#b05e5e] underline decoration-2 underline-offset-4">Side Items</h6>
                            <div data-theme="garden" className="p-4">
                                <Row xs={1} md={3} className="g-4">
                                {filteredMenuData.filter(product => product.food_type === 'side').map((product) => (
                                    <Col align="center" key={product.menu_item_id}>
                                        {showCardDetail && selectedItem.menu_item_id === product.menu_item_id ? (
                                            <MenuItemCardDetail product={product} />
                                        ) : (
                                            <MenuItemCard onClick={() => handleCardClick(product)} product={product}/>
                                        )}
                                    </Col>
                                ))}
                                </Row>
                            </div>
                        </div>
                    </>
                )}

                {filteredMenuData.filter(product => product.food_type === 'dessert').length > 0 && (
                    <>
                        <div ref={dessertRef} className="pb-5">
                            <h6 className="text-xl font-normal decoration-[#b05e5e] underline decoration-2 underline-offset-4">Dessert Items</h6>
                            <div data-theme="garden" className="p-4">
                                <Row xs={1} md={3} className="g-4">
                                {filteredMenuData.filter(product => product.food_type === 'dessert').map((product) => (
                                    <Col align="center" key={product.menu_item_id}>
                                        {showCardDetail && selectedItem.menu_item_id === product.menu_item_id ? (
                                            <MenuItemCardDetail product={product} />
                                        ) : (
                                            <MenuItemCard onClick={() => handleCardClick(product)} product={product}/>
                                        )}
                                    </Col>
                                ))}
                                </Row>
                            </div>
                        </div>
                    </>
                )}
            <div>
                <Footer />
            </div>
            </div>
        </>
    );
}

export default ChefStore;
