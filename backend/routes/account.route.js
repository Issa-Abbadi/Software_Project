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
      if (result.password !== req.body.password) {
        res.send({ code: 404, message: "password wrong" });
      } else {
        res.send({
          email: result.email,
          code: 200,
          message: "user Found",
          token: "hfgdhg",
          name: result.name,
        });
      }
    })
    .catch((err) => {
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
          vars: [{ var: req.body.var, quantity: req.body.quantity }],
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
            { var: req.body.var, quantity: req.body.quantity },
          ];
          cart = result.cart;
        } else {
          console.log("duplicate");
          result.cart[index].vars[found] = {
            var: result.cart[index].vars[found].var,
            quantity:
              req.body.quantity + result.cart[index].vars[found].quantity,
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

module.exports = router;
