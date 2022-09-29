import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import OTPForm from "../components/OTPForm";

function NewSubmit() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    otp: "",
    password: "",
  });
  // onSubmit handler
  const onSubmit = (studentObject) => {
    axios
      .put("http://localhost:4000/submit-otp/", studentObject)
      .then((res) => {
        if (res.status === 200) {
          navigate("/login");
          alert("Password Updated.");
        } else {
          alert("worng code / Server Error");
          Promise.reject();
        }
      })
      .catch((err) => alert("Something went wrong"));
  };
  return (
    <>
      <OTPForm
        initialValues={formValues}
        onSubmit={onSubmit}
        enableReinitialize
      >
        Change Password
      </OTPForm>
    </>
  );
}

export default NewSubmit;
