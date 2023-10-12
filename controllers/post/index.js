const Categories = require("../../models/Categories.Model");
const controller = require("../../config/controller/controller");
const Post = require("../../models/Post.Model");

// Add New Post
const addPost = controller(async (req, res) => {
  let categoriesID = req.body.categories;

  const categories_details = await Categories.findById(categoriesID);

  if (!categories_details) {
    return res.status(400).send({
      success: false,
      message: "Categories Details Not Found",
    });
  }

  const data = await new Post(req.body);

  if (!data) {
    return res.status(404).send({ success: false, message: "Post Not Found" });
  }

  if (req.file !== undefined) {
    data.picture = req.file.filename;
  }

  data.userId = req.user.id;

  await data.save();
  await data.populate([
    "categories",
    "likes",
    "dislikes",
    "comments",
    "userId",
  ]);

  res.status(200).send({
    success: true,
    message: "Post Saved Successfully",
    data: data,
  });
});

// get all Posts
const getAllPosts = controller(async (req, res) => {
  const page = parseInt(req.query.page) - 1 || 0;
  const limit = parseInt(req.query.limit) || 5;
  const search = req.query.search || "";
  const order = req.query.dir === "desc" ? -1 : 1;
  const startdate = req.query.startdate;
  const enddate = req.query.enddate;

  const categories = await Categories.find({
    name: { $regex: search, $options: "i" },
  });

  const categoriesID = categories.map((x) => x._id);

  const filterObj = {};

  if (search !== undefined) {
    filterObj["$or"] = [
      { title: { $regex: search, $options: "i" } },
      {
        categories: {
          $in: categoriesID,
        },
      },
    ];
  }

  if (startdate !== undefined && enddate !== undefined) {
    filterObj["createdAt"] = {
      $gte: new Date(startdate),
      $lt: new Date(enddate),
    };
  }

  const data = await Post.find(filterObj)
    .sort({ title: order, createdAt: -1 })
    .skip(page * limit)
    .limit(limit)
    .populate(["comments", "likes", "dislikes", "categories", "userId"]);

  const total = await Post.countDocuments(filterObj);

  if (!data) {
    return res.status(404).send({ success: false, message: "Post Not Found" });
  }

  res.status(200).send({
    success: true,
    message: "All Post Get Successfully",
    data: data,
    totalData: total,
    page: page + 1,
    limit: limit,
  });
});

// get single Post
const getPost = controller(async (req, res) => {
  const data = await Post.findById(req.params.id);

  if (!data) {
    return res.status(404).send({ success: false, message: "Post Not Found" });
  }
  await data.populate([
    "comments",
    "likes",
    "dislikes",
    "categories",
    "userId",
  ]);

  res.status(200).json({
    success: true,
    message: "Get Single Post Successfully",
    data: data,
  });
});

// update  Post
const updatePost = controller(async (req, res) => {
  const data = await Post.findByIdAndUpdate(req.params.id);
  if (!data) {
    return res.status(404).send({ success: false, message: "Post Not Found" });
  }
  if (req.file !== undefined) {
    data.picture = req.file.filename;
  }

  Object.entries(req.body).forEach(([key, value]) => {
    data[key] = value;
  });

  await data.save();
  const postData = await data.populate([
    "comments",
    "likes",
    "dislikes",
    "categories",
    "userId",
  ]);

  res.status(200).send({
    success: true,
    message: "Post Updated Successfully",
    data: postData,
  });
});

// delete  Post
const deletePost = controller(async (req, res) => {
  const data = await Post.findById(req.params.id);

  if (!data) {
    return res.status(404).send({ success: false, message: "Post Not Found" });
  }

  await data.delete();
  await data.populate([
    "comments",
    "likes",
    "dislikes",
    "categories",
    "userId",
  ]);

  res.status(200).send({
    success: true,
    message: "Post deleted successfully",
    data: data,
  });
});

module.exports = {
  addPost,
  getAllPosts,
  getPost,
  updatePost,
  deletePost,
};
