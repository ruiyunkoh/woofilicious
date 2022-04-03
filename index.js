const express = require("express");
const hbs = require("hbs");
const wax = require("wax-on");
const csrf = require('csurf');

require("dotenv").config();

const session = require('express-session');
const flash = require('connect-flash');
const FileStore = require('session-file-store')(session);

const { ORDER_STATUS } = require('./dal/orders');

// create an instance of express app
let app = express();

// set the view engine
app.set("view engine", "hbs");

// static folder
app.use(express.static("public"));

// setup wax-on
wax.on(hbs.handlebars);
wax.setLayoutPath("./views/layouts");

// enable forms
app.use(
  express.urlencoded({
    extended: false
  })
);

//set up sessions
app.use(session({
  store: new FileStore(),
  secret: process.env.SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: true
}));

app.use(flash())

// Register Flash middleware
app.use(function (req, res, next) {
  res.locals.success_messages = req.flash("success_messages");
  res.locals.error_messages = req.flash("error_messages");
  next();
});

//enable CSRF
app.use(csrf());

app.use(function (err, req, res, next) {
  if (err && err.code == "EBADCSRFTOKEN") {
    req.flash('error_messages', 'The form has expired. Please try again');
    res.redirect('back');
  } else {
    next()
  }
});

app.use(function (req, res, next) {
  res.locals.csrfToken = req.csrfToken();
  next();
});


// Share the user data with hbs files
app.use(function (req, res, next) {
  res.locals.user = req.session.user;
  next();
});


// import in routes
const landingRoutes = require('./routes/landing');
const productRoutes = require('./routes/products');
const userRoutes = require('./routes/users');
const cartRoutes = require('./routes/shoppingCart');
const checkoutRoutes = require('./routes/checkout');
const orderRoutes = require('./routes/orderManagement');

async function main() {
  app.use('/', landingRoutes);
  app.use('/products', productRoutes);
  app.use('/users', userRoutes);
  app.use('/cart', cartRoutes);
  app.use('/checkout', checkoutRoutes);
  app.use('/orders', orderRoutes);
}

// Add Handlebars helper
hbs.registerHelper('isAdmin', function (user) {
  const type = user?.type;
  return type === 'admin';
});
hbs.registerHelper('isNotPending', function (value) {
  return value !== ORDER_STATUS.PENDING;
});
hbs.registerHelper('isNotPaid', function (value) {
  return value !== ORDER_STATUS.PAID;
});
hbs.registerHelper('isNotProcessing', function (value) {
  return value !== ORDER_STATUS.PROCESSING;
});
hbs.registerHelper('isNotShipped', function (value) {
  return value !== ORDER_STATUS.SHIPPED;
});
hbs.registerHelper('isNotCompleted', function (value) {
  return value !== ORDER_STATUS.COMPLETED;
});

main();

app.listen(3000, () => {
  console.log("Server has started");
});