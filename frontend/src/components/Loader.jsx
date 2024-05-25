import React from "react";

import Spinner from "react-bootstrap/Spinner";

function Loader() {
  return (
    <Spinner
      animation="border"
      role="status"
      style={{ height: 100, width: 100, margin: "auto", display: "block" }}
    >
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}

export default Loader;
