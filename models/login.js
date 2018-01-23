const conn = require('./connection');

module.exports = {
  findUserById: function (id) {
    const query = `SELECT * FROM users WHERE id = ?`;

    return new Promise( (resolve, reject) => {
      conn.query(query, id, (err, res) => {
        if (err) reject(err);

        resolve(res);
      });
    });
  },
  
  //checkIfNameUsed: function (username) {
  findUserByName: function (username) {
    const query = `SELECT * FROM users WHERE username = ?`;

    return new Promise( (resolve, reject) => {
      conn.query(query, id, (err, res) => {
        if (err) reject(err);

        resolve(res);
      });
    });
  },

  createNewUser: function (username, password) {
    const query = `INSERT INTO users (username, password) VALUES(?, ?)`;

    return new Promise( (resolve, reject) => {
      conn.query(query, [username, hashword], (err, res) => {
        if (err) reject(err);

        resolve(res);
      });
    });
  }

}


