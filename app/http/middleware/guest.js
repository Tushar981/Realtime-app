//if the user is logged in so he is not be go to the registration and login in page for that we use middleware

function auth(req, res, next) {
  if (req.isAuthenticated()) {
    // isAuthenticated is provided by the passport
    return next();
  }
  return res.render('auth/login');
}

module.exports = auth;
