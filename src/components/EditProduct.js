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

const EditProduct = () => {
  const [code, setCode] = useState(0);
  const [form, setForm] = useState("edit");
  const [product, setProduct] = useState();

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      product_name: "",
      product_company: localStorage.getItem("UserName"),
    },
    validationSchema: validationSchema,
    onSubmit: (studentObject) => {
      console.log("h", studentObject);

      axios
        .post("http://localhost:4000/Products/one", studentObject)

        .then((res) => {
          console.log(res.data);
          if (res.data.code === 500) {
            setCode(500);
            console.log("res2", res);
          }
          if (res.data.code === 200) {
            setCode(200);
            setProduct(res.data.result);
            console.log("res", res);
            setForm("addE");
          } else Promise.reject();
        })
        .catch((err) => alert("Something went wrong"));
    },
  });

  return (
    <>
      {form === "edit" && (
        <div style={{ marginTop: " 5%" }}>
          <form onSubmit={formik.handleSubmit} style={{ textAlign: "center" }}>
            <h1>اسم المنتج</h1>
            <TextField
              fullWidth
              id="product_name"
              name="product_name"
              label="الاسم"
              value={formik.values.product_name}
              onChange={formik.handleChange}
              error={
                formik.touched.product_name &&
                Boolean(formik.errors.product_name)
              }
              helperText={
                formik.touched.product_name && formik.errors.product_name
              }
            />

            <Button color="primary" variant="contained" fullWidth type="submit">
              تعديل
            </Button>
          </form>
          {code === 500 && <Alert severity="error">هذا المنتج غير موجود</Alert>}
        </div>
      )}
      {form === "addE" && <AddProductForm product={product} form={form} />}
    </>
  );
};

export default EditProduct;
