const express = require("express");
const passport = require("passport");
const {
  getAllProducts,
  createNewProduct,
  getProductByid,
  updateProductByid,
  deleteProduct,
} = require("../Controllers/ProductsController");
const router = express.Router();

router
  .get("/", passport.authenticate("jwt", { session: false }), getAllProducts)
  .post("/", passport.authenticate("jwt", { session: false }), createNewProduct)
  .get("/:id", passport.authenticate("jwt", { session: false }), getProductByid)
  .get(
    "/delete/:id",
    passport.authenticate("jwt", { session: false }),
    deleteProduct
  )
  .patch(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    updateProductByid
  );

module.exports = router;
