import React, { useState } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormGroup, Container, Col, Button } from "react-bootstrap";

function LoginForm(props) {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    email: Yup.string()
      .email("You have enter an invalid email address")
      .required("Required"),
    rollno: Yup.number()
      .positive("Invalid roll number")
      .integer("Invalid roll number")
      .required("Required"),
  });
  console.log(props);
  return (
    <>
      <Container>
        <Col
          md={{ span: 4, offset: 4 }}
          style={{ "background-color": "#0d6efd", padding: "2rem" }}
        >
          <div className="form-wrapper">
            <Formik {...props} validationSchema={validationSchema}>
              <Form>
                <FormGroup>
                  <label htmlFor="name">Name</label>
                  <Field name="name" type="text" className="form-control" />
                  <ErrorMessage
                    name="name"
                    className="d-block invalid-feedback"
                    component="span"
                  />
                </FormGroup>
                <FormGroup>
                  <label htmlFor="email">Email</label>
                  <Field name="email" type="text" className="form-control" />
                  <ErrorMessage
                    name="email"
                    className="d-block invalid-feedback"
                    component="span"
                  />
                </FormGroup>
                <FormGroup>
                  <label htmlFor="rollon">Roll Number</label>
                  <Field name="rollno" type="number" className="form-control" />
                  <ErrorMessage
                    name="rollno"
                    className="d-block invalid-feedback"
                    component="span"
                  />
                </FormGroup>
                <Button
                  style={{ margin: "2rem" }}
                  variant="primary"
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

export default LoginForm;
