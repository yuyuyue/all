const Koa = require('koa')
// 支持哪些模版引擎
const views = require('koa-views')
const ejs = require('ejs')
const path = require('path')
const app = new Koa()


const user = {
  name: 'yby',
  posts: [
    {
      id: 0,
      title: '小程序'
    },
    {
      id: 1,
      title: 'vue js'
    }
  ]
}
const postsDetail = [
  {
    id: 0,
    content: 'we chat app'
  },
  {
    id: 1,
    content: '<strong>react biao shi bu fu</strong>'
  }
]
// /user 个人主页面
// /posts 文章详情页
app.use(
  views(
    path.join(__dirname, '/views'), {
      extension: 'ejs'
    })
)
app.use(async (ctx) => {
  // 区别页面
  console.log(ctx.path)
  if (ctx.path === '/user') {
    await ctx.render('user', { user })
  } else if (ctx.path === '/posts') {
    const { id } = ctx.query
    const post = postsDetail.find(postItem => postItem.id == id)
    await ctx.render('post', { post })
  } else {
    ctx.body = `无法处理改请求`
  }
})

app.listen(8080, () => {
  console.log('server is running at 8080')
})