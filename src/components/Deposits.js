import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Title from "./Title";
import { useState, useEffect } from "react";

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits() {
  const [email, setEmail] = useState(localStorage.getItem("UserName"));
  useEffect(() => {
    const token = localStorage.getItem("UserName");
    console.log("token = ", token);
    setEmail(token);
  }, []);
  return (
    <React.Fragment>
      {email}
      <Title>Recent Deposits</Title>
      <Typography component="p" variant="h4">
        $3,024.00
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on 15 March, 2019
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div>
    </React.Fragment>
  );
}
