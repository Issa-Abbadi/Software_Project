const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let ratingsSchema = new Schema(
  {
    email: {
      type: String,
    },
    market_rating: {
      type: Number,
    },
    created_on: {
      type: String,
    },
  },
  {
    collection: "Ratings",
  }
);

module.exports = mongoose.model("Ratings", ratingsSchema);
