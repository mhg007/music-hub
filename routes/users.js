const express = require("express");
const router = express.Router();
const { signupUser, loginUser } = require("../controller/userController");
const {
  signUpValidation,
  loginValidation,
} = require("../middleware/authValidation");

router.post("/signup", signUpValidation, signupUser);
router.post("/login", loginValidation, loginUser);

module.exports = router;
