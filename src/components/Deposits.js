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
      .post("http://localhost:4000/Products/company", [
        { product_company: localStorage.getItem("UserName") },
      ])
      .then(({ data }) => {
        setProducts(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <React.Fragment>
      <Title>{username}</Title>
      <Typography component="p" variant="h4">
        $3,024.00
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
