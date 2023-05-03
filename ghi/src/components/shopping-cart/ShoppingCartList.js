import { ShoppingCartContext } from "../../features/shopping-cart/shoppingCartContext"
import { useContext }from "react"
import CartMenuItem from "./CartMenuItem";
// Shopping Cart API
import { useCreateShoppingCartMutation } from "../../features/shopping-cart/shoppingCartApi";
import { useCreateCartItemMutation } from "../../features/shopping-cart/shoppingCartApi";
// Order API
import { useCreateOrderMutation } from "../../features/orders/orderApi";


function ShoppingCartList() {
    const shoppingCart = useContext(ShoppingCartContext);

    const [createShoppingCart] = useCreateShoppingCartMutation();
    const [createCartItem] = useCreateCartItemMutation();
    const [createOrder] = useCreateOrderMutation();

    // const apiUrl = process.env.API_URL || 'http://localhost:4000';

    const checkout = async () => {
        await fetch(`https://bidoof_supremacy.gitlab.io/meal-ting-pot/checkout`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                items: shoppingCart.items
            })
        }).then((response) => {
            return response.json();
        }).then((response) => {
            if(response.url) {
                handleOrderSubmit();
                window.location.assign(response.url);
            }
        })
    }

    async function handleOrderSubmit() {
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
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen font-sans">
            <div className="max-w-screen-2xl mx-auto">
                    <div className="flex justify-between items-center">
                        <h3 className="text-2xl">Shopping Cart</h3>
                        {shoppingCart.items.length > 0 && (
                        <div className="flex items-center">
                            <h3 className="text-2xl">Total: ${shoppingCart.getTotalCost().toFixed(2)}</h3>
                            <button onClick={checkout} className="bg-green-100 text-xl hover:opacity-80 text-gray-800 py-2 px-2 border rounded shadow mb-2 ml-5">
                            Checkout
                            </button>
                        </div>
                    )}
                    </div>
                <hr className="mt-0 mb-2"></hr>
                {shoppingCart.items.length > 0 ? (
                shoppingCart.items.map((product, idx) => (
                    <CartMenuItem key={idx} id={product.id} quantity={product.quantity} photo={product.photo}></CartMenuItem>
                ))
                ) : (
                <h4 className="italic pb-4 text-xl">Your cart is empty</h4>
                )}
            </div>
        </div>
    )
}

export default ShoppingCartList
