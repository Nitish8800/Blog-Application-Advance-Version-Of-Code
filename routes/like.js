const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const { auth } = require("../middleware/auth");

const objectIdValidator = require("../middleware/objectIdValidator");
const {
  createReactionValidation,
} = require("../middleware/validator/like/like.validator");
const { addLikePost, getLikedPost } = require("../controllers/like");

router.use(bodyParser.json());

// // // Add New Like Post
router.post("/", createReactionValidation, auth, addLikePost);

// // //  checkFeelings Post
router.get("/", auth, getLikedPost);

module.exports = router;
