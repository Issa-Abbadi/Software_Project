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

module.exports = router;
