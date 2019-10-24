var everyDay = new Vue({
    el: '#every_day',
    data: {
        content: 'sabdjkagbfjhkgbsajklb;nfkjl'
    },
    computed: {
        getContent() {
            return this.content;
        }
    },
    created() {
        // 请求数据，赋值content
        axios({
            method: 'get',
            url: '/queryEveryDay'
        }).then(function (resp) {
            everyDay.content = resp.data.data[0].content;
        }).catch(function (resp) {
            console.log('请求失败');
        })
    }
});

var articleList = new Vue({
    el: '#article_list',
    data: {
        page: 1,
        pageSize: 5,
        count: 0,
        pageNumList: [],
        articleArr: []
    },
    computed: {
        jumpTo() {
            return function (page) {
                this.getPage(page, this.pageSize);
            }
        },
        getPage() {
            return function (page, pageSize) {
                var search = location.search.indexOf('?') > -1 ? location.search.split('?')[1].split('&') : '';
                
                var tag = '';
                for (var i = 0; i < search.length; i++) {
                    if (search[i].split('=')[0] == 'tag') {
                        try {
                            tag = search[i].split('=')[1];
                        } catch (e) {
                            console.log(e);
                        }
                    }
                }

                if (tag == '') {
                    axios({
                        method: 'get',
                        url: '/queryBlogByPage?page=' + (page - 1) + '&pageSize=' + pageSize
                    }).then(function (resp) {
                        var list = [];
                        var result = resp.data.data;
                        for (var i = 0; i < result.length; i++) {
                            var temp = {};
                            temp.title = result[i].title;
                            temp.content = result[i].content;
                            temp.data = result[i].ctime;
                            temp.views = result[i].views;
                            temp.tags = result[i].tags;
                            temp.id = result[i].id;
                            temp.link = '/blog_deatil.html?bid=' + result[i].id;
                            list.push(temp);
                        }
                        articleList.articleArr = list;
                        articleList.page = page;
                    }).catch(function (resp) {
                        console.log('请求失败');
                    })

                    axios({
                        method: 'get',
                        url: '/queryBlogCount'
                    }).then(function (resp) {
                        articleList.count = resp.data.data[0].count;
                        articleList.generatePageTool;
                    })
                } else {
                    axios({
                        method: 'get',
                        url: '/queryByTag?page=' + (page - 1) + '&pageSize=' + pageSize + '&tag=' + tag
                    }).then(function (resp) {
                        var list = [];
                        var result = resp.data.data;
                        for (var i = 0; i < result.length; i++) {
                            var temp = {};
                            temp.title = result[i].title;
                            temp.content = result[i].content;
                            temp.data = result[i].ctime;
                            temp.views = result[i].views;
                            temp.tags = result[i].tags;
                            temp.id = result[i].id;
                            temp.link = '/blog_deatil.html?bid=' + result[i].id;
                            list.push(temp);
                        }
                        articleList.articleArr = list;
                        articleList.page = page;
                    })

                    axios({
                        method: 'get',
                        url: '/queryByTagCount?tag=' + tag
                    }).then(function (resp) {
                        articleList.count = resp.data.data[0].count;
                        articleList.generatePageTool;
                    })
                }
            }
        },
        generatePageTool() {
            var nowPage = this.page,
                pageSize = this.pageSize,
                count = this.count,
                result = [];
            result.push({
                text: '<<',
                page: 1
            });
            if (nowPage > 2) {
                result.push({
                    text: nowPage - 2,
                    page: nowPage - 2
                });
            }
            if (nowPage > 1) {
                result.push({
                    text: nowPage - 1,
                    page: nowPage - 1
                });
            }
            result.push({
                text: nowPage,
                page: nowPage
            });
            if (nowPage + 1 <= (count + pageSize - 1) / pageSize) {
                result.push({
                    text: nowPage + 1,
                    page: nowPage + 1
                });
            }
            if (nowPage + 2 <= (count + pageSize - 1) / pageSize) {
                result.push({
                    text: nowPage + 2,
                    page: nowPage + 2
                });
            }
            result.push({
                text: '>>',
                page: parseInt((count + pageSize - 1) / pageSize)
            });
            this.pageNumList = result;
            return result;
        }
    },
    created() {
        this.getPage(this.page, this.pageSize);
    }
});