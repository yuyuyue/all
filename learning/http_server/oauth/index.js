const Koa = require("koa")
// 静态资源
const static = require("koa-static")
const path = require("path")
const route = require("koa-route")
const axios = require("axios")
const app = new Koa()
const clientID = '7e7558107900c259a260'
const clientSecret = '07f2a446f44a04a0b1952a5eb9824f7efa439e2d'

// 路由 网站提供资源
const main = static(path.join(__dirname, '/public'))
app.use(main)

const oauth = async ctx => {
  const requestToken = ctx.request.query.code
  const token_url = 'https://github.com/login/oauth/access_token?' +
  `client_id=${clientID}&` +
  `client_secret=${clientSecret}&` +
  `code=${requestToken}`
  // 数据库
  // await 请求
  // console.log(ctx)
  // const timer = new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     console.log('ok')
  //   }, 3000)
  // })
  const tokenResponse = await axios({
    methods: 'post',
    url: token_url,
    headers: {
      accept: 'application/json'
    }
  })
  const accessToken = tokenResponse.data.access_token
  console.log(tokenResponse.data)
  const result = await axios({
    method: 'get',
    url: 'https://api.github.com/user',
    headers: {
      accept: 'application/json',
      Authorization: `token ${accessToken}`
    }
  })
  console.log(result.data)
  const avatar_url = result.data.avatar_url
  ctx.response.redirect(`/welcome.html?avatar_url=${avatar_url}`)
}

app.use(route.get('/oauth/redirect', oauth))

app.listen(8080, () => {
  console.log('port start at 8080')
})