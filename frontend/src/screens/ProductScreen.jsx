import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button, Col, Row, Image, ListGroup, Form } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { MoneyFormatter } from "../components/Product";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {
  listProductDetails,
  createProductReview,
} from "../actions/productActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";

function ProductScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [qty, setqty] = useState(1);
  const [ReviewRating, setReviewRating] = useState(0);
  const [ReviewComment, setReviewComment] = useState("");
  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    success: successProductReview,
    loading: loadingProductReview,
    error: errorProductReview,
  } = productReviewCreate;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProductReview(id, {rating:ReviewRating, comment:ReviewComment}));
  };

  useEffect(() => {
    if (successProductReview) {
      setReviewRating(0);
      setReviewComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(id));
  }, [dispatch, id, successProductReview]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  return (
    <div>
      <LinkContainer to="/">
        <Button variant="light" className="my-3 border border-secondary">
          Go back
        </Button>
      </LinkContainer>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <Row>
            <Col md={6} xs={12}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3} xs={6} className="my-2">
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                    Color="#f8e825"
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  &#8377;{MoneyFormatter.format(product.price)}
                </ListGroup.Item>
                {/* this is the formatted price */}
                <ListGroup.Item>{product.description}</ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3} xs={6} className="my-2">
              <ListGroup>
                <ListGroup.Item>
                  <Row>
                    <Col md={4} xs={4}>
                      Price{" "}
                    </Col>
                    <Col md={1} xs={1}>
                      :
                    </Col>
                    <Col className="text-end">
                      &#8377;{MoneyFormatter.format(product.price)}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col md={4} xs={4}>
                      Status{" "}
                    </Col>
                    <Col md={1} xs={1}>
                      :
                    </Col>
                    <Col className="text-end">
                      {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col xs="auto" className="my-1">
                        <Form.Select
                          value={qty}
                          onChange={(e) => setqty(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Select>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item>
                  <Button
                    variant="dark"
                    style={{ width: "100%" }}
                    disabled={product.countInStock == 0}
                    onClick={addToCartHandler}
                  >
                    Add to cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h4>Reviews</h4>
              {product.reviews.length === 0 && (
                <Message variant="info">No Reviews</Message>
              )}
              <ListGroup variant="flush">
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} color="#f8e825" />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h4>Write a Review</h4>

                  {loadingProductReview && <Loader />}
                  {successProductReview && (
                    <Message variant="success">Review Submitted</Message>
                  )}
                  {errorProductReview && (
                    <Message variant="danger">{errorProductReview}</Message>
                  )}

                  {userInfo ? (
                    <Form onSubmit={(e) => submitHandler(e)}>
                      <Form.Group controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as="select"
                          value={ReviewRating}
                          onChange={(e) => setReviewRating(e.target.value)}
                          onMouseEnter={(e) =>
                            (e.target.style.cursor = "pointer")
                          }
                        >
                          <option value="">Select...</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="comment" className="my-3">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows="3"
                          value={ReviewComment}
                          placeholder="Give your Comment"
                          onChange={(e) => setReviewComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>

                      <Button
                        type="submit"
                        variant="primary"
                        className="my-2"
                        disabled={loadingProductReview}
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message variant="info">
                      Please <Link to="/login">login</Link> to write a Review
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}

export default ProductScreen;
