const Order = require("../Models/OrderModal");

exports.createNewOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();

    res.status(200).json(newOrder);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error Creating new Order", error: err.message });
  }
};

exports.fetchOrderById = async (req, res) => {
  const { _id } = req.user; // Assuming the query parameter is named "userId"
  try {
    const order = await Order.find({ user: _id }).populate("user");

    if (!order) {
      res.status(404).json({ message: "order not found" });
    } else {
      res.status(200).json(order);
    }
  } catch (error) {
    res.status(500).json({
      message: "Error fetching order by user Id",
      error: error.message,
    });
  }
};

// exports.updateCartByid = async (req, res) => {
//   try {
//     const updateCart = await Cart.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     })
//       .populate("user")
//       .populate("product");
//     if (!updateCart) {
//       return res.status(404).json({ message: "Product not found" });
//     }
//     res.status(200).json(updateCart); // Respond with the fetched products
//   } catch (err) {
//     res
//       .status(400)
//       .json({ message: "Error Updating Cart Data", error: err.message });
//   }
// };

// exports.deleteItemFromCart = async (req, res) => {
//   try {
//     const removedCart = await Cart.findByIdAndDelete(req.params.id);

//     res.status(200).json(removedCart); // Respond with the fetched products
//   } catch (err) {
//     res
//       .status(400)
//       .json({ message: "Error deleting Cart Data", error: err.message });
//   }
// };
