import React from "react";
import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddProduct from "./AddProduct";
import Disposes from "../components/Dashboard";
import Chart from "../components/Chart";
import AddProductForm from "../components/AddProductForm";
import EditProduct from "../components/EditProduct";
import Orders from "../components/Orders";
import Paper from "@mui/material/Paper";
import { useLocation } from "react-router-dom";
import AddVarForm from "../components/AddVarForm";
import EditVarForm from "../components/EditVarForm";
import PriceChart from "../components/PriceChart";
function Admin(props) {
  const [form, setForm] = useState("add");
  const [product, setProduct] = useState({
    product_name: "",

    product_category: "",
    sub_category: "",
    product_company: localStorage.getItem("UserName"),
    product_description: "",

    returnable: true,
    vars: [
      {
        product_price: "",
        product_img: "",
        product_quantity: "",
        product_size: "",
        product_color: "",
      },
    ],
  });

  const navigate = useNavigate();
  const [dash, setDash] = useState({ Name: "الرئيسية", Value: "0" });
  useEffect(() => {
    const token = localStorage.getItem("EMAIL");
    console.log("token = ", token);
    if (!token) {
      navigate("/");
    } else if (!token.includes("@houseware")) {
      console.log("hello");
      navigate("/");
    }
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
        <AddProductForm product={product} form={form} value={0} />
      )}
      {dash.Name === "إضافة نوع" && <AddVarForm />}
      {dash.Name === "احصائيات" && (
        <>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              flex: "1",
              height: "550px",
              padding: "30px",
            }}
          >
            <Chart value="الشهر" />
          </Paper>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              flex: "1",
              height: "550px",
              padding: "30px",
            }}
          >
            <div>
              <div style={{ height: "500px" }}>
                <PriceChart email={localStorage.getItem("EMAIL")} />
              </div>
            </div>
          </Paper>
        </>
      )}
      {dash.Name === "تعديل نوع" && <EditVarForm value={dash.Value} />}
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
