// Importing necessary modules
const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

// Defining the User class which extends Sequelize's Model class
class User extends Model {
  // Method to check if the provided password matches the hashed password
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

// Initializing the User model with its schema
User.init(
  {
    // Define the id field as a primary key with auto-increment
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Define the name field for the user
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Define the password field for the user with a minimum length validation
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
  },
  {
    // Sequelize hooks for hashing password before creating or updating a user
    hooks: {
      // Hashing password before creating a new user
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      // Hashing password before updating a user's password
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hashSync(
          updatedUserData.password,
          10
        );
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  }
);

// Exporting the User model for use in other parts of the application
module.exports = User;
