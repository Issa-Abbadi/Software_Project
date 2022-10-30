let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();

// Student Model
let productSchema = require("../models/Product");

router.get("/", (req, res) => {
  productSchema.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

router.post("/one", (req, res) => {
  console.log(req.body);
  productSchema
    .findOne({
      product_name: req.body.product_name,
      product_company: req.body.product_company,
    })
    .then((result) => {
      if (result === null) {
        res.send({ code: 500, message: "user not found" });
      } else res.send({ result: result, code: 200 });
    })
    .catch((err) => {
      res.send({ code: 500, message: "user not found" });
    });
});

router.get("/kitchen", (req, res) => {
  productSchema
    .find({ product_category: "المطبخ" })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.get("/table", (req, res) => {
  productSchema
    .find({ product_category: "السفرة" })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.get("/home", (req, res) => {
  productSchema
    .find({ product_category: "المنزل" })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = router;
