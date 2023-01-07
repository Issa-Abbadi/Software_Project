import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import { Select, MenuItem } from "@mui/material";
import { useState } from "react";

export default function PaymentForm(props) {
  const handleChange = (event) => {
    setMethod(event.target.value);
    localStorage.setItem("MethodOfPayment", event.target.value);
  };

  const [method, setMethod] = useState("الدفع عند الاستلام");

  React.useEffect(() => {
    localStorage.setItem("MethodOfPayment", "الدفع عند الاستلام");
  }, []);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        طريقة الدفع
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={method}
            onChange={handleChange}
            autoWidth
            label="الفترة"
          >
            <MenuItem value={"الدفع عند الاستلام"}>الدفع عند الاستلام</MenuItem>
            <MenuItem value={"الدفع في أحد مراكز المتجر"}>
              الدفع في أحد مراكز المتجر
            </MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} md={6}></Grid>
        {/* <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            label="Card number"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="expDate"
            label="Expiry date"
            fullWidth
            autoComplete="cc-exp"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            label="CVV"
            helperText="Last three digits on signature strip"
            fullWidth
            autoComplete="cc-csc"
            variant="standard"
          />
        </Grid> */}
        {/* <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            label="Remember credit card details for next time"
          />
        </Grid> */}
        <Button
          color="primary"
          variant="outline"
          type="submit"
          sx={{ mt: 3, ml: 1 }}
          onClick={props.handleBack}
        >
          السابق
        </Button>
        <Button
          color="primary"
          variant="contained"
          type="submit"
          sx={{ mt: 3, ml: 1 }}
          onClick={props.handleNext}
        >
          التالي
        </Button>
      </Grid>
    </React.Fragment>
  );
}
