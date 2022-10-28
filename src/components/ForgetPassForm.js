import React, { useState } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import { FormGroup, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import "../Pages/loginAndSign.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "@mui/material/Container";
import "../Pages/loginAndSign.css";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("هذا البريد الالكتروني غير صالح").required("مطلوب"),
});

function ForgetPassForm(props) {
  const [code, setCode] = useState(0);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (studentObject) => {
      axios
        .post("http://localhost:4000/send-otp/", studentObject)
        .then((res) => {
          if (res.status === 200) {
            navigate("/otp");
          } else {
            setCode(500);
            Promise.reject();
          }
        })
        .catch((err) => alert("Something went wrong"));
    },
  });
  console.log(props);
  return (
    <>
      <div className="form-wrapper outcard signupForm">
        <Container component="main" maxWidth="xs">
          <CssBaseline />

          <div class="finding">
            <Avatar
              style={{
                margin: "auto",
                backgroundColor: "var(--may-green)",
                marginTop: "5%",
              }}
            >
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" class="labels">
              تسجيل دخول
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={2} style={{ direction: "rtl" }}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="email"
                    label="البريد الالكتروني"
                    name="email"
                    style={{ direction: "rtl" }}
                    autoComplete="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </Grid>
              </Grid>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                style={{ marginTop: "5%" }}
              >
                تسجيل دخول
              </Button>
            </form>
            {code === 500 && (
              <Alert severity="error">
                لا يوجد حساب لهذا البريد الالكتروني
              </Alert>
            )}
          </div>
          <Box mt={5}></Box>
        </Container>
      </div>
    </>
  );
}

export default ForgetPassForm;

{
  /* <>
<div className="form-wrapper outcard signupForm">
  <Container component="main" maxWidth="xs">
    <CssBaseline />

    <div class="finding">
      <Avatar
        style={{
          margin: "auto",
          backgroundColor: "var(--may-green)",
          marginTop: "5%",
        }}
      >
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5" class="labels">
        تسجيل دخول
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2} style={{ direction: "rtl" }}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              id="email"
              label="البريد الالكتروني"
              name="email"
              style={{ direction: "rtl" }}
              autoComplete="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>
        
        </Grid>
      
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          style={{ marginTop: "5%" }}
        >
          تسجيل دخول
        </Button>
       
      </form>
      {code === 500 && (
        <Alert severity="error">
          لا يوجد حساب لهذا البريد الالكتروني
        </Alert>
      )}
      {code === 404 && <Alert severity="warning">كلمة السر خاطئة</Alert>}
    </div>
    <Box mt={5}></Box>
  </Container>
</div>
</> */
}
