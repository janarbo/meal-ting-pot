import { createContext, useState } from "react";

export const ShoppingCartContext = createContext({
    items: [],
    getProductQuantity: () => {},
    addOneToCart: () => {},
    removeOneFromCart: () => {},
    adjustQuantity: () => {},
    deleteFromCart: () => {},
    getTotalCost: () => {},
    clearCart: () => {},
});

export function ShoppingCartProvider({children}) {
    const [cartProducts, setCartProducts] = useState([]);

    function getProductQuantity(id) {
        const quantity = cartProducts.find(product => product.id === id)?.quantity

        if (quantity === undefined) {
            return 0;
        }

        return quantity;
    }

    function addOneToCart(id, price, chefId, photo) {
        const quantity = getProductQuantity(id);

        if (quantity === 0) {
            setCartProducts(
                [
                    ...cartProducts,
                    {
                        id: id,
                        quantity: 1,
                        price: price,
                        chef_id: chefId,
                        photo: photo
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

        if (quantity === 1) {
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

    function adjustQuantity(id, quantity) {
        if (quantity === "0 (Delete)") {
            deleteFromCart(id);
        } else {
            setCartProducts(
                cartProducts.map(
                    product => product.id === id
                    ? {...product, quantity: product.quantity=parseInt(quantity)}
                    : product
                )
            )
        }
    }

    function deleteFromCart(id) {
        setCartProducts(
            cartProducts => cartProducts.filter(currentProduct => {
                return currentProduct.id !== id;
            })
        )
    }

    function getTotalCost() {
        let totalCost = 0;
        for (let cartItem of cartProducts) {
            totalCost += (cartItem.price * cartItem.quantity);
        }
        return totalCost;
    }

    function getSubCost(products) {
        let subCost = 0;
        for (let product of products) {
            subCost += (product.price * product.quantity);
        }
        return subCost;
    }

    function clearCart() {
        setCartProducts([]);
    }

    const contextValue = {
        items: cartProducts,
        getProductQuantity,
        addOneToCart,
        removeOneFromCart,
        adjustQuantity,
        deleteFromCart,
        getTotalCost,
        getSubCost,
        clearCart,
    }

    return (
        <ShoppingCartContext.Provider value={contextValue}>
            {children}
        </ShoppingCartContext.Provider>
    )
}

export default ShoppingCartProvider
