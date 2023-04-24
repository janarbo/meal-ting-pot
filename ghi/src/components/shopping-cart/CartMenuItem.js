import { ShoppingCartContext } from '../../features/shopping-cart/shoppingCartContext';
import { useContext } from "react";
import { useGetOneMenuItemQuery } from '../../features/menu-items/menuItemApi';
import { useState } from 'react';

function CartMenuItem(props) {
    const shoppingCart = useContext(ShoppingCartContext);
    const id = props.id;
    const quantity = props.quantity;
    const photo = props.photo;
    const { data: menuItem, isLoading } = useGetOneMenuItemQuery(id);

    const [moreThanTenSelected, setMoreThanTenSelected] = useState(quantity >= 10);
    const [moreThanTenValue, setMoreThanTenValue] = useState(quantity);

    const [select, setSelect] = useState(quantity < 10);
    const [selectValue, setSelectValue] = useState(quantity);

    if (isLoading) {
        return (
            <div>Loading...</div>
        )
    }

    const optionList = ["0 (Delete)",1,2,3,4,5,6,7,8,9];
    const handleQuantityChange = (event) => {
        const value = event.target.value;
        if (value == "10+") {
            setSelect(false);
            setMoreThanTenSelected(true);
        } else {
            setMoreThanTenSelected(false);
            setSelectValue(value);
            shoppingCart.adjustQuantity(id, value);
        }
    }

    const handleInputChange = (value) => {
        if (value < 1) {
            return;
        } else if (value >= 10) {
        setMoreThanTenSelected(true);
        setMoreThanTenValue(value);
        shoppingCart.adjustQuantity(id, value);
        } else {
        setMoreThanTenSelected(false);
        setSelectValue(value);
        setSelect(true);
        shoppingCart.adjustQuantity(id, value);
    }
    }

    return (
        <>
        <div className="flex">
            <img className="max-h-72 max-w-72 w-40 h-40 rounded" src={photo}></img>
            <div className="flex flex-col ml-4">
                <h4 className="font-normal">{menuItem.name}</h4>
                <div className="flex items-center">
                    <p className="mr-1 pt-3">Qty:</p>
                    { select && (
                        <select onChange={handleQuantityChange} value={selectValue} required id="quantity" name="quantity" className="border border-gray-400 rounded-md py-1 px-4">
                        {optionList.map(i => {
                            if (i === quantity) {
                                return (
                                    <option key={i} value={i}>
                                        {quantity}
                                    </option>
                                );
                            }
                            return (
                                <option key={i} value={i}>{i}</option>
                            );
                        })}
                            <option key="10+" value="10+">10+</option>
                        </select>
                    )}
                    { moreThanTenSelected && (
                        <div>
                            <input
                                type="number"
                                value={moreThanTenValue}
                                onChange={(event) => setMoreThanTenValue(event.target.value)}
                                required
                                className="inline-block border border-gray-400 rounded-md py-1 px-4 mr-2 w-24 h-12">
                            </input>
                            <button onClick={() => handleInputChange(moreThanTenValue)} className="text-gray-800 hover:bg-gray-100 py-2 px-3 border rounded">Update</button>
                        </div>
                    )}
                    <button onClick={() => shoppingCart.deleteFromCart(id)} className="text-gray-800 hover:bg-gray-100 py-2 px-3 border rounded">Delete</button>
                </div>
                <div>
                        <p className="mt-2 text-l">Price: ${menuItem.price.toFixed(2)}</p>
                        {quantity > 1 ? (
                            <p className="text-l">Subtotal ({quantity} items): ${(quantity * menuItem.price).toFixed(2)}</p> )
                        : (
                            <p className="text-l">Subtotal ({quantity} item): ${(quantity * menuItem.price).toFixed(2)}</p>
                        )}
                </div>
            </div>
        </div>
        <hr className="mt-0"></hr>
        </>
    )
}

export default CartMenuItem;
