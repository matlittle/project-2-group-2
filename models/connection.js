
const mysql = require('mysql');

console.log("./models/connection.js - loaded ============================")

if (process.env.JAWSDB_URL) {
    module.exports = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    module.exports = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : null,
        database : 'baggage_db'
    });
}
