import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SignUpForm from "../components/SignUpForm";

function SignUp() {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  // onSubmit handler
  const onSubmit = (studentObject) => {
    axios
      .post("http://localhost:4000/signup/", studentObject)
      .then((res) => {
        if (res.status === 200) {
          alert("Signup success.");
        } else Promise.reject();
      })
      .catch((err) => alert("Something went wrong"));
  };

  return (
    <>
      <SignUpForm
        initialValues={formValues}
        onSubmit={onSubmit}
        enableReinitialize
      >
        Create Account
      </SignUpForm>
    </>
  );
}

export default SignUp;
