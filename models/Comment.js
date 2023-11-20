// Importing necessary modules
const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

// Defining the Comment class which extends Sequelize's Model class
class Comment extends Model {}

// Initializing the Comment model with its schema
Comment.init(
  {
    // Define the id field with auto-incrementing primary key
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Define the text field for the comment content
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // Define the created_on field with a default value of the current date and time
    created_on: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
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
    // Define the post_id field as a foreign key reference to the post model
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "post",
        key: "id",
      },
    },
  },
  {
    // Additional model options
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "comment",
  }
);

// Exporting the Comment model for use in other parts of the application
module.exports = Comment;
