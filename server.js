
/* Dependencies */
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

const passport = require('passport');
const flash = require('connect-flash');

//const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');

//Heroku SSL redirect
const sslRedirect = require('heroku-ssl-redirect');
app.use(sslRedirect());

/* TEMP FOR LOGIN TESTS */
app.set('view engine', 'ejs');

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
//app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("./public"));

// required for passport
app.use(session({
  secret: 'beerisgood',   // session secret
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
// attach login routes to express server
require('./controllers/login-routes.js')(app, passport);
// attach html routes that server pages
require('./controllers/html-routes.js')(app);
// attach api routes to interact with data
require('./controllers/api-routes.js')(app);

// launch ======================================================================
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});



