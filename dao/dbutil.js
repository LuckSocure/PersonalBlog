var mysql = require('mysql');
function createConnection () {
    var connection = mysql.createConnection({
        host: '192.168.1.103',
        port: 3306,
        user: 'root',
        password: '111111',
        database: 'my_blog'
    });
    return connection;
}

module.exports.createConnection = createConnection;