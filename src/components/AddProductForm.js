import React, { useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import { Link, Navigate, useNavigate } from "react-router-dom";

const validationSchema = yup.object({
  product_name: yup.string().required("مطلوب"),
  product_price: yup
    .string()

    .required("مطلوب"),
  product_price: yup.string().required("مطلوب"),
  product_category: yup.string().required("مطلوب"),
  product_description: yup.string().required("مطلوب"),
});

const AddProductForm = () => {
  const [gategory, setGategory] = useState([
    { id: "السفرة", name: "السفرة" },
    { id: "المطبخ", name: "المطبخ" },
    { id: "المنزل", name: "المنزل" },
  ]);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      product_name: "",
      product_price: "",
      product_category: "السفرة",
      product_company: localStorage.getItem("UserName"),
      product_description: "",
    },
    validationSchema: validationSchema,
    onSubmit: (studentObject) => {
      console.log(studentObject);

      axios
        .post("http://localhost:4000/addProduct/", studentObject)
        .then((res) => {
          if (res.data.code === 500) {
            alert("Something Wrong");
          }
          if (res.data.code === 404) {
            alert("Something wrong");
          }
          if (res.data.code === 200) {
            alert("Added Successfully");

            navigate("/admin");
          } else Promise.reject();
        })
        .catch((err) => alert("Something went wrong"));
    },
  });

  return (
    <div style={{ marginTop: " 5%" }}>
      <form onSubmit={formik.handleSubmit} style={{ textAlign: "center" }}>
        <h1>أضف منتج</h1>
        <TextField
          fullWidth
          id="product_name"
          name="product_name"
          label="الاسم"
          value={formik.values.product_name}
          onChange={formik.handleChange}
          error={
            formik.touched.product_name && Boolean(formik.errors.product_name)
          }
          helperText={formik.touched.product_name && formik.errors.product_name}
        />
        <Input
          fullWidth
          type="number"
          id="product_price"
          name="product_price"
          label="السعر"
          value={formik.values.product_price}
          onChange={formik.handleChange}
          error={
            formik.touched.product_price && Boolean(formik.errors.product_price)
          }
          helperText={
            formik.touched.product_price && formik.errors.product_price
          }
        />
        <TextField
          style={{ width: "200px" }}
          className="px-2 my-2"
          variant="outlined"
          name="product_category"
          id="الصنف"
          select
          label="الصنف"
          value={formik.values.product_category}
          onChange={formik.handleChange}
        >
          {gategory.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          fullWidth
          minRows={2}
          maxRows={5}
          id="product_description"
          name="product_description"
          label="الوصف"
          value={formik.values.product_description}
          onChange={formik.handleChange}
          error={
            formik.touched.product_description &&
            Boolean(formik.errors.product_description)
          }
          helperText={
            formik.touched.product_description &&
            formik.errors.product_description
          }
        />

        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AddProductForm;
