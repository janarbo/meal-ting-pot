import { ShoppingCartContext } from "../../features/shopping-cart/shoppingCartContext"
import { useContext } from "react"
import CartMenuItem from "./CartMenuItem";
import Button from "react-bootstrap/Button";

function ShoppingCartList() {
    const shoppingCart = useContext(ShoppingCartContext);
    console.log(shoppingCart);
    return (
        <>
            <h1>Items in your cart:</h1>
            {shoppingCart.items.map((product, idx) => (
                <CartMenuItem key={idx} id={product.id} quantity={product.quantity} photo={product.photo}></CartMenuItem>
            ))}
            <h2>Total: ${shoppingCart.getTotalCost().toFixed(2)}</h2>
            <Button variant="success">
                Submit Order
            </Button>
        </>
    )
}

export default ShoppingCartList
