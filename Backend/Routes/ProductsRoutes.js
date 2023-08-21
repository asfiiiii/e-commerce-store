const express = require("express");
const {
  getAllProducts,
  createNewProduct,
  getProductByid,
  updateProductByid,
} = require("../Controllers/ProductsController");
const router = express.Router();

router
  .get("/", getAllProducts)
  .post("/", createNewProduct)
  .get("/:id", getProductByid)
  .patch("/:id", updateProductByid);

module.exports = router;
