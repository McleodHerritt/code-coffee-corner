const router = require("express").Router();
const { Post, User } = require("../../models");

router.get("/:id", async (req, res) => {
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

      res.render("postpage", {
        post: post,
        loggedIn: req.session.loggedIn,
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to retrieve post" });
  }
});

module.exports = router;
