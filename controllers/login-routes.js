
module.exports = function (app, passport) {

  // LOGIN ===============================
  // process the login form
  app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/', // redirect to the secure profile section
		failureRedirect : '/login', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
  }));


  // SIGNUP ==============================
  // process the signup form
  app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));


  // LOGOUT ==============================
  app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });
};
