var rightTag = new Vue({
    el: '#right_tag',
    data: {
        tags: []
    },
    computed: {
        randomColor () {
            return function () {
                var red = Math.random() * 245 + 10;
                var green = Math.random() * 245 + 10;
                var blue = Math.random() * 245 + 10;
                return 'rgb(' + red + ',' + green + ',' + blue + ')';
            }
        },
        randomSize () {
            return function () {
                var size = Math.random() * 10 + 10;
                return size + 'px';
            }
        }
    },
    created () {
        axios({
            method: 'get',
            url: '/queryAllTag'
        }).then(function (resp) {
            var result = [];
            for (var i = 0; i < resp.data.data.length; i ++) {
                var temp = {};
                temp.tag = resp.data.data[i].tag;
                temp.link = '/?tag=' + resp.data.data[i].tag;
                result.push(temp);
            }
            rightTag.tags = result;
        })
    }
});

var newsHot = new Vue({
    el: '#news_hot',
    data: {
        hotList: []
    },
    computed: {},
    created () {
        axios({
            method: 'get',
            url: '/queryHotBlog'
        }).then(function (resp) {
            var result = [];
            for (var i = 0; i < resp.data.data.length; i ++) {
                var temp = {};
                temp.title = resp.data.data[i].title;
                temp.link = '/blog_deatil.html?bid=' + resp.data.data[i].id;
                result.push(temp);
            }
            newsHot.hotList = result;
        })
    }
});

var newsComments = new Vue({
    el: '#news_comments',
    data: {
        commentList: []
    },
    computed: {},
    created () {
        axios({
            method: 'get',
            url: '/queryNewComments'
        }).then(function (resp) {
            var result = [];
            for (var i = 0; i < resp.data.data.length; i ++) {
                var temp = {};
                temp.title = resp.data.data[i].user_name;
                temp.data = resp.data.data[i].ctime;
                temp.comment = resp.data.data[i].comments;
                result.push(temp);
            }
            newsComments.commentList = result;
        })
    }
});