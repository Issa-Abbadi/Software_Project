import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Title from "./Title";
import { useState, useEffect } from "react";
import axios from "axios";

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits() {
  const [username, setUserName] = useState(localStorage.getItem("UserName"));
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("UserName");
    console.log("token = ", token);
    setUserName(token);
    axios
      .post("http://localhost:4000/Products/company", {
        product_company: localStorage.getItem("UserName"),
      })
      .then(({ data }) => {
        setProducts(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const getRating = (products) => {
    console.log(products);
    let sum = 0;
    let len = 0;
    for (let i = 0; i < products.length; i++) {
      console.log(i);
      sum += products[i].product_rating;
      len += 1;
    }
    console.log("sum&len", sum, len);
    return sum / len;
  };

  return (
    <React.Fragment>
      <Title>{username}</Title>
      <Typography component="p" variant="h4">
        {getRating(products)}
      </Typography>
      {/* <Typography color="text.secondary" sx={{ flex: 1 }}>
     on 15 March, 2019
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
         View balance
        </Link>
      </div> */}
    </React.Fragment>
  );
}
