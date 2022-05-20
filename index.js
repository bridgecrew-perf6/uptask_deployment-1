const express = require('express');
const router = express.Router();
const publicRoutes = require('./routes/public');
const userLoggedIn = require('./middleware/userLoggedIn');
const authRoutes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');
//const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('./config/passport');
require('dotenv').config({ path: 'vars.env' });
const helpers = require('./helpers');
// db connection
const db = require('./config/db');
// import models

require('./models');
db.sync()
  .then(() => console.log('Db Connection'))
  .catch( e => console.log(e) );
// express app
const app = express();
// static files
app.use(express.static('public'));
// set up template engine
app.set('view engine', 'pug');
// set up body parser to read user requests
app.use(bodyParser.urlencoded({extended: true}));
// add express validator
//app.use(expressValidator());

// folder views
app.set('views', path.join(__dirname, './views'));
// flash messages
app.use(flash());
// use cookie-parser for save information on client side
app.use(cookieParser());
// use node-sessions for storing users sessions
app.use(session({
  secret: '234WEGW$@#$&U^HT#$#$#T#$%>>E<R>#>$T',
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session())
// pass global variables to application
app.use((req, res, next) => {
  //console.log(req.secure);
  res.locals.vardump = helpers.vardump;
  res.locals.messages = req.flash();
  res.locals.user = { ...req.user } || null;

  next();
});

// routes
app.use('/', publicRoutes(router));
app.use(userLoggedIn);
app.use('/', authRoutes(router));

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;

app.listen(port, host, () => {
  console.log(`Server running on port ${port} `)
});

