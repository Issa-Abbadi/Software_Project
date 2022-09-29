import React, { useState } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormGroup, Container, Col, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function OTPForm(props) {
  const validationSchema = Yup.object().shape({
    OTP: Yup.string()
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
                <h1>Forget Password</h1>
                <FormGroup>
                  <label htmlFor="OTP">Code</label>
                  <Field name="OTP" type="text" className="form-control" />
                  <ErrorMessage
                    name="OTP"
                    className="d-block invalid-feedback"
                    component="span"
                  />
                </FormGroup>
                <FormGroup>
                  <label htmlFor="password">New Password</label>
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
              </Form>
            </Formik>
          </div>
        </Col>
      </Container>
    </>
  );
}

export default OTPForm;
