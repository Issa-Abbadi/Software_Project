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
import CircularProgress from "@mui/material/CircularProgress";
import "../Pages/loginAndSign.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "@mui/material/Container";
import "../Pages/loginAndSign.css";

const validationSchema = Yup.object().shape({
  OTP: Yup.string().required("مطلوب"),
  password: Yup.string().required("مطلوب").min(8, "ثمانية حروف على الأقل"),
});

function OTPForm(props) {
  const navigate = useNavigate();
  const [code, setCode] = useState(0);

  const formik = useFormik({
    initialValues: {
      OTP: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (studentObject) => {
      axios
        .put("http://localhost:4000/submit-otp/", studentObject)
        .then((res) => {
          if (res.data.code === 200) {
            navigate("/login");
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
              إعادة تعيين كلمة السر
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={2} style={{ direction: "rtl" }}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="OTP"
                    label="الكود"
                    name="OTP"
                    style={{ direction: "rtl" }}
                    autoComplete="OTP"
                    value={formik.values.OTP}
                    onChange={formik.handleChange}
                    error={formik.touched.OTP && Boolean(formik.errors.OTP)}
                    helperText={formik.touched.OTP && formik.errors.OTP}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    name="password"
                    label="كلمة السر الجديدة"
                    type="password"
                    id="password"
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
              </Grid>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                style={{ marginTop: "5%" }}
              >
                إعادة تعيين
              </Button>
            </form>
            {code === 500 && <Alert severity="error">الكود خاطىء</Alert>}
          </div>
          <Box mt={5}></Box>
        </Container>
      </div>
    </>
  );
}

export default OTPForm;
