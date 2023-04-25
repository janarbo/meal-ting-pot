import { ShoppingCartContext } from "../../features/shopping-cart/shoppingCartContext"
import { useContext, useState } from "react"
import CartMenuItem from "./CartMenuItem";
import { useNavigate } from "react-router-dom";
// Shopping Cart API
import { useCreateShoppingCartMutation } from "../../features/shopping-cart/shoppingCartApi";
import { useCreateCartItemMutation } from "../../features/shopping-cart/shoppingCartApi";
// Order API
import { useCreateOrderMutation } from "../../features/orders/orderApi";

function ShoppingCartList() {
    const navigate = useNavigate();
    const shoppingCart = useContext(ShoppingCartContext);

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
            const productsByChef = {};
            shoppingCart.items.forEach((product) => {
                const chefId = product.chef_id;
                if (chefId in productsByChef) {
                    productsByChef[chefId].push(product);
                } else {
                    productsByChef[chefId] = [product];
                }
            })

            for (let chefId in productsByChef) {
                const products = productsByChef[chefId];
                const response = await createShoppingCart();
                const shoppingCartId = response.data.shopping_cart_id;

                for (let product of products) {
                    const cartItemData = {
                        shopping_cart_id: shoppingCartId,
                        menu_item_id: product.id,
                        quantity: product.quantity
                    };
                    await createCartItem(cartItemData);
                }

                const orderData = {
                    order_date: new Date().toISOString().slice(0, 10),
                    total_price: parseInt(shoppingCart.getSubCost(products).toFixed(2)),
                    shopping_cart_id: shoppingCartId,
                    chef_id: parseInt(chefId),
                }

                await createOrder(orderData);
            }
            shoppingCart.clearCart();
            navigate('/orders')

        } catch (error) {
            console.error(error);
        }
    };

    return (
            <div data-theme="garden" className="min-h-screen pt-4 font-sans">
                <div className="bg-white pt-3 pl-5 pr-5 max-w-screen-2xl mx-auto">
                    <div className="flex flex-wrap">
                        <h3 className="mt-3 mb-4 font-normal">Shopping Cart</h3>
                        {shoppingCart.items.length > 0 && (
<<<<<<< HEAD
                        <div className="flex-grow-1 flex justify-end items-center">
                            <h3 className="mt-2 mb-4 font-normal">Total: ${shoppingCart.getTotalCost().toFixed(2)}</h3>
                            <button onClick={handleOrderSubmit} disabled={isSubmitting} className="bg-green-100 text-xl hover:bg-gray-100 text-gray-800 py-2 px-3 border rounded shadow mb-4 mt-2 ml-5">
                            {isSubmitting ? 'Submitting...' : 'Submit Order'}
                            </button>
                        </div>
                    )}
=======
                            <div className="flex-grow-1 flex justify-end items-center">
                                <h3 className="mt-2 mb-4 font-normal">Total: ${shoppingCart.getTotalCost().toFixed(2)}</h3>
                                <button onClick={handleOrderSubmit} disabled={isSubmitting} className="bg-green-100 text-xl hover:bg-green-200 text-gray-800 py-2 px-3 border rounded shadow mb-4 mt-2 ml-5">
                                {isSubmitting ? 'Submitting...' : 'Submit Order'}
                                </button>
                            </div>
                        )}
>>>>>>> main
                    </div>
                    <hr className="mt-0 mb-3"></hr>
                    {shoppingCart.items.length > 0 ? (
                    shoppingCart.items.map((product, idx) => (
                        <CartMenuItem key={idx} id={product.id} quantity={product.quantity} photo={product.photo}></CartMenuItem>
                    ))
                    ) : (
                    <h4 className="italic pb-4">Your cart is empty</h4>
                    )}
                </div>
            </div>
    )
}

export default ShoppingCartList
