import { ShoppingCartContext } from "../../features/shopping-cart/shoppingCartContext"
import { useContext, useState } from "react"
import CartMenuItem from "./CartMenuItem";
import { useNavigate } from "react-router-dom";
// Shopping Cart API
import { useCreateShoppingCartMutation } from "../../features/shopping-cart/shoppingCartApi";
import { useCreateCartItemMutation } from "../../features/shopping-cart/shoppingCartApi";
// Order API
import { useCreateOrderMutation } from "../../features/orders/orderApi";
import Footer from "../../Footer";
// Toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

            toast.success("Order submitted successfully! Navigating...", {
                autoClose: 2900,
                hideProgressBar: true,
                icon: ({ theme, type }) => (
                    <img
                        alt="https://cdn-icons-png.flaticon.com/512/534/534820.png?w=826&t=st=1683164450~exp=1683165050~hmac=085194f9717385afe47456d8f24848796d83a163996fe31e8d2d9c83f38e7881"
                        src="https://cdn-icons-png.flaticon.com/512/534/534820.png?w=826&t=st=1683164450~exp=1683165050~hmac=085194f9717385afe47456d8f24848796d83a163996fe31e8d2d9c83f38e7881"
                    />
                ),
            });

            setTimeout(() => {
                navigate("/orders");
                shoppingCart.clearCart();

            }, 2900);

        } catch (error) {
            console.error(error);
        }

    }

    return (
        <>
        <div className="min-h-screen font-sans pb-5">
            <div className="max-w-screen-xl mx-auto pt-10">
                    <div className="flex justify-between items-center">
                        <h3 className="text-2xl">Shopping Cart</h3>
                        {shoppingCart.items.length > 0 && (
                        <div className="flex items-center">
                            <h3 className="text-2xl">Total: ${shoppingCart.getTotalCost().toFixed(2)}</h3>
                            <button onClick={handleOrderSubmit} className="bg-[#829b7a] text-xl hover:opacity-80 text-white py-2 px-2 border rounded shadow mb-2 ml-5">
                            Submit Order
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
            <ToastContainer
                position="top-right"
                toastStyle={{ top: '65px' }}
            />
        </div>
        <Footer />
        </>
    )
}

export default ShoppingCartList
