const express = require("express");
const passport = require("passport");

const {
  getAllBrands,
  createNewBrand,
} = require("../Controllers/BrandsController");
const router = express.Router();

router
  .get("/", getAllBrands)
  .post("/", passport.authenticate("jwt", { session: false }), createNewBrand);

module.exports = router;
