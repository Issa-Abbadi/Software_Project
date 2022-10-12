import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Products from "../components/Products";

function KitchenProducts(props) {
  const [products, setProducts] = useState([]);
  const [type, setType] = useState(props.props.type);

  let filterData;

  useEffect(() => {
    axios
      .get("http://localhost:4000/Products/kitchen/")
      .then(({ data }) => {
        if (type === "1") {
          filterData = productsFilterType(data, "رفايع المطبخ");
          setProducts(filterData);
        } else if (type === "2") {
          filterData = productsFilterType(data, "أواني الطبخ");
          setProducts(filterData);
        } else if (type === "3") {
          filterData = productsFilterType(data, "توزيع وتوابل");
          setProducts(filterData);
        } else {
          setProducts(data);

          console.log("True");
          console.log(data);
        }
      })
      .catch((error) => {
        console.log("false");
        console.log(error);
      });
  }, []);

  const productsFilterType = (data, filter) => {
    return data.filter(function (product) {
      return product.sub_category == filter;
    });
  };

  let filteredProducts;
  return (
    <>
      <Products products={products} />
    </>
  );
}

export default KitchenProducts;
