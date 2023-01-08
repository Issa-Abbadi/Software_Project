const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let paymentsSchema = new Schema(
  {
    client_email: {
      type: String,
    },
    market_name: {
      type: String,
    },
    product_name: {
      type: String,
    },
    quantity: {
      type: Number,
    },
    price: {
      type: Number,
    },
    created_on: {
      type: String,
    },
  },
  {
    collection: "Payments",
  }
);

module.exports = mongoose.model("Payments", paymentsSchema);
