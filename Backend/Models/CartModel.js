const mongoose = require("mongoose");

const schema = mongoose.Schema;

const cartSchema = new schema({
  product: { type: schema.Types.ObjectId, ref: "Product", required: true },
  user: {
    type: schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  quantity: { type: Number, required: true },
});

const virtual = cartSchema.virtual("id");
virtual.get(function () {
  return this._id;
});
cartSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
