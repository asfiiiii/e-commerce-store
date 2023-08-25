const express = require("express");

const {
  createNewOrder,
  fetchOrderById,
} = require("../Controllers/OrderController");
const router = express.Router();

router.post("/", createNewOrder).get("/", fetchOrderById);
//

module.exports = router;
