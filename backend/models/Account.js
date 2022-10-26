const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let accountSchema = new Schema(
  {
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    otp: {
      type: String,
    },
    username: {
      type: String,
    },
  },
  {
    collection: "accounts",
  }
);

module.exports = mongoose.model("Account", accountSchema);
