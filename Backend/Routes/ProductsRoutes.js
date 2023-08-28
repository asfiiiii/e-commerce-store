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
  .get("/", getAllProducts)
  .post("/", passport.authenticate("jwt", { session: false }), createNewProduct)
  .get("/:id", getProductByid)
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
