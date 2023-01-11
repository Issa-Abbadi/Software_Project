import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import SingleProduct from "../components/SingleProduct";
import Button from "@mui/material/Button";
import { LocalGasStationRounded } from "@mui/icons-material";
import "./product.css";
import "./productDescPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Alert from "@mui/material/Alert";
import axios from "axios";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Card from "../components/Card";
import Container from "react-bootstrap/Container";
import Rating from "../components/Rating";

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
        quantity: quantity,
        price: productPrice,
        product_company: product.product.product_company,
        product_name: product.product.product_name,
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
  const [quantity, setQuantity] = useState(1);

  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState(1);

  const handleSubmit = (event) => {
    event.preventDefault();
    // you can use axios or fetch to send the data to server
    const email = localStorage.getItem("EMAIL");
    const existingReview = reviews.find((review) => review.email === email);

    if (existingReview) {
      // allow editing the review if the user has already submitted one
      existingReview.review = newReview;
      existingReview.rating = newRating;
    } else {
      // add new review otherwise
      setReviews([
        ...reviews,
        {
          review: newReview,
          rating: newRating,
          email: localStorage.getItem("EMAIL"),
          name: JSON.parse(localStorage.getItem("Profile")).name,
        },
      ]);
    }
    axios
      .post("http://localhost:4000/Products/addReview", {
        product_company: product.product.product_company,
        product_name: product.product.product_name,
        review: newReview,
        rating: newRating,
        email: localStorage.getItem("EMAIL"),
        name: JSON.parse(localStorage.getItem("Profile")).name,
      })
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });

    setNewReview("");
  };
  React.useEffect(() => {
    if (location.state) {
      let _state = location.state;
      setProduct(_state);
      setProductVar(_state.var);
      setProductImg(_state.product.vars[_state.var].product_img);
      setProductSize(_state.product.vars[_state.var].size);
      setProductPrice(_state.product.vars[_state.var].price);

      axios
        .post("http://localhost:4000/Products/getReviews", {
          product_company: _state.product.product_company,
          product_name: _state.product.product_name,
        })
        .then((data) => {
          setReviews(data.data.result);
          console.log("this is data", data, data.result);
        })
        .catch((error) => {
          console.log(error);
        });
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
            <div className="productDesc" key={product.product._id}>
              <div class="imgDiv">
                <div className="big-img">
                  <div className="cover-img">
                    <img src={productImg} class="mainImg" alt="" />{" "}
                  </div>
                  <div>
                    {product.product.vars.map((prod) => {
                      if (prod !== null)
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
              </div>

              <div class="descriptionDiv">
                <div class="leftSide">
                  <h2 class="productName">{product.product.product_name}</h2>
                  <span class="heart">
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
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={quantity}
                      readonly
                      onChange={(event) => {
                        if (event.target.value > 0) {
                          setQuantity(event.target.value);
                        }
                      }}
                    />
                  </div>

                  <p>
                    {" "}
                    المتجر:{" "}
                    <a href="/markets" class="storeName">
                      {product.product.product_company}
                    </a>
                  </p>
                  <p> الفئة: {product.product.product_category}</p>
                  <p>الصنف: {product.product.sub_category}</p>
                  {product.product.returnable == true && (
                    <Alert severity="success">قابل للإرجاع </Alert>
                  )}
                </div>
                <p class="description">{product.product.product_description}</p>{" "}
                <div class="buttons">
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
            <h3> Reviews </h3>
            {reviews.map((review, i) => (
              <div key={i}>
                {Stars(review.rating)}
                <p>{review.review}</p>
              </div>
            ))}
            <form onSubmit={handleSubmit}>
              <div>
                <Rating rating={newRating} setNewRating={setNewRating} />
              </div>
              <textarea
                value={newReview}
                onChange={(event) => setNewReview(event.target.value)}
              />
              <button type="submit">Submit Review</button>
            </form>
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
