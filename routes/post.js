const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const { auth } = require("../middleware/auth");
const {
  addPost,
  getAllPosts,
  getPost,
  updatePost,
  deletePost,
} = require("../controllers/post");
const objectIdValidator = require("../middleware/objectIdValidator");
const {
  createPostValidation,
  updatePostValidation,
} = require("../middleware/validator/post/post.validator");
const upload = require("../middleware/multerFileUpload");

router.use(bodyParser.json());

// get All Post
router.get("/", auth, getAllPosts);

// Add New Post
router.post(
  "/create",
  upload.single("picture"),
  createPostValidation,
  auth,
  addPost
);

// // // // Get, Update and Delete Post
router
  .route("/:id")
  .get(objectIdValidator, auth, getPost)
  .put(
    objectIdValidator,
    updatePostValidation,
    upload.single("picture"),
    auth,
    updatePost
  )
  .delete(objectIdValidator, auth, deletePost);

module.exports = router;
