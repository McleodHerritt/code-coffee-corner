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
          isUserPost: postData.user.id === req.session.user_id,
        });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: "Failed to retrieve post" });
    }
  }
});

router.post("/submit", async (req, res) => {
  if (!req.session.user_id) {
    res.redirect("/login");
  } else {
    try {
      const { title, post } = req.body;
      await Post.create({
        title: title,
        content: post,
        created_on: new Date(),
        user_id: req.session.user_id,
      });
      res.redirect("/dashboard");
    } catch (err) {
      console.error(err.message);
      res.status(400).json(err);
    }
  }
});

// Update post by ID
router.put("/:id", async (req, res) => {
  const postId = req.params.id;
  const updateData = req.body;

  try {
    const updatePost = await Post.update(updateData, {
      where: { id: postId },
    });

    if (updatePost[0] === 0) {
      res.status(404).json({ message: "Post not found" });
    } else {
      res.json({ message: "Post updated", updateData });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to update post" });
  }
});
module.exports = router;
