const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let productSchema = new Schema(
  {
    product_name: {
      type: String,
    },
    product_price: {
      type: Number,
    },
    product_company: {
      type: String,
    },
    product_category: {
      type: String,
    },
    product_rating: {
      type: Number,
    },
    product_description: {
      type: String,
    },
    product_img: {
      type: String,
    },
  },
  {
    collection: "Products",
  }
);

module.exports = mongoose.model("Product", productSchema);
