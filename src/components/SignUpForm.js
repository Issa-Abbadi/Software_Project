import React, { useState } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormGroup, Container, Col, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function SignUpForm(props) {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("You have enter an invalid email address")
      .required("Required"),
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
          md={{ span: 4, offset: 4 }}
          style={{
            "background-color": "#eee",
            padding: "2rem",
            borderRadius: "5%",
            marginTop: "20px",
          }}
        >
          <div className="form-wrapper outcard">
            <Formik {...props} validationSchema={validationSchema}>
              <Form>
                <h1>SIGNUP</h1>
                <FormGroup>
                  <label htmlFor="email">Email</label>
                  <Field name="email" type="email" className="form-control" />
                  <ErrorMessage
                    name="email"
                    className="d-block invalid-feedback"
                    component="span"
                  />
                </FormGroup>
                <FormGroup>
                  <label htmlFor="password">Password</label>
                  <Field
                    name="password"
                    type="password"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="password"
                    className="d-block invalid-feedback"
                    component="span"
                  />
                </FormGroup>
                <Button
                  style={{ margin: "2rem", display: "block" }}
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
                  to={"/login"}
                >
                  {" "}
                  Login{" "}
                </Link>
              </Form>
            </Formik>
          </div>
        </Col>
      </Container>
    </>
  );
}

export default SignUpForm;
