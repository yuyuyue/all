// live-server
// COMMERJS 模块化方案
const http = require('http')
const https = require('https')
let i = 0
// 创建一个http协议
// 监听端口3000
http.createServer((request, response) => {
  console.log(i)
  console.log('req:', request.url)
  i++
  response.end(`${i}`)
  
}).listen(3000) 

// web服务 在软件上理解就是一个http访问服务