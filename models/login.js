const conn = require('./connection');

console.log(`./models/login.js - loaded =================================`);

module.exports = {
  findUserById: function (id) {
    console.log(`./models/login.js - findUserByID ===========================`);
    console.log(`id: `, id);
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
    console.log(`./models/login.js - findUserByName =========================`);
    console.log('username: ', username);
    const query = `SELECT * FROM users WHERE username = ?`;

    return new Promise( function (resolve, reject) {
      conn.query(query, username, function (err, res) {
        if (err) reject(err);

        console.log(`res: `, res);

        resolve(res);
      });
    });
  },

  createNewUser: function (username, password) {
    console.log(`./models/login.js - createNewUser ==========================`);
    console.log('username: ', username);
    console.log('password: ', password);
    
    const query = `INSERT INTO users (username, password) VALUES(?, ?)`;

    return new Promise( (resolve, reject) => {
      conn.query(query, [username, password], (err, res) => {
        if (err) reject(err);

        resolve(res);
      });
    });
  }

}


