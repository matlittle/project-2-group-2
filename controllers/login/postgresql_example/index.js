
/* Dependencies */
var bodyParser = require('body-parser');
var express = require('express');
var oauthServer = require('express-oauth-server');
//var render = require('co-views')('views');
//var util = require('util');

// Create an Express application.
var app = express();

// Add body parser.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Add OAuth server.
app.oauth = oauthServer({
  model: require('./model')
});

// Post token.
app.post('/oauth/token', app.oauth.token());

// Get authorization.
app.get('/oauth/authorize', function(req, res) {
  // Redirect anonymous users to login page.
  if (!req.app.locals.user) {
    return res.redirect(`/login?redirect=${req.path}&client_id=${req.query.client_id}&redirect_uri=${req.query.redirect_uri}`);
  }

  return render('authorize', {
    client_id: req.query.client_id,
    redirect_uri: req.query.redirect_uri
  });
});

// Post authorization.
app.post('/oauth/authorize', function(req, res) {
  // Redirect anonymous users to login page.
  if (!req.app.locals.user) {
    return res.redirect(`/login?client_id=${req.query.client_id}&redirect_uri=${req.query.redirect_uri}`);
  }

  return app.oauth.authorize();
});

// Get login.
app.get('/login', function(req) {
  return render('login', {
    redirect: req.query.redirect,
    client_id: req.query.client_id,
    redirect_uri: req.query.redirect_uri
  });
});

// Post login.
app.post('/login', function(req, res) {
  // @TODO: Insert your own login mechanism.
  if (req.body.email !== 'thom@nightworld.com') {
    return render('login', {
      redirect: req.body.redirect,
      client_id: req.body.client_id,
      redirect_uri: req.body.redirect_uri
    });
  }

  // Successful logins should send the user back to /oauth/authorize.
  var path = req.body.redirect || '/home';

  return res.redirect(`/${path}?client_id=${req.query.client_id}&redirect_uri=${req.query.redirect_uri}`);
});

// Get secret.
app.get('/secret', app.oauth.authenticate(), function(req, res) {
  // Will require a valid access_token.
  res.send('Secret area');
});

app.get('/public', function(req, res) {
  // Does not require an access_token.
  res.send('Public area');
});

// Start listening for requests.
app.listen(3000, () => {
  console.log(`App listening at http://localhost:3000`);
});
