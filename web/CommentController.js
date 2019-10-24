var blogDao = require('../dao/BlogDao');
var tagsDao = require('../dao/TagsDao');
var tagBlogMappingDao = require('../dao/TagBlogMappingDao');
var commentDao = require('../dao/CommentDao');
var timeUtil = require('../util/TimeUtil');
var respUtil = require('../util/RespUtil');
var url = require('url');
var captcha = require('svg-captcha');

var path = new Map();

function insertComment (request, response) {
    var params = url.parse(request.url, true).query;
    commentDao.insertComment(parseInt(params.bid), params.parent, params.parentName, params.userName, params.comments, params.email, timeUtil.getNow(), timeUtil.getNow(), function (result) {
        response.writeHead(200);
        response.write(respUtil.writeRequest('success', '评论成功', null));
        response.end();
    })
}
path.set('/insertComment', insertComment);

function queryRandomCode (request, response) {
    var img = captcha.create({fontSize: 50, width: 100, height: 34});
    response.writeHead(200);
    response.write(respUtil.writeRequest('success', '查询成功', img));
    response.end();
}
path.set('/queryRandomCode', queryRandomCode);

function queryCommentByBlogId (request, response) {
    var params = url.parse(request.url, true).query;
    commentDao.queryCommentByBlogId(parseInt(params.bid), function (result) {
        response.writeHead(200);
        response.write(respUtil.writeRequest('success', '查询成功', result));
        response.end();
    })
}
path.set('/queryCommentByBlogId', queryCommentByBlogId);

function queryCommentCountByBlogId (request, response) {
    var params = url.parse(request.url, true).query;
    commentDao.queryCommentCountByBlogId(parseInt(params.bid), function (result) {
        response.writeHead(200);
        response.write(respUtil.writeRequest('success', '查询成功', result));
        response.end();
    })    
}
path.set('/queryCommentCountByBlogId', queryCommentCountByBlogId);

function queryNewComments (request, response) {
    commentDao.queryNewComments(7, function (result) {
        response.writeHead(200);
        response.write(respUtil.writeRequest('success', '查询成功', result));
        response.end();
    })
}
path.set('/queryNewComments', queryNewComments);

module.exports.path = path;