import React from "react";
import { Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Rating from "./Rating";

export const MoneyFormatter = new Intl.NumberFormat("en-IN");
export const MoneyFormatterWithFraction = new Intl.NumberFormat("en-IN", {
  minimumFractionDigits: 2,
});

function Product({ product }) {
  const formattedPrice = MoneyFormatter.format(product.price);
  return (
    <Card className="my-3 p-3 rounded" style={{ cursor: "pointer" }}>
      <LinkContainer to={`/product/${product._id}`}>
        <Card.Img
          src={`${product.image}`}
          style={{
            height: 200, // Set a consistent height
            objectFit: "cover", // Stretch smaller images to fill container
          }}
        />
      </LinkContainer>
      <Card.Body>
        <LinkContainer
          to={`/product/${product._id}`}
          style={{ textDecoration: "none" }}
        >
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </LinkContainer>
        <Card.Text as="div" className="my-3">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
            Color="#f8e825"
          />
        </Card.Text>
        <Card.Text as="h4">&#8377;{formattedPrice}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Product;
