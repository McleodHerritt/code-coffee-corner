// Importing necessary modules and models
const router = require("express").Router();
const isAuthenticated = require("../../middleware/middleware");
const { Post, User, Comment } = require("../../models");

// GET route to retrieve a specific post by its ID
router.get("/:id", async (req, res) => {
  if (!req.session.user_id) {
    res.redirect("/login");
  } else {
    const postId = req.params.id;
    try {
      // Retrieve the post data along with the associated user, excluding the user's password
      const postData = await Post.findByPk(postId, {
        include: [
          {
            model: User,
            attributes: { exclude: ["password"] },
          },
        ],
      });
      // If post is not found, send a 404 response
      if (!postData) {
        res.status(404).json({ message: "Post not found" });
      } else {
        // Convert the post data to a plain object
        const post = postData.get({ plain: true });
        // Retrieve comments associated with the post, including the comment's user
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
        // Convert each comment data to a plain object
        const comments = commentData.map((comment) => {
          try {
            return comment.get({ plain: true });
          } catch (error) {
            console.error("Error processing comment: ", comment, error);
            return null; // or some error representation
          }
        });

        // Render the post page with the post and comments data
        res.render("postpage", {
          post: post,
          comments: comments,
          loggedIn: req.session.loggedIn,
          isUserPost: postData.user.id === req.session.user_id,
        });
      }
    } catch (err) {
      // Log and return any errors that occur
      console.error(err.message);
      res.status(500).json({ error: "Failed to retrieve post" });
    }
  }
});

// POST route to add a new post, using isAuthenticated middleware for authentication
router.post("/submit", isAuthenticated, async (req, res) => {
  if (!req.session.user_id) {
    res.redirect("/login");
  } else {
    try {
      // Create a new post using data from the request body
      const { title, post } = req.body;
      await Post.create({
        title: title,
        content: post,
        created_on: new Date(),
        user_id: req.session.user_id,
      });
      // Redirect the user to the dashboard after successful creation
      res.redirect("/dashboard");
    } catch (err) {
      // Log and return any errors that occur
      console.error(err.message);
      res.status(400).json(err);
    }
  }
});

// PUT route to update a post by ID, using isAuthenticated middleware
router.put("/:id", isAuthenticated, async (req, res) => {
  const postId = req.params.id;
  const updateData = req.body;

  try {
    // Update the post with the given ID
    const updatePost = await Post.update(updateData, {
      where: { id: postId },
    });
    // Check if the post was found and updated
    if (updatePost[0] === 0) {
      res.status(404).json({ message: "Post not found" });
    } else {
      res.json({ message: "Post updated", updateData });
    }
  } catch (err) {
    // Log and return any errors that occur
    console.error(err.message);
    res.status(500).json({ error: "Failed to update post" });
  }
});

// DELETE route to delete a post by ID, using isAuthenticated middleware
router.delete("/:id", isAuthenticated, async (req, res) => {
  const postId = req.params.id;
  try {
    // Delete the post with the given ID
    const deletePost = await Post.destroy({
      where: { id: postId },
    });
    // Check if the post was found and deleted
    if (deletePost === 0) {
      res.status(404).json({ message: "Post not found" });
    } else {
      res.json({ message: "Post deleted" });
    }
  } catch (err) {
    // Log and return any errors that occur
    console.error(err.message);
    res.status(500).json({ error: "Failed to delete post" });
  }
});

// Export the router for use in other parts of the application
module.exports = router;
