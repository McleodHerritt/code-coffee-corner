const router = require("express").Router();
const userRoutes = require("./userRoutes");
const loginRoutes = require("./loginRoutes");
const postRoutes = require("./postRoutes");
const commentRoutes = require("./commentRoutes");

router.use("/user", userRoutes);
router.use("/login", loginRoutes);
router.use("/post", postRoutes);
router.use("/comment", commentRoutes);

module.exports = router;
