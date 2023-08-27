const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0, // Minimum price value
  },
  discountPercentage: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    default: 0, // Default rating value
  },
  stock: {
    type: Number,
    required: true,
    min: 0, // Minimum stock value
  },
  brand: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
  isDeleted: {
    type: Boolean,
    enum: [true, false],
    default: false, // Default value can be true or false depending on your use case
  },
});

const virtual = productSchema.virtual("id");
virtual.get(function () {
  return this._id;
});
productSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
