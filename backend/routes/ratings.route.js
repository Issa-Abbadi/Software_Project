let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();

// Student Model
let ratingsSchema = require("../models/Ratings");

router.get("/", (req, res) => {
  console.log("in ...");
  //console.log(req.body);
  ratingsSchema
    .find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log("not found");
      res.send({ code: 500, message: "user not found" });
    });
});

router.post("/", (req, res) => {
  console.log("in ...");
  //console.log(req.body);
  ratingsSchema
    .find({ email: req.body.email })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log("not found");
      res.send({ code: 500, message: "user not found" });
    });
});

module.exports = router;
