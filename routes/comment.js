const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const { auth } = require("../middleware/auth");

const objectIdValidator = require("../middleware/objectIdValidator");

const {
  addCommentOnPost,
  getCommentByPostID,
  updateComment,
  deleteComment,
} = require("../controllers/comment");

const {
  createCommentsValidation,
  updateCommentValidation,
} = require("../middleware/validator/comment/comment.validator");

router.use(bodyParser.json());

// Add New Comment
router.post("/", createCommentsValidation, auth, addCommentOnPost);

//  get Comment Post
router.get("/:postId/posts", auth, getCommentByPostID);

// //  update and delete Comment Post
router
  .route("/:id")
  .put(objectIdValidator, updateCommentValidation, auth, updateComment)
  .delete(objectIdValidator, auth, deleteComment);

module.exports = router;
