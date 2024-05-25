import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { Button, Col, Row, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { MoneyFormatter } from "../components/Product";
import { MoneyFormatterWithFraction } from "../components/Product";
import { getOrderDetails } from "../actions/orderActions";

function OrderScreen() {
  const { orderId } = useParams();
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let razorPayAmount;
  let itemsPrice;

  if (!loading && !error) {
    itemsPrice = order.orderItems.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    );
    razorPayAmount = Number(order.totalPrice) * 100;
  }

  useEffect(() => {
    if (!order || order._id !== Number(orderId)) {
      dispatch(getOrderDetails(orderId));
    }
  }, [order, orderId, dispatch]);

  const handleRazorPay = () => {
    var options = {
      key: "rzp_test_tpPg5W0HbmQJe2",
      amount: razorPayAmount,
      currency: "INR",
      name: "EcShop",
      image: "/favicon.png",
      handler: function (response) {
        alert("Payment successful: " + response.razorpay_payment_id);
      },
      prefill: {
        name: "Your Name",
        email: "your.email@example.com",
      },
    };

    var rzp = new Razorpay(options);
    rzp.open();
  };

  return loading ? (
    <div className="mt-3">
      <Loader />
    </div>
  ) : error ? (
    <div className="mt-3">
      <Message variant="danger">{error}</Message>
    </div>
  ) : (
    <div>
      <h1 className="mt-3">Order: {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2 className="pt-2">Shipping</h2>
              <p>
                <strong>Name: </strong>
                {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>
                <a
                  href={`mailto:${order.user.email}`}
                  style={{ textDecoration: "none" }}
                  onMouseOver={(e) => {
                    e.target.style.textDecoration = "underline";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.textDecoration = "none";
                  }}
                >
                  {order.user.email}
                </a>
              </p>
              <p>
                <strong>Shipping: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.State},{" "}
                {order.shippingAddress.pinCode}, {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  Delivered on {order.deliveredAt.substring(0, 10)}
                </Message>
              ) : (
                <Message variant="warning">Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2 className="pt-3">Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">
                  Paid on {order.paidAt.substring(0, 10)}
                </Message>
              ) : (
                <Message variant="warning">Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2 className="pt-3">Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message variant="info">Order is Empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
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
                  <Col> &#8377;{order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col md={1} xs={1}>
                    :
                  </Col>
                  <Col>
                    &#8377;{MoneyFormatterWithFraction.format(order.taxPrice)}
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col md={1} xs={1}>
                    :
                  </Col>
                  <Col>
                    {" "}
                    &#8377;{MoneyFormatterWithFraction.format(order.totalPrice)}
                  </Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item className="m-3">
                  <Button
                    className="w-100"
                    style={{ fontSize: "1.2rem" }}
                    onClick={handleRazorPay}
                  >
                    <i className="fa-solid fa-credit-card"></i> Pay
                  </Button>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default OrderScreen;
