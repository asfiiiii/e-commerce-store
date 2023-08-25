const express = require("express");

const { updateUser, getUserDetails } = require("../Controllers/UserController");
const router = express.Router();

router.get("/:id", getUserDetails).patch("/:id", updateUser);
module.exports = router;
