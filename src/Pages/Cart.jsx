import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBListGroup,
  MDBListGroupItem,
  MDBRipple,
  MDBRow,
  MDBTooltip,
  MDBTypography,
} from "mdb-react-ui-kit";

import Checkout from "../components/Checkout";

import React from "react";

function Cart(props) {
  return (
    <>
      Hello
      {console.log(localStorage.getItem("cart"), "")}
      {localStorage.getItem("cart")}
      {/* <Checkout /> */}
    </>
  );
}

export default Cart;
