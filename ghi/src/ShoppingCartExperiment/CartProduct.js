import Button from 'react-bootstrap/Button';
import { ShoppingCartContext } from '../features/shopping-cart/shoppingCartContext';
import { useContext } from "react";
import { getProductData } from './productStore';

function CartProduct(props) {
    const shoppingCart = useContext(ShoppingCartContext);
    const id = props.id;
    const quantity = props.quantity;
    const productData = getProductData(id);

    return (
        <>
            <h3>{productData.title}</h3>
            <p>{quantity} total</p>
            <p>${ (quantity * productData.price).toFixed(2) }</p>
            <Button size="sm" onClick={() => shoppingCart.deleteFromCart(id)}>Remove</Button>
            <hr></hr>
        </>
    )
}

export default CartProduct;
