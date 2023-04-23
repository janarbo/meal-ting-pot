import { Card, Button, Form, Row, Col } from 'react-bootstrap';
import { ShoppingCartContext } from './features/shopping-cart/shoppingCartContext';
import { useContext } from 'react';

function MenuItemCard(props) {
    const product = props.product;
    const shoppingCart = useContext(ShoppingCartContext);
    const productQuantity = shoppingCart.getProductQuantity(product.menu_item_id);

    return (
        <Card>
            <Card.Body>
                <Card.Img variant="top" src={product.photo}/>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>${product.price}</Card.Text>
                { productQuantity > 0 ?
                    <>
                        <Form as={Row}>
                            <Form.Label column="true" sm="6">In Cart: {productQuantity}</Form.Label>
                            <Col sm="6">
                                <Button sm="6" className="mx-2" onClick={() => shoppingCart.addOneToCart(product.menu_item_id)} >+</Button>
                                <Button sm="6" className="mx-2" onClick={() => shoppingCart.removeOneFromCart(product.menu_item_id)}>-</Button>
                            </Col>
                        </Form>
                        <Button variant="danger" className="my-2" onClick={() => shoppingCart.deleteFromCart(product.menu_item_id)}>Remove from cart</Button>
                    </>
                    : <Button variant="primary" onClick={()=> shoppingCart.addOneToCart(product.menu_item_id, product.price, product.chef_id, product.photo)}>Add to Cart</Button>
                }
            </Card.Body>
         </Card>
    )
}

export default MenuItemCard;
