const router = require("express").Router();
const userRoutes = require("./userRoutes");
const loginRoutes = require("./loginRoutes");
const postpageRoutes = require("./postpageRoutes");
const commentRoutes = require("./commentRoutes");

router.use("/user", userRoutes);
router.use("/login", loginRoutes);
router.use("/post", postpageRoutes);
router.use("/comment", commentRoutes);

module.exports = router;
