const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// get user modal
const User = require('../models/User');
// local strategy - login with user and password
passport.use(
  new LocalStrategy(
    // by default password expects an user and password
    // rewrite this behaviour with the following configuration
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    // function to validate users login
    async (email, password, done) => {
      try {
        const user = await User.findOne({ where: { email } });
        // if user exists, but password doesn't match
        if(!user.verifyPassword(password)){
          return done(null, false, {
            message: 'Password wrong'
          })
        }
        // return user found
        return done(null, user)
      } catch (error) {
        // user doesn't exist
        // error, user, message
        return done(null, false, {
          message: 'User does not exist'
        })
      }
    }
  )
)

// serialize user
passport.serializeUser((user, callback) => {
  callback(null, user);
});
// deserialize user
passport.deserializeUser((user, callback) => {
  callback(null, user);
});

module.exports = passport;