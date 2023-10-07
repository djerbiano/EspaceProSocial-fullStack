const express = require("express");
const postController = require("../controllers/postsController");
const commentController = require("../controllers/commentController");
const virifyToken = require("../middlewares/virifyToken");
const mult = require("../middlewares/multer");
const route = express.Router();

/******************************__Posts__****************************************/
//Get all posts
route.get("/", postController.getAllPosts);

//Get one post
route.get("/:currentUser/:postId", virifyToken, postController.getOnePost);

//Add post
route.post("/:userId/post", mult, postController.addPost);

//Delete post
route.delete("/:userId/post/:postId", postController.deletePost);

/******************************__Comments__****************************************/

//Add comment

route.post(
  "/:userId/post/:postId/comment",
  virifyToken,
  commentController.addComment
);

//Delete comment

route.delete(
  "/:userId/post/:postId/comment/:commentId",
  virifyToken,
  commentController.deleteComment
);

module.exports = route;
