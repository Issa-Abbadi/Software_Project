import React from "react";
import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddProduct from "./AddProduct";
import Disposes from "../components/Dashboard";
function Admin(props) {
  // const navigate = useNavigate();

  useEffect(() => {
    // const token = localStorage.getItem("EMAIL");
    // console.log("token = ", token);
    // if (!token) {
    //   navigate("/");
    // }
  }, []);
  return (
    <div
      style={{
        display: "flex",
        direction: "rtl",
        position: "absolute",
        right: "-2.1%",
        margin: "0",
        height: "100%",
        backgroundColor: "#eee",
        width: "100%",
      }}
    >
      <Sidebar
        class="sideBar"
        style={{
          height: "inhert",
          backgroundColor: "blue",
          margin: "0",

          right: "0",
        }}
      />

      <Disposes />
    </div>
  );
}

export default Admin;
