import React, { useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import { FormGroup, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";

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
import "../Pages/loginAndSign.css";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("مطلوب"),
  email: Yup.string().email("هذا البريد الالكتروني غير صالح").required("مطلوب"),
  password: Yup.string().required("مطلوب").min(8, "ثمانية حروف على الأقل"),
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
  const [code, setCode] = useState(0);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      ppassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (studentObject) => {
      //console.log(studentObject);
      if (formik.values.ppassword === formik.values.password) {
        axios
          .post("http://localhost:4000/signup/", studentObject)
          .then((res) => {
            // console.log(res.data.code);

            if (res.data.code === 200) {
              navigate("/login");
            } else if (res.data.code === 500) {
              setCode(500);
            } else Promise.reject();
          })
          .catch((err) => alert("Something went wrong"));
      }
    },
  });

  //console.log(props);
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
              إنشاء حساب
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={2} style={{ direction: "rtl" }}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="fname"
                    name="name"
                    variant="outlined"
                    fullWidth
                    id="name"
                    label="اسم المستخدم"
                    autoFocus
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                  />
                </Grid>

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
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    name="ppassword"
                    label="كرر كلمة السر"
                    type="password"
                    id="ppassword"
                    autoComplete="current-ppassword"
                    value={formik.values.ppassword}
                    onChange={formik.handleChange}
                    error={Boolean(
                      formik.values.ppassword !== formik.values.password
                    )}
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
                إنشاء حساب
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item style={{ marginTop: "1%" }}>
                  <Link href="/login" variant="body2">
                    تمتلك حساب؟ سجل الدخول
                  </Link>
                </Grid>
              </Grid>
            </form>
            {code === 500 && (
              <Alert severity="error">
                يوجد حساب لهذا البريد الالكتروني مسبقاً
              </Alert>
            )}
          </div>
          <Box mt={5}></Box>
        </Container>
      </div>
    </>
  );
}

export default SignUpForm;
