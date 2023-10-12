const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const { auth } = require("../middleware/auth");
const {
  createCategoriesValidation,
  updateCategoriesValidation,
} = require("../middleware/validator/categories/categories.validator");
const {
  addCategories,
  getAllCategories,
  getCategories,
  updateCategories,
  deleteCategories,
} = require("../controllers/categories");
const objectIdValidator = require("../middleware/objectIdValidator");

router.use(bodyParser.json());

// get All Categories
router.get("/", auth, getAllCategories);

// Add New Categories
router.post("/create", createCategoriesValidation, auth, addCategories);

// // // Get, Update and Delete Categories
router
  .route("/:id")
  .get(objectIdValidator, auth, getCategories)
  .put(objectIdValidator, updateCategoriesValidation, auth, updateCategories)
  .delete(objectIdValidator, auth, deleteCategories);

module.exports = router;
