const mongoose = require("mongoose");
const joi = require("joi");
const { Post } = require("../models/Posts");
const { User } = require("../models/Users");

const CommentsSchema = mongoose.Schema(
  {
    comments: { type: String, required: true, trim: true, minlength: 2 },
    date: {
      type: Date,
      default: Date.now,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      default: null,
    },
    likes: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        date: { type: Date, default: Date.now },
      },
    ],
    dislikes: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        date: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", CommentsSchema);

module.exports = {
  Comment,
};
