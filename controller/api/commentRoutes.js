const router = require("express").Router();
const { Post, User, Comment } = require("../../models");

router.post("/submit/:id", async (req, res) => {
  if (!req.session.user_id) {
    res.redirect("/login");
  } else {
    try {
      const { comment } = req.body;
      await Comment.create({
        text: comment,
        created_on: new Date(),
        user_id: req.session.user_id,
        post_id: req.params.id,
      });
      res.redirect("/api/post/" + req.params.id);
    } catch (err) {
      console.error(err.message);
      res.status(400).json(err);
    }
  }
});

module.exports = router;
