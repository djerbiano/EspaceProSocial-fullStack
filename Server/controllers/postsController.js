const dotenv = require("dotenv").config();
const { User } = require("../models/Users");
const { Comment } = require("../models/Comments");
const { Post, validatePost } = require("../models/Posts");
const fs = require("fs");
const path = require("path");

const controller = {
  //Get all posts
  getAllPosts: async (req, res) => {
    const posts = await Post.find({}).populate("comments");

    if (posts.length > 0) {
      return res.status(200).json(posts);
    } else {
      return res
        .status(404)
        .json({ message: "There are no posts in the database" });
    }
  },

  // Add post
  addPost: async (req, res) => {
    try {
      // Vérifier que l'utilisateur existe dans la base de données
      const user = await User.findOne({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: " You should be connected!" });
      }

      if (req.params.userId === user._id.toString()) {
        // Récupérer l'id de l'utilisateur si existe
        const userIdd = req.params.userId;

        let post;
        if (req.file === undefined) {
          post = new Post({
            post: req.body.post,
            date: req.body.date,
            author: userIdd,
          });
        } else {
          post = new Post({
            post: req.body.post,
            picture: req.file.filename,
            date: req.body.date,
            author: userIdd,
          });
        }

        // Enregistrer le post dans la base de données
        const result = await post.save();
        return res.status(200).send(result);
      }
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "invalid post" });
    }
  },

  //Delete a post

  deletePost: async (req, res) => {
    try {
      const userId = req.params.userId;

      // Vérifier que l'utilisateur existe dans la base de données
      const user = await User.findOne({ _id: userId });
      const isAdmin = user.isAdmin;

      if (!user) {
        return res.status(404).json({ message: " You should be connected!" });
      }
      if (userId === user._id.toString() || isAdmin) {
        // Récupérer l'id du post à supprimer
        const postId = req.params.postId;
        const post = await Post.findOne({ _id: postId });

        if (userId !== post.author.toString() && !isAdmin) {
          return res
            .status(404)
            .json({ message: " You need acces to delete this post !" });
        }

        // supprimer les commentaires en block est plus rapide = une seule requete (deleteMany)
        if (post.comments) {
          const commentIds = post.comments.map((comment) => comment._id);
          await Comment.deleteMany({ _id: { $in: commentIds } });
        }

        // supprimer les commentaires
        /*   if (post.comments) {
          for (let i = 0; i < post.comments.length; i++) {
            await Comment.findOneAndDelete({
              _id: post.comments[i]._id,
            });
          }
        }*/

        // supprimer la photo de post
        if (post.picture) {
          const picture = path.resolve(__dirname, "../images", post.picture);
          fs.unlink(picture, (err) => {
            if (err) console.log(err);
          });
        }

        await Post.findOneAndDelete({ _id: postId });
        return res
          .status(200)
          .json({ message: "post has been deleted successfully" });
      }
    } catch (error) {
      return res.status(400).json({ message: "invalid user or post" });
    }
  },
};

module.exports = controller;
