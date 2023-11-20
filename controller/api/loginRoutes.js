// Importing Express router and the User model
const router = require("express").Router();
const { User } = require("../../models");

// POST route to login a user
router.post("/", async (req, res) => {
  try {
    // Attempting to find a user by username
    const userData = await User.findOne({ where: { name: req.body.username } });
    // If user is not found, return an error message
    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect username or password, please try again" });
      return;
    }
    // Checking if the provided password is valid
    const validPassword = await userData.checkPassword(req.body.password);

    // If password is not valid, return an error message
    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect username or password, please try again" });
      return;
    }
    // If login is successful, save session information
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.loggedIn = true;

      res.redirect("/");
    });
  } catch (err) {
    // If an error occurs, return the error
    res.status(400).json(err);
  }
});

// Exporting the router to be used in other parts of the application
module.exports = router;
