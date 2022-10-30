import React, { useState, useEffect } from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import Title from "./Title";

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:4000/Products/")
      .then(({ data }) => {
        setProducts(data);
        console.log("h", data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <React.Fragment>
      <Title>منتجاتك</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>الاسم</TableCell>
            <TableCell>الفئة</TableCell>
            <TableCell>الصنف</TableCell>
            <TableCell>التقييم</TableCell>
            <TableCell>الوصف</TableCell>

            <TableCell align="right">السعر</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product._id}>
              <TableCell>{product.product_name}</TableCell>
              <TableCell>{product.product_category}</TableCell>
              <TableCell>{product.sub_category}</TableCell>
              <TableCell>{product.product_rating}</TableCell>
              <TableCell>{product.product_description}</TableCell>

              <TableCell align="right">{`$${product.product_price}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
    </React.Fragment>
  );
}
