// Import necessary modules.
const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const routes = require("./controller");
const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const isAuthenticated = require("./middleware/middleware");

// Create an Express application.
const app = express();
// Define a port to listen on, either from the environment variable or default to 3001.
const PORT = process.env.PORT || 3001;

// Set up Handlebars with default configurations.
const hbs = exphbs.create({});

// Configure the session with a secret key, cookie settings, and using Sequelize to store session data.
const sess = {
  secret: "Super secret secret",
  cookie: {
    maxAge: 5 * 60 * 1000,
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

// Apply the session configuration to the Express app.
app.use(session(sess));

// Set Handlebars as the view engine for rendering templates.
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Middleware to parse incoming request bodies and static files serving.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Use the defined routes from the controller folder.
app.use(routes);

// Connect to the Sequelize database and start the server, logging that it is now listening for requests.
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
