const express = require("express");
const passport = require("passport");

const {
  createNewOrder,
  fetchOrderById,
} = require("../Controllers/OrderController");
const router = express.Router();

router
  .post("/", passport.authenticate("jwt", { session: false }), createNewOrder)
  .get("/", passport.authenticate("jwt", { session: false }), fetchOrderById);
//

module.exports = router;
