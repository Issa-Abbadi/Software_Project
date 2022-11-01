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
    sub_category: {
      type: String,
    },
    product_rating: {
      type: Number,
    },
    product_description: {
      type: String,
    },
    product_size: {
      type: String,
    },
    returnable: {
      type: String,
    },
    sub_categoty: {
      type: String,
    },
    product_img: {
      type: String,
    },
    vars: {
      type: Array,
    },
    product_color: {
      type: String,
    },
    product_quantity: {
      type: Number,
    },
  },
  {
    collection: "Products",
  }
);

module.exports = mongoose.model("Product", productSchema);
