let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();

// Student Model
let accountSchema = require("../models/Account");

router.put("/", (req, res) => {
  console.log("in ...");
  //console.log(req.body);
  // console.log(req.body.OTP);
  accountSchema
    .findOne({ otp: req.body.OTP })
    .then((result) => {
      //  update the password

      accountSchema
        .updateOne({ email: result.email }, { password: req.body.Password })
        .then((result) => {
          res.send({ code: 200, message: "Password updated" });
        })
        .catch((err) => {
          res.send({ code: 500, message: "Server err" });
        });
    })
    .catch((err) => {
      res.send({ code: 500, message: "otp is wrong" });
    });
});

module.exports = router;
