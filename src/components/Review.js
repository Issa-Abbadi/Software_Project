import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";

export default function Review(props) {
  useEffect(() => {
    props.getAddress();
    productsSummary();
  }, []);

  async function productsSummary() {
    let arrayProd = [];
    let ssum = 0;
    for (const prod of props.account.cart) {
      for (const var1 of prod.vars) {
        if (var1 !== null) {
          arrayProd = [
            ...arrayProd,
            {
              name: var1.product_name,
              quantity: var1.quantity,
              price: var1.price,
            },
          ];
          ssum = ssum + var1.price * var1.quantity;
        }
      }
    }
    arrayProd = [...arrayProd, { name: "التوصيل", quantity: 1, price: 20 }];
    ssum = ssum + 20;
    setProducts(arrayProd);
    setSum(ssum);
  }

  const [address, setAddress] = useState([
    props.account.address.city,
    props.account.address.address,
  ]);

  const [products, setProducts] = useState([]);
  const [sum, setSum] = useState(0);

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
            {product.quantity > 1 && (
              <ListItemText
                primary={product.name}
                secondary={"الكمية:" + product.quantity}
              />
            )}
            {product.quantity <= 1 && <ListItemText primary={product.name} />}
            <Typography variant="body2">{product.price + "$"}</Typography>
          </ListItem>
        ))}

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="المجموع:" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            ${sum}
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
          onClick={props.processBuy}
        >
          اعتماد الطلب
        </Button>
      </Grid>
    </React.Fragment>
  );
}
