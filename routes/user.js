const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");

const {
  getUserDetails,
  createUser,
  loginUser,
  updateUser,
  logOutUser,
  updatePassword,
} = require("../controllers/user");

const {
  userSignUP,
} = require("../middleware/validator/user/userSignUp.validator");

const {
  validateUserLogin,
} = require("../middleware/validator/user/login.validator");

const {
  userUpdateValidator,
} = require("../middleware/validator/user/userUpdate.validator.js");

const bodyParser = require("body-parser");

const {
  updatePasswordValidator,
} = require("../middleware/validator/user/update.password.validator");

router.use(bodyParser.json());

// get Current User Details
router.get("/me", auth, getUserDetails);

// Register New User
router.post("/signup", userSignUP, createUser);

// Login User
router.post("/login", validateUserLogin, loginUser);

// Update User Password
router.post("/update_password", updatePasswordValidator, auth, updatePassword);

// Update User profile
router.put("/me/update", userUpdateValidator, auth, updateUser);

// Log out User
router.get("/logout", logOutUser);

module.exports = router;
