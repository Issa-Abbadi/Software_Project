import React, { useState, useEffect } from "react";
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
import axios from "axios";

function CartCard(props) {
  const [quantity, setQuantity] = useState(props.quantity);

  const minus = (vars, _id) => {
    console.log("kkk", vars);
    axios
      .post("http://localhost:4000/login/minus", {
        email: localStorage.getItem("EMAIL"),
        _id: _id,
        var: vars,
      })
      .then(({ data }) => {
        setQuantity(quantity - 1);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const plus = (vars, _id) => {
    console.log("kkk", vars);
    axios
      .post("http://localhost:4000/login/plus", {
        email: localStorage.getItem("EMAIL"),
        _id: _id,
        var: vars,
      })
      .then(({ data }) => {
        setQuantity(quantity + 1);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteC = (vars, _id) => {
    console.log("kkk", vars);
    axios
      .post("http://localhost:4000/login/deleteC", {
        email: localStorage.getItem("EMAIL"),
        _id: _id,
        var: vars,
      })
      .then(({ data }) => {
        setQuantity(0);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (e, vars, _id) => {
    setQuantity(e.target.value);
    console.log("EE", e.target.value);
    axios
      .post("http://localhost:4000/login/setQuantity", {
        email: localStorage.getItem("EMAIL"),
        _id: _id,
        var: vars,
        quantity: parseInt(e.target.value),
      })
      .then((res) => {
        setQuantity(e.target.value);
      })
      .catch();
  };

  return (
    <>
      {quantity > 0 && (
        <MDBCard className="rounded-3 mb-4">
          <MDBCardBody className="p-4">
            <MDBRow className="justify-content-between align-items-center">
              <MDBCol md="2" lg="2" xl="2">
                <MDBCardImage
                  className="rounded-3"
                  fluid
                  src={props.prod.vars[props.vars].product_img}
                  alt="Cotton T-shirt"
                />
              </MDBCol>
              <MDBCol md="3" lg="3" xl="3">
                <p className="lead fw-normal mb-2">{props.prod.product_name}</p>
                <p>
                  <span className="text-muted">الحجم: </span>
                  {props.prod.vars[props.vars].size}{" "}
                </p>
              </MDBCol>
              <MDBCol
                md="3"
                lg="3"
                xl="2"
                className="d-flex align-items-center justify-content-around"
              >
                <MDBBtn
                  color="link"
                  onClick={() => minus(props.var, props.prod._id)}
                  className="px-2"
                >
                  <MDBIcon fas icon="minus" />
                </MDBBtn>

                <MDBInput
                  min={1}
                  value={quantity}
                  onChange={(e) => {
                    handleChange(e, props.var, props.prod._id);
                  }}
                  type="number"
                  size="sm"
                />

                <MDBBtn
                  color="link"
                  onClick={() => plus(props.var, props.prod._id)}
                  className="px-2"
                >
                  <MDBIcon fas icon="plus" />
                </MDBBtn>
              </MDBCol>
              <MDBCol md="3" lg="2" xl="2" className="offset-lg-1">
                <MDBTypography tag="h5" className="mb-0">
                  ${props.prod.vars[props.vars].price}
                </MDBTypography>
              </MDBCol>
              <MDBCol md="1" lg="1" xl="1" className="text-end">
                <a
                  href="#!"
                  onClick={() => deleteC(props.var, props.prod._id)}
                  className="text-danger"
                >
                  <MDBIcon fas icon="trash text-danger" size="lg" />
                </a>
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      )}
    </>
  );
}

export default CartCard;
