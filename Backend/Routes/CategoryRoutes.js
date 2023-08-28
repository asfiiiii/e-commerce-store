const express = require("express");
const passport = require("passport");

const {
  getCategories,
  createNewCategory,
} = require("../Controllers/CategoryController");
const router = express.Router();

router
  .get("/", getCategories)
  .post(
    "/",
    passport.authenticate("jwt", { session: false }),
    createNewCategory
  );

module.exports = router;
