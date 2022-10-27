import React, { useState } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormGroup, Container, Col, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "../Pages/loginAndSign.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  faYoutube,
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function LoginForm(props) {
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("You have enter an invalid email address"),
    // .required("Required"),
    password: Yup.string(),
  });
  console.log(props);
  return (
    <>
      <Container>
        <Col
        >
          <div
            className="form-wrapper outcard"
            
          >
            <Formik {...props} validationSchema={validationSchema}>
             <div class="login-container"> 
              <Form class="loginForm">
                <div class="Lock">
                  <img
                    src={require("../assets/loginLock.png")}
                    class="lockImg"
                  />
                </div>
                <div class="loggin">
                  <p class="loginTitle">أدخل إلى حسابك</p>
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
                <div class="forgetPassword">
                    <Link class="text-reset" to={"/forget-pass"}>
                      {" "}
                      نسيت كلمة السر ؟{" "}
                    </Link>
                </div>
                <div class="login-Button">
                  <Button variant="dark" size="lg" block="block" type="submit">
                    {props.children}
                  </Button>
                </div>

                <div class="sign-with-others">
                  <p>
                    <span>أو عن طريق</span>
                  </p>
                </div>

                <div class="social-container">
                 <div>
                  <a href="https://www.youtube.com" className="youtube social">
                    <FontAwesomeIcon icon={faYoutube} size="2x" />
                  </a>
                  <a
                    href="https://www.facebook.com/learnbuildteach/"
                    className="facebook social"
                  >
                    <FontAwesomeIcon icon={faFacebook} size="2x" />
                  </a>
                  <a
                    href="https://www.twitter.com/jamesqquick"
                    className="twitter social"
                  >
                    <FontAwesomeIcon icon={faTwitter} size="2x" />
                  </a>
                  <a
                    href="https://www.instagram.com/learnbuildteach"
                    className="instagram social"
                  >
                    <FontAwesomeIcon icon={faInstagram} size="2x" />
                  </a>
                  </div>
                </div>
                 

                  <div class="signUP">
                    <div>
                    <label for="labeling">هل تمتلك حساب؟</label>
                      <Link class="create-account" to={"/signup"} id="labeling">
                        {" "}
                        انشأ حسابك{" "}
                      </Link>
                      </div>
                  </div>
              </Form>
              </div>
            </Formik>
          </div>
        </Col>
      </Container>
    </>
  );
}

export default LoginForm;
