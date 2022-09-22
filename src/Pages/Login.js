import React, { useState } from "react";
import axios from "axios";
import LoginForm from "../components/LoginForm";

function Login(props) {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    rollno: "",
  });
  // onSubmit handler
  const onSubmit = (studentObject) => {
    axios
      .post("http://localhost:4000/Accounts/create-account", studentObject)
      .then((res) => {
        if (res.status === 200) alert("Student successfully created");
        else Promise.reject();
      })
      .catch((err) => alert("Something went wrong"));
  };

  return (
    <LoginForm
      initialValues={formValues}
      onSubmit={onSubmit}
      enableReinitialize
    >
      Create Account
    </LoginForm>
  );
}

export default Login;
