const express = require("express");
const passport = require("passport");
const { updateUser, getUserDetails } = require("../Controllers/UserController");
const router = express.Router();

router
  .get("/:id", passport.authenticate("jwt", { session: false }), getUserDetails)
  .patch("/:id", passport.authenticate("jwt", { session: false }), updateUser);
module.exports = router;
