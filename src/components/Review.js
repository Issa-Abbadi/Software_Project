import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";

const products = [
  {
    name: "Product 1",
    desc: "A nice thing",
    price: "$9.99",
  },
  {
    name: "Product 2",
    desc: "Another thing",
    price: "$3.45",
  },
  {
    name: "Product 3",
    desc: "Something else",
    price: "$6.51",
  },
  {
    name: "Product 4",
    desc: "Best thing of all",
    price: "$14.11",
  },
  { name: "Shipping", desc: "", price: "Free" },
];

export default function Review(props) {
  useEffect(() => {
    props.getAddress();
  }, []);

  const [address, setAddress] = useState([
    props.account.address.city,
    props.account.address.address,
  ]);

  const payments = [
    { name: "Card type", detail: "Visa" },

    { name: "Card number", detail: "xxxx-xxxx-xxxx-1234" },
    { name: "Expiry date", detail: "04/2024" },
  ];

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        مراجعة الطلب
      </Typography>
      <List disablePadding>
        {products.map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={product.name} secondary={product.desc} />
            <Typography variant="body2">{product.price}</Typography>
          </ListItem>
        ))}

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            $34.06
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            العنوان
          </Typography>
          <Typography gutterBottom>
            {props.account.address.firstName +
              " " +
              props.account.address.lastName}
          </Typography>
          <Typography gutterBottom>{address.join(", ")}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            طريقة الدفع
          </Typography>

          <Typography gutterBottom>
            {localStorage.getItem("MethodOfPayment")}
          </Typography>
        </Grid>
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
          اعتماد الطلب
        </Button>
      </Grid>
    </React.Fragment>
  );
}
