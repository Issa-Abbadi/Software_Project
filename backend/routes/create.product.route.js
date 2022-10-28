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

module.exports = router;
