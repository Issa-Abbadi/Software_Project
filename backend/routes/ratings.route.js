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
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const isoWeekAgo = oneWeekAgo.toISOString();

  ratingsSchema
    .find({
      $and: [
        { created_on: { $gte: isoWeekAgo, $lte: new Date().toISOString() } },
        { email: req.body.email },
      ],
    })
    .then((result) => {
      console.log(isoWeekAgo, "result");
      let loopNum = 0;
      let sum = 0;
      result.map((ress) => {
        loopNum++;
        sum = sum + ress.market_rating;
      });
      console.log("HERE: ", sum, loopNum);
      if (loopNum === 0) {
        res.send({ res: 0 });
      } else {
        res.send({ res: sum / loopNum });
      }
    })
    .catch((err) => {
      console.log("not found");
      res.send({ res: 0 });
      res.send({ code: 500, message: "user not found" });
    });
});

module.exports = router;
