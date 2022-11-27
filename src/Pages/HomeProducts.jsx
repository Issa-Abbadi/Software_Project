import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import Products from "../components/Products";

function HomeProducts(props) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/Products/home")
      .then(({ data }) => {
        setProducts(data);
        // console.log("True");
        // console.log(data);
      })
      .catch((error) => {
        console.log("false");
        console.log(error);
      });
  }, []);

  return (
    <>
      <div class="father">
        <div class="sidee-bar">Hello World , Welcome</div>
        <div style={{ margin: "20px" }} class="content-bar">
          <Products products={products} />
        </div>
      </div>
    </>
  );
}

export default HomeProducts;
