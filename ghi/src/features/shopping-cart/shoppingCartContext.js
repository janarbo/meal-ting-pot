import { createContext, useState } from "react";
// import { useGetOneShoppingCartWithItemsQuery } from "./shoppingCartApi";
import { getProductData } from "../../ShoppingCartExperiment/productStore";

export const ShoppingCartContext = createContext({
    items: [],
    getProductQuantity: () => {},
    addOneToCart: () => {},
    removeOneFromCart: () => {},
    deleteFromCart: () => {},
    getTotalCost: () => {}
});

// [ {id, menu_item_id, quantity, shopping_cart_id}]

export function ShoppingCartProvider({children}) {
    const [cartProducts, setCartProducts] = useState([]);
    // const { data } = useGetOneShoppingCartWithItemsQuery(cartId);


    function getProductQuantity(id) {
        const quantity = cartProducts.find(product => product.id === id)?.quantity

        if (quantity === undefined) {
            return 0;
        }

        return quantity;
    }

    function addOneToCart(id) {
        const quantity = getProductQuantity(id);

        if (quantity === 0) {
            setCartProducts(
                [
                    ...cartProducts,
                    {
                        id: id,
                        quantity: 1
                    }
                ]
            )
        } else {
            setCartProducts(
                cartProducts.map(
                    product => product.id === id
                    ? {...product, quantity: product.quantity+1}
                    : product
                )
            )
        }
    }

    function removeOneFromCart(id) {
        const quantity = getProductQuantity(id);

        if (quantity == 1) {
            deleteFromCart(id);
        } else {
            setCartProducts(
                cartProducts.map(
                    product => product.id === id
                    ? {...product, quantity: product.quantity-1}
                    : product
                )
            )
        }
    }

    function deleteFromCart(id) {
        setCartProducts(
            cartProducts => cartProducts.filter(currentProduct => {
                return currentProduct.id != id;
            })
        )
    }

    function getTotalCost() {
        let totalCost = 0;
        cartProducts.map((cartItem) => {
            const productData = getProductData(cartItem.id);
            totalCost += (productData.price * cartItem.quantity);
        })
        return totalCost;
    }

    const contextValue = {
        items: cartProducts,
        getProductQuantity,
        addOneToCart,
        removeOneFromCart,
        deleteFromCart,
        getTotalCost
    }

    return (
        <ShoppingCartContext.Provider value={contextValue}>
            {children}
        </ShoppingCartContext.Provider>
    )
}

export default ShoppingCartProvider
