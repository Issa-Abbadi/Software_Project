import React, { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

function Logout(props) {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.clear();
    navigate("/login");
    navigate(0);
  }, []);

  return <div></div>;
}

export default Logout;
