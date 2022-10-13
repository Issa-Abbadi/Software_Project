import React, { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Products from "../components/Products";
import Filtering_in_PLP from "../components/filtering_in_PLP";

function KitchenProducts(props) {
  const [products, setProducts] = useState([]);
  const [type, setType] = useState(props.props.type);

  let filterData;
  const navigate = useNavigate();

  useEffect(() => {
    console.log(type);

    axios
      .get("http://localhost:4000/Products/kitchen/")
      .then(({ data }) => {
        if (type === "0") {
          setProducts(data);
        } else if (type === "1") {
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
        }
      })
      .catch((error) => {
        console.log("false");
        console.log(error);
      });
  }, [type]);

  const productsFilterType = (data, filter) => {
    return data.filter(function (product) {
      return product.sub_category == filter;
    });
  };

  let filteredProducts;
  return (
    <>
      <Filtering_in_PLP></Filtering_in_PLP>
      <Products products={products} />
    </>
  );
}

export default KitchenProducts;