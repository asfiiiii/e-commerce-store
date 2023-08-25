const express = require("express");
const passport = require("passport");
const {
  getAllProducts,
  createNewProduct,
  getProductByid,
  updateProductByid,
} = require("../Controllers/ProductsController");
const router = express.Router();

router
  .get("/", passport.authenticate("jwt", { session: false }), getAllProducts)
  .post("/", createNewProduct)
  .get("/:id", getProductByid)
  .patch("/:id", updateProductByid);

module.exports = router;
