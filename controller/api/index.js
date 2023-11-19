const router = require("express").Router();
const userRoutes = require("./userRoutes");
const loginRoutes = require("./loginRoutes");
const postpageRoutes = require("./postpageRoutes");

router.use("/user", userRoutes);
router.use("/login", loginRoutes);
router.use("/post", postpageRoutes);

module.exports = router;
