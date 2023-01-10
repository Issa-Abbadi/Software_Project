let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();

// Student Model
let paymentsSchema = require("../models/Payments");

// router.get("/", (req, res) => {
//   console.log("in ...");
//   //console.log(req.body);
//   ratingsSchema
//     .find()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log("not found");
//       res.send({ code: 500, message: "user not found" });
//     });
// });

// router.post("/", (req, res) => {
//   console.log("in ...");
//   //console.log(req.body);
//   ratingsSchema
//     .find({ email: req.body.email })
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log("not found");
//       res.send({ code: 500, message: "user not found" });
//     });
// });

router.post("/Week", (req, res) => {
  console.log("in Week...");
  console.log(req.body);
  console.log("/^" + req.body.dates[0] + "/");

  const dateStart = new Date(req.body.dates[0]);
  dateStart.setUTCHours(0, 0, 0, 0);
  const dateEnd = new Date(dateStart.getTime() + 24 * 60 * 60 * 1000);
  console.log("start", dateStart.toISOString(), dateEnd.toISOString());
  paymentsSchema
    .find({
      $and: [
        {
          market_name: req.body.name,
        },
        {
          created_on: {
            $gte: dateStart.toISOString(),
            $lt: dateEnd.toISOString(),
          },
        },
      ],
    })
    .then((result) => {
      console.log("result", result);

      let sum = 0;
      result.map((ress) => {
        sum = sum + ress.price * ress.quantity;
      });
      console.log("HERE: ", sum);
      res.send({ res: sum });
    })
    .catch((err) => {
      console.log("not found");
      res.send({ res: 0 });
      res.send({ code: 500, message: "user not found" });
    });
});

module.exports = router;
