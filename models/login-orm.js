
/* Dependencies */

/* OLD 
 * var pg = require('pg-promise')(process.env.DATABASE_URL);
 */
const mysql = require('mysql');
const conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'oblivion',
  database : 'baggage_db'
});


/* Get access token */
module.exports.getAccessToken = function(bearerToken) {
  const query =  
    `SELECT access_token, access_token_expires_on, client_id, 
    refresh_token, refresh_token_expires_on, user_id 
      FROM oauth_tokens WHERE access_token = ?`;
  
  return new Promise( (resolve, reject) => {
    conn.query(query, [bearerToken], (err, res) => {
      if (err) reject(err);

      let token = res.rows[0];

      resolve({
        accessToken: token.access_token,
        client: {id: token.client_id},
        expires: token.expires,
        user: {id: token.userId}, // could be any object
      });
    });
  })
  
  /* OLD
   *
      return pg.query('SELECT access_token, access_token_expires_on, client_id, refresh_token, refresh_token_expires_on, user_id FROM oauth_tokens WHERE access_token = $1', [bearerToken])
        .then(function(result) {
        var token = result.rows[0];
          return {
            accessToken: token.access_token,
            client: {id: token.client_id},
            expires: token.expires,
            user: {id: token.userId}, // could be any object
          };
        });
   */
};


/* Get client */
module.exports.getClient = function *(clientId, clientSecret) {
  const query =  
    `SELECT client_id, client_secret, redirect_uri 
      FROM oauth_clients 
      WHERE client_id = ? AND client_secret = ?`;
  
  return new Promise( (resolve, reject) => {
    conn.query(query, [clientId, clientSecret], (err, res) => {
      if (err) reject(err);

      let oAuthClient = res.rows[0];

      if (!oAuthClient) {
        resolve();
      }

      resolve({
        clientId: oAuthClient.client_id,
        clientSecret: oAuthClient.client_secret,
        grants: ['password'], // the list of OAuth2 grant types that should be allowed
      });
    });
  })

  /* OLD
   * 
    return pg.query('SELECT client_id, client_secret, redirect_uri FROM oauth_clients WHERE client_id = $1 AND client_secret = $2', [clientId, clientSecret])
      .then(function(result) {
        var oAuthClient = result.rows[0];

        if (!oAuthClient) {
          return;
        }

        return {
          clientId: oAuthClient.client_id,
          clientSecret: oAuthClient.client_secret,
          grants: ['password'], // the list of OAuth2 grant types that should be allowed
        };
      });
  */
  
};


/* Get refresh token */
module.exports.getRefreshToken = function *(bearerToken) {
  const query =  
    `SELECT access_token, access_token_expires_on, client_id, refresh_token, 
    refresh_token_expires_on, user_id 
      FROM oauth_tokens WHERE refresh_token = ?`

  return new Promise( (resolve, reject) => {
    conn .query(query, [bearerToken], (err, res) => {
      if(err) reject(err);

      resolve(res.rowCount ? res.rows[0] : false);
    });
  });

  /* OLD
   * return pg.query('SELECT access_token, access_token_expires_on, client_id, refresh_token, refresh_token_expires_on, user_id FROM oauth_tokens WHERE refresh_token = $1', [bearerToken])
      .then(function(result) {
        return result.rowCount ? result.rows[0] : false;
      });
   */
};


/* Get user */
module.exports.getUser = function *(username, password) {
  const query = 
    `SELECT id FROM users 
      WHERE username = ? AND password = ?`

  return new Promise( (resolve, reject) => {
    conn.query(query, [username, password], (err, res) => {
      if(err) reject(err);

      resolve(result.rowCount ? result.rows[0] : false);
    });
  });

  /* OLD
   * return pg.query('SELECT id FROM users WHERE username = $1 AND password = $2', [username, password])
      .then(function(result) {
        return result.rowCount ? result.rows[0] : false;
      }); 
  */
};


/* Save token */
module.exports.saveAccessToken = function *(token, client, user) {
  const query = 
    `INSERT INTO oauth_tokens(access_token, access_token_expires_on, client_id, 
    refresh_token, refresh_token_expires_on, user_id) 
      VALUES (?, ?, ?, ?, ?, ?)`

  const queryArray = [
    token.accessToken,
    token.accessTokenExpiresOn,
    client.id,
    token.refreshToken,
    token.refreshTokenExpiresOn,
    user.id
  ];

  return new Promise( (resolve, reject) => {
    conn.query(query, queryArray, (err, res) => {
      if(err) reject(err);

      resolve(res.rowCount ? res.rows[0] : false)
    });
  });

  /* OLD
    return pg.query('INSERT INTO oauth_tokens(access_token, access_token_expires_on, client_id, refresh_token, refresh_token_expires_on, user_id) VALUES ($1, $2, $3, $4)', [
      token.accessToken,
      token.accessTokenExpiresOn,
      client.id,
      token.refreshToken,
      token.refreshTokenExpiresOn,
      user.id
    ]).then(function(result) {
      return result.rowCount ? result.rows[0] : false; // TODO return object with client: {id: clientId} and user: {id: userId} defined
    });
   */
};
