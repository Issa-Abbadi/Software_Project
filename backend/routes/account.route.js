let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();

// Student Model
let accountSchema = require("../models/Account");

router.post("/", (req, res) => {
  console.log("in ...");
  //console.log(req.body);
  accountSchema
    .findOne({ email: req.body.email })
    .then((result) => {
      //console.log(result, "11");
      // match password with req.body.password

      res.send({
        email: result.email,
        code: 200,
        message: "user Found",
        imageUrl: result.imageUrl,
        token: "hfgdhg",
        name: result.name,
        password: result.password,
      });
    })
    .catch((err) => {
      res.send({ code: 500, message: "user not found" });
    });
});

router.get("/markets", (req, res) => {
  console.log("in market...");
  //console.log(req.body);
  accountSchema
    .find({ market: true })
    .then((result) => {
      console.log("found", result);
      res.send(result);
    })
    .catch((err) => {
      console.log("not found");
      res.send({ code: 500, message: "user not found" });
    });
});

router.post("/one", (req, res) => {
  accountSchema
    .findOne({ email: req.body.email })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.post("/minus", (req, res) => {
  let cart;
  console.log("req", req.body);
  accountSchema
    .findOne({ email: req.body.email })
    .then((result) => {
      console.log("res", result);
      result.cart.map((prod) => {
        if (prod._id == req.body._id) {
          prod.vars[req.body.var].quantity--;

          if (prod.vars[req.body.var].quantity <= 0) {
            prod.vars.splice(req.body.var, 1);
          }
        }
      });

      console.log("cart", result.cart);
      cart = result.cart.filter((prod) => prod.vars[0] != null);

      accountSchema
        .updateOne({ email: result.email }, { cart: cart })
        .then((result) => {
          res.send({ code: 200, message: "Product Updated" });
        })
        .catch((err) => {
          res.send({ code: 500, message: "Server err" });
        });
    })
    .catch();
});

router.post("/setQuantity", (req, res) => {
  let cart;
  console.log("req", req.body);
  accountSchema
    .findOne({ email: req.body.email })
    .then((result) => {
      console.log("res", result);
      result.cart.map((prod) => {
        if (prod._id == req.body._id) {
          prod.vars[req.body.var].quantity = req.body.quantity;
          if (prod.vars[req.body.var].quantity <= 0) {
            prod.vars.splice(req.body.var, 1);
          }
        }
      });

      cart = result.cart.filter((prod) => prod.vars[0] != null);

      accountSchema
        .updateOne({ email: result.email }, { cart: cart })
        .then((result) => {
          res.send({ code: 200, message: "Product Updated" });
        })
        .catch((err) => {
          res.send({ code: 500, message: "Server err" });
        });
    })
    .catch();
});

router.post("/plus", (req, res) => {
  let cart;
  console.log("req", req.body);
  accountSchema
    .findOne({ email: req.body.email })
    .then((result) => {
      console.log("res", result);
      result.cart.map((prod) => {
        if (prod._id == req.body._id) {
          prod.vars[req.body.var].quantity++;
        }
      });
      cart = result.cart;

      accountSchema
        .updateOne({ email: result.email }, { cart: cart })
        .then((result) => {
          res.send({ code: 200, message: "Product Updated" });
        })
        .catch((err) => {
          res.send({ code: 500, message: "Server err" });
        });
    })
    .catch();
});

router.post("/deleteC", (req, res) => {
  let cart;
  console.log("req", req.body);
  accountSchema
    .findOne({ email: req.body.email })
    .then((result) => {
      console.log("res", result);
      result.cart.map((prod) => {
        if (prod._id == req.body._id) {
          prod.vars.splice(req.body.var, 1);
        }
      });
      cart = result.cart.filter((prod) => prod.vars[0] != null);

      accountSchema
        .updateOne({ email: result.email }, { cart: cart })
        .then((result) => {
          res.send({ code: 200, message: "Product Updated" });
        })
        .catch((err) => {
          res.send({ code: 500, message: "Server err" });
        });
    })
    .catch();
});

router.post("/deleteW", (req, res) => {
  let wishList;
  console.log("req", req.body);
  accountSchema
    .findOne({ email: req.body.email })
    .then((result) => {
      console.log("resu", result);

      wishList = result.wishList.filter((prod) => prod._id != req.body._id);
      accountSchema
        .updateOne({ email: result.email }, { wishList: wishList })
        .then((result) => {
          res.send({
            code: 200,
            message: "Product Updated",
            wishList: wishList,
          });
        })
        .catch((err) => {
          res.send({ code: 500, message: "Server err" });
        });
    })
    .catch();
});

router.post("/deleteAll", (req, res) => {
  let cart;
  console.log("req", req.body);
  accountSchema
    .findOne({ email: req.body.email })
    .then((result) => {
      result.cart = [];
      cart = result.cart;

      accountSchema
        .updateOne({ email: result.email }, { cart: cart })
        .then((result) => {
          res.send({ code: 200, message: "Product Updated" });
        })
        .catch((err) => {
          res.send({ code: 500, message: "Server err" });
        });
    })
    .catch();
});
router.post("/deleteAllW", (req, res) => {
  let wishList;
  console.log("req", req.body);
  accountSchema
    .findOne({ email: req.body.email })
    .then((result) => {
      wishList = [];

      accountSchema
        .updateOne({ email: result.email }, { wishList: wishList })
        .then((result) => {
          res.send({ code: 200, message: "Product Updated" });
        })
        .catch((err) => {
          res.send({ code: 500, message: "Server err" });
        });
    })
    .catch();
});
router.post("/addtoCart", (req, res) => {
  let cart;
  accountSchema
    .findOne({ email: req.body.email })
    .then((result) => {
      let i = 0;
      let index = -1;
      result.cart.map((prod) => {
        if (prod._id === req.body._id) {
          index = i;
        }
        i++;
      });
      if (index == -1) {
        result.cart[i] = {
          _id: req.body._id,
          vars: [
            {
              var: req.body.var,
              quantity: req.body.quantity,
              price: req.body.price,
              product_company: req.body.product_company,
              product_name: req.body.product_name,
            },
          ],
        };
        cart = result.cart;
      } else {
        let found = -1;
        let k = 0;
        result.cart[index].vars.map((var1) => {
          if (var1.var == req.body.var) {
            found = k;
          }
          k++;
        });
        console.log("found", found);
        if (found === -1) {
          console.log("new");
          result.cart[index].vars = [
            ...result.cart[index].vars,
            {
              var: req.body.var,
              quantity: req.body.quantity,
              price: req.body.price,
              product_company: req.body.product_company,
              product_name: req.body.product_name,
            },
          ];
          cart = result.cart;
        } else {
          console.log("duplicate");
          result.cart[index].vars[found] = {
            var: result.cart[index].vars[found].var,
            quantity:
              req.body.quantity + result.cart[index].vars[found].quantity,
            price: result.cart[index].vars[found].price,
            product_company: result.cart[index].vars[found].product_company,
            product_name: result.cart[index].vars[found].product_name,
          };
          cart = result.cart;
        }
      }

      accountSchema
        .updateOne({ email: result.email }, { cart: cart })
        .then((result) => {
          res.send({ code: 200, message: "Product Added" });
        })
        .catch((err) => {
          res.send({ code: 500, message: "Server err" });
        });

      console.log("cart", req.body);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.post("/addtoWish", (req, res) => {
  let wishList;
  console.log("Add to wish");
  accountSchema
    .findOne({ email: req.body.email })
    .then((result) => {
      console.log("res", result);
      wishList = [...result.wishList, { _id: req.body._id }];
      console.log("wish", wishList);
      accountSchema
        .updateOne({ email: req.body.email }, { wishList: wishList })

        .then((result) => {
          console.log("here", result);
          res.send({ code: 200, message: "Product Added", wishList: wishList });
        })
        .catch((err) => {
          res.send({ code: 500, message: "Server err" });
        });
    })
    .catch((err) => {
      res.send({ code: 500, message: "Server err" });
    });
});

router.post("/removeFromWish", (req, res) => {
  let wishList;
  console.log("remove From wish");
  accountSchema
    .findOne({ email: req.body.email })
    .then((result) => {
      console.log("res", result);
      wishList = result.wishList.filter((prod) => prod._id != req.body._id);
      accountSchema
        .updateOne({ email: req.body.email }, { wishList: wishList })

        .then((result) => {
          console.log("here", result);
          res.send({ code: 200, message: "Product Added", wishList: wishList });
        })
        .catch((err) => {
          res.send({ code: 500, message: "Server err" });
        });
    })
    .catch((err) => {
      res.send({ code: 500, message: "Server err" });
    });
});

router.post("/getRating", (req, res) => {
  accountSchema
    .findOne({ email: req.body.email }, { market_rating: 1 })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send({ code: 500, message: "Server err" });
    });
});

router.post("/markets", (req, res) => {
  console.log("in market2...");
  console.log(req.body);
  accountSchema
    .find({ email: req.body.uid.map((email) => email.uid) })
    .then((result) => {
      console.log("found", result);
      res.send(result);
    })
    .catch((err) => {
      console.log("not found");
      res.send({ code: 500, message: "user not found" });
    });
});

router.post("/addAddress", (req, res) => {
  console.log("address", req.body);
  accountSchema
    .updateOne(
      { email: req.body.email },
      {
        address: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          city: req.body.city,
          address: req.body.address,
        },
      }
    )
    .then((result) => {
      if (result.address === null) {
      }
      console.log("found", result);
      res.send({ code: 200, message: "Address Added" });
    })
    .catch((err) => {
      console.log("not found");
      res.send({ code: 500, message: "user not found" });
    });
});

router.post("/addReview", (req, res) => {
  console.log("in review", req.body);
  accountSchema
    .findOne({
      name: req.body.name,
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

      result.market_rating =
        result.market_rating +
        (req.body.rating - result.market_rating) / result.reviews.length;

      console.log("DOne ", result);
      accountSchema
        .updateOne(
          {
            name: req.body.name,
          },
          {
            $set: {
              reviews: result.reviews,
              market_rating: result.market_rating,
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

module.exports = router;
