const Cart = require("../Models/CartModel");

exports.createNewCart = async (req, res) => {
  try {
    const existingCartItem = await Cart.findOne({ product: req.body.product });

    if (existingCartItem) {
      existingCartItem.quantity++; // Increment the quantity

      await existingCartItem.save(); // Save the updated cart item

      res.status(200).json(existingCartItem); // Respond with the updated cart item
    } else {
      const newCart = new Cart(req.body);
      await newCart.save();

      res.status(200).json(newCart); // Respond with the newly created cart item
    }
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error creating new Cart Item", error: err.message });
  }
};

exports.fetchCartById = async (req, res) => {
  // const { user } = req.query; // Assuming the query parameter is named "userId"
  try {
    const cart = await Cart.find({ user: req.user._id })
      .populate("user")
      .populate("product");

    if (!cart) {
      res.status(404).json({ message: "Cart not found" });
    } else {
      res.status(200).json(cart);
    }
  } catch (error) {
    res.status(500).json({
      message: "Error fetching cart by user Id",
      error: error.message,
    });
  }
};

exports.updateCartByid = async (req, res) => {
  try {
    const updateCart = await Cart.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .populate("user")
      .populate("product");
    if (!updateCart) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(updateCart); // Respond with the fetched products
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error Updating Cart Data", error: err.message });
  }
};

exports.deleteItemFromCart = async (req, res) => {
  try {
    const removedCart = await Cart.findByIdAndDelete(req.params.id);

    res.status(200).json(removedCart); // Respond with the fetched products
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error deleting Cart Data", error: err.message });
  }
};
