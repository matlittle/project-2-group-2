module.exports = function(app) {
  // Post token.
  app.post('/oauth/token', app.oauth.token());

  // Get authorization.
  app.get('/oauth/authorize', function(req, res) {
    // Redirect anonymous users to login page.
    if (!req.app.locals.user) {
        return res.redirect(`/login?redirect=${req.path}&client_id=${req.query.client_id}&redirect_uri=${req.query.redirect_uri}`);
    }

    /* Test response */
    res.json({
      client_id: req.query.client_id,
      redirect_uri: req.query.redirect_uri,
      from: '/oauth/authorize'
    });

    /* OLD
        return render('authorize', {
        client_id: req.query.client_id,
        redirect_uri: req.query.redirect_uri
        });
    */
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

    res.json({
        redirect: req.query.redirect,
        client_id: req.query.client_id,
        redirect_uri: req.query.redirect_uri,
        from: '/login'
    });


    /* OLD
        return render('login', {
        redirect: req.query.redirect,
        client_id: req.query.client_id,
        redirect_uri: req.query.redirect_uri
        });
    */
  });

  // Post login.
  app.post('/login', function(req, res) {
    // @TODO: Insert your own login mechanism.
    if (req.body.email !== 'thom@nightworld.com') {

      res.json({
        redirect: req.body.redirect,
        client_id: req.body.client_id,
        redirect_uri: req.body.redirect_uri,
        from: '/login'
      })

      /* OLD
      return render('login', {
          redirect: req.body.redirect,
          client_id: req.body.client_id,
          redirect_uri: req.body.redirect_uri
      });
      */
    }

    // Successful logins should send the user back to /oauth/authorize.
    var path = req.body.redirect || '/home';

    return res.redirect(`/${path}?client_id=${req.query.client_id}&redirect_uri=${req.query.redirect_uri}`);
  });
}