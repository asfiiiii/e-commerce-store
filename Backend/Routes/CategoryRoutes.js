const express = require("express");

const {
  getCategories,
  createNewCategory,
} = require("../Controllers/CategoryController");
const router = express.Router();

router.get("/", getCategories).post("/", createNewCategory);

module.exports = router;
