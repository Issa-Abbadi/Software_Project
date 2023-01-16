import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBIcon,
} from "mdb-react-ui-kit";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  faStar,
  faStarHalf,
  faStarHalfAlt,
  faStarAndCrescent,
} from "@fortawesome/free-solid-svg-icons";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Alert from "@mui/material/Alert";
import axios from "axios";
import { Button } from "react-bootstrap";
import "./products.css";

function SingleProduct(props) {
  const [product, setProduct] = useState(props.product);
  const [productImg, setProductImg] = useState(
    props.product.vars[0].product_img
  );
  const [productSize, setProductSize] = useState(props.product.vars[0].size);
  const [productOriginalPrice, setProductOriginalPrice] = useState(
    props.product.vars[0].original_price
  );
  const [productDiscount, setProductDiscount] = useState(
    props.product.vars[0].discount
  );
  const [productPrice, setProductPrice] = useState(props.product.vars[0].price);
  const [productQuantity, setProductQuantity] = useState(
    props.product.vars[0].quantity
  );
  const [productVar, setProductVar] = useState(props.product.vars[0]._id);
  const [code, setCode] = useState(0);
  const [show, setShow] = useState(true);

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

  const retColors = (product) => {
    if (product.vars[1] != null) {
      let vars = 0;
      return product.vars.map((prod) => {
        if (prod !== null) {
          return (
            <span class="spanColors">
              <a
                onClick={() => {
                  setProductImg(prod.product_img);
                  setProductPrice(prod.price);
                  setProductSize(prod.size);
                  setProductDiscount(prod.discount);
                  setProductVar(prod._id);
                  setProductQuantity(prod.quantity);
                  setProductOriginalPrice(prod.original_price);
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
                    style={{ width: "50px", height: "50px" }}
                  />
                )}
              </a>
            </span>
          );
        }
        vars++;
      });
    } else {
    }
  };

  const addtoCart = () => {
    axios
      .post("http://localhost:4000/login/addtoCart", {
        email: localStorage.getItem("EMAIL"),
        _id: product._id,
        var: productVar,
        quantity: 1,
        price: productPrice,
        product_company: product.product_company,
        product_name: product.product_name,
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
      .catch((err) => alert("Something went wrong "));
  };

  const handleDeleteone = () => {
    console.log("Delete");
    axios
      .post("http://localhost:4000/login/deleteW", {
        email: localStorage.getItem("EMAIL"),
        _id: product._id,
      })

      .then((res) => {
        setShow(false);
        localStorage.setItem(
          "CurrentWishList",
          JSON.stringify(res.data.wishList)
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [wish, setWish] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("CurrentWishList")) {
      JSON.parse(localStorage.getItem("CurrentWishList")).map((wish) => {
        if (wish._id === props.product._id) {
          setWish(true);
        }
      });
    }
  }, []);
  const addtoWish = () => {
    axios
      .post("http://localhost:4000/login/addtoWish", {
        email: localStorage.getItem("EMAIL"),
        _id: product._id,
      })
      .then((res) => {
        if (res.data.code === 200) {
          setWish(true);
          localStorage.setItem(
            "CurrentWishList",
            JSON.stringify(res.data.wishList)
          );
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
        _id: product._id,
      })
      .then((res) => {
        if (res.data.code === 200) {
          setWish(false);
          localStorage.setItem(
            "CurrentWishList",
            JSON.stringify(res.data.wishList)
          );
        }
        if (res.data.code === 500) {
          setWish(true);
        } else Promise.reject();
      })
      .catch((err) => alert("Something went wrong "));
  };

  return (
    <>
      {show === true && (
        <MDBContainer fluid className="my-5">
          <MDBRow>
            <MDBCol md="12" lg="12" className="mb-4 mb-lg-0">
              <MDBCard
                style={{
                  direction: "rtl",
                  position: "relative",
                  borderRadius: "5px",
                }}
                class="card-container"
              >
                {localStorage.getItem("wishList") == "true" && (
                  <>
                    <Button
                      onClick={handleDeleteone}
                      style={{
                        backgroundColor: "var(--dark-liver-horses)",
                        color: "white",
                        width: "100%",
                        borderRadius: "0%",
                        border: "1px solid var(--dark-liver-horses)",
                      }}
                    >
                      حذف
                    </Button>
                  </>
                )}

                <div
                  className="d-flex justify-content-between p-3"
                  id="card-title"
                >
                  {localStorage.getItem("wishList") == "false" && (
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
                  )}
                  <p className="lead mb-0" id="cardTitle">
                    {product.product_name}
                  </p>

                  <div
                    className=" rounded-circle d-flex align-items-center justify-content-center shadow-1-strong"
                    id="card-size"
                  >
                    <p className="text-white mb-0 small">{productSize}</p>
                  </div>
                </div>

                <Link
                  to="/product"
                  state={{ product: product, var: productVar }}
                >
                  <div class="card-img">
                    <MDBCardImage
                      src={productImg}
                      position="top"
                      class="img-fluid"
                      alt="Product"
                    />
                  </div>
                </Link>
                <div class="img-vars">{retColors(product)}</div>
                <MDBCardBody>
                  <div
                    className="d-flex justify-content-between"
                    id="companyPrice"
                  >
                    <p className="small">
                      <a href="#!" className="text-muted">
                        {product.product_company}
                      </a>
                    </p>
                    <p className="small text-danger">
                      {productDiscount > 0 && (
                        <s>${parseFloat(productOriginalPrice).toFixed(2)}</s>
                      )}
                    </p>
                  </div>

                  <div
                    className="d-flex justify-content-between mb-3"
                    id="companyPrice"
                  >
                    <h5 className="mb-0">{product.sub_category}</h5>
                    <h5
                      className="text-dark mb-0"
                      style={{ marginBottom: "50px" }}
                    >
                      {productPrice}$
                    </h5>
                  </div>

                  {/* <div class="d-flex justify-content-between mb-2" id="companyPrice">
                        <p class="text-muted mb-0">
                          متوفر: <span class="fw-bold">{productQuantity}</span>
                        </p>
                        <div class="ms-auto text-warning" id="stars">
                          {Stars(product.product_rating)}
                        </div>
                  </div> */}
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
                  <a onClick={addtoCart} class="btn btn-primary" id="addtoCart">
                    أضف للسلّة
                  </a>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      )}
    </>
  );
}

export default SingleProduct;

//   return (
//     <>
//       {show === true && (
//         <div class="card cardContent">
//           {localStorage.getItem("wishList") == "true" && (
//             <>
//               <Button onClick={handleDeleteone}>حذف</Button>
//             </>
//           )}
//           <div class="hover-overlay ">
//             <Link to="/product" state={{ product: product, var: productVar }}>
//               <img src={productImg} class="img-fluid" />
//             </Link>
//           </div>

//           <div class="card-body">
//             <h5 class="card-title" style={{ fontWeight: "bold" }}>
//               {product.product_name}
//             </h5>

//             <div style={{ height: "5px" }}></div>
//             <h5 class="card-title" style={{ fontWeight: "bold" }}>
//               {productSize}
//             </h5>
//             <div style={{ height: "5px" }}></div>
//             <h5 class="card-title">{Stars(product.product_rating)}</h5>
//             <h5 class="card-title">{productPrice}$</h5>
//             <h6 class="card-title">المتجر:{product.product_company} </h6>
//             {/* {retSizes(product)} */}
//             {retColors(product)}
//             <p class="card-text">{product.product_description}</p>
//             <a onClick={addtoCart} class="btn btn-primary">
//               أضف للسلّة
//             </a>
//             {code == 200 && (
//               <Alert severity="success" onClose={() => {}}>
//                 {"تمت إضافة المنتج بنجاح"}
//               </Alert>
//             )}
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
