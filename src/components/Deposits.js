import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Title from "./Title";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  faStar,
  faStarHalf,
  faStarHalfAlt,
  faStarAndCrescent,
} from "@fortawesome/free-solid-svg-icons";

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits() {
  const [username, setUserName] = useState(localStorage.getItem("UserName"));
  const [products, setProducts] = useState([]);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("UserName");
    // console.log("token = ", token);
    setUserName(token);
    axios
      .post("http://localhost:4000/Products/company", {
        product_company: localStorage.getItem("UserName"),
      })
      .then(({ data }) => {
        setProducts(data);
        // console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .post("http://localhost:4000/login/getRating", {
        email: localStorage.getItem("EMAIL"),
      })
      .then(({ data }) => {
        setRating(data.market_rating);
      })

      .catch((error) => {
        console.log(error);
      });
  }, []);

  const Stars = (rating) => {
    const starArray = [...Array(5).keys()].map((i) => i + 1);
    return starArray.map((i) => {
      if (rating >= i) {
        return <FontAwesomeIcon key={i} icon={faStar} color={"orange"} />;
      } else if (rating >= i - 0.5) {
        return (
          <FontAwesomeIcon key={i} icon={faStarHalfAlt} color={"orange"} />
        );
      } else {
        return <></>;
      }
    });
  };

  return (
    <React.Fragment>
      <Title>{username}</Title>
      <Typography component="p" variant="h4">
        {rating.toFixed(2)}
        <div />
        {Stars(rating.toFixed(2))}
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
