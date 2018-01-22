
/* Dependencies */
const express = require('express');
const app = express();

const PORT = 8081;

// Add body parser as middleware to parse json in request bodies
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Add OAuth server.
var oauthServer = require('express-oauth-server');
app.oauth = oauthServer({
  model: require('./models/login-orm')
});

// Add login routes to express server
require('./controllers/login-routes')(app);

/* Examples for routes that will require authentication, vs public routes */
// Get secret.
app.get('/secret', app.oauth.authenticate(), function(req, res) {
  // Will require a valid access_token.
  res.send('Secret area');
});

app.get('/public', function(req, res) {
  // Does not require an access_token.
  res.send('Public area');
});

/* End examples */


// Start listening for requests.
app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
