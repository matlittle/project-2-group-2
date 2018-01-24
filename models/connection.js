
const mysql = require('mysql');

if (process.env.JAWSDB_URL) {
    module.exports = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    module.exports = mysql.createConnection({
        host     : 'localhost',
        user     : 'project2',
        password : 'Project2Password',
        database : 'baggage_db'
    });
}
