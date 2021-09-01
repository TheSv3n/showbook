import { white } from "colors";
import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <Spinner
      animation="border"
      role="status"
      style={{
        width: "100px",
        height: "100px",
        margin: "auto",
        display: "block",
        color: "white",
      }}
    ></Spinner>
  );
};

export default Loader;
