var everyDayDao = require('../dao/EveryDayDao');
var timeUtil = require('../util/TimeUtil');
var respUtil = require('../util/RespUtil');

var path = new Map();

function editEveryDay (request, response) {
    request.on('data', function (data) {
        everyDayDao.insertEveryDay(data.toString(), timeUtil.getNow(), function (result) {
            response.writeHead(200);
            response.write(respUtil.writeRequest('success', '添加成功', null));
            response.end();
        });
    })
}
path.set('/editEveryDay', editEveryDay);

function queryEveryDay (request, response) {
    everyDayDao.queryEveryDay(function (result) {
        response.writeHead(200);
        response.write(respUtil.writeRequest('success', '添加成功', result));
        response.end();
    });
}
path.set('/queryEveryDay', queryEveryDay);

module.exports.path = path;