import React, { useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import { FormGroup, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import Container from "@mui/material/Container";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("مطلوب"),
  email: Yup.string()
    .email("You have enter an invalid email address")
    .required("مطلوب"),
  password: Yup.string().required("مطلوب").min(8, "8 حروف على الأقل"),
});
// const useStyles = styled((theme) => ({
//   paper: {
//     marginTop: theme.spacing(8),
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//   },
//   avatar: {
//     margin: theme.spacing(1),
//     backgroundColor: theme.palette.secondary.main,
//   },
//   form: {
//     width: "100%", // Fix IE 11 issue.
//     marginTop: theme.spacing(3),
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2),
//   },
// }));

function SignUpForm(props) {
  // const classes = useStyles();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      ppassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (studentObject) => {
      console.log(studentObject);
      if (formik.values.ppassword === formik.values.password) {
        axios
          .post("http://localhost:4000/signup/", studentObject)
          .then((res) => {
            console.log(res.data.code);
            if (res.data.code === 200) {
              alert("Signup success.");
              navigate("/login");
            } else if (res.data.code === 500) {
              alert("You Already have an account");
              navigate("/login");
            } else Promise.reject();
          })
          .catch((err) => alert("Something went wrong"));
      }
    },
  });

  console.log(props);
  return (
    <>
      <div className="form-wrapper outcard">
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div>
            <Avatar>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    name="username"
                    variant="outlined"
                    fullWidth
                    id="username"
                    label="اسم المستخدم"
                    autoFocus
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.username && Boolean(formik.errors.username)
                    }
                    helperText={
                      formik.touched.username && formik.errors.username
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}></Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="email"
                    label="الإيميل"
                    name="email"
                    autoComplete="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    name="password"
                    label="كلمة السر"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    name="ppassword"
                    label="كرر كلمة السر"
                    type="ppassword"
                    id="ppassword"
                    autoComplete="current-ppassword"
                    value={formik.values.ppassword}
                    onChange={formik.handleChange}
                    error={Boolean(
                      formik.values.ppassword !== formik.values.password
                    )}
                    helperText={"ليست صحيحة"}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                إنشاء حساب
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2">
                    تمتلك حساب؟ سجل الدخول
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={5}></Box>
        </Container>
      </div>
    </>
  );
}

export default SignUpForm;
