web http 服务器
端口? 3000
mysql 3306
webserver 80

用户 IP 加上 端口

http.createServer((request, response) => {
  response.end('Hello World')
}).listen(3000) 
