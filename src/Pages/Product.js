import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import SingleProduct from "../components/SingleProduct";
import Button from "@mui/material/Button";

function Product(props) {
  const location = useLocation();
  const [product, setProduct] = useState({ product: "" });
  React.useEffect(() => {
    if (location.state) {
      let _state = location.state;
      setProduct(_state);
    }
  }, [location]);

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
              <Button variant="contained" color="primary">
                أضف للسلة
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Product;
