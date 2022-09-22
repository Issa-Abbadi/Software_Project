const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let accountSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    rollno: {
      type: Number,
    },
  },
  {
    collection: "accounts",
  }
);

module.exports = mongoose.model("Account", accountSchema);
