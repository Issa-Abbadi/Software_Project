import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import SingleProduct from "../components/SingleProduct";
import Button from "@mui/material/Button";
import { LocalGasStationRounded } from "@mui/icons-material";
import "./product.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Alert from "@mui/material/Alert";
import axios from "axios";

import {
  faStar,
  faStarHalf,
  faStarHalfAlt,
  faStarAndCrescent,
} from "@fortawesome/free-solid-svg-icons";

function Product(props) {
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

  const addtoCart = () => {
    axios
      .post("http://localhost:4000/login/addtoCart", {
        email: localStorage.getItem("EMAIL"),
        _id: product.product._id,
        var: productVar,
        quantity: 1,
      })
      .then((res) => {
        if (res.data.code === 500) {
          setCode(500);
        }
        if (res.data.code === 404) {
          setCode(404);
        }
        if (res.data.code === 200) {
          setCode(200);
        } else Promise.reject();
      })
      .catch((err) => alert("Something went wrong"));
  };

  const [productImg, setProductImg] = useState("");
  const [productSize, setProductSize] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productVar, setProductVar] = useState(0);
  const [code, setCode] = useState(0);

  const location = useLocation();
  const [product, setProduct] = useState({ product: "" });
  React.useEffect(() => {
    if (location.state) {
      let _state = location.state;
      setProduct(_state);
      setProductVar(_state.var);
      setProductImg(_state.product.vars[_state.var].product_img);
      setProductSize(_state.product.vars[_state.var].size);
      setProductPrice(_state.product.vars[_state.var].price);
    }
  }, [location]);

  const addProduct = () => {
    localStorage.setItem("cart", product.product._id);
    console.log("added to cart ");
  };

  return (
    <>
      {console.log(product)}

      {product.product !== "" && (
        <div className="app">
          {" "}
          <div className="details" key={product.product._id}>
            {" "}
            <div className="big-img">
              <img src={productImg} alt="" />{" "}
            </div>
            <div className="box">
              <div className="row">
                <h2>{product.product.product_name}</h2>
                <div>
                  {product.product.vars.map((prod) => {
                    return (
                      <span style={{ margin: "5px" }} class="spanColors">
                        <a
                          onClick={() => {
                            setProductImg(prod.product_img);
                            setProductPrice(prod.price);
                            setProductSize(prod.size);
                          }}
                          class="btn"
                        >
                          {prod.size === "S" && (
                            <img
                              src={prod.product_img}
                              style={{ width: "25px", height: "25px" }}
                            />
                          )}
                          {prod.size === "M" && (
                            <img
                              src={prod.product_img}
                              style={{ width: "50px", height: "50px" }}
                            />
                          )}
                          {prod.size === "L" && (
                            <img
                              src={prod.product_img}
                              style={{ width: "75px", height: "75px" }}
                            />
                          )}
                        </a>
                      </span>
                    );
                  })}
                </div>
                <div>{Stars(product.product.product_rating)}</div>
                <span>${productPrice}</span>
                <p>{productSize}:الحجم</p>
                <p>{product.product.product_company}:المتجر</p>
                <p>:الفئة{product.product.product_category}</p>
                <p>:الصنف{product.product.sub_category}</p>
                {product.product.returnable == true && (
                  <Alert severity="success">قابل للإرجاع </Alert>
                )}
              </div>
              <p>{product.product.product_description}</p>{" "}
              <button className="cart" onClick={addtoCart}>
                أضف للسلة
              </button>
              {code == 200 && (
                <Alert severity="success" onClose={() => {}}>
                  {"تمت إضافة المنتج بنجاح"}
                </Alert>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );

  /*
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        {location.state && (
          <>
            <div
              style={{
                width: "500px",
                height: "500px",
                textAlign: "center",
              }}
            >
              <h1>{product.product.product_name}</h1>
              <div>
                <img src={product.product.product_img} />
              </div>

              <Button
                variant="contained"
                color="primary"
                onClick={addProduct()}
              >
                أضف للسلة
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );*/
}

export default Product;
