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
import usePrevious from "../components/usePrevious";
import CartCard from "../components/CartCard";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Checkout from "./Checkout";
import React, { useState, useEffect } from "react";
function dynamicSort(property) {
  var sortOrder = 1;
  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }
  return function (a, b) {
    /* next line works with strings and numbers,
     * and you may want to customize it to your needs
     */
    var result =
      a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    return result * sortOrder;
  };
}

function Cart(props) {
  const navigate = useNavigate();
  const [calc, setCalc] = new useState(false);
  function getAccount() {
    axios
      .post("http://localhost:4000/login/one", {
        email: localStorage.getItem("EMAIL"),
      })
      .then(({ data }) => {
        setSum(0);
        data.cart = data.cart.sort(dynamicSort("_id"));
        setAccount(data);

        let m = 0;
        if (account.cart[0] != null)
          account.cart.map((prod) => {
            prod.vars.map((var1) => {
              m = m + var1.price * var1.quantity;
              console.log("Sum=", m);
            });
          });
        console.log("Sum=", sum);
        setSum(m);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function calcSum(value) {
    setSum(sum + value);
  }

  function calcateSum() {
    axios
      .post("http://localhost:4000/login/one", {
        email: localStorage.getItem("EMAIL"),
      })
      .then(({ data }) => {
        setSum(0);
        data.cart = data.cart.sort(dynamicSort("_id"));
        setAccount2(data);

        let m = 0;
        if (data.cart[0] != null)
          data.cart.map((prod) => {
            prod.vars.map((var1) => {
              m = m + var1.price * var1.quantity;
              console.log("Sum =", m);
            });
          });
        console.log("Sum= ", sum);
        setSum(m);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  let i = -1;

  const [products, setProducts] = useState("");
  const [account, setAccount] = useState("");
  const [account2, setAccount2] = useState("");
  const [price, setPrice] = useState([]);
  const [sum, setSum] = useState(0);
  const [x, setX] = useState(1);
  const prevPrice = usePrevious(price);
  // useEffect(() => {
  //   if (account !== "") {
  //     getAccount();
  //   }
  // }, [account2]);

  useEffect(() => {
    setBuy(false);
    i = -1;
    if (account == "") {
      getAccount();
    }

    console.log("222", account);
  }, []);

  useEffect(() => {
    if (account !== "") {
      console.log("cart2", x, products, account.cart);
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

      setX(0);
    }
  }, [account]);

  const deleteAll = () => {
    axios
      .post("http://localhost:4000/login/deleteAll", {
        email: localStorage.getItem("EMAIL"),
      })
      .then(({ data }) => {
        setProducts("");
        setSum(0);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const getWithPromiseAll = async () => {
  //   console.time("promise all");
  //   let data = await Promise.all(
  //     usernames.map(async (username) => {
  //       return await simulateFetchData(username);
  //     })
  //   );
  //   console.timeEnd("promise all");
  // };

  async function processCom(data) {
    let buy1 = true;
    for (const prod of data.cart) {
      for (const var1 of prod.vars) {
        if (var1 !== null) {
          console.log("in Buy");
          await axios
            .post("http://localhost:4000/Products/buyCart", {
              _id: prod._id,
              vars: var1,
            })
            .then(({ data }) => {
              console.log("code", data.code);
              if (data.code === 330 || data.code === 500) {
                setBuy(false);
                buy1 = false;
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    }
    if (buy1 === true) {
      setBuy(true);
      return true;
    } else {
      return false;
    }
  }

  async function processBuy() {
    if (account2.cart[0] !== null) {
      const result = await processCom(account2);
      return result;
    }
  }

  const [buy, setBuy] = useState(false);

  return (
    <>
      <section
        className="h-100"
        style={{ backgroundColor: "#eee", direction: "rtl" }}
      >
        {buy === false && (
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
                    console.log("iii= ", products, account.cart);

                    i++;

                    console.log("in..");
                    if (account.cart[i] != null) {
                      let _id = account.cart[i]._id;
                      if (account.cart[i].vars[0] != null) {
                        let vars = account.cart[i].vars[0].var;
                        let quantity = account.cart[i].vars[0].quantity;

                        return (
                          <>
                            <CartCard
                              prod={prod}
                              vars={vars}
                              quantity={quantity}
                              var={0}
                              calcSum={calcSum}
                              calcateSum={calcateSum}
                              setAccount={setAccount}
                            />

                            {account.cart[i].vars[1] != null &&
                              (vars = account.cart[i].vars[1].var) != null &&
                              (quantity = account.cart[i].vars[1].quantity) !=
                                null && (
                                <CartCard
                                  prod={prod}
                                  vars={vars}
                                  quantity={quantity}
                                  var={1}
                                  calcSum={calcSum}
                                  calcateSum={calcateSum}
                                  setAccount={setAccount}
                                />
                              )}
                            {account.cart[i].vars[2] != null &&
                              (vars = account.cart[i].vars[2].var) != null &&
                              (quantity = account.cart[i].vars[2].quantity) !=
                                null && (
                                <CartCard
                                  prod={prod}
                                  vars={vars}
                                  quantity={quantity}
                                  var={2}
                                  calcSum={calcSum}
                                  calcateSum={calcateSum}
                                  setAccount={setAccount}
                                />
                              )}
                          </>
                        );
                      }
                    }
                  })}
                <MDBCard>
                  <MDBCardBody>
                    <MDBRow className="justify-content-between align-items-center">
                      <MDBCol md="1" lg="1" xl="1" className="text-start">
                        <a href="#!" onClick={async () => await processBuy()}>
                          <Button
                            className="ms-3"
                            color="warning"
                            block
                            size="lg"
                          >
                            الدفع
                          </Button>
                        </a>
                      </MDBCol>
                      <MDBCol md="2" lg="2" xl="2" className="text-start">
                        ${sum}
                      </MDBCol>
                      <MDBCol md="3" lg="3" xl="3" className="text-end">
                        <a
                          href="#!"
                          onClick={() => deleteAll()}
                          className="text-danger"
                        >
                          إزالة جميع المنتجات
                          <MDBIcon fas icon="trash text-danger" size="lg" />
                        </a>
                        {console.log("cart Products", products)}
                      </MDBCol>
                    </MDBRow>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        )}
        {buy === true && (
          <Checkout
            account={account}
            getAccount={getAccount}
            processBuy={processBuy}
          />
        )}
      </section>
    </>
  );
}

export default Cart;
