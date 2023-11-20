// Importing Express router and necessary models
const router = require("express").Router();
const { User, Post } = require("../models");

// Importing and using the API routes
const apiRoutes = require("./api");
router.use("/api", apiRoutes);

// GET route for the homepage
router.get("/", async (req, res) => {
  try {
    // Fetching all posts including the user details, excluding the password
    const allPost = await Post.findAll({
      include: [
        {
          model: User,
          attributes: { exclude: ["password"] },
        },
      ],
    });

    // Mapping each post to a plain JavaScript object for easy rendering
    const posts = allPost.map((post) => {
      try {
        return post.get({ plain: true });
      } catch (error) {
        console.error("Error processing post: ", post, error);
        return null; // or some error representation
      }
    });

    // Rendering the homepage with the posts and logged-in status
    res.render("homepage", {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    // Logging any errors and returning a 500 status code with the error
    console.error("Error in route: ", err);
    res.status(500).json(err);
  }
});

// GET route for the login page
router.get("/login", async (req, res) => {
  res.render("login", {});
});

// GET route for the signup page
router.get("/signup", async (req, res) => {
  res.render("signup", {});
});

// GET route for the user's dashboard
router.get("/dashboard", async (req, res) => {
  // Redirecting to login if the user is not logged in
  if (!req.session.user_id) {
    res.redirect("/login");
  } else {
    // Fetching posts created by the logged-in user
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
    // Rendering the dashboard with the user's posts and logged-in status
    res.render("dashboard", {
      loggedIn: req.session.loggedIn,
      posts,
    });
  }
});
// GET route for updating a post
router.get("/updatePost/:id", async (req, res) => {
  // Rendering the updatePost page with the post ID
  res.render("updatePost", {
    postId: req.params.id,
  });
});
// Exporting the router for use in other parts of the application
module.exports = router;
