import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Products from "../components/Products";

function KitchenProducts(props) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/Products/kitchen")
      .then(({ data }) => {
        setProducts(data);
        console.log("True");
        console.log(data);
      })
      .catch((error) => {
        console.log("false");
        console.log(error);
      });
  }, []);

  return (
    <>
      <Products products={products} />
    </>
  );
}

export default KitchenProducts;
