import React, { useState } from "react";
import axios from "axios";
import LoginForm from "../components/LoginForm";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./loginAndSign.css";

function Login(props) {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  // onSubmit handler
  const onSubmit = (studentObject) => {
    axios
      .post("http://localhost:4000/login/", studentObject)
      .then((res) => {
        if (res.data.code === 500) {
          alert("User Not Found");
        }
        if (res.data.code === 404) {
          alert("Password is wrong");
        }
        if (res.status === 200) {
          localStorage.setItem("TOKEN", res.data.token);
          localStorage.setItem("EMAIL", res.data.email);
          navigate("/");
        } else Promise.reject();
      })
      .catch((err) => alert("Something went wrong"));
  };

  return (
    <>
      <div class="login-container">
        <div class = "login-form">
        <LoginForm 
        initialValues={formValues}
        onSubmit={onSubmit}
        enableReinitialize
      >
        تسجيل الدخول
      </LoginForm>
        </div>
        <div class = "side-login">
             <h1>مستخدم جديد</h1>
             
        </div>
           
      </div>
     
    </>
  );
}

export default Login;
