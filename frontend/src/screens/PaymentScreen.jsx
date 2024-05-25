import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormConatainer from "../components/FormConatainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { savePaymentMethod } from "../actions/cartActions";

function PaymentScreen() {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("Debit Card");

  if (!shippingAddress) {
    navigate("/shipping");
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <FormConatainer>
      <CheckoutSteps step1 step2 step3 />

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="paymentMethod">
          <Form.Label as="legend" className="mb-3">
            Select Payment Method
          </Form.Label>
          <Row>
            <Col>
              <Form.Check
                type="radio"
                label="Debit Card"
                id="debitCard"
                name="paymentMethod"
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mb-3"
              ></Form.Check>
            </Col>
          </Row>
        </Form.Group>

        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormConatainer>
  );
}

export default PaymentScreen;
