const User = require('../models/User')

exports.createAccountForm = (req, res) => {
  res.render('createAccount', {
    pageName: `Create User Account on UpTask`,
  })
}

exports.createAccount = async (req, res, next) => {
  const { email, password } = req.body;

  //console.log(email, password);

  try {
    await User.create({ email, password });
    res.redirect('/login');
  } catch (error) {
    req.flash('error', error.errors.map( error => error.message ))
    res.render('createAccount', {
      pageName: `Create User Account on UpTask`,
      messages: req.flash(),
      email,
      password,
    })
  }

}

exports.loginForm = async (req, res, next) => {
  const { error } = res.locals.messages
  res.render('login', {
    pageName: `Login on UpTask`,
    error,
  })
}

exports.resetPasswordForm = (req, res, next) => {
  res.render('sendToken', {
    pageName: `Reset Password`
  })
}