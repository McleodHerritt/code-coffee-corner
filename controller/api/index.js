// Importing the Express router
const router = require("express").Router();
// Importing route modules for different functionalities
const userRoutes = require("./userRoutes");
const loginRoutes = require("./loginRoutes");
const postRoutes = require("./postRoutes");
const commentRoutes = require("./commentRoutes");

// Mounting the sub-routers to specific base paths
router.use("/user", userRoutes);
router.use("/login", loginRoutes);
router.use("/post", postRoutes);
router.use("/comment", commentRoutes);

// Exporting the configured router to be used in other parts of the application// Exporting the configured router to be used in other parts of the application
module.exports = router;
