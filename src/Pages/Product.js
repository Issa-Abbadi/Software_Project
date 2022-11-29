import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import SingleProduct from "../components/SingleProduct";
import Button from "@mui/material/Button";
import { LocalGasStationRounded } from "@mui/icons-material";
import "./product.css";



function Product(props) {
  const location = useLocation();
  const [product, setProduct] = useState({ product: "" });
  React.useEffect(() => {
    if (location.state) {
      let _state = location.state;
      setProduct(_state);
    }
  }, [location]);

  const addProduct = () => {
    localStorage.setItem("cart", product.product._id);
    console.log("added to cart ");
  };


  return(
    <div className="app">
      {
        product.product.vars.map(item =>(
          <div className="details" key={item._id}>
            <div className="big-img">
              <img src={item.product_img} alt=""/>
            </div>

            <div className="box">
              <div className="row">
                <h2>{item.title}</h2>
                <span>${item.price}</span>
              </div>
              
              {/* <Colors colors={item.colors} /> */}

              <p>{item.description}</p>
              <p>{item.content}</p>

              {/* <DetailsThumb images={item.src} tab={this.handleTab} myRef={this.myRef} /> */}
              <button className="cart">Add to cart</button>

            </div>
          </div>
        ))
      }
    </div>
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
