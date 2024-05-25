import ProductCarousal from "../components/ProductCarousal";
import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listProducts } from "../actions/productActions";
import { useSearchParams } from "react-router-dom";

function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;
  const [searchParams] = useSearchParams();
  let keyword = searchParams.get("keyword");
  console.log(products);

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [keyword, dispatch]);

  return (
    <>
      <br />
      {!keyword && <ProductCarousal />}
      <h1 className="my-3">Latest Product</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} xs={6} md={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
}

export default HomeScreen;
