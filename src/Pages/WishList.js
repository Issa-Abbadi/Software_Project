import axios from "axios";
import SingleProduct from "../components/SingleProduct";
import Products from "../components/Products";
import React, { useState, useEffect } from "react";

function WishList() {
  const [account, setAccount] = useState("");
  const [products, setProducts] = useState("");

  //     const deleteAll = () => {
  //       axios
  //         .post("http://localhost:4000/login/deleteAll", {
  //           email: localStorage.getItem("EMAIL"),
  //         })
  //         .then(({ data }) => {
  //           setProducts("");
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //         });
  //     };
  function getAccount() {
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

  useEffect(() => {
    if (account == "") {
      getAccount();
    }
  }, []);

  useEffect(() => {
    if (account !== "") {
      console.log("wishList ", products, account.wishList);
      axios
        .post("http://localhost:4000/Products/oneForCart", {
          _id: account.wishList,
        })
        .then(({ data }) => {
          setProducts(data.result);
        })
        .catch((error) => {
          console.log(error);
        });
      localStorage.setItem("wishList", true);
    }
  }, [account]);

  return (
    <>
      <Products products={products} type="wishList" />
    </>
  );
}

export default WishList;
