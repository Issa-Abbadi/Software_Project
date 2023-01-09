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

router.post("/Week", (req, res) => {
  console.log("in Week...");
  console.log(req.body);
  console.log("/^" + req.body.dates[0] + "/");

  ratingsSchema
    .find({
      email: req.body.email,
      created_on: { $gt: new Date(new Date() - 7).toISOString() },
    })
    .then((result) => {
      console.log("result", result);
      let loopNum = 0;
      let sum = 0;
      result.map((ress) => {
        loopNum++;
        sum = sum + ress.market_rating;
      });
      console.log("HERE: ", sum / loopNum);
      res.send({ res: sum / loopNum });
    })
    .catch((err) => {
      console.log("not found");
      res.send({ res: 0 });
      res.send({ code: 500, message: "user not found" });
    });
});

module.exports = router;
