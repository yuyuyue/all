大前端全栈开发思路

在前端vue 项目目录下， 建一个server 用来做mvc 就好了 

- 前后端分离
  后端负责提供/api 在 server目录下
  前端 src/
  后端就负责 API 服务

1. 后端在3000 , 未来等着ngnix 80 -> 3000
  /api API服务， 等着前端调用   /  vue 打包好的dist 目录
  index.html readFile 返回 
2. 前端在8080 vue-router vuex axios 
3. 前后端连调， api 数据 -> vue 组件的 data 
4. 跨域问题  前段面试的最重要的问题
  domain 域名
  port 端口 cross domain 
  跨越 前端不允许 安全问题
  前端考虑， 页面上显示的
  后端考虑 

- 前端 
  book.douban.com
  www.douban.com
  subdomain | domain | port
  js 同源机制， 相同的值得信赖
  前后端端口，域名可能都不同
  不跨， fetch('/api/user/login)  404
  3000 /api/ proxy 代理
  target: http://localhost:3000/api,
  changeOrigin: true
  发出去的请求也不跨