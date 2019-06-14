const koa = require('koa')

const app = new koa()

// console.log(app)

// app.use(async ctx => {
//   console.log('ctx----------------------------',ctx)
//   ctx.body = 'hello world'
//   console.log('------------------------------------',ctx.body)
// })

// app.listen(3000)

// logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// response
app.use(async ctx => {
  console.log('ctx.body', ctx.body )
  ctx.body = 'Hello World';
});

app.listen(3000);