## koa 中间件 middleware

app.use(middleware)
next 下一个中间件
1. async函数
2. 洋葱模型： 一层一层往里面执行，最后一个中间件执行完后，又一层层往外
3. 解耦合： 每个中间件负责一件事情

4. 以X开头的自定义响应头

## koa 第三方中间件
koa ctx 就是req + res 组成的对象
koa-views 
ctx: {
  req: {}
  res: {}
  render: () => {}
}
第三方就是 接着扩展ctx 往ctx上塞东西
## 
package.json 项目描述
依赖 
-s 
```json
"dependencies": {
  "ejs": "^2.6.1",
  "koa": "^2.7.0",
  "koa-views": "^6.2.0"
}
```

## ejs 模版引擎
<%= %> 原样输出
<%- %> 解析 html
<% %> 解析 js