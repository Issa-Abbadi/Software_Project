import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Input from "@mui/material/Input";
import Alert from "@mui/material/Alert";
import InputLabel from "@mui/material/InputLabel";
import { Link, Navigate, useNavigate } from "react-router-dom";
import FileBase64 from "react-file-base64";
import { faHouseMedicalCircleCheck } from "@fortawesome/free-solid-svg-icons";
import AddProductForm from "./AddProductForm";

const validationSchema = yup.object({
  product_name: yup.string().required("مطلوب"),
});

const AddVarForm = () => {
  const [code, setCode] = useState(0);
  const [form, setForm] = useState("addVar");
  const [product, setProduct] = useState({
    product_name: "",
    product_price: "",
    product_category: "",
    sub_category: "",
    product_company: localStorage.getItem("UserName"),
    product_description: "",
    product_img: "",
    product_quantity: "",
    product_size: "",
    product_color: "",
    returnable: true,
    vars: [],
    _id: localStorage.getItem("EditProduct"),
  });

  const navigate = useNavigate();

  useEffect(() => {
    // axios
    //   .post("http://localhost:4000/Products/one", {
    //     product_company: localStorage.getItem("UserName"),
    //     id: localStorage.getItem("EditProduct"),
    //   })
    //   .then((res) => {
    //     console.log(res.data);
    //     if (res.data.code === 500) {
    //       setCode(500);
    //       console.log("res2", res);
    //     }
    //     if (res.data.code === 200) {
    //       setCode(200);
    //       setProduct(res.data.result);
    //       console.log("res", res);
    //       setForm("addVar");
    //     } else Promise.reject();
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }, []);

  return (
    <>
      {console.log("local", localStorage.getItem("EditProduct"))}
      {form === "addVar" && <AddProductForm product={product} form={form} />}
    </>
  );
};

export default AddVarForm;
