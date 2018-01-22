
const mysql = require('mysql');

if (process.env.JAWSDB_URL) {
    module.exports = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    module.exports = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'oblivion',
        database : 'burgers_db'
    });
}
