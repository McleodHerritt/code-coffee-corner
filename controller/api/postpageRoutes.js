const router = require("express").Router();
const { Post, User, Comment } = require("../../models");

router.get("/:id", async (req, res) => {
  if (!req.session.user_id) {
    res.redirect("/login");
  } else {
    const postId = req.params.id;
    try {
      const postData = await Post.findByPk(postId, {
        include: [
          {
            model: User,
            attributes: { exclude: ["password"] },
          },
        ],
      });
      if (!postData) {
        res.status(404).json({ message: "Post not found" });
      } else {
        const post = postData.get({ plain: true });
        const commentData = await Comment.findAll({
          where: {
            post_id: postId,
          },
          include: [
            {
              model: User,
              attributes: { exclude: ["password"] },
            },
          ],
        });

        const comments = commentData.map((comment) => {
          try {
            return comment.get({ plain: true });
          } catch (error) {
            console.error("Error processing comment: ", comment, error);
            return null; // or some error representation
          }
        });

        res.render("postpage", {
          post: post,
          comments: comments,
          loggedIn: req.session.loggedIn,
        });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: "Failed to retrieve post" });
    }
  }
});

module.exports = router;
