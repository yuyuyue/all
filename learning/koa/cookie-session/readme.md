## why
无状态
## cookie
本地存储
- 怎么来:
  1. js 操作cookie
    document.cookie 可读 可写
    内容:
      name:
      value:
      path: cookie 在哪个路径下生效

      /                 所有路径
      /user             user 以及user下面的        
      /user/abc         user-abc 以及下面的
      domain:

      httpOnly: true/false  如果为true就不能通过js获取cookie的值
      secure: 安全 只会在https协议下传输
      maxAge:  在多久后，cookie被删除  koa ms / js s 


    作用范围:
      domain + path: 在什么域名+路径下生效 浏览器检查存储的cookie， 会发送给服务端的，而且http传输报文的大小，放在cookie的请求头里面发送
    cookie用途: 
      状态管理 t
      用户个性化设置 f
  2. 在服务端
## session 会话
后台传输的 不同的用户参数很多session

userId
sessionId 用户会话的时候 通过 自己 sessionId 查询自己的状态
cookie： sessionId=id

