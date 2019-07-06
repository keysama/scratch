const index = r => require.ensure([],() => r(require('../views/index/index.vue')),'index')
const login = r => require.ensure([],() => r(require('../views/account/login.vue')),'login')
const forget = r => require.ensure([],() => r(require('../views/account/forget.vue')),'forget')
const registe = r => require.ensure([],() => r(require('../views/account/registe.vue')),'registe')
const loginHandle = r => require.ensure([],() => r(require('../views/account/loginHandle.vue')),'loginHandle')

const mypage = r => require.ensure([],() => r(require('../views/mypage/index.vue')),'mypage')

const introduce = r => require.ensure([],() => r(require('../views/introduce/index.vue')),'introduce')
const introduce_chapters = r => require.ensure([],() => r(require('../views/introduce/children/chapters.vue')),'introduce_chapters')
const introduce_article = r => require.ensure([],() => r(require('../views/introduce/children/article.vue')),'introduce_article')
const introduce_articles = r => require.ensure([],() => r(require('../views/introduce/children/articles.vue')),'introduce_articles')

const news = r => require.ensure([],() => r(require('../views/news/index.vue')),'news')
const news_detail = r => require.ensure([],() => r(require('../views/news/detail.vue')),'news_detail')

const match = r => require.ensure([],() => r(require('../views/match/index.vue')),'match')
const match_detail = r => require.ensure([],() => r(require('../views/match/detail.vue')),'match_detail')

const mypage_productions = r => require.ensure([],() => r(require('../views/mypage/children/productions.vue')),'mypage_productions')
const mypage_collect = r => require.ensure([],() => r(require('../views/mypage/children/collect.vue')),'mypage_collect')
const mypage_detail = r => require.ensure([],() => r(require('../views/mypage/children/detail.vue')),'mypage_detail')

const scratch = r => require.ensure([],() => r(require('../views/scratch/index.vue')),'scratc')
const scratch_create = r => require.ensure([],() => r(require('../views/scratch/create.vue')),'scratch_create')
const scratch_edit = r => require.ensure([],() => r(require('../views/scratch/edit.vue')),'scratch_edit')
const scratch_test = r => require.ensure([],() => r(require('../views/scratch/test.vue')),'scratch_test')

const search = r => require.ensure([],() => r(require('../views/search/index.vue')),'search');

const message = r => require.ensure([],() => r(require('../views/message/index.vue')),'message');
const message_index = r => require.ensure([],() => r(require('../views/message/children/index.vue')),'message_index');
const message_good = r => require.ensure([],() => r(require('../views/message/children/good.vue')),'message_good');
const message_reply = r => require.ensure([],() => r(require('../views/message/children/reply.vue')),'message_reply');

export default [
    {						//一级路由
        path:'',			//www.xxx.com/#/
        redirect:'/index'	//为空的时候调转到/index
    },
    {
        path:'/index',
        component:index,		//www.xxx.com/#/index
    },
    {
        path:"/login",
        component:login
    },
    {
        path : '/loginHandle/:u/:p',
        component : loginHandle
    },
    {
        path:"/registe",
        component:registe
    },
    {
        path:"/forget",
        component:forget
    },
    {
        path:"/mypage",
        component:mypage,
        meta:{checkLogin:true},
        children : [
            {
                path:'',
                redirect:'/mypage/production'
            },
            {
                path:'production',
                component:mypage_productions ,
                meta:{checkLogin:true}
            },
            {
                path:'collect',
                component:mypage_collect,
                meta:{checkLogin:true}
            },
            {
                path:'detail',
                component:mypage_detail,
                meta:{checkLogin:true}
            }
        ]
    },
    {
        path:"/introduce",
        component:introduce,
        children : [
            {
                path : '',
                redirect:'/introduce/chapters'
            },
            {
                path : 'chapters',
                component : introduce_chapters
            },
            {
                path : 'chapters/:id',
                component : introduce_articles
            },
            {
                path : 'article/:id',
                component : introduce_article
            }
        ]
    },
    {
        path:"/news",
        component:news
    },
    {
        path:"/news/:id",
        component:news_detail
    },
    {
        path:"/match",
        component:match
    },
    {
        path:"/match/:id",
        component:match_detail
    },
    {
        path:"/play/:id",
        component:scratch
    },
    {
        path:"/scratch3.0",
        component:scratch_create
    },
    {
        path:"/edit/:id",
        component:scratch_edit
    },
    {
        path:"/search/:key",
        component:search
    },
    {
        path:"/search",
        component:search
    },
    {
        path:"/message",
        component:message,
        children : [
            {
                path:"",
                redirect:"index"
            },
            {
                path:"index",
                component:message_reply
            },
            {
                path:"good",
                component:message_good
            },
            {
                path:"reply",
                component:message_reply
            }
        ]
    },
    {
        path : "/test/:id",
        component:scratch_test
    }
]
