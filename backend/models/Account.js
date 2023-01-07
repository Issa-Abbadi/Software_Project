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
    name: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    cart: {
      type: Array,
    },
    market: {
      type: Boolean,
    },
    market_rating: {
      type: Number,
    },
    wishList: {
      type: Array,
    },
    address: {
      type: Object,
    },
  },
  {
    collection: "accounts",
  }
);

module.exports = mongoose.model("Account", accountSchema);
