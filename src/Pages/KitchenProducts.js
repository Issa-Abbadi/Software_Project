import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Products from "../components/Products";
import Filtering_in_PLP from "../components/filtering_in_PLP";


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
      <Filtering_in_PLP></Filtering_in_PLP>
      <Products products={products} />

    </>
  );
}

export default KitchenProducts;
