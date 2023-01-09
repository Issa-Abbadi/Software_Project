import * as React from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useEffect, useState } from "react";
import axios from "axios";
import './admin.css';
export default function AddressForm(props) {
  let validationSchema = yup.object({});

  validationSchema = yup.object({
    firstName: yup.string().required("مطلوب"),
    lastName: yup.string().required("مطلوب"),
    city: yup.string().required("مطلوب"),
    address: yup.string().required("مطلوب"),
  });

  const [address, setAddress] = useState(props.address);

  const formik = useFormik({
    initialValues: {
      firstName: address.firstName,
      lastName: address.lastName,
      city: address.city,
      address: address.address,
    },
    validationSchema: validationSchema,
    onSubmit: (studentObject) => {
      console.log("address", studentObject);
      axios
        .post("http://localhost:4000/login/addAddress", {
          email: localStorage.getItem("EMAIL"),
          firstName: studentObject.firstName,
          lastName: studentObject.lastName,
          city: studentObject.city,
          address: studentObject.address,
        })
        .then(({ data }) => {
          if (data.code === 200) {
            props.getAddress();

            props.handleNext();
          }
        })

        .catch((error) => {
          console.log(error);
        });
    },
  });

  useEffect(() => {}, []);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        العنوان
      </Typography>
      <form onSubmit={formik.handleSubmit} style={{ textAlign: "center" }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              id="firstName"
              name="firstName"
              label="الاسم الأول"
              fullWidth
              autoComplete="given-name"
              variant="standard"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="lastName"
              name="lastName"
              label=" الاسم الأخير"
              fullWidth
              autoComplete="family-name"
              variant="standard"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="city"
              name="city"
              label="المدينة"
              fullWidth
              autoComplete="shipping address-level2"
              variant="standard"
              value={formik.values.city}
              onChange={formik.handleChange}
              error={formik.touched.city && Boolean(formik.errors.city)}
              helperText={formik.touched.city && formik.errors.city}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="address"
              name="address"
              label="العنون"
              fullWidth
              autoComplete="shipping address-line1"
              variant="standard"
              value={formik.values.address}
              onChange={formik.handleChange}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
            />
          </Grid>
          {/* <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
          />
        </Grid> */}

          {/* <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
            variant="standard"
          />
        </Grid> */}
          {/* <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
            variant="standard"
          />
        </Grid> */}
          {/* <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox color="secondary" name="saveAddress" value="yes" />
            }
            label="Use this address for payment details"
          />
        </Grid> */}
          <Button
            // color="primary"
            variant="contained"
            type="submit"
            sx={{ mt: 3, ml: 1 }}
            // sty
            class="nextButton"
          >
            التالي
          </Button>
          {/* <Button
            color="secondary"
            variant="contained"
            onClick={() => {
              props.handleBack();
            }}
          >
            السابق
          </Button> */}
        </Grid>
      </form>
    </React.Fragment>
  );
}
