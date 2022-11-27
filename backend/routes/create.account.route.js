let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();

// Student Model
let accountSchema = require("../models/Account");

router.post("/", (req, res) => {
  console.log("in ...");
  // console.log(req.body);
  const newAccount = new accountSchema({
    email: req.body.email,
    password: req.body.password,
    username: req.body.username,
  });

  newAccount
    .save()
    .then(() => {
      res.send({ code: 200, message: "Signup success" });
    })
    .catch((err) => {
      res.send({ code: 500, message: "Signup Error" });
    });
});

module.exports = router;
