const express = require("express");

const {
  signUpUser,
  loginUser,
  logoutUser,
} = require("../Controllers/AuthController");
const router = express.Router();

router
  .post("/signup", signUpUser)
  .get("/login", loginUser)
  .get("/logout", logoutUser);

module.exports = router;
