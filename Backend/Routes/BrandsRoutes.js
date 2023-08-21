const express = require("express");

const {
  getAllBrands,
  createNewBrand,
} = require("../Controllers/BrandsController");
const router = express.Router();

router.get("/", getAllBrands).post("/", createNewBrand);

module.exports = router;
