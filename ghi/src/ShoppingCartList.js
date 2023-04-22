// import {
//     useGetOneShoppingCartWithItemsQuery,
//     useCreateShoppingCartMutation,
//     useUpdateShoppingCartMutation
// } from '../src/features/shopping-cart/shoppingCartApi';
// import { useDispatch, useSelector } from 'react-redux';
// import { setShoppingCart } from './features/shopping-cart/shoppingCartSlice';
// import { useState, useEffect } from 'react';

import { ShoppingCartContext } from "./features/shopping-cart/shoppingCartContext"
import { useContext } from "react"
import CartProduct from "./ShoppingCartExperiment/CartProduct";
import Button from "react-bootstrap/Button";

function ShoppingCartList() {
    // const dispatch = useDispatch();
    // const [createShoppingCart] = useCreateShoppingCartMutation();
    // const [updateShoppingCart] = useUpdateShoppingCartMutation();

    // const shoppingCartId = useSelector(state => state.cart.shoppingCartId);

    // const { data, isLoading, error } = useGetOneShoppingCartWithItemsQuery(shoppingCartId);
    // console.log("executed twice")

    // useEffect(() => {
    //     if (!shoppingCartId) {
    //         createShoppingCart().then(response => {
    //             const newShoppingCartId = response.data.shopping_cart_id;
    //             dispatch(setShoppingCart({ shopping_cart_id: newShoppingCartId }));
    //         });
    //     }
    // }, [shoppingCartId, dispatch]);

    // if (!shoppingCartId) {
    //     return <div>Loading...</div>;
    // }

    // return(
    //     <div>{data}</div>
    // )

    const shoppingCart = useContext(ShoppingCartContext);

    return (
        <>
            <div>Items in your cart:</div>
            {shoppingCart.items.map((product, idx) => (
                <CartProduct key={idx} id={product.id} quantity={product.quantity}></CartProduct>
            ))}
            <h1>Total: ${shoppingCart.getTotalCost().toFixed(2)}</h1>

            <Button variant="success">
                Purchase items!
            </Button>
        </>
    )
}

export default ShoppingCartList
