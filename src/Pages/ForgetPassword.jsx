import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import ForgetPassForm from "../components/ForgetPassForm";

function ForgetPassword() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    email: "",
  });
  // onSubmit handler
  const onSubmit = (studentObject) => {
    axios
      .post("http://localhost:4000/send-otp/", studentObject)
      .then((res) => {
        if (res.status === 200) {
          navigate("/otp");
        } else {
          alert("Email / Server Error");
          Promise.reject();
        }
      })
      .catch((err) => alert("Something went wrong"));
  };
  return (
    <>
      <ForgetPassForm
        initialValues={formValues}
        onSubmit={onSubmit}
        enableReinitialize
      >
        Send Code
      </ForgetPassForm>
    </>
  );
}

export default ForgetPassword;
