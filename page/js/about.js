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
               
                var bid = -1;
                
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
        var bid = -1;
    
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