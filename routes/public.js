const authController = require('../controllers/authController');
const usersController = require('../controllers/usersController')

module.exports = (router) => {
  // create user account
  router.get('/create-account', usersController.createAccountForm)
  router.post('/create-account', usersController.createAccount)
  // user login
  router.get('/login', usersController.loginForm)
  router.post('/login', authController.authUser)

   // reset password
  router.get('/reset-password', usersController.resetPasswordForm)
  router.post('/reset-password', authController.sendToken)
  router.get('/reset-password/:token', authController.validateTokenForm)
  router.post('/reset-password/:token', authController.resetPassword)

  return router;
}