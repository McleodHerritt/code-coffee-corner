// isAuthenticated middleware definition
function isAuthenticated(req, res, next) {
  // Check if the session exists and has a user_id
  if (req.session && req.session.user_id) {
    // If the user is authenticated, proceed to the next middleware or route handler
    return next();
  } else {
    // If the user is not authenticated, redirect them to the login page
    res.redirect("/login");
  }
}
// Exporting the isAuthenticated function to be used as middleware in other parts of the application
module.exports = isAuthenticated;
