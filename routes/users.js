const express = require("express");
const router = express.Router();
const crypto = require('crypto');

// import in the User model
const {
  User
} = require('../models');

const {
  createRegistrationForm,
  createLoginForm,
  bootstrapField
} = require('../forms');

const getHashedPassword = (password) => {
  const sha256 = crypto.createHash('sha256');
  const hash = sha256.update(password).digest('base64');
  return hash;
}

//Registration form

router.get('/register', (req, res) => {

  const registerForm = createRegistrationForm();
  res.render('users/register', {
    'form': registerForm.toHTML(bootstrapField)
  })
});

router.post('/register', (req, res) => {
  const registerForm = createRegistrationForm();
  registerForm.handle(req, {
    success: async (form) => {
      const user = new User({
        'username': form.data.username,
        'password': getHashedPassword(form.data.password),
        'email': form.data.email
      });
      await user.save();
      req.flash("success_messages", "Account created successfully!");
      res.redirect('/users/login')
    },
    'error': (form) => {
      res.render('users/register', {
        'form': form.toHTML(bootstrapField)
      })
    }
  })
});

// Log in page

router.get('/login', (req, res) => {
  const loginForm = createLoginForm();
  res.render('users/login', {
    'form': loginForm.toHTML(bootstrapField)
  })
});

router.post('/login', async (req, res) => {
  const loginForm = createLoginForm();
  loginForm.handle(req, {
    'success': async (form) => {
      let user = await User.where({
        'email': form.data.email
      }).fetch({
        require: false
      });

      if (!user) {
        req.flash("error_messages", "User details are not correct.")
        res.redirect('/users/login');
      } else {
        if (user.get('password') === getHashedPassword(form.data.password)) {
          req.session.user = {
            id: user.get('id'),
            username: user.get('username'),
            email: user.get('email'),
            type: user.get('type')
          }
          req.flash("success_messages", "Welcome back, " + user.get('username'));
          res.redirect('/users/profile');
        } else {
          req.flash("error_messages", "User details are not correct.")
          res.redirect('/users/login')
        }
      }
    },
    'error': (form) => {
      req.flash("error_messages", "There are some problems logging you in. Please fill in your log in details again")
      res.render('users/login', {
        'form': form.toHTML(bootstrapField)
      })
    }
  })
});

// User profile

router.get('/profile', (req, res) => {
  const user = req.session.user;
  if (!user) {
    req.flash('error_messages', 'You do not have permission to view this page');
    res.redirect('/users/login');
  } else {
    res.render('users/profile', {
      'user': user
    })
  }

});

router.get('/logout', (req, res) => {
  req.session.user = null;
  req.flash('success_messages', "Goodbye");
  res.redirect('/users/login');
});

module.exports = router;