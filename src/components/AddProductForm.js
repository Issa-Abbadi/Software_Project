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
    { id: "table", name: "السفرة" },
    { id: "kitchen", name: "المطبخ" },
    { id: "home", name: "المنزل" },
  ]);
  const [subGategory, setSubGategory] = useState([]);
  const [product_img, setProduct_img] = useState("");

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      product_name: "",
      product_price: "",
      product_category: "",
      sub_category: "",
      product_company: localStorage.getItem("UserName"),
      product_description: "",
      product_img: "",
    },
    validationSchema: validationSchema,
    onSubmit: (studentObject) => {
      console.log("h", studentObject);

      axios
        .post("http://localhost:4000/addProduct/", studentObject)
        .then((res) => {
          if (res.data.code === 500) {
            alert("Aready Added");
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

  useEffect(() => {
    if (formik.values.product_img !== "") {
      setProduct_img(formik.values.product_img);
      console.log(product_img);
    }
  }, [formik.values.product_img]);

  useEffect(() => {
    if (formik.values.product_category === "table") {
      setSubGategory([
        { id: "أدوات زجاجية", name: "أدوات زجاجية" },
        { id: "أطقم سفرة", name: "أطقم سفرة" },
        { id: "شاي وجاتوه", name: "شاي وجاتوه" },
        { id: "أركوبيركس", name: "أركوبيركس" },
        { id: "شوك ومعالق", name: "شوك ومعالق" },
        { id: "تقديم", name: "تقديم" },
        { id: "خذف وبورسلين", name: "خذف وبورسلين" },
        { id: "وبونشانيا", name: "وبونشانيا" },
      ]);
    } else if (formik.values.product_category === "kitchen") {
      setSubGategory([
        { id: "رفايع المطبخ", name: "رفايع المطبخ" },
        { id: "أواني المطبخ", name: "أواني المطبخ" },
        { id: "توزيع وتوابل", name: "توزيع وتوابل" },
      ]);
    } else if (formik.values.product_category === "home") {
      setSubGategory([{ id: "رفايع الحمايم", name: "رفايع الحمايم" }]);
    } else {
      setSubGategory([]);
    }
  }, [formik.values.product_category]);

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
          id="الفئة"
          select
          label="الفئة"
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
          style={{ width: "200px" }}
          className="px-2 my-2"
          variant="outlined"
          name="sub_category"
          id="الصنف"
          select
          label="الصنف"
          value={formik.values.sub_category}
          onChange={formik.handleChange}
        >
          {subGategory.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          fullWidth
          multiline
          rows="5"
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
        {product_img === "" && (
          <Button variant="contained" component="label">
            إضافة صورة
            <span style={{ display: "none" }}>
              <FileBase64
                name="product_img"
                id="InputImg"
                hidden
                multiple={false}
                onDone={({ base64 }) => (
                  setProduct_img(base64), (formik.values.product_img = base64)
                )}
              />
            </span>
          </Button>
        )}
        {product_img !== "" && (
          <Alert
            severity="success"
            onClick={() => {
              setProduct_img("");
            }}
          >
            أضيفت الصورة
          </Alert>
        )}

        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AddProductForm;