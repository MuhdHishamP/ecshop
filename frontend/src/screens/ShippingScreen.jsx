import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userActions";
import FormConatainer from "../components/FormConatainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { saveShippingAddress } from "../actions/cartActions";

function ShippingScreen() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shippingAddress } = cart;
  const [address, setAddress] = useState(shippingAddress.address);
  const [State, setState] = useState(shippingAddress.State);
  const [pinCode, setPinCode] = useState(shippingAddress.pinCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, State, pinCode, country }));
    navigate("/payment");
  };

  return (
    <FormConatainer>
      <CheckoutSteps step1 step2 />
      <h1 className="my-3">Shipping</h1>

      <Form onSubmit={(e) => submitHandler(e)}>
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter Address"
            value={address ? address : ""}
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="state" className="my-3">
          <Form.Label>State</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter State"
            value={State ? State : ""}
            onChange={(e) => setState(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="pincode" className="my-3">
          <Form.Label>Pincode</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter Pincode"
            value={pinCode ? pinCode : ""}
            onChange={(e) => setPinCode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="country" className="my-3">
          <Form.Label>Country</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter Country"
            value={country ? country : ""}
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary" className="my-3">
          Continue
        </Button>
      </Form>
    </FormConatainer>
  );
}

export default ShippingScreen;
