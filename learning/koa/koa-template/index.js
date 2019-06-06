const Koa = require('koa')

const app = new Koa()
const admin = new Koa()

// http.createServer 
// req res
// context req + res
app.use(async (ctx, next) => {
  console.log(1)
  await next()
  console.log(2)
})
app.use(async (ctx, next) => {
  console.log(3)
  await next()
  console.log(4)
})
app.use(async (ctx) => {
  console.log(5)
  ctx.body = `<strong>tj koa</strong>`
})
// http.listen 语法糖
app.listen(8080, () => {
  console.log('server is running at 8080')
})