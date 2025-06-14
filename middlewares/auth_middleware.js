// Middleware to check login
export function isAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  }
  return res.redirect("/login?error=Please login first");
}