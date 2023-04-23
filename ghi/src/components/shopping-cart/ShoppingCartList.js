import { ShoppingCartContext } from "../../features/shopping-cart/shoppingCartContext"
import { useContext, useState } from "react"
import CartMenuItem from "./CartMenuItem";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
// Shopping Cart API
import { useCreateShoppingCartMutation } from "../../features/shopping-cart/shoppingCartApi";
import { useCreateCartItemMutation } from "../../features/shopping-cart/shoppingCartApi";
// Order API
import { useCreateOrderMutation } from "../../features/orders/orderApi";

function ShoppingCartList() {
    const navigate = useNavigate();
    const shoppingCart = useContext(ShoppingCartContext);
    console.log(shoppingCart);

    const [createShoppingCart] = useCreateShoppingCartMutation();
    const [createCartItem] = useCreateCartItemMutation();
    const [createOrder] = useCreateOrderMutation();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const handleOrderSubmit = async (event) => {
        event.preventDefault();

        if (!isSubmitting) {
            setIsSubmitting(true);
            setTimeout(() => {
                setIsSubmitting(false);
            }, 3000);
        }

        try {
            const response = await createShoppingCart();
            const shoppingCartId = response.data.shopping_cart_id;

            shoppingCart.items.forEach(async (product) => {
                const cartItemData = {
                    shopping_cart_id: shoppingCartId,
                    menu_item_id: product.id,
                    quantity: product.quantity
                }
                await createCartItem(cartItemData);
            })

            const orderData = {
                order_date: new Date().toISOString().slice(0, 10),
                total_price: parseInt(shoppingCart.getTotalCost().toFixed(2)),
                shopping_cart_id: shoppingCartId,
                chef_id: shoppingCart.items[0].chef_id,
            }

            const edit = await createOrder(orderData);

            shoppingCart.clearCart();
            navigate('/orders')

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <h1>Items in your cart:</h1>
            {shoppingCart.items.length > 0 ? (
                shoppingCart.items.map((product, idx) => (
                    <CartMenuItem key={idx} id={product.id} quantity={product.quantity} photo={product.photo}></CartMenuItem>
                ))
            ) : (
                <p>Your cart is empty</p>
            )}
            {shoppingCart.items.length > 0 && (
                <>
                    <h2>Total: ${shoppingCart.getTotalCost().toFixed(2)}</h2>
                    <Button onClick={handleOrderSubmit} variant="success" disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Submit Order'}
                    </Button>
                </>
            )}
        </>
    )
}

export default ShoppingCartList
