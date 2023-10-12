const mongoose = require("mongoose");
const Post = require("./Post.Model");
const User = require("./User.Model");

const commentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      minlength: [3, "Must be three characters long"],
      required: [true, "Text is required"],
    },
    userId: { type: mongoose.Schema.ObjectId, ref: User, required: true },
    postId: { type: mongoose.Schema.ObjectId, ref: Post, required: true },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: true }
);

const Comments = mongoose.model("Comments", commentSchema);

module.exports = Comments;
