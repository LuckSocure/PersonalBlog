var dbutil = require('./dbutil');

function insertTags (tag, ctime, utime, success) {
    var insertSql = 'insert into tags (`tag`, `ctime`, `utime`) values (?, ?, ?)';
    var params = [tag, ctime, utime];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql, params, function (error, result) {
        if (error == null) {
            success(result);
        }else{
            console.log(error);
        }
    });
    connection.end();
}

function queryTags (tag, success) {
    var querySql = 'select * from tags where tag = ?';
    var params = [tag];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, function (error, result) {
        if (error == null) {
            success(result);
        }else{
            console.log(error);
        }
    });
    connection.end();
}

function queryAllTag (success) {
    var querySql = 'select * from tags';
    var params = [];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, function (error, result) {
        if (error == null) {
            success(result);
        }else{
            console.log(error);
        }
    });
    connection.end();
}

module.exports.insertTags = insertTags;
module.exports.queryTags = queryTags;
module.exports.queryAllTag = queryAllTag;

