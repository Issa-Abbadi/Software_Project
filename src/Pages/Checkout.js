import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AddressForm from "../components/AddressForm";
import PaymentForm from "../components/PaymentForm";
import Review from "../components/Review";
import { useState, useEffect } from "react";
import axios from "axios";
import './checkout.css';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center" >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/" >
        Houseware
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const steps = ["العنوان", "طريقة الدفع", "مراجعة الطلب"];

const theme = createTheme();

export default function Checkout(props) {
  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    city: "",
    address: "",
  });

  async function getAddress() {
    props.getAccount();
  }

  useEffect(() => {
    getAddress();
  }, []);

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <>
            {props.account.address ? (
              <AddressForm
                handleNext={handleNext}
                address={props.account.address}
                getAddress={getAddress}
                
              />
            ) : (
              <AddressForm
                handleNext={handleNext}
                address={address}
                getAddress={getAddress}
              />
            )}
          </>
        );
      case 1:
        return <PaymentForm handleNext={handleNext} handleBack={handleBack} />;
      case 2:
        return (
          <Review
            handleNext={handleNext}
            handleBack={handleBack}
            getAddress={getAddress}
            account={props.account}
            processBuy={props.processBuy}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  }
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="absolute"
        
        color="default"
        elevation={0}
        sx={{
          position: "relative",
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      ></AppBar>
      <Container  component="main" maxWidth="sm" sx={{ mb: 4 }}  class="checkoutContainer">
        <Paper  
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            الطلب
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }} style={{"width":"auto"}}>
            {steps.map((label) => (
              
              <Step  key={label} >
                <StepLabel >{label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment >
              <Typography variant="h5" gutterBottom >
                شكراً على طلبك
              </Typography>
              <Typography variant="subtitle1" >تم الطلب بنجاح</Typography>
            </React.Fragment>
          ) : (
            <React.Fragment >
              {getStepContent(activeStep)}
              {/* <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    السابق
                  </Button>
                )}

                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? "اعتماد الطلب" : "التالي"}
                </Button>
              </Box>  */}
            </React.Fragment>
          )}
        </Paper>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}
