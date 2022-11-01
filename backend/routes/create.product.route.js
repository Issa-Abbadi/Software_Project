let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();

// Student Model
let productSchema = require("../models/Product");

router.post("/", (req, res) => {
  console.log("in ...");
  console.log(req.body);

  const newProduct = new productSchema({
    product_name: req.body.product_name,
    product_price: req.body.product_price,
    product_category: req.body.product_category,
    product_company: req.body.product_company,
    product_rating: 0,
    product_description: req.body.product_description,
    sub_category: req.body.sub_category,
    product_img: req.body.product_img,
    product_size: req.body.product_size,
    product_color: req.body.product_color,
    product_quantity: req.body.product_quantity,
    returnable: req.body.returnable,
    vars: [
      {
        quantity: req.body.quantity,
        price: req.body.product_price,
        size: req.body.product_size,
        color: req.body.product_color,
        product_img: req.body.product_img,
      },
    ],
  });

  newProduct
    .save()
    .then(() => {
      res.send({ code: 200, message: "Added Successfully" });
    })
    .catch((err) => {
      res.send({ code: 500, message: "Something wrong" });
    });
});

router.put("/", (req, res) => {
  console.log("in ...");
  console.log(req.body);

  productSchema
    .findOne({ _id: req.body._id })
    .then((result) => {
      console.log(req.body);

      productSchema
        .updateOne(
          { _id: result._id },
          {
            product_name: req.body.product_name,
            product_price: req.body.product_price,
            product_category: req.body.product_category,
            product_description: req.body.product_description,
            sub_category: req.body.sub_category,
            product_img: req.body.product_img,
            product_size: req.body.product_size,
            product_color: req.body.product_color,
            product_quantity: req.body.product_quantity,
            returnable: req.body.returnable,
          }
        )
        .then((result) => {
          console.log("ININ");
          res.send({ code: 200, message: "product updated" });
        })
        .catch((err) => {
          console.log("ININOut");
          res.send({ code: 500, message: "Server err" });
        });
    })
    .catch((err) => {
      res.send({ code: 500, message: "otp is wrong" });
    });
});

module.exports = router;
