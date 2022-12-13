import axios from "axios";
import SingleProduct from "../components/SingleProduct";
import Products from "../components/Products";
import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import './wishList.css';
function WishList() {
  const [account, setAccount] = useState("");
  const [products, setProducts] = useState("");

  const deleteAll = () => {
    axios
      .post("http://localhost:4000/login/deleteAllW", {
        email: localStorage.getItem("EMAIL"),
      })
      .then(({ data }) => {
        setProducts("");
      })
      .catch((error) => {
        console.log(error);
      });
  };
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

  function creatWish_window(e)
  {
     let x= document.getElementsByClassName("window-father");
     
  }

  return (
    <>
      <Products products={products} type="wishList" />
      <div class="Breadcrumbs">
        <a href="" class="mainPage-link">الصفحة الرئيسية</a>
        
      </div>
      <div class="wish-list-title">
        <h1>قوائم الرغبات</h1>
        <button class="creatWishList-button" onClick={creatWish_window}>انشاء قائمة جديده</button>
      </div>
      <div class="window-father">
          <div class="creatWish-window">
            <form action="">
                  <h2 style={{margin:"3% 3%"}}>إسم قائمة الرغبة</h2>
                  <hr />
                  <input type="text" placeholder="اسم قائمة الرغبه" required class="listName-input"></input>
                  <hr />
                 <div class="buttons">
                      <button class="createWishList-button">انشاء القائمة</button>
                      <button class="cancelButton">الغاء الامر</button>
                  </div>
            </form>
          </div>
      </div>
      {/* <div>
        <Button onClick={deleteAll}>حذف الجميع</Button>
      </div> */}
    </>
  );
}

export default WishList;
