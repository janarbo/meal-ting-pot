import { ShoppingCartContext } from '../../features/shopping-cart/shoppingCartContext';
import { useContext } from 'react';

function MenuItemCard(props) {
    const product = props.product;
    const shoppingCart = useContext(ShoppingCartContext);
    const productQuantity = shoppingCart.getProductQuantity(product.menu_item_id);

    return (
        <div onClick={props.onClick} className="bg-white hover:cursor-pointer max-w-sm rounded overflow-hidden shadow-lg">
            <img alt={product.photo} className="w-full h-48 md:h-50 rounded object-cover" src={product.photo}/>
            <div className="px-6 py-4">
                <div className="font-semibold text-xl mb-2 capitalize">{product.name}</div>
                <p className="text-gray-700 text-base mb-0">
                {product.description}
                </p>
            </div>
            <div className="flex justify-between">
                <h6 className="font-medium text-left ml-5">${product.price}</h6>
                { productQuantity > 0 ? (
                <h6 className="font-medium text-right mr-5">In Cart: {productQuantity}</h6>
                ) : (
                    <h6 className="font-bold text-right mr-5">+</h6>
                )}
            </div>
            <div className= "px-6 pt-0 pb-4">
                <hr className="mt-0"></hr>
            </div>
        </div>
    )
}

export default MenuItemCard;
