const router = require("express").Router();
const { User, Post } = require("../models");
const apiRoutes = require("./api");

router.use("/api", apiRoutes);

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
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.error("Error in route: ", err);
    res.status(500).json(err);
  }
});

router.get("/login", async (req, res) => {
  res.render("login", {});
});

router.get("/signup", async (req, res) => {
  res.render("signup", {});
});

router.get("/dashboard", async (req, res) => {
  if (!req.session.user_id) {
    res.redirect("/login");
  } else {
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });
    const posts = postData.map((post) => {
      try {
        return post.get({ plain: true });
      } catch (error) {
        console.error("Error processing post: ", post, error);
        return null; // or some error representation
      }
    });

    res.render("dashboard", {
      loggedIn: req.session.loggedIn,
      posts,
    });
  }
});

router.get("/updatePost/:id", async (req, res) => {
  res.render("updatePost", {
    postId: req.params.id,
  });
});

module.exports = router;
