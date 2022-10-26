const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let productSchema = new Schema(
  {
    _id: {
      type: Object,
    },
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
    sub_categoty: {
      type: String,
    },
    product_img: {
      type: String,
    },
    colors: {
      type: Array,
    },
    sizes: {
      type: Array,
    },
    contain_colors: {
      type: Array,
    },
  },
  {
    collection: "Products",
  }
);

module.exports = mongoose.model("Product", productSchema);
