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

const AddProductForm = (props) => {
  const [product, setProduct] = useState(props.product);
  const [form, useForm] = useState(props.form);
  // {
  //   product_name: "",
  //   product_price: "",
  //   product_category: "",
  //   sub_category: "",
  //   product_company: localStorage.getItem("UserName"),
  //   product_description: "",
  //   product_img: "",
  // }
  const [gategory, setGategory] = useState([
    { id: "السفرة", name: "السفرة" },
    { id: "المطبخ", name: "المطبخ" },
    { id: "المنزل", name: "المنزل" },
  ]);

  const [color, setColor] = useState([
    { id: "أبيض", name: "أبيض" },
    { id: "أزرق", name: "أزرق" },
    { id: "أسود", name: "أسود" },
    { id: "أحمر", name: "أحمر" },
    { id: "أخضر", name: "أخضر" },
    { id: "أصفر", name: "أصفر" },
    { id: "برتقالي", name: "برتقالي" },
    { id: "زهري", name: "زهري" },
    { id: "بنفسجي", name: "بنفسجي" },
    { id: "بني", name: "بني" },
  ]);

  const [size, setSize] = useState([
    { id: "S", name: "S" },
    { id: "M", name: "M" },
    { id: "L", name: "L" },
  ]);
  const [subGategory, setSubGategory] = useState([]);
  const [product_img, setProduct_img] = useState("");
  const [code, setCode] = useState(0);

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      product_name: product.product_name,
      product_price: product.product_price,
      product_category: product.product_category,
      sub_category: product.sub_category,
      product_company: localStorage.getItem("UserName"),
      product_description: product.product_description,
      product_img: product.product_img,
      _id: product._id,
      product_size: product.product_size,
      product_color: product.product_color,
      product_quantity: product.product_quantity,
    },
    validationSchema: validationSchema,
    onSubmit: (studentObject) => {
      console.log("h", studentObject);
      if (form === "add") {
        axios
          .post("http://localhost:4000/addProduct/", studentObject)
          .then((res) => {
            if (res.data.code === 500) {
              setCode(500);
            }
            if (res.data.code === 404) {
              setCode(404);
            }
            if (res.data.code === 200) {
              setCode(200);

              navigate("/admin");
            } else Promise.reject();
          })
          .catch((err) => alert("Something went wrong"));
      } else if (form === "addE") {
        axios
          .put("http://localhost:4000/addProduct/", studentObject)
          .then((res) => {
            if (res.data.code === 500) {
              setCode(500);
            }
            if (res.data.code === 404) {
              setCode(404);
            }
            if (res.data.code === 200) {
              setCode(200);

              navigate("/admin");
            } else Promise.reject();
          })
          .catch((err) => alert("Something went wrong"));
      }
    },
  });

  useEffect(() => {
    if (formik.values.product_img !== "") {
      setProduct_img(formik.values.product_img);
      console.log(product_img);
    }
  }, [formik.values.product_img]);

  useEffect(() => {
    if (formik.values.product_category === "السفرة") {
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
    } else if (formik.values.product_category === "المطبخ") {
      setSubGategory([
        { id: "رفايع المطبخ", name: "رفايع المطبخ" },
        { id: "أواني المطبخ", name: "أواني المطبخ" },
        { id: "توزيع وتوابل", name: "توزيع وتوابل" },
      ]);
    } else if (formik.values.product_category === "المنزل") {
      setSubGategory([{ id: "رفايع الحمايم", name: "رفايع الحمايم" }]);
    } else {
      setSubGategory([]);
    }
  }, [formik.values.product_category]);

  return (
    <div style={{ marginTop: " 5%" }}>
      <form onSubmit={formik.handleSubmit} style={{ textAlign: "center" }}>
        {form === "add" && <h1>أضف منتج</h1>}
        {form === "addE" && <h1>تعديل منتج</h1>}
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
        <Input
          fullWidth
          type="number"
          id="product_quantity"
          name="product_quantity"
          label="السعر"
          value={formik.values.product_quantity}
          onChange={formik.handleChange}
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
          name="product_color"
          id="اللون"
          select
          label="اللون"
          value={formik.values.product_color}
          onChange={formik.handleChange}
        >
          {color.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          style={{ width: "200px" }}
          className="px-2 my-2"
          variant="outlined"
          name="product_size"
          id="الحجم"
          select
          label="الحجم"
          value={formik.values.product_size}
          onChange={formik.handleChange}
        >
          {size.map((option) => (
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
            onClose={() => {
              setProduct_img("");
            }}
          >
            {"أضيفت الصورة  "}
          </Alert>
        )}

        <Button color="primary" variant="contained" fullWidth type="submit">
          {form === "add" && <>إضافة </>}
          {form === "addE" && <>تعديل </>}
        </Button>
      </form>
      {code === 500 && form === "addE" && (
        <Alert severity="warning">هذا المنتج غير موجود</Alert>
      )}
      {code === 500 && form === "add" && (
        <Alert severity="warning">هذا المنتج موجود</Alert>
      )}
      {code === 200 && form === "addE" && (
        <Alert severity="success">تم تعديل المنتج بنجاح </Alert>
      )}
      {code === 200 && form === "add" && (
        <Alert severity="success">تم إضافة المنتج بنجاح </Alert>
      )}
      {code === 404 && <Alert severity="error">خطأ في التنفيذ</Alert>}
    </div>
  );
};

export default AddProductForm;
