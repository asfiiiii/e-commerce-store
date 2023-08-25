const mongoose = require("mongoose");

const schema = mongoose.Schema;

const orderSchema = new schema({
  items: [{ type: mongoose.Schema.Types.Mixed }],
  user: { type: schema.Types.ObjectId, required: true },
  selectedAddress: { type: mongoose.Schema.Types.Mixed },

  paymentMethod: { type: String, required: true },
  status: { type: String, default: "pending" },
  totalAmount: Number,
  totalQuantity: Number,
  orderDateTime: {
    type: Date,
    default: Date.now, // You can set a default value if needed
  },
});

const virtual = orderSchema.virtual("id");
virtual.get(function () {
  return this._id;
});
orderSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
