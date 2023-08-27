const express = require("express");
const passport = require("passport");
const {
  createNewCart,
  fetchCartById,
  updateCartByid,
  deleteItemFromCart,
} = require("../Controllers/CartController");
const router = express.Router();

router
  .post("/", passport.authenticate("jwt", { session: false }), createNewCart)
  .get("/", passport.authenticate("jwt", { session: false }), fetchCartById)
  .patch(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    updateCartByid
  )
  .delete(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    deleteItemFromCart
  );

module.exports = router;
