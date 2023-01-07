let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();

// Student Model
let productSchema = require("../models/Product");

router.get("/", (req, res) => {
  productSchema
    .find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.post("/getVar", (req, res) => {
  productSchema
    .findOne({ _id: req.body._id })
    .then((result) => {
      console.log("res", result.vars[req.body.vars]);

      res.send(result.vars[req.body.vars]);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.post("/company", (req, res) => {
  //console.log("Hello", req.body.product_company);
  productSchema
    .find({ product_company: req.body.product_company })
    .then((result) => {
      // console.log("result is ", result);
      if (result === null) {
        res.send({ code: 500, message: "user not found" });
      } else {
        res.send(result);
      }
    })
    .catch((err) => {
      res.send({ code: 500, message: "user not found" });
    });
});

router.post("/one", (req, res) => {
  // console.log(req.body);
  productSchema
    .findOne({
      _id: req.body.id,
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

router.post("/oneForCart", (req, res) => {
  console.log(req.body._id.map((_id) => _id._id));

  productSchema
    .find({
      _id: req.body._id.map((_id) => _id._id),
    })

    .then((result) => {
      console.log("res", result);
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

router.post("/subC", (req, res) => {
  console.log("req22", req.body);
  productSchema
    .aggregate([
      { $match: { sub_category: req.body.sub_category } }, // filter the results
      { $sample: { size: 5 } }, // You want to get 5 docs
    ])

    .then((result) => {
      console.log("res22", result);
      if (result === null) {
        res.send({ code: 500, message: "user not found" });
      } else res.send(result);
    })
    .catch((err) => {
      res.send({ code: 500, message: "user not found" });
    });
});

router.post("/buyCart", (req, res) => {
  productSchema
    .findOne({
      _id: req.body._id,
    })

    .then((result) => {
      if (result === null) {
        res.send({ code: 500, message: "product not found" });
      } else if (
        result.vars[req.body.vars.var].quantity >= req.body.vars.quantity
      ) {
        console.log(
          "200",
          result.vars[req.body.vars.var].quantity,
          req.body.vars.quantity
        );
        res.send({ code: 200 });
      } else {
        console.log("330");
        res.send({ code: 330 });
      }
    })
    .catch((err) => {
      res.send({ code: 500, message: "user not found" });
    });
});
module.exports = router;
