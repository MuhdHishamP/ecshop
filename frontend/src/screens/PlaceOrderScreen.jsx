import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Col, Row, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";
import { MoneyFormatter } from "../components/Product";
import { MoneyFormatterWithFraction } from "../components/Product";
import { createOrder } from "../actions/orderActions";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";

function PlaceOrderScreen() {
  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const itemsPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const shippingPrice = itemsPrice > 500 ? 0 : 80;

  const taxPrice = (0.18 * itemsPrice).toFixed(2);

  const totalPrice = (itemsPrice + shippingPrice + Number(taxPrice)).toFixed(2);

  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
    if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [success, navigate, order, cart.paymentMethod]);

  const placeOrder = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: itemsPrice,
        shippingPrice: shippingPrice,
        taxPrice: taxPrice,
        totalPrice: totalPrice,
      })
    );
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2 className="pt-2">Shipping</h2>
              <p>
                <strong>Shipping: </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.State},{" "}
                {cart.shippingAddress.pinCode}, {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2 className="pt-3">Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {cart.paymentMethod}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2 className="pt-3">Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message variant="info">Your Cart is Empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      {" "}
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} X &#8377;
                          {MoneyFormatter.format(item.price)} = &#8377;
                          {MoneyFormatter.format(item.qty * item.price)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2 className="px-3 pt-3">Order Summary</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Items Price</Col>
                  <Col md={1} xs={1}>
                    :
                  </Col>
                  <Col>&#8377;{MoneyFormatter.format(itemsPrice)}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col md={1} xs={1}>
                    :
                  </Col>
                  <Col> &#8377;{shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col md={1} xs={1}>
                    :
                  </Col>
                  <Col>
                    &#8377;{MoneyFormatterWithFraction.format(taxPrice)}
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col md={1} xs={1}>
                    :
                  </Col>
                  <Col> &#8377;{totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  type="button"
                  className="w-100"
                  disabled={cart.cartItems.length === 0}
                  onClick={placeOrder}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default PlaceOrderScreen;
