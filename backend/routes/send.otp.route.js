let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();
const nodemailer = require("nodemailer");

// Student Model
let accountSchema = require("../models/Account");

router.post("/", async (req, res) => {
  const _otp = Math.floor(100000 + Math.random() * 900000);

  let account = accountSchema.findOne({ email: req.body.email });

  if (!account) {
    res.send({ code: 500, message: "user not found" });
  }

  let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    service: "outlook",
    auth: {
      user: "node-123456789-node@outlook.com",
      pass: "123456789!@#",
    },
  });

  let info = await transporter.sendMail({
    from: "node-123456789-node@outlook.com",
    to: req.body.email, // list of receivers
    subject: "OTP", // Subject line
    text: String(_otp),
  });

  if (info.messageId) {
    console.log(info, 84);
    accountSchema
      .updateOne({ email: req.body.email }, { otp: _otp })
      .then((result) => {
        res.send({ code: 200, message: "otp send" });
      })
      .catch((err) => {
        res.send({ code: 500, message: "Server err" });
      });
  } else {
    res.send({ code: 500, message: "Server err" });
  }

  (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  };
});

module.exports = router;
