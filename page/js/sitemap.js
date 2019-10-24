var blogList = new Vue({
    el: '#blog_list',
    data: {
        blogListArr: []
    },
    computed: {},
    created() {
        axios({
            method: 'get',
            url: '/queryAllBlog'
        }).then(function (resp) {
            for (var i = 0; i < resp.data.data.length; i ++) {
                resp.data.data[i].link = '/blog_deatil.html?bid=' + resp.data.data[i].id;
            }
            blogList.blogListArr = resp.data.data;
        }).catch(function (resp) {
            console.log('请求失败');
        })
    }
})