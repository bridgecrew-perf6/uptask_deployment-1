const passport = require('passport');
const User = require('../models/User');
const sequelize = require('sequelize');
const Op = sequelize.Op;
const crypto = require('crypto');
const bcrypt = require('bcrypt-nodejs');
const emailHandler = require('../handlers/email')
// auth user
exports.authUser = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true,
  badRequestMessage: 'Email and Password are required'
});

// logout user
exports.logout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect('/login');
  })
}

// send token
exports.sendToken = async (req, res, next) => {
  const { email } = req.body;
  // verify if user exists

  //console.log(req.secure)

  try {
    const user = await User.findOne({ where: { email } });
    if(!user){
      //console.log('errors', res.locals.messages);
      req.flash('error', 'Email not found');
      res.redirect('/reset-password');
    }
    // user exists
    user.token = crypto.randomBytes(20).toString('hex');
    // expires on one hour
    user.expiration = Date.now() + 3600000;
    await user.save();
    // url for reset password
    const resetUrl = `${req.protocol}://${req.headers.host}/reset-password/${user.token}`;
    await emailHandler.send({
      email: user.email,
      subject: 'Reset Password',
      template: 'reset-password',
      templateVars: { resetUrl }
    });
    console.log(resetUrl);
    req.flash('correcto', 'We have sent an email');
    res.redirect('/login');
  } catch (error) {
    console.log(error);
  }
}

exports.validateTokenForm = async (req, res) => {
  try {
    const user = await User.findOne({ where: { token: req.params.token } });
    console.log(user);
    if(!user){
      req.flash('error', 'Not Valid');
      res.redirect('/reset-password');
    }
    //
    res.render('resetPassword', {
      pageName: 'Reset Password'
    })
  } catch (error) {
    console.log(error);
  }
}
// set a new password
exports.resetPassword = async (req, res) => {

  try {
    // verify token and also if token has not expired
    const user = await User.findOne({
      where: {
        token: req.params.token,
        expiration: {
          [Op.gte]: Date.now()
        }
      }
    });

    if(!user){
      req.flash('error', 'Not Valid');
      res.redirect('/reset-password');
    }
    // set new hashed password
    console.log(user)
    user.token = null;
    user.expiration = null;
    user.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    await user.save();
    req.flash('correct', 'Password created successfully');
    res.redirect('/login');

  } catch (error) {
    console.log(error);
  }

}

