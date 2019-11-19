var blogDao = require('../dao/BlogDao');
var tagsDao = require('../dao/TagsDao');
var tagBlogMappingDao = require('../dao/TagBlogMappingDao');
var timeUtil = require('../util/TimeUtil');
var respUtil = require('../util/RespUtil');
var url = require('url');

var path = new Map();

function queryAllTag(request, response) {
    tagsDao.queryAllTag(function (result) {
        result.sort(function () {
            return Math.random() > 0.5 ? true : false;
        })
        response.writeHead(200);
        response.write(respUtil.writeRequest('success', '查询成功', result));
        response.end();
    })
}
path.set('/queryAllTag', queryAllTag);

function queryByTag(request, response) {
    var params = url.parse(request.url, true).query;
    tagsDao.queryTags(params.tag, function (result) {
        console.log(result)
        if (result == '' || result.length == 0) {
            response.writeHead(200);
            response.write(respUtil.writeRequest('success', '查询成功', result));
            response.end();
        } else {
            tagBlogMappingDao.queryByTag(result[0].id, parseInt(params.page), parseInt(params.pageSize), function (result) { 
                var blogList = [];
                for (var i = 0; i < result.length; i++) {
                    blogDao.queryBlogById(result[i].blog_id, function (result) {
                        for (var i = 0; i < result.length; i ++) {
                            result[i].content = result[i].content.replace(/<img[\w\W]*">/g, '');
                            result[i].content = result[i].content.replace(/<[\w\W]{1,5}>/g, '');
                            result[i].content = result[i].content.substring(0, 300);
                        }
                        blogList.push(result[0]);
                    })
                }
                getRequest(blogList, result.length, response);
            })
        }
    })
}
path.set('/queryByTag', queryByTag);

function queryByTagCount(request, response) {
    var params = url.parse(request.url, true).query;
    tagsDao.queryTags(params.tag, function (result) {
        tagBlogMappingDao.queryByTagCount(result[0].id, function (result) {
            response.writeHead(200);
            response.write(respUtil.writeRequest('success', '查询成功', result));
            response.end();
        })
    })
}
path.set('/queryByTagCount', queryByTagCount);

function getRequest(blogList, len, response) {
    if (blogList.length < len) {
        setTimeout(function () {
            getRequest(blogList, len, response);
        }, 10)
    } else {
        response.writeHead(200);
        response.write(respUtil.writeRequest('success', '查询成功', blogList));
        response.end();
    }
}

module.exports.path = path;