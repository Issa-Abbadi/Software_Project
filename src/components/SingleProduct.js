import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function SingleProduct(props) {
  const Stars = (rating) => {
    const starArray = [...Array(5).keys()].map((i) => i + 1);
    return starArray.map((i) => (
      <FontAwesomeIcon
        key={i}
        icon={faStar}
        color={rating >= i ? "orange" : "lightgrey"}
      />
    ));
  };
  const [product, setProduct] = useState(props.product);
  const [productImg, setProductImg] = useState(props.product.product_img);

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
        <h5 class="card-title">{product.product_name}</h5>
        <h5 class="card-title">{Stars(product.product_rating)}</h5>
        <h5 class="card-title">{product.product_price}$</h5>
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
