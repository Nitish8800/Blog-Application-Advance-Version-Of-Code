const mongoose = require("mongoose");
const User = require("./User.Model");
const Categories = require("./Categories.Model");

const postSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.ObjectId, ref: User, required: true },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      required: false,
    },
    categories: {
      type: [mongoose.Schema.ObjectId],
      ref: Categories,
      required: true,
    },
    createdDate: {
      type: Date,
    },
  },
  { toObject: { virtuals: true }, toJSON: { virtuals: true }, timestamps: true }
);

postSchema.virtual("post_link").get(function () {
  return process.env.CLIENT_BASE_URL + `/upload/${this.picture}`;
});

postSchema.virtual("likes", {
  ref: "Like",
  localField: "_id",
  foreignField: "postId",
  justOne: false,
  count: true,
  options: { match: { reactType: "like" } }, // Use 'options' to specify 'match'
});

postSchema.virtual("dislikes", {
  ref: "Like",
  localField: "_id",
  foreignField: "postId",
  justOne: false,
  count: true,
  options: { match: { reactType: "dislike" } }, // Use 'options' to specify 'match'
});

postSchema.virtual("comments", {
  ref: "Comments",
  localField: "_id",
  foreignField: "postId",
  justOne: false,
  count: true,
});

const Post = mongoose.model("post", postSchema);

module.exports = Post;
