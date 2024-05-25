import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import {  useSearchParams } from "react-router-dom";

function SearchBox() {
  const [keyword, setKeyword] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const submitHandler = (e) => {
    e.preventDefault();
    keyword ? setSearchParams({ keyword }) : setSearchParams({});
  };
  return (
    <Form
      onSubmit={(e) => submitHandler(e)}
      style={{ display: "flex" }}
      className="my-sm-3"
    >
      <Form.Control
        as="input"
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        value={keyword}
        style={{ marginRight: ".5rem", color: "black " }}
      ></Form.Control>
      <Button
        variant="outline-success"
        type="submit"
        className="py-2 px-3 "
        style={{ marginRight: "1rem" }}
      >
        <i className="fa-solid fa-magnifying-glass"></i>
      </Button>
    </Form>
  );
}

export default SearchBox;
