const express = require("express");
const passport = require("passport");
const router = express.Router();
const {
  getAllOrders,
  updateOrder,
  getSortedOrderData,
} = require("../Controllers/AdminController");

router
  .get(
    "/orders",
    passport.authenticate("jwt", { session: false }),
    getAllOrders
  )
  .patch(
    "/orders/:id",
    passport.authenticate("jwt", { session: false }),
    updateOrder
  )
  .get(
    "/orders/sort",
    passport.authenticate("jwt", { session: false }),
    getSortedOrderData
  );

module.exports = router;
