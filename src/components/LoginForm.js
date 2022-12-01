import React, { useState, useEffect } from "react";
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

import { gapi } from "gapi-script";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { Logout } from "@mui/icons-material";

const validationSchema = Yup.object().shape({
  email: Yup.string().required("مطلوب"),
  password: Yup.string().required("مطلوب"),
});
function LoginForm(props) {
  const [profile, setProfile] = useState([]);

  const clientId =
    "979602721583-if0g2i6k86eo9515n49m5d5gbm9pl3ea.apps.googleusercontent.com";

  const onSuccess = (res) => {
    setProfile(res.profileObj);
    window.localStorage.setItem("ClientID", clientId);
    window.localStorage.setItem("EMAIL", res.profileObj.email.concat("G"));
    window.localStorage.setItem("UserName", res.profileObj.name);

    localStorage.setItem("Profile", JSON.stringify(res.profileObj));

    axios
      .post("http://localhost:4000/signup/", {
        email: res.profileObj.email.concat("G"),
        password: "",
        name: res.profileObj.name,
        imageUrl: res.profileObj.imageUrl,
      })
      .then((res) => {
        navigate("/");
        navigate(0);
      })
      .catch((err) => {
        navigate("/");
        navigate(0);
      });
  };

  const onFailure = (err) => {
    console.log("failed", err);
  };

  const logOut = () => {
    setProfile(null);
  };

  useEffect(() => {
    if (localStorage.getItem("EMAIL") === null) {
      logOut();
    }
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
  });
  const navigate = useNavigate();
  const [code, setCode] = useState(0);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (studentObject) => {
      axios
        .post("http://localhost:4000/login/", studentObject)
        .then((res) => {
          if (res.data.code === 500) {
            setCode(500); //userNotFound
          }
          if (res.data.code === 404) {
            setCode(404); //Password is Wrong
          }
          if (res.data.code === 200) {
            localStorage.setItem("Profile", JSON.stringify(res.data));
            window.localStorage.setItem("TOKEN", res.data.token);
            window.localStorage.setItem("EMAIL", res.data.email);
            window.localStorage.setItem("UserName", res.data.name);

            if (res.data.email.includes("houseware")) {
              navigate("/admin");
              navigate(0);
            } else {
              navigate("/");
              navigate(0);
            }
          } else Promise.reject();
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
              </Grid>
              <div style={{ direction: "rtl" }}>
                <Link href="/forget-pass" variant="body2">
                  نسيت كلمة السر؟
                </Link>
              </div>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                style={{ marginTop: "5%" }}
              >
                تسجيل دخول
              </Button>
              <GoogleLogin
                clientId={clientId}
                buttonText="Sign in with Google"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={"single_host_origin"}
                isSignedIn={true}
              />
              <Grid container justifyContent="flex-end">
                <Grid item style={{ marginTop: "1%" }}>
                  <Link href="/signup" variant="body2">
                    هل تمتلك حساب؟ أنشىء حسابك
                  </Link>
                </Grid>
              </Grid>
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
    </>
  );
}

export default LoginForm;
