const router = require("express").Router();
const { User, Post } = require("../models");

router.get("/", async (req, res) => {
  try {
    const allPost = await Post.findAll({
      include: [
        {
          model: User,
          attributes: { exclude: ["password"] },
        },
      ],
    });

    console.log("Retrieved posts: ", allPost);

    const posts = allPost.map((post) => {
      try {
        return post.get({ plain: true });
      } catch (error) {
        console.error("Error processing post: ", post, error);
        return null; // or some error representation
      }
    });

    console.log("Processed posts: ", posts);
    res.render("homepage", {
      posts,
    });
  } catch (err) {
    console.error("Error in route: ", err);
    res.status(500).json(err);
  }
});

module.exports = router;
