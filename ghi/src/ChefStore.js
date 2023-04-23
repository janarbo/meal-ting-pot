import React from "react";
import { useParams } from "react-router-dom";
import { useGetAllCustomerQuery } from "./features/menu-items/menuItemApi";
import { Card, Button, Form, Row, Col } from 'react-bootstrap';
import { ShoppingCartContext } from "./features/shopping-cart/shoppingCartContext";
import { useContext } from 'react';
import { useGetOneChefProfileQuery } from "./features/chef-profile/chefProfileApi";
import MenuItemCard from "./MenuItemCard";

function ChefStore() {
    const { userId, profileId } = useParams();
    const { data: profileData, isLoading: profileLoading } = useGetOneChefProfileQuery(profileId);
    const { data: menuData, isLoading: menuLoading } = useGetAllCustomerQuery(userId);

    if (profileLoading || menuLoading ) {
        return <p>Loading...</p>
    }

    return (
        <>
            <h1 align="center" className="p-3">{profileData.full_name}</h1>
            <Row xs={1} md={3} className="g-4">
                {menuData.map((product, idx) => (
                    <Col align="center" key={idx}>
                        <MenuItemCard product={product}/>
                    </Col>
                ))}
            </Row>
        </>
    );
}

export default ChefStore;
