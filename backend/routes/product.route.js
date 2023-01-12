let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();

// Student Model
let productSchema = require("../models/Product");
let paymentsSchema = require("../models/Payments");
let accountSchema = require("../models/Account");

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

router.post("/buyCheckout", (req, res) => {
  productSchema
    .findOne({
      _id: req.body._id,
    })
    .then((result) => {
      if (result === null) {
        res.send({ code: 500, message: "product not found" });
      } else {
        result.vars[req.body.vars.var].quantity -= req.body.vars.quantity;
        productSchema
          .updateOne({ _id: req.body._id }, { vars: result.vars })
          .then(() => {
            const newPayment = new paymentsSchema({
              product_name: req.body.vars.product_name,
              client_email: req.body.account,
              market_name: req.body.vars.product_company,
              quantity: req.body.vars.quantity,
              price: req.body.vars.price,
              created_on: new Date().toISOString(),
            });
            newPayment
              .save()
              .then(() => {
                accountSchema
                  .updateOne({ email: req.body.account }, { cart: [] })
                  .then(() => {
                    res.send({ code: 200, message: "Added Successfully" });
                  })
                  .catch((err) => {
                    res.send({ code: 500, message: "Something wrong" });
                  });
              })
              .catch((err) => {
                res.send({ code: 500, message: "Something wrong" });
              });
          })
          .catch((err) => {
            res.send({ code: 500, message: "Something wrong" });
          });
      }
    })
    .catch((err) => {
      res.send({ code: 500, message: "user not found" });
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

router.get("/lastProducts", (req, res) => {
  productSchema
    .find({}, null, { sort: { created_on: -1 }, limit: 5 })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.get("/BestProducts", (req, res) => {
  productSchema
    .find({}, null, { sort: { product_rating: -1 }, limit: 5 })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.post("/addReview", (req, res) => {
  console.log("in review", req.body);
  productSchema
    .findOne({
      $and: [
        {
          product_name: req.body.product_name,
        },
        {
          product_company: req.body.product_company,
        },
      ],
    })
    .then((result) => {
      // console.log("DOne", result);
      let found = false;
      let prev = 0;
      result.reviews.map((review) => {
        if (review.email === req.body.email) {
          prev = -review.rating;
          review.review = req.body.review;
          review.rating = req.body.rating;
          found = true;
        }
      });
      if (found === false) {
        result.reviews = [
          ...result.reviews,
          {
            review: req.body.review,
            rating: req.body.rating,
            email: req.body.email,
            name: req.body.name,
          },
        ];
      }
      // console.log("DOne", result);
      result.product_rating =
        result.product_rating +
        (req.body.rating - result.product_rating) / result.reviews.length;
      console.log("DOne ", result);
      productSchema
        .updateOne(
          {
            $and: [
              {
                product_name: req.body.product_name,
              },
              {
                product_company: req.body.product_company,
              },
            ],
          },
          {
            $set: {
              reviews: result.reviews,
              product_rating: result.product_rating,
            },
          }
        )
        .then((result) => {
          res.send({ code: 200, message: "reviews updated" });
        })
        .catch((err) => {
          res.send({ code: 500, message: "Server err" });
        });
    })
    .catch((err) => {
      res.send(err);
    });
});

router.post("/getReviews", (req, res) => {
  console.log("in review", req.body);
  productSchema
    .findOne({
      $and: [
        {
          product_name: req.body.product_name,
        },
        {
          product_company: req.body.product_company,
        },
      ],
    })
    .then((result) => {
      if (result.reviews !== null) {
        res.send({ result: result.reviews });
        console.log("result", result.reviews);
      }
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = router;

//getReviews
