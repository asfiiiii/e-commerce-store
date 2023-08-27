const express = require("express");
const passport = require("passport");

const {
  signUpUser,
  loginUser,
  logoutUser,
  checkUser,
} = require("../Controllers/AuthController");
const router = express.Router();

router
  .post("/signup", signUpUser)
  .get("/login", loginUser)
  .get("/check", passport.authenticate("jwt", { session: false }), checkUser)
  .get("/logout", passport.authenticate("jwt", { session: false }), logoutUser);

module.exports = router;
