import Button from 'react-bootstrap/Button';
import { ShoppingCartContext } from '../../features/shopping-cart/shoppingCartContext';
import { useContext } from "react";
import { useGetOneMenuItemQuery } from '../../features/menu-items/menuItemApi';

function CartMenuItem(props) {
    const shoppingCart = useContext(ShoppingCartContext);
    const id = props.id;
    const quantity = props.quantity;
    const photo = props.photo;
    const { data: menuItem, isLoading } = useGetOneMenuItemQuery(id);

    if (isLoading) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <>
            <h3>{menuItem.name}</h3>
            <img className="max-h-72 max-w-72 w-40 h-40 rounded-full" src={photo}></img>
            <p>{quantity} Total</p>
            <p>${ (quantity * menuItem.price).toFixed(2) }</p>
            <Button size="sm" variant="danger" onClick={() => shoppingCart.deleteFromCart(id)}>Remove</Button>
            <hr></hr>
        </>
    )
}

export default CartMenuItem;
