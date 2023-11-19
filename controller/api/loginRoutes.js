const router = require("express").Router();
const { User } = require("../../models");

// login a user
router.post("/", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { name: req.body.username } });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect username or password, please try again" });
      return;
    }
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect username or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.loggedIn = true;

      res.redirect("/");
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
