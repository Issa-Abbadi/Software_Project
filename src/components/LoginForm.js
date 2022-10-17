import React, { useState } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormGroup, Container, Col, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function LoginForm(props) {
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("You have enter an invalid email address"),
    // .required("Required"),
    password: Yup.string()
      .required("No password provided.")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  });
  console.log(props);
  return (
    <>
      <Container>
        <Col
          // md={{ span: 4, offset: 4 }}
          style={
            {
              //   "background-color": "#eee",
              // padding: "2rem",
              // borderRadius: "5%",
              // marginTop: "20px",
              // "background-color": "blue",
              // "display": "flex",
              // "align-items": "center",
              // "flex-direction": "column",
              // "height": "80vh",
              // "width": "30vh",
              // "background": "rgba(255,255,255,0.1)",
              // "Box-shadow": "0 8px 32px 0 rgba(31,38,135,0.37)",
              // "backdrop-filter": "blur(8.5px)",
              // "border-radius": "10px",
              // "color": "#ffffff",
              // "text-transform": "uppercase",
              // "letter-spacing": "0.1rem"
            }
          }
        >
          <div
            className="form-wrapper outcard"
            style={{
              justifyContent: "center",
              "align-items": "center",
              display: "flex",
            }}
          >
            <Formik {...props} validationSchema={validationSchema}>
              <Form class="loginForm">
                <img src={require("../assets/LOGO2.png")} />
                <h1 class="loginTitle">تسجيل الدخول</h1>
                <FormGroup class="login-title">
                  <label htmlFor="email">البريد الالكتروني</label>
                  <Field
                    name="email"
                    type="email"
                    className="form-control"
                    required
                    placeholder="البريد الالكتروني"
                  />
                  <ErrorMessage
                    name="email"
                    className="d-block invalid-feedback"
                    component="span"
                  />
                </FormGroup>
                <FormGroup class="password">
                  <label htmlFor="password">كلمة السر</label>
                  <Field
                    name="password"
                    type="password"
                    placeholder="كلمة السر"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="password"
                    className="d-block invalid-feedback"
                    component="span"
                  />
                </FormGroup>
                <span class="remembering">
                  <label htmlFor="remeber">تذكرني</label>
                  <input id="remeber" type="checkbox" />
                </span>
                <Link
                  class="text-reset"
                  style={{
                    textAlign: "center",
                    display: "inline-block",
                    marginTop: "5px",
                    marginLeft: "5px",
                    marginRight: "5px",
                  }}
                  to={"/forget-pass"}
                >
                  {" "}
                  نسيت كلمة السر ؟{" "}
                </Link>
                <Button
                  style={{ display: "block", width: "100%", marginTop: "5%" }}
                  variant="dark"
                  size="lg"
                  block="block"
                  type="submit"
                >
                  {props.children}
                </Button>
                <Link
                  class="text-reset"
                  style={{
                    textAlign: "center",
                    display: "inline-block",
                    marginTop: "5px",
                    marginLeft: "5px",
                    marginRight: "5px",
                  }}
                  to={"/signup"}
                >
                  {" "}
                  SIGN UP{" "}
                </Link>
              </Form>
            </Formik>
          </div>
        </Col>
      </Container>
    </>
  );
}

export default LoginForm;
