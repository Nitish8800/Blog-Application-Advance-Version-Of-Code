const controller = require("../../config/controller/controller");
const Categories = require("../../models/Categories.Model");
const Comments = require("../../models/Comment.Model");
const Post = require("../../models/Post.Model");
const User = require("../../models/User.Model");

// @desc    Create comments on post
// @route   POST /comments/
// @access  public
const addCommentOnPost = controller(async (req, res) => {
  req.body.userId = req.user.id;
  const { comment, userId, postId } = req.body;

  const post_details = await Post.findById(postId);

  if (!post_details) {
    return res.status(400).send({
      success: false,
      message: `No post data with post id of ${postId}`,
    });
  }
  const data = await new Comments(req.body);
  await data.save();
  await data.populate([
    {
      path: "postId",
      populate: [
        {
          path: "categories",
          model: Categories,
        },
        {
          path: "userId",
          model: User,
        },
      ],
    },
    "userId",
  ]);

  res.status(200).json({
    success: true,
    message: `Comment on Post Successfully`,
    data: data,
  });
});

// @desc    get comments on post
// @route   get /comments/
// @access  public
const getCommentByPostID = controller(async (req, res) => {
  const page = parseInt(req.query.page) - 1 || 0;
  const limit = parseInt(req.query.limit) || 5;

  const comment = await Comments.find({ postId: req.params.postId })
    .sort("-createdAt")
    .skip(page * limit)
    .limit(limit)
    .populate([
      {
        path: "postId",
        populate: [
          {
            path: "categories",
            model: Categories,
          },
          {
            path: "userId",
            model: User,
          },
          "comments",
          "likes",
          "dislikes",
        ],
      },
      "userId",
    ]);

  const total = await Comments.countDocuments({ postId: req.params.postId });

  if (!comment) {
    return res.status(400).send({
      success: false,
      message: `No comment with that post id of ${req.params.postId}`,
    });
  }

  res.status(200).json({
    success: true,
    message: `Comments on Post Get Successfully`,
    data: comment,
    totalData: total,
    page: page + 1,
    limit: limit,
  });
});

// @desc    Update comments
// @route   Put /comments/
// @access  public
const updateComment = controller(async (req, res) => {
  const comment = await Comments.findById(req.params.id);

  if (!comment) {
    return res.status(400).send({
      success: false,
      message: `No comment with the id of ${req.params.id}`,
    });
  }

  if (comment.userId.toString() !== req.user.id.toString()) {
    return res.status(400).send({
      success: false,
      message: `You are not authorized to update this comment`,
    });
  }
  const data = await Comments.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
    .sort("-createdAt")
    .populate([
      {
        path: "postId",
        populate: [
          {
            path: "categories",
            model: Categories,
          },
          {
            path: "userId",
            model: User,
          },
          "comments",
          "likes",
          "dislikes",
        ],
      },
      "userId",
    ]);

  res.status(200).json({
    success: true,
    message: `Comment Updated on Post Successfully`,
    data: data,
  });
});

// @desc    delete comments
// @route   delete /comments/
// @access  public
const deleteComment = controller(async (req, res) => {
  const comment = await Comments.findById(req.params.id);

  if (!comment) {
    return res.status(400).send({
      success: false,
      message: `No comment with the id of ${req.params.id}`,
    });
  }

  if (comment.userId.toString() !== req.user.id.toString()) {
    return res.status(400).send({
      success: false,
      message: `You are not authorized to update this comment`,
    });
  }

  await comment.remove();
  await comment.populate([
    {
      path: "postId",
      populate: [
        {
          path: "categories",
          model: Categories,
        },
        {
          path: "userId",
          model: User,
        },
        "comments",
        "likes",
        "dislikes",
      ],
    },
    "userId",
  ]);

  res.status(200).json({
    success: true,
    message: ` Removed Comment on Post Successfully`,
    data: comment,
  });
});

module.exports = {
  addCommentOnPost,
  getCommentByPostID,
  updateComment,
  deleteComment,
};
