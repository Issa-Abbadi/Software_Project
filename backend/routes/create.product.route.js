let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();

// Student Model
let productSchema = require("../models/Product");

router.post("/", (req, res) => {
  console.log("in ...");
  //console.log(req.body);

  const newProduct = new productSchema({
    product_name: req.body.product_name,
    product_category: req.body.product_category,
    product_company: req.body.product_company,
    product_rating: 0,
    product_description: req.body.product_description,
    sub_category: req.body.sub_category,
    returnable: req.body.returnable,
    created_on: new Date().toISOString(),
    vars: [
      {
        _id: 0,
        quantity: req.body.product_quantity,
        original_price: req.body.product_price,
        price: (
          req.body.product_price -
          req.body.product_price * (req.body.product_discount / 100)
        ).toFixed(2),
        discount: req.body.product_discount,
        size: req.body.product_size,
        color: req.body.product_color,
        product_img: req.body.product_img,
      },
      null,
      null,
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
  //console.log(req.body);

  productSchema
    .findOne({ _id: req.body._id })
    .then((result) => {
      //console.log(req.body);

      productSchema
        .updateOne(
          { _id: result._id },
          {
            product_name: req.body.product_name,

            product_category: req.body.product_category,
            product_description: req.body.product_description,
            sub_category: req.body.sub_category,

            returnable: req.body.returnable,
          }
        )
        .then((result) => {
          // console.log("ININ");
          res.send({ code: 200, message: "product updated" });
        })
        .catch((err) => {
          //console.log("ININOut");
          res.send({ code: 500, message: "Server err" });
        });
    })
    .catch((err) => {
      res.send({ code: 500, message: "otp is wrong" });
    });
});

router.put("/Var", (req, res) => {
  console.log("in ...");
  //console.log(req.body);

  productSchema
    .findOne({ _id: req.body._id })
    .then((result) => {
      //console.log(req.body);
      let var1;
      let var2;
      //console.log("vars", result.vars);
      if (result.vars[0]) {
        var1 = result.vars[0];
        var1._id = 1;
      }
      if (result.vars[1]) {
        var2 = result.vars[1];
        var2._id = 2;
      }

      productSchema
        .updateOne(
          { _id: result._id },
          {
            vars: [
              {
                _id: 0,
                quantity: req.body.product_quantity,
                original_price: req.body.product_price,
                price: (
                  req.body.product_price -
                  req.body.product_price * (req.body.product_discount / 100)
                ).toFixed(2),
                discount: req.body.product_discount,
                size: req.body.product_size,
                color: req.body.product_color,
                product_img: req.body.product_img,
              },
              var1,

              var2,
            ],
          }
        )
        .then((result) => {
          // console.log("ININNNNNNNNNNNNNNNNNNNNNNN");
          res.send({ code: 200, message: "product updated" });
        })
        .catch((err) => {
          // console.log("ININOut");
          res.send({ code: 500, message: "Server err" });
        });
    })
    .catch((err) => {
      res.send({ code: 500, message: "otp is wrong" });
    });
});

router.put("/VarE", (req, res) => {
  console.log("in ...");
  //console.log(req.body);

  productSchema
    .findOne({ _id: req.body._id })
    .then((result) => {
      //console.log(req.body);

      // console.log("vars", result.vars);
      if (req.body.value === "0") {
        result.vars[0] = {
          _id: 0,
          quantity: req.body.product_quantity,
          original_price: req.body.product_price,
          price: (
            req.body.product_price -
            req.body.product_price * (req.body.product_discount / 100)
          ).toFixed(2),
          discount: req.body.product_discount,
          size: req.body.product_size,
          color: req.body.product_color,
          product_img: req.body.product_img,
        };
      } else if (req.body.value === "1") {
        result.vars[1] = {
          _id: 1,
          quantity: req.body.product_quantity,
          original_price: req.body.product_price,
          price: (
            req.body.product_price -
            req.body.product_price * (req.body.product_discount / 100)
          ).toFixed(2),
          discount: req.body.product_discount,
          size: req.body.product_size,
          color: req.body.product_color,
          product_img: req.body.product_img,
        };
      } else if (req.body.value === "2") {
        result.vars[2] = {
          _id: 2,
          quantity: req.body.product_quantity,
          original_price: req.body.product_price,
          price: (
            req.body.product_price -
            req.body.product_price * (req.body.product_discount / 100)
          ).toFixed(2),

          discount: req.body.product_discount,
          size: req.body.product_size,
          color: req.body.product_color,
          product_img: req.body.product_img,
        };
      }
      //console.log( "vars", result.vars);

      productSchema
        .updateOne(
          { _id: result._id },
          {
            vars: result.vars,
          }
        )
        .then((result) => {
          // console.log("ININNNNNNNNNNNNNNNNNNNNNNN");
          res.send({ code: 200, message: "product updated" });
        })
        .catch((err) => {
          // console.log("ININOut");
          res.send({ code: 500, message: "Server err" });
        });
    })
    .catch((err) => {
      res.send({ code: 500, message: "otp is wrong" });
    });
});

module.exports = router;
