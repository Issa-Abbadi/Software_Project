import React, { useState } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormGroup, Container, Col, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "../Pages/loginAndSign.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  faYoutube,
  faFacebook,
  faTwitter,
  faInstagram
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



function LoginForm(props) {
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("You have enter an invalid email address"),
    // .required("Required"),
    password: Yup.string()
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
                <div class="Lock">
                    <img src={require("../assets/loginLock.png")} class="lockImg" />
                </div>
                <div class="loggin">
                    <h1 class="loginTitle">أدخل إلى حسابك</h1>
                </div>

                <div class="fields">
                <FormGroup class="login-title ">
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
                  <Field
                    name="password"
                    type="password"
                    placeholder="كلمة السر"
                    className="form-control"
                    required

                  />
                  <ErrorMessage
                    name="password"
                    className="d-block invalid-feedback"
                    component="span"
                  />
                </FormGroup>
                </div>
               
                <div class="login-Button">
                  <Button 
                    variant="dark"
                    size="lg"
                    block="block"
                    type="submit"
                  >
                    {props.children}
                  </Button>
                </div>

                <div class="sign-with-others">
                    <h2><span>أو عن طريق</span></h2>
                </div>

                <div class="social-container">
                    <a href="https://www.youtube.com"
                          className="youtube social">
                          <FontAwesomeIcon icon={faYoutube} size="2x" />
                    </a>
                    <a href="https://www.facebook.com/learnbuildteach/"
                          className="facebook social">
                          <FontAwesomeIcon icon={faFacebook} size="2x" />
                    </a>
                    <a href="https://www.twitter.com/jamesqquick" className="twitter social">
                          <FontAwesomeIcon icon={faTwitter} size="2x" />
                    </a>
                    <a href="https://www.instagram.com/learnbuildteach"
                          className="instagram social">
                            <FontAwesomeIcon icon={faInstagram} size="2x" />
                    </a>
                </div>
                <div class="addition-links">

                    <div class="forgetPassword">
                        <Link
                          class="text-reset"
                          to={"/forget-pass"}
                        >
                          {" "}
                          نسيت كلمة السر ؟{" "}
                        </Link>
                    </div>

                    <div class="signUP">
                        <label>هل تمتلك حساب؟</label>
                        <div>
                            <Link class="create-account"
                              to={"/signup"}
                            >
                              {" "}
                              انشأ حسابك {" "}
                            </Link>
                        </div>
                    </div>
                  </div>


              </Form>
            </Formik>
          </div>
        </Col>
      </Container>
    </>
  );
}

export default LoginForm;
