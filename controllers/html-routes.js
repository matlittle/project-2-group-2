
module.exports = function (app) {
  // HOME PAGE (with login links) ========
  app.get('/', function (req, res) {
    res.render('index.ejs'); // load the index.ejs file
  });

  //About
  //show the about PAGE
  app.get('/about', function(req, res) {
    res.render('about.ejs', { message: req.flash('aboutMessage') });
  });

  // SIGNUP ==============================
  // show the signup form
  app.get('/signup', function (req, res) {
    // render the page and pass in any flash data if it exists
    res.render('signup.ejs', { message: req.flash('signupMessage') });
  });


  // LOGIN ===============================
  // show the login form
  app.get('/login', function (req, res) {
    // render the page and pass in any flash data if it exists
    res.render('login.ejs', { message: req.flash('loginMessage') });
  });


  // RESOURCES ===============================
  // show the login form
  app.get('/resources/:id', function (req, res) {
    //req.params.id
    let sId = req.params.id;
    console.log(req.params);
    console.log(sId);
    var type;

    if (sId === "1") {type = "anxiety"};
    if (sId === "2") {type = "depression"};
    if (sId === "3") {type = "adhd"};
    if (sId === "4") {type = "ptsd"};
    
    console.log(type);

    // render the page and pass in any flash data if it exists
    res.render('resources.ejs', { 
      message: req.flash('resourcesMessage'),
      type: type
    });
  });

  // PROFILE SECTION =====================
  // we will want this protected so you have to be logged in to visit
  // we will use route middleware to verify this (the isLoggedIn function)
  app.get('/profile', isLoggedIn, function (req, res) {
    console.log('./controllers/login-routes.js - GET /profile ===============');
    console.log('req.user: ', req.user);

    res.render('profile.ejs', {
      user: req.user[0] // get the user out of session and pass to template
    });
  });

}


// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) {
    return next();
  }

  // if they aren't redirect them to the home page
  res.redirect('/');
}
