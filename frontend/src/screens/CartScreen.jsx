import React, { useEffect } from "react";
import {
  Link,
  useParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Message from "../components/Message";
import { addToCart, removeFromCart } from "../actions/cartActions";
import { MoneyFormatter } from "../components/Product";

function CartScreen() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const qty = Number(searchParams.get("qty"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, [dispatch, id, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  const checkoutHandler = () => {
    if (userInfo) {
      navigate("/shipping");
    } else navigate("/login");
  };

  return (
    <Row>
      <Col md={8}>
        <h1 className="my-3">Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message variant="info">
            Your Cart is empty <Link to="/"> Go back </Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row className="CartItemDetails">
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} rounded fluid />
                  </Col>

                  <Col md={3} className="CartItemNames">
                    <LinkContainer to={`/product/${item.product}`}>
                      <span>
                        <b>{item.name}</b>
                      </span>
                    </LinkContainer>
                  </Col>
                  <Col md={2} className="CartItemPrice">
                    &#8377;{MoneyFormatter.format(item.price)}
                  </Col>
                  <Col md={3} className="CartItemQty">
                    <Form.Select
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                  <Col md={1} className="CartItemDelete">
                    <Button
                      variant="light"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card className="my-3 p-2">
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                subtotal (
                {cartItems.reduce((totalItems, item) => {
                  return totalItems + item.qty;
                }, 0)}
                ) items
              </h2>
              <b>
                &#8377;
                {MoneyFormatter.format(
                  cartItems.reduce((totalPrice, item) => {
                    return totalPrice + item.qty * item.price;
                  }, 0)
                )}
              </b>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                style={{ width: "100%" }}
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed to checkout{" "}
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
}

export default CartScreen;
