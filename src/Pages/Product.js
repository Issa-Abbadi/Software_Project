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
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Card from "../components/Card";
import Container from "react-bootstrap/Container";

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
        price: productPrice,
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
  const [account, setAccount] = useState("");
  const location = useLocation();
  const [product, setProduct] = useState({ product: "" });
  const [realtedP, setRealtedP] = useState("");

  React.useEffect(() => {
    if (location.state) {
      let _state = location.state;
      setProduct(_state);
      setProductVar(_state.var);
      setProductImg(_state.product.vars[_state.var].product_img);
      setProductSize(_state.product.vars[_state.var].size);
      setProductPrice(_state.product.vars[_state.var].price);
    }

    axios
      .post("http://localhost:4000/login/one", {
        email: localStorage.getItem("EMAIL"),
      })
      .then(({ data }) => {
        setAccount(data);
        data.wishList.map((wish) => {
          if (wish._id === location.state.product._id) {
            setWish(true);
          }
        });
        axios
          .post("http://localhost:4000/Products/subC", {
            sub_category: location.state.product.sub_category,
          })
          .then(({ data }) => {
            setRealtedP(data);
          })

          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [location]);

  const [wish, setWish] = useState(false);

  const addProduct = () => {
    localStorage.setItem("cart", product.product._id);
    console.log("added to cart ");
  };

  const addtoWish = () => {
    axios
      .post("http://localhost:4000/login/addtoWish", {
        email: localStorage.getItem("EMAIL"),
        _id: product.product._id,
      })
      .then((res) => {
        if (res.data.code === 200) {
          setWish(true);
        }
        if (res.data.code === 500) {
          setWish(false);
        } else Promise.reject();
      })
      .catch((err) => alert("Something went wrong "));
  };

  const removeFromWish = () => {
    axios
      .post("http://localhost:4000/login/removeFromWish", {
        email: localStorage.getItem("EMAIL"),
        _id: product.product._id,
      })
      .then((res) => {
        if (res.data.code === 200) {
          setWish(false);
        }
        if (res.data.code === 500) {
          setWish(true);
        } else Promise.reject();
      })
      .catch((err) => alert("Something went wrong "));
  };

  return (
    <>
      {console.log("", product)}
      <Container>
        {product.product !== "" && (
          <div className="app">
            {" "}
            <div className="details" key={product.product._id}>
              {" "}
              <div className="big-img">
                <img src={productImg} class="mainImg" alt="" />{" "}
                <div>
                  {product.product.vars.map((prod) => {
                   if(prod !== null)
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
              </div>
              {/* here  Box row */}





              <div class="Box">
                <div class="rightSide">
                  <h2 class="productName">{product.product.product_name}</h2>
                  <span>
                    {!wish && (
                      <FavoriteBorderIcon
                        style={{ color: "red" }}
                        onClick={addtoWish}
                      />
                    )}
                    {wish && (
                      <FavoriteIcon
                        style={{ color: "red" }}
                        onClick={removeFromWish}
                      />
                    )}
                  </span>
                  <div class="rating">
                    {Stars(product.product.product_rating)}
                  </div>
                  <span class="price">${productPrice}</span>
                  <div class="size">
                    الحجم:
                    <div class="psize active">S</div>
                    <div class="psize">M</div>
                    <div class="psize">L</div>
                  </div>
                  <div class="quantity">
                    <p>الكمية</p>
                    <input type="number" min="1" max="5" value="1" />
                  </div>

                  <p> المتجر: {product.product.product_company}</p>
                  <p> الفئة: {product.product.product_category}</p>
                  <p>الصنف: {product.product.sub_category}</p>
                  {product.product.returnable == true && (
                    <Alert severity="success">قابل للإرجاع </Alert>
                  )}
                </div>
                <p class="description">{product.product.product_description}</p>{" "}
                <button className="cart" onClick={addtoCart}>
                  أضف للسلة
                </button>
                <button className="buyNow" onClick={addtoCart}>
                  اشتري الان
                </button>
                {code == 200 && (
                  <Alert
                    severity="success"
                    onClose={() => {
                      setCode(201);
                    }}
                  >
                    {"تمت إضافة المنتج بنجاح"}
                  </Alert>
                )}
              </div>
            </div>
            <div class="relatedProducts">
              {realtedP !== "" && (
                <div style={{ width: "100%" }}>
                  <Card
                    title="منتجات مشابهة"
                    data={realtedP}
                    target="/product"
                    class="card-product"
                    style={{ margin: "20%" }}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </Container>
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
