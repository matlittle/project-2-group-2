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
  findUserByName: function (email) {
    console.log(`./models/login.js - findUserByName =========================`);
    console.log('email: ', email);
    const query = `SELECT * FROM users WHERE email = ?`;

    return new Promise( function (resolve, reject) {
      conn.query(query, email, function (err, res) {
        if (err) reject(err);

        console.log(`res: `, res);

        resolve(res);
      });
    });
  },

  createNewUser: function (email, password) {
    console.log(`./models/login.js - createNewUser ==========================`);
    console.log('email: ', email);
    console.log('password: ', password);
    
    const query = `INSERT INTO users (email, password) VALUES(?, ?)`;

    return new Promise( (resolve, reject) => {
      conn.query(query, [email, password], (err, res) => {
        if (err) reject(err);

        resolve(res);
      });
    });
  }

}


