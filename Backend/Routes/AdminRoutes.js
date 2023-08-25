const express = require("express");

const router = express.Router();
const {
  getAllOrders,
  updateOrder,
  getSortedOrderData,
} = require("../Controllers/AdminController");

router
  .get("/orders", getAllOrders)
  .patch("/orders/:id", updateOrder)
  .get("/orders/sort", getSortedOrderData);

module.exports = router;
