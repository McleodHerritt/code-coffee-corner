//import express router and models
const router = require("express").Router();
const { Post, User, Comment } = require("../../models");

//define post route for comment submission
router.post("/submit/:id", async (req, res) => {
  //session check for user authentication
  if (!req.session.user_id) {
    res.redirect("/login");
  } else {
    try {
      //handling comment submission
      const { comment } = req.body;
      await Comment.create({
        text: comment,
        created_on: new Date(),
        user_id: req.session.user_id,
        post_id: req.params.id,
      });
      //redirect after successful submission
      res.redirect("/api/post/" + req.params.id);
      //handling error
    } catch (err) {
      console.error(err.message);
      res.status(400).json(err);
    }
  }
});
//exporting the router
module.exports = router;
