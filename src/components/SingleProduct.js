import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  faStar,
  faStarHalf,
  faStarHalfAlt,
  faStarAndCrescent,
} from "@fortawesome/free-solid-svg-icons";
import Alert from "@mui/material/Alert";
import axios from "axios";
import { Button } from "react-bootstrap";

function SingleProduct(props) {
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

  const [product, setProduct] = useState(props.product);
  const [productImg, setProductImg] = useState(
    props.product.vars[0].product_img
  );
  const [productSize, setProductSize] = useState(props.product.vars[0].size);
  const [productPrice, setProductPrice] = useState(props.product.vars[0].price);
  const [productVar, setProductVar] = useState(props.product.vars[0]._id);
  const [code, setCode] = useState(0);
  const [show, setShow] = useState(true);

  const retColors = (product) => {
    if (product.vars[1] != null) {
      let vars = 0;
      return product.vars.map((prod) => {
        if (prod !== null) {
          return (
            <span style={{ margin: "5px" }} class="spanColors">
              <a
                onClick={() => {
                  setProductImg(prod.product_img);
                  setProductPrice(prod.price);
                  setProductVar(prod._id);
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
        }
        vars++;
      });
    } else {
    }
  };

  // const retSizes = (product) => {
  //   if (product.sizes[0] != null) {
  //     return product.colors.map((prod) => (
  //       <span style={{ margin: "5px" }}>
  //         <a
  //           onClick={() => {
  //             setProductPrice(prod.price);
  //           }}
  //           class="btn"
  //           style={{
  //             width: "40px",
  //             height: "25px",
  //             borderRadius: "10%",
  //             border: "2px solid var(--may-green)",
  //             fontWeight: "bold",
  //             textAlign: "center",
  //             verticalAlign: "center",
  //             margin: 0,
  //             padding: 0,
  //           }}
  //         >
  //           {prod.size}
  //         </a>
  //       </span>
  //     ));
  //   } else {
  //   }
  // };

  const addtoCart = () => {
    axios
      .post("http://localhost:4000/login/addtoCart", {
        email: localStorage.getItem("EMAIL"),
        _id: product._id,
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
      .catch((err) => alert("Something went wrong "));
  };

  const handleDeleteone = () => {
    console.log("Delete");
    axios
      .post("http://localhost:4000/login/deleteW", {
        email: localStorage.getItem("EMAIL"),
        _id: product._id,
      })
      .then(() => {
        setShow(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {show === true && (
        <div class="card cardContent">
          {localStorage.getItem("wishList") == "true" && (
            <>
              <Button onClick={handleDeleteone}>حذف</Button>
            </>
          )}
          <div class="hover-overlay ">
            <Link to="/product" state={{ product: product, var: productVar }}>
              <img src={productImg} class="img-fluid" />
            </Link>
          </div>

          <div class="card-body">
            <h5 class="card-title" style={{ fontWeight: "bold" }}>
              {product.product_name}
            </h5>
            <div style={{ height: "5px" }}></div>
            <h5 class="card-title" style={{ fontWeight: "bold" }}>
              {productSize}
            </h5>
            <div style={{ height: "5px" }}></div>
            <h5 class="card-title">{Stars(product.product_rating)}</h5>
            <h5 class="card-title">{productPrice}$</h5>
            <h6 class="card-title">المتجر:{product.product_company} </h6>
            {/* {retSizes(product)} */}
            {retColors(product)}
            <p class="card-text">{product.product_description}</p>
            <a onClick={addtoCart} class="btn btn-primary">
              أضف للسلّة
            </a>
            {code == 200 && (
              <Alert severity="success" onClose={() => {}}>
                {"تمت إضافة المنتج بنجاح"}
              </Alert>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default SingleProduct;

//
