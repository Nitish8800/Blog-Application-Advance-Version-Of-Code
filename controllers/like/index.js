const controller = require("../../config/controller/controller");
const Categories = require("../../models/Categories.Model");
const Like = require("../../models/Like.Model");
const Post = require("../../models/Post.Model");
const User = require("../../models/User.Model");

// @desc    Create feeling - like, dislike
// @route   POST /feelings/
// @access  Public
const addLikePost = controller(async (req, res) => {
  req.body.userId = req.user.id;
  const { reactType, userId, postId } = req.body;

  // check post
  const post_details = await Post.findById(postId);

  if (!post_details) {
    return res.status(400).json({
      success: false,
      message: `No post with post id of ${postId}`,
    });
  }

  // Check if feeling exists
  let feeling = await Like.findOne({ postId, userId });

  if (!feeling) {
    // if not - create feeling
    feeling = await new Like(req.body);
    await feeling.save();
    await feeling.populate([
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

    return res.status(200).json({
      success: true,
      message: `<-- Post ${feeling.reactType} Successfully -->`,
      data: feeling,
    });
  }

  // // // else - check req.body.feeling if equals to feeling.type remove
  else if (reactType == feeling.reactType) {
    await feeling.remove();
    await feeling.populate([
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
    return res.status(200).json({
      success: true,
      message: `Remove ${feeling.reactType} Feelings`,
      data: feeling,
    });
  }

  // else - change feeling type
  feeling.reactType = reactType;
  await feeling.save();
  await feeling.populate([
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

  return res.status(200).json({
    success: true,
    message: `Post ${feeling.reactType} Successfully`,
    data: feeling,
  });
});

// @desc    get All feelings
// @route   Get /feelings/
// @access  Public
const getLikedPost = controller(async (req, res) => {
  const page = parseInt(req.query.page) - 1 || 0;
  const limit = parseInt(req.query.limit) || 5;

  const likes = await Like.find()
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
        ],
      },
      "userId",
    ]);

  const total = await Like.countDocuments();

  return res.status(200).json({
    success: true,
    message: `Get All Likes and Dislike Post Successfully`,
    data: likes,
    totalData: total,
    page: page + 1,
    limit: limit,
  });
});

module.exports = {
  addLikePost,
  getLikedPost,
};
