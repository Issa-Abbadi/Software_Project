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

module.exports = router;
