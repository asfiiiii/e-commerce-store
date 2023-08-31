const Order = require("../Models/OrderModal");

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user");

    if (orders.length === 0) {
      res.status(404).json({ message: "Orders not found" });
    } else {
      res.status(200).json(orders);
    }
  } catch (error) {
    res.status(500).json({
      message: "Error fetching all order",
      error: error.message,
    });
  }
};

exports.updateOrder = async (req, res) => {
  const { id } = req.params; // Assuming the query parameter is named "userId"
  try {
    const order = await Order.findByIdAndUpdate(id, req.body, { new: true });

    if (!order) {
      res.status(404).json({ message: "order not found" });
    } else {
      res.status(200).json(order);
    }
  } catch (error) {
    res.status(500).json({
      message: "Error updating order by order Id",
      error: error.message,
    });
  }
};

exports.getSortedOrderData = async (req, res) => {
  try {
    let query = Order.find({});
    if (req.query._sort && req.query._order) {
      query = query.sort({ [req.query._sort]: req.query._order });
    }
    if (req.query.status) {
      query = query.find({ status: req.query.status });
    }

    const data = await query.exec();

    res.status(200).json(data); // Respond with the fetched products
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error Fetching Order data", error: err.message });
  }
};
