module.exports = (req, res, next) => {
  //console.log(req);
  // if user is authenticated, go on
  if(req.isAuthenticated()){
    return next();
  }
  // otherwise, go back to login
  return res.redirect('/login');
}