function isAuthenticated(req, res, next) {
  if (req.session && req.session.user_id) {
    return next();
  } else {
    res.redirect("/login");
  }
}

module.exports = isAuthenticated;
