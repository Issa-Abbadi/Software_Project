let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();

// Student Model
let accountSchema = require("../models/Account");

router.post("/create-account", (req, res, next) => {
  accountSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log(data);
      res.json(data);
    }
  });
});

module.exports = router;
