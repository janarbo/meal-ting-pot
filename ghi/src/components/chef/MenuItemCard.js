import { Card, Button, Form, Row, Col } from 'react-bootstrap';
import { ShoppingCartContext } from '../../features/shopping-cart/shoppingCartContext';
import { useContext } from 'react';

function MenuItemCard(props) {
    const product = props.product;
<<<<<<< HEAD
=======
    console.log(product);
>>>>>>> main
    const shoppingCart = useContext(ShoppingCartContext);
    const productQuantity = shoppingCart.getProductQuantity(product.menu_item_id);

    return (
        // <Card>
        //     <Card.Body>
        //         <Card.Img variant="top" src={product.photo} className="rounded max-h-60 max-w-60 h-auto w-auto"/>
        //         <Card.Title className="capitalize">{product.name}</Card.Title>
        //         <Card.Text>${product.price}</Card.Text>
        //         { productQuantity > 0 ?
        //             <>
        //                 <Form as={Row}>
        //                     <Form.Label column="true" sm="6">In Cart: {productQuantity}</Form.Label>
        //                     <Col sm="6">
        //                         <Button sm="6" className="mx-2" onClick={() => shoppingCart.addOneToCart(product.menu_item_id)} >+</Button>
        //                         <Button sm="6" className="mx-2" onClick={() => shoppingCart.removeOneFromCart(product.menu_item_id)}>-</Button>
        //                     </Col>
        //                 </Form>
        //                 <Button variant="danger" className="my-2" onClick={() => shoppingCart.deleteFromCart(product.menu_item_id)}>Remove from cart</Button>
        //             </>
        //             : <Button variant="primary" onClick={()=> shoppingCart.addOneToCart(product.menu_item_id, product.price, product.chef_id, product.photo)}>Add to Cart</Button>
        //         }
        //     </Card.Body>
        //  </Card>

        <div className="max-w-sm rounded overflow-hidden shadow-lg">
            <img className="w-full h-48 md:h-50 rounded object-cover" src={product.photo}/>
<<<<<<< HEAD
            <div className="px-6 py-4">
                <div className="font-semibold text-xl mb-2 capitalize">{product.name}</div>
                <p className="text-gray-700 text-base">
                {product.description}
                </p>
            </div>
            <div className="px-6 pt-4 pb-2">
                { productQuantity > 0 ? (
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                ) : <button className="bg-[#b05e5e] font-normal text-xl hover:bg-[#bf7070] py-2 px-3 border mb-2 mt-2" onClick={()=> shoppingCart.addOneToCart(product.menu_item_id, product.price, product.chef_id, product.photo)}>Add to Cart</button>
=======
            <div class="px-6 py-4">
                <div class="font-semibold text-xl mb-2 capitalize">{product.name}</div>
                <p class="text-gray-700 text-base">
                {product.description}
                </p>
            </div>
            <div class="px-6 pt-4 pb-2">
                { productQuantity > 0 ? (
                    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                ) : <button class="bg-[#b05e5e] font-normal text-xl hover:bg-[#bf7070] py-2 px-3 border mb-2 mt-2" onClick={()=> shoppingCart.addOneToCart(product.menu_item_id, product.price, product.chef_id, product.photo)}>Add to Cart</button>
>>>>>>> main
                }
            </div>
        </div>
    )
}

export default MenuItemCard;
