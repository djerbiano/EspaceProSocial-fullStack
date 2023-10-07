const { User } = require("../models/Users");
const { Post } = require("../models/Posts");
const { Comment } = require("../models/Comments");

const controller = {
  //Add comment
  addComment: async (req, res) => {
    try {
      //Vérification du token
      if (req.user.id !== req.params.userId) {
        return res.status(403).json({
          message: "Token non valide, veuillez vous reconnecter",
        });
      }

      // Vérifier que l'utilisateur existe dans la base de données
      const user = await User.findOne({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: " You should be connected!" });
      }

      if (req.params.userId === user._id.toString()) {
        // Récupérer l'id de l'utilisateur si existe

        const { userId, postId } = req.params;

        let post = await Post.findOne({ _id: postId });
        if (!post) {
          return res.status(404).json({ message: "Post not found!" });
        }

        let comment = new Comment({
          comments: req.body.comments,
          author: userId,
          post: postId,
        });
        // Enregistrer le commentaire dans la base de données
        const result = await comment.save();

        const commentId = await result._id;

        await post.comments.push(commentId);

        await post.save();
        const updatedPost = await Post.findOne({ _id: postId }).populate(
          "comments"
        );

        return res.status(200).send(updatedPost);
      } else {
        return res.status(404).json({ message: " invalid URL !" });
      }
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: error });
    }
  },

  //Delete comment
  deleteComment: async (req, res) => {
    try {
      //Vérification du token
      if (req.user.id !== req.params.userId) {
        return res.status(403).json({
          message: "Token non valide, veuillez vous reconnecter",
        });
      }

      const { userId, commentId } = req.params;
      //get comment

      const user = await User.findOne({ _id: userId });
      const comment = await Comment.findOne({ _id: commentId });
      if (!user) {
        return res.status(404).json({ message: "You should be connected!" });
      }
      if (userId !== comment.author.toString()) {
        return res
          .status(404)
          .json({ message: "You need acces to delete this comment !" });
      }

      //delete comment
      await Comment.findOneAndDelete({ _id: comment._id });
      res.status(200).json({ message: "Comment deleted !" });
    } catch (error) {
      return res.status(400).json({ message: "Invalid URL", error });
    }
  },
};

module.exports = controller;
