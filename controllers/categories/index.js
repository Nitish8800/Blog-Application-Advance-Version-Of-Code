const Categories = require("../../models/Categories.Model");
const controller = require("../../config/controller/controller");

// Add New Categories
const addCategories = controller(async (req, res) => {
  const data = await new Categories(req.body);

  if (!data) {
    return res
      .status(404)
      .send({ success: false, message: "Categories Not Found" });
  }

  await data.save();

  res.status(200).send({
    success: true,
    message: "Categories Saved successfully",
    data: data,
  });
});

const getAllCategories = controller(async (req, res) => {
  const page = parseInt(req.query.page) - 1 || 0;
  const limit = parseInt(req.query.limit) || 5;
  const search = req.query.search || "";
  const order = req.query.dir === "desc" ? -1 : 1;

  const category = await Categories.find({
    name: { $regex: search, $options: "i" },
  })
    .sort({ name: order })
    .skip(page * limit)
    .limit(limit);

  const total = await Categories.countDocuments({
    name: { $regex: search, $options: "i" },
  });

  if (!category) {
    return res
      .status(404)
      .send({ success: false, message: "Categories Not Found" });
  }

  res.status(200).send({
    success: true,
    message: "All Categories Get Successfully",
    data: category,
    totalData: total,
    page: page + 1,
    limit: limit,
  });
});

const getCategories = controller(async (req, res) => {
  const category = await Categories.findById(req.params.id);

  if (!category) {
    return res
      .status(404)
      .send({ success: false, message: "Categories Not Found" });
  }

  res.status(200).send({
    success: true,
    message: "Get Single Categories Successfully",
    data: category,
  });
});

const updateCategories = controller(async (req, res) => {
  const category = await Categories.findByIdAndUpdate(req.params.id);
  if (!category) {
    return res
      .status(404)
      .send({ success: false, message: "Category Not Found" });
  }

  Object.entries(req.body).forEach(([key, value]) => {
    category[key] = value;
  });

  const updatedCategories = await category.save();

  res.status(200).send({
    success: true,
    message: "Categories Updated Successfully",
    data: updatedCategories,
  });
});

const deleteCategories = controller(async (req, res) => {
  const category = await Categories.findById(req.params.id);

  if (!category) {
    return res
      .status(404)
      .send({ success: false, message: "Categories Not Found" });
  }

  await category.delete();

  res.status(200).send({
    success: true,
    message: "Categories Deleted Successfully",
    data: category,
  });
});

module.exports = {
  addCategories,
  getAllCategories,
  getCategories,
  updateCategories,
  deleteCategories,
};
