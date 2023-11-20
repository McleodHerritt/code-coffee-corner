// Importing the Sequelize models
const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");

// Defining relationships between the models

// A User can have many Posts
User.hasMany(Post, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});
// A Post belongs to a single User
Post.belongsTo(User, {
  foreignKey: "user_id",
});
// A User can have many Comments
User.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});
// A Comment belongs to a single User
Comment.belongsTo(User, {
  foreignKey: "user_id",
});
// A Post can have many Comments
Post.hasMany(Comment, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
});
// A Comment belongs to a single Post
Comment.belongsTo(Post, {
  foreignKey: "post_id",
});

// Exporting the models with their relationships
module.exports = { User, Post, Comment };
