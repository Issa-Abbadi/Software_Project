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

import Checkout from "../components/Checkout";

import React, { useState, useEffect } from "react";

function Cart(props) {
  let i = -1;
  const [products, setProducts] = useState("");
  const [account, setAccount] = useState("");
  useEffect(() => {
    i = -1;
    if (account == "") {
      axios
        .post("http://localhost:4000/login/one", {
          email: localStorage.getItem("EMAIL"),
        })
        .then(({ data }) => {
          setAccount(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    console.log("222", account);
  }, []);

  useEffect(() => {
    if (account !== "") {
      var x = 0;

      axios
        .post("http://localhost:4000/Products/oneForCart", {
          _id: account.cart,
        })
        .then(({ data }) => {
          setProducts(data.result);
        })
        .catch((error) => {
          console.log(error);
        });
      console.log("x= ", x);
    }
  }, [account]);

  return (
    <>
      <section
        className="h-100"
        style={{ backgroundColor: "#eee", direction: "rtl" }}
      >
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol md="10">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <MDBTypography tag="h3" className="fw-normal mb-0 text-black">
                  سلة التسوق
                </MDBTypography>
              </div>

              {products !== "" &&
                products !== null &&
                products.map((prod) => {
                  console.log("iii=", products, account.cart);

                  i++;

                  console.log("in..");
                  if (account.cart[i] != null) {
                    if (account.cart[i].vars[0] != null) {
                      let vars = account.cart[i].vars[0].var;
                      let quantity = account.cart[i].vars[0].quantity;

                      return (
                        <>
                          <MDBCard className="rounded-3 mb-4">
                            <MDBCardBody className="p-4">
                              <MDBRow className="justify-content-between align-items-center">
                                <MDBCol md="2" lg="2" xl="2">
                                  <MDBCardImage
                                    className="rounded-3"
                                    fluid
                                    src={prod.vars[vars].product_img}
                                    alt="Cotton T-shirt"
                                  />
                                </MDBCol>
                                <MDBCol md="3" lg="3" xl="3">
                                  <p className="lead fw-normal mb-2">
                                    {prod.product_name}
                                  </p>
                                  <p>
                                    <span className="text-muted">الحجم: </span>
                                    {prod.vars[vars].size}{" "}
                                  </p>
                                </MDBCol>
                                <MDBCol
                                  md="3"
                                  lg="3"
                                  xl="2"
                                  className="d-flex align-items-center justify-content-around"
                                >
                                  <MDBBtn color="link" className="px-2">
                                    <MDBIcon fas icon="minus" />
                                  </MDBBtn>

                                  <MDBInput
                                    min={0}
                                    defaultValue={quantity}
                                    type="number"
                                    size="sm"
                                  />

                                  <MDBBtn color="link" className="px-2">
                                    <MDBIcon fas icon="plus" />
                                  </MDBBtn>
                                </MDBCol>
                                <MDBCol
                                  md="3"
                                  lg="2"
                                  xl="2"
                                  className="offset-lg-1"
                                >
                                  <MDBTypography tag="h5" className="mb-0">
                                    ${prod.vars[vars].price}
                                  </MDBTypography>
                                </MDBCol>
                                <MDBCol
                                  md="1"
                                  lg="1"
                                  xl="1"
                                  className="text-end"
                                >
                                  <a href="#!" className="text-danger">
                                    <MDBIcon
                                      fas
                                      icon="trash text-danger"
                                      size="lg"
                                    />
                                  </a>
                                </MDBCol>
                              </MDBRow>
                            </MDBCardBody>
                          </MDBCard>
                          {account.cart[i].vars[1] != null &&
                            (vars = account.cart[i].vars[1].var) != null &&
                            (quantity = account.cart[i].vars[1].quantity) !=
                              null && (
                              <MDBCard className="rounded-3 mb-4">
                                <MDBCardBody className="p-4">
                                  <MDBRow className="justify-content-between align-items-center">
                                    <MDBCol md="2" lg="2" xl="2">
                                      <MDBCardImage
                                        className="rounded-3"
                                        fluid
                                        src={prod.vars[vars].product_img}
                                        alt="Cotton T-shirt"
                                      />
                                    </MDBCol>
                                    <MDBCol md="3" lg="3" xl="3">
                                      <p className="lead fw-normal mb-2">
                                        {prod.product_name}
                                      </p>
                                      <p>
                                        <span className="text-muted">
                                          الحجم:{" "}
                                        </span>
                                        {prod.vars[vars].size}{" "}
                                      </p>
                                    </MDBCol>
                                    <MDBCol
                                      md="3"
                                      lg="3"
                                      xl="2"
                                      className="d-flex align-items-center justify-content-around"
                                    >
                                      <MDBBtn color="link" className="px-2">
                                        <MDBIcon fas icon="minus" />
                                      </MDBBtn>

                                      <MDBInput
                                        min={0}
                                        defaultValue={quantity}
                                        type="number"
                                        size="sm"
                                      />

                                      <MDBBtn color="link" className="px-2">
                                        <MDBIcon fas icon="plus" />
                                      </MDBBtn>
                                    </MDBCol>
                                    <MDBCol
                                      md="3"
                                      lg="2"
                                      xl="2"
                                      className="offset-lg-1"
                                    >
                                      <MDBTypography tag="h5" className="mb-0">
                                        ${prod.vars[vars].price}
                                      </MDBTypography>
                                    </MDBCol>
                                    <MDBCol
                                      md="1"
                                      lg="1"
                                      xl="1"
                                      className="text-end"
                                    >
                                      <a href="#!" className="text-danger">
                                        <MDBIcon
                                          fas
                                          icon="trash text-danger"
                                          size="lg"
                                        />
                                      </a>
                                    </MDBCol>
                                  </MDBRow>
                                </MDBCardBody>
                              </MDBCard>
                            )}
                          {account.cart[i].vars[2] != null &&
                            (vars = account.cart[i].vars[2].var) != null &&
                            (quantity = account.cart[i].vars[2].quantity) !=
                              null && (
                              <MDBCard className="rounded-3 mb-4">
                                <MDBCardBody className="p-4">
                                  <MDBRow className="justify-content-between align-items-center">
                                    <MDBCol md="2" lg="2" xl="2">
                                      <MDBCardImage
                                        className="rounded-3"
                                        fluid
                                        src={prod.vars[vars].product_img}
                                        alt="Cotton T-shirt"
                                      />
                                    </MDBCol>
                                    <MDBCol md="3" lg="3" xl="3">
                                      <p className="lead fw-normal mb-2">
                                        {prod.product_name}
                                      </p>
                                      <p>
                                        <span className="text-muted">
                                          الحجم:{" "}
                                        </span>
                                        {prod.vars[vars].size}{" "}
                                      </p>
                                    </MDBCol>
                                    <MDBCol
                                      md="3"
                                      lg="3"
                                      xl="2"
                                      className="d-flex align-items-center justify-content-around"
                                    >
                                      <MDBBtn color="link" className="px-2">
                                        <MDBIcon fas icon="minus" />
                                      </MDBBtn>

                                      <MDBInput
                                        min={0}
                                        defaultValue={quantity}
                                        type="number"
                                        size="sm"
                                      />

                                      <MDBBtn color="link" className="px-2">
                                        <MDBIcon fas icon="plus" />
                                      </MDBBtn>
                                    </MDBCol>
                                    <MDBCol
                                      md="3"
                                      lg="2"
                                      xl="2"
                                      className="offset-lg-1"
                                    >
                                      <MDBTypography tag="h5" className="mb-0">
                                        ${prod.vars[vars].price}
                                      </MDBTypography>
                                    </MDBCol>
                                    <MDBCol
                                      md="1"
                                      lg="1"
                                      xl="1"
                                      className="text-end"
                                    >
                                      <a href="#!" className="text-danger">
                                        <MDBIcon
                                          fas
                                          icon="trash text-danger"
                                          size="lg"
                                        />
                                      </a>
                                    </MDBCol>
                                  </MDBRow>
                                </MDBCardBody>
                              </MDBCard>
                            )}
                        </>
                      );
                    }
                  }
                })}
              <MDBCard>
                <MDBCardBody>
                  <MDBBtn className="ms-3" color="warning" block size="lg">
                    الدفع
                  </MDBBtn>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      {/* <Checkout /> */}
    </>
  );
}

export default Cart;
