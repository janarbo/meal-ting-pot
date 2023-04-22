import { Card, Button, Form, Row, Col } from 'react-bootstrap';
import { ShoppingCartContext } from '../features/shopping-cart/shoppingCartContext';
import { useContext } from 'react';

function ProductCard(props) {
    const product = props.product;
    const shoppingCart = useContext(ShoppingCartContext);
    const productQuantity = shoppingCart.getProductQuantity(product.id);

    console.log(shoppingCart.items);

    return (
        <Card>
            <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>${product.price}</Card.Text>
                { productQuantity > 0 ?
                    <>
                        <Form as={Row}>
                            <Form.Label column="true" sm="6">In Cart: {productQuantity}</Form.Label>
                            <Col sm="6">
                                <Button sm="6" className="mx-2" onClick={() => shoppingCart.addOneToCart(product.id)} >+</Button>
                                <Button sm="6" className="mx-2" onClick={() => shoppingCart.removeOneFromCart(product.id)}>-</Button>
                            </Col>
                        </Form>
                        <Button variant="danger" className="my-2" onClick={() => shoppingCart.deleteFromCart(product.id)}>Remove from cart</Button>
                    </>
                    : <Button variant="primary" onClick={()=> shoppingCart.addOneToCart(product.id)}>Add to Cart</Button>
                }
            </Card.Body>
         </Card>
    )
}

export default ProductCard;
