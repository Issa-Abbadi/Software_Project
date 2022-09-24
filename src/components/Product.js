import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const Product = (props) => {
  const {
    _id,
    product_name,
    product_price,
    product_company,
    product_category,
    product_img,
  } = props.obj;

  return (
    <tr>
      <td>{}</td>
      <td>{}</td>
      <td>{}</td>
    </tr>
  );
};

export default Product;
