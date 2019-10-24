var blogDeatil = new Vue({
    el: '#blog_deatil',
    data: {
        title: '',
        content: '',
        views: null,
        ctime: '',
        tags: ''
    },
    computed: {},
    created() {
        var search = location.search.indexOf('?') > -1 ? location.search.split('?')[1].split('&') : '';
        if (search == '') {
            return;
        }
        var bid = -1;
        for (var i = 0; i < search.length; i++) {
            if (search[i].split('=')[0] == 'bid') {
                try {
                    bid = search[i].split('=')[1];
                } catch (e) {
                    console.log(e);
                }
            }
        }
        axios({
            method: 'get',
            url: '/queryBlogById?bid=' + bid
        }).then(function (resp) {
            var result = resp.data.data[0];
            blogDeatil.title = result.title;
            blogDeatil.content = result.content;
            blogDeatil.views = result.views;
            blogDeatil.ctime = result.ctime;
            blogDeatil.tags = result.tags;
        }).catch(function (resp) {
            console.log('请求失败');
        })
    }
});

var sendComment = new Vue({
    el: '#send_comment',
    data: {
        vcode: '',
        textCode: ''
    },
    computed: {
        changeCode() {
            return function () {
                axios({
                    method: 'get',
                    url: '/queryRandomCode'
                }).then(function (resp) {
                    sendComment.vcode = resp.data.data.data;
                    sendComment.textCode = resp.data.data.text;
                }).catch(function (resp) {
                    console.log('请求失败');
                })
            }
        },
        subComment() {
            return function () {
                var code = document.getElementById('comment_code').value;
                if (code != this.textCode) {
                    alert('验证码不正确');
                    return;
                }
                var search = location.search.indexOf('?') > -1 ? location.search.split('?')[1].split('&') : '';
                if (search == '') {
                    return;
                }
                var bid = -10;
                for (var i = 0; i < search.length; i++) {
                    if (search[i].split('=')[0] == 'bid') {
                        try {
                            bid = search[i].split('=')[1];
                        } catch (e) {
                            console.log(e);
                        }
                    }
                }
                var reply = document.getElementById('comment_reply').value;
                var replyName = document.getElementById('comment_reply_name').value;
                var name = document.getElementById('comment_name').value;
                var email = document.getElementById('comment_email').value;
                var content = document.getElementById('comment_content').value;

                axios({
                    method: 'get',
                    url: '/insertComment?bid=' + bid + '&parent=' + reply + '&parentName=' + replyName  +  '&userName=' + name + '&comments=' + content + '&email=' + email
                }).then(function (resp) {
                    alert(resp.data.msg)
                }).catch(function (resp) {
                    console.log('请求失败');
                })
            }
        }
    },
    created() {
        this.changeCode();
    }
});

var blogComment = new Vue({
    el: '#blog_comment',
    data: {
        total: 0,
        commentList: []
    },
    computed: {
        reply() {
            return function (commentId, userName) {
                document.getElementById('comment_reply').value = commentId;
                document.getElementById('comment_reply_name').value = userName;
                location.href = '#send_comment';
            }
        }
    },
    created() {
        var search = location.search.indexOf('?') > -1 ? location.search.split('?')[1].split('&') : '';
        if (search == '') {
            return;
        }
        var bid = -10;
        for (var i = 0; i < search.length; i++) {
            if (search[i].split('=')[0] == 'bid') {
                try {
                    bid = search[i].split('=')[1];
                } catch (e) {
                    console.log(e);
                }
            }
        }
        axios({
            method: 'get',
            url: '/queryCommentByBlogId?bid=' + bid
        }).then(function (resp) {
            blogComment.commentList = resp.data.data;
            for (var i = 0; i < blogComment.commentList.length; i ++) {
                if (blogComment.commentList[i].parent > -1) {
                    blogComment.commentList[i].options = '回复@' + blogComment.commentList[i].parent_name;
                }
            }
        }).catch(function (resp) {
            console.log('请求失败');
        });

        axios({
            method: 'get',
            url: '/queryCommentCountByBlogId?bid=' + bid
        }).then(function (resp) {
            blogComment.total = resp.data.data[0].count;
        });
    }
});