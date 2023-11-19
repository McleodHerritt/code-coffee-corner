const router = require("express").Router();
const { User } = require("../../models");

// create a new user
router.post("/", async (req, res) => {
  try {
    const { name, password } = req.body;
    const newUser = await User.create({ name, password });
    res.json(newUser);
  } catch (err) {
    console.error(err.message);
    res.status(400).json(err);
  }
});
module.exports = router;
