const router = require("express").Router();
const userRoutes = require("./userRoutes");
const loginRoutes = require("./loginRoutes");

router.use("/user", userRoutes);
router.use("/login", loginRoutes);
module.exports = router;
