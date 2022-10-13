import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "./products.css"
function Products(props) {
  const products = props.products;
  let size = Object.keys(products).length;
  const Stars = (rating) => {
    const starArray = [...Array(5).keys()].map((i) => i + 1);
    return starArray.map((i) => (
      <FontAwesomeIcon
        key={i}
        icon={faStar}
        color={rating >= i ? "orange" : "lightgrey"}
      />
    ));
  };

  const card = (product) => {
    return (
      <div class="card cardContent">
        
        <div class="hover-overlay ">
          <a href="#!">
            <img src={product.product_img} class="img-fluid" />
          </a>
        </div>

        <div class="card-body">
          <h5 class="card-title">{product.product_name}</h5>
          <h5 class="card-title">{Stars(product.product_rating)}</h5>
          <h5 class="card-title">{product.product_price}</h5>
          <p class="card-text">{product.product_description}</p>
          <a href="#!" class="btn btn-primary">
            Buy
          </a>
        </div>
      </div>
    );
  };

  const RowTable = (i) => {
    console.log("I is equal", i);
    
    return (
       <>
        <Row style={{"margin-bottom":"20px"}}>
          <Col sm={6} md={3}>
            {card(products[i])}
          </Col>
          <Col sm={6} md={3}>
            {card(products[i + 1])}
          </Col>
          <Col sm={6} md={3}>
            {card(products[i + 2])}
          </Col>
          <Col sm={6} md={3}>
            {card(products[i + 3])}
          </Col>
        </Row>
      </>
    );
  };

  const DataTable = () => {
    let ret = [];
    let i = 0;
    for (i = 0; size > 3; i += 4) {
      console.log("IN LOOP");
      ret[i / 4] = RowTable(i);
      size -= 4;
    }
    if (size === 1) {
      ret[i / 4 + 1] = (
        <>
          <Row style={{"margin-bottom":"20px"}}>
            {" "}
            <Col sm={6} md={3}>
              {card(products[i])}
            </Col>
            <Col sm={6} md={3}></Col>
            <Col sm={6} md={3}></Col> <Col sm={6} md={3}></Col>
          </Row>
        </>
      );
    } else if (size === 2) {
      ret[i / 4 + 1] = (
        <>
          <Row style={{"margin-bottom":"20px"}}>
            {" "}
            <Col sm={6} md={3}>
              {card(products[i])}
            </Col>
            <Col sm={6} md={3}>
              {card(products[i + 1])}
            </Col>
            <Col sm={6} md={3}></Col>
            <Col sm={6} md={3}></Col>
          </Row>
        </>
      );
    } else if (size === 3) {
      ret[i / 4 + 1] = (
        <>
          <Row style={{"margin-bottom":"20px"}}>
            {" "}
            <Col sm={6} md={3}>
              {card(products[i])}
            </Col>
            <Col sm={6} md={3}>
              {card(products[i + 1])}
            </Col>
            <Col sm={6} md={3}>
              {card(products[i + 2])}
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
