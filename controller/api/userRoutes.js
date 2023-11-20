// Importing Express router and User model
const router = require("express").Router();
const { User } = require("../../models");

// POST route to create a new user
router.post("/", async (req, res) => {
  try {
    // Extracting name and password from the request body
    const { name, password } = req.body;

    // Creating a new user in the database using the provided name and password
    const newUser = await User.create({ name, password });
    // Sending the created user data back as a response
    res.json(newUser);
  } catch (err) {
    // If an error occurs, log the error message and return a 400 status code with the error
    console.error(err.message);
    res.status(400).json(err);
  }
});

// Exporting the router to be used in other parts of the application
module.exports = router;
