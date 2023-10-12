const mongoose = require("mongoose");
const Post = require("./Post.Model");
const User = require("./User.Model");
const Types = require("../constants/reaction");

const likeSchema = new mongoose.Schema(
  {
    reactType: {
      type: String,
      enum: Object.values(Types),
      required: [true, "Type is required either like or dislike"],
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: User,
      required: true,
    },
    postId: {
      type: mongoose.Schema.ObjectId,
      ref: Post,
      required: [true, "Post id is required"],
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: true }
);

const Like = mongoose.model("Like", likeSchema);

module.exports = Like;
