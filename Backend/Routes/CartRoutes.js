const express = require("express");

const {
  createNewCart,
  fetchCartById,
  updateCartByid,
  deleteItemFromCart,
} = require("../Controllers/CartController");
const router = express.Router();

router
  .post("/", createNewCart)
  .get("/", fetchCartById)
  .patch("/:id", updateCartByid)
  .delete("/:id", deleteItemFromCart);

module.exports = router;
