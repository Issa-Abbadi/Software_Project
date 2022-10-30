import React from "react";
import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddProduct from "./AddProduct";
import Disposes from "../components/Dashboard";
import AddProductForm from "../components/AddProductForm";
import EditProduct from "../components/EditProduct";
import Orders from "../components/Orders";
import Paper from "@mui/material/Paper";
import { useLocation } from "react-router-dom";
function Admin(props) {
  const [form, setForm] = useState("add");
  const [product, setProduct] = useState({
    product_name: "",
    product_price: "",
    product_category: "",
    sub_category: "",
    product_company: localStorage.getItem("UserName"),
    product_description: "",
    product_img: "",
  });

  // const navigate = useNavigate();
  const [dash, setDash] = useState({ Name: "الرئيسية" });
  useEffect(() => {
    // const token = localStorage.getItem("EMAIL");
    // console.log("token = ", token);
    // if (!token) {
    //   navigate("/");
    // }
  }, []);

  const location = useLocation();
  React.useEffect(() => {
    if (location.state) {
      let _state = location.state;
      setDash(_state);
    }
  }, [location]);

  const changeDash = (name) => {
    setDash(name);
  };
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
        changeDash={changeDash}
      />

      {dash.Name === "الرئيسية" && <Disposes />}
      {dash.Name === "أضف منتج" && (
        <AddProductForm product={product} form={form} />
      )}
      {dash.Name === "تعديل منتج" && <EditProduct />}
      {dash.Name === "قائمة المنتجات" && (
        <Paper
          sx={{ p: 2, display: "flex", flexDirection: "column", flex: "1" }}
        >
          <Orders />
        </Paper>
      )}
    </div>
  );
}

export default Admin;
