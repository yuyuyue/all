const Koa = require('koa')

const app = new Koa()

app.use(async (ctx) => {
  const start = Date.now()
  await next()
  const end = Date.now()
  // writeHead() content-type
  // 设置响应头
  ctx.set('X-Response-time', `${end - start}ms`)
  console.log('send', `${end - start}ms`)
})

app.use(async (ctx) => {
  ctx.body = `<h1>hello koa</h1>`
})

app.listen(3000, () => {
  console.log('port start at 3000')
})