oauth 用于第三方登录

- 后端开发很简易 new Koa()
  其他语言好复杂
- 显示首页
  暴露资源
  1. html css js 静态资源 /public 不需要登录
     koa-static 对静态资源的加持
     http:localhost:8080/{path}
  2. 动态资源，aysnc Model(数据库) Controller(控制器) View(视图) 
  URL Universal Resource Location -> 查找相应的Controller(路由) -> Model ->View
  3. koa的思路
     极间
     app.use(callBcak)
     callBcak中间件
     请求(ctx.request) 中间件 响应(ctx.response)
  4. ctx 上下文环境
     ctx.request ctx.response 
     async 支持 数据库查询远程调用java服务
     客户端发起请求 -> node(koa express 8080) ->
     route(中间件) -> java远程处理(rpc) -> database

     koa koa-static koa-route

- oauth 第三方登录
  网站A 
  第三方接口 Github/微信/QQ/支付宝
  用户

  A要拿用户的信息， 在第三方有授权页，第三方网站就通过下发一个令牌(token)， A每次带上这个令牌去第三方网站来获取数据
  1. 到第三方网站去登记
  2. 如果用户同意第三方网站会通过callback形式访问callback地址 /oauth/redirect
  code 换取 token
