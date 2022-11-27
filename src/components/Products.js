import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import "./products.css";
import SingleProduct from "./SingleProduct";

function Products(props) {
  const products = props.products;
  const [productImg, setProductImg] = useState("");
  let size = Object.keys(products).length;

  const RowTable = (i) => {
    //console.log("I is equal", i);
    return (
      <>
        <Row style={{ "margin-bottom": "20px" }}>
          <Col sm={6} md={3}>
            <SingleProduct product={products[i]} />
          </Col>
          <Col sm={6} md={3}>
            <SingleProduct product={products[i + 1]} />
          </Col>
          <Col sm={6} md={3}>
            <SingleProduct product={products[i + 2]} />
          </Col>
          <Col sm={6} md={3}>
            <SingleProduct product={products[i + 3]} />
          </Col>
        </Row>
      </>
    );
  };

  const DataTable = () => {
    let ret = [];
    let i = 0;
    for (i = 0; size > 3; i += 4) {
      //console.log("IN LOOP");
      ret[i / 4] = RowTable(i);
      size -= 4;
    }
    if (size === 1) {
      ret[i / 4 + 1] = (
        <>
          <Row style={{ "margin-bottom": "20px" }}>
            {" "}
            <Col sm={6} md={3}>
              <SingleProduct product={products[i]} />
            </Col>
            <Col sm={6} md={3}></Col>
            <Col sm={6} md={3}></Col> <Col sm={6} md={3}></Col>
          </Row>
        </>
      );
    } else if (size === 2) {
      ret[i / 4 + 1] = (
        <>
          <Row style={{ "margin-bottom": "20px" }}>
            {" "}
            <Col sm={6} md={3}>
              <SingleProduct product={products[i]} />
            </Col>
            <Col sm={6} md={3}>
              <SingleProduct product={products[i + 1]} />
            </Col>
            <Col sm={6} md={3}></Col>
            <Col sm={6} md={3}></Col>
          </Row>
        </>
      );
    } else if (size === 3) {
      ret[i / 4 + 1] = (
        <>
          <Row style={{ "margin-bottom": "20px" }}>
            {" "}
            <Col sm={6} md={3}>
              <SingleProduct product={products[i]} />
            </Col>
            <Col sm={6} md={3}>
              <SingleProduct product={products[i + 1]} />
            </Col>
            <Col sm={6} md={3}>
              <SingleProduct product={products[i + 2]} />
            </Col>
            <Col sm={6} md={3}></Col>
          </Row>
        </>
      );
    }
    return ret;
  };

  return (
    <>
      {DataTable()}
      {}
    </>
  );
}

export default Products;
