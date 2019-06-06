const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = Router();
const session = require('koa-session')
const static = require('koa-static')
const path = require('path')

// 加密
const session_signed_key = ['secret']

app.keys = session_signed_key

const sessionConfig = {
  key: 'sid', // 放到cookie中 name属性
  maxAge: 10000
}
app.use(session(sessionConfig, app))
app.use(static(
  path.join(__dirname, './src')
))
router.get('/login', async (ctx) => {
  const { username, password } = ctx.query
  if (username === 'test' && password === 'test') {
    // 写到session中
    ctx.session.login = true
    ctx.type = 'html'
    ctx.body = '登录成功' + '<a href="/testlogin">测试登录</a>'
  } else {
    ctx.session.login = false
    ctx.body = '登录失败'
  }
})
router.get('/testlogin', async (ctx) => {
  if (ctx.session.login) {
    ctx.body = '成功登录'
  } else {
    ctx.redirect('/')
  }
})
// router.get('/',async (ctx) => {
//   ctx.cookies.set('fromserver1','fromserver1', {
//     maxAge: 10000
//   })
//   ctx.cookies.set('user', 'user', {
//     path: '/user'
//   })
//   ctx.cookies.set('user-abc', 'user-abc', {
//     httpOnly: false,
//     path: '/user/abc'
//   })
//   ctx.cookies.set('post', 'post', {
//     path: '/post'
//   })
//   ctx.type = 'html';
//   ctx.body = `
//     <a href="/user">user</a>
//     <a href="/post">post</a>
//   `
// })
router.get('/user', async (ctx) => {
  ctx.type = 'html';
  ctx.body = `
    user page
  `
})
router.get('/post', async (ctx) => {
  ctx.type = 'html';
  ctx.body = `
    post page
  `
})
router.get('/user/abc', async (ctx) => {
  ctx.type = 'html';
  ctx.body = `
    /user/abc/page
  `
})
app.use(router.routes())

app.listen(8080, ()=> {
  console.log('running ...');
})