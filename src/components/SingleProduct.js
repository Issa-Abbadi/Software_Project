import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faStarHalf,
  faStarHalfAlt,
  faStarAndCrescent,
} from "@fortawesome/free-solid-svg-icons";

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
  const [productImg, setProductImg] = useState(props.product.product_img);
  const [productPrice, setProductPrice] = useState(props.product.product_price);

  const retColors = (product) => {
    if (product.colors[0] != null) {
      return product.colors.map((prod) => (
        <span style={{ margin: "5px" }}>
          <a
            onClick={() => {
              setProductImg(prod.product_img);
            }}
            class="btn"
            style={{
              backgroundColor: prod.color,
              width: "25px",
              height: "25px",
              borderRadius: "50%",
            }}
          ></a>
        </span>
      ));
    } else {
    }
  };

  const retSizes = (product) => {
    if (product.sizes[0] != null) {
      return product.sizes.map((prod) => (
        <span style={{ margin: "5px" }}>
          <a
            onClick={() => {
              setProductPrice(prod.price);
            }}
            class="btn"
            style={{
              backgroundColor: "#eee",
              width: "40px",
              height: "25px",
              borderRadius: "10%",
              border: "2px solid black",
              fontWeight: "bold",
              textAlign: "center",
              verticalAlign: "center",
              margin: 0,
              padding: 0,
            }}
          >
            {prod.size}
          </a>
        </span>
      ));
    } else {
    }
  };

  return (
    <div class="card cardContent">
      <div class="hover-overlay ">
        <a href="#!">
          <img src={productImg} class="img-fluid" />
        </a>
      </div>

      <div class="card-body">
        {retColors(product)}
        <div></div>
        {retSizes(product)}

        <h5 class="card-title">{product.product_name}</h5>
        <h5 class="card-title">{Stars(product.product_rating)}</h5>
        <h5 class="card-title">{productPrice}$</h5>
        <h6 class="card-title">المتجر:{product.product_company} </h6>
        <p class="card-text">{product.product_description}</p>

        <a href="#!" class="btn btn-primary">
          أضف للسلّة
        </a>
      </div>
    </div>
  );
}

export default SingleProduct;

//