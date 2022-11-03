const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let productSchema = new Schema(
  {
    product_name: {
      type: String,
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

    returnable: {
      type: Boolean,
    },
    sub_categoty: {
      type: String,
    },

    vars: {
      type: Array,
    },
  },
  {
    collection: "Products",
  }
);

module.exports = mongoose.model("Product", productSchema);
