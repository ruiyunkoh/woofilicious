const checkIfAuthenticated = (req, res, next) => {
  if (req.session?.user?.type == 'admin') {
    next();
  } else {
    req.flash("error_messages", "You need to be authorised to access this page");
    res.redirect('/users/login');
  }
}

const checkIfLogin = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    req.flash("error_messages", "Please log in to proceed.");
    res.redirect('/users/login');
  }
}

module.exports = {
  checkIfAuthenticated,
  checkIfLogin
}