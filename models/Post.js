// Importing necessary modules
const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

// Defining the Post class which extends Sequelize's Model class
class Post extends Model {}

// Initializing the Post model with its schema
Post.init(
  {
    // Define the id field as a primary key with auto-increment
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Define the title field for the post
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Define the content field for the post, allowing it to be nullable
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    // Define the user_id field as a foreign key reference to the user model
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
    },
    // Define the created_on field with a default value of the current date and time
    created_on: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    // Additional model options
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "post",
  }
);

// Exporting the Post model for use in other parts of the application
module.exports = Post;
