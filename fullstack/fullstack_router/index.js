const http = require('http')
const fs = require('fs')

// 后端开发 针对api的开发/api/ 以及 /
http.createServer(function (req, res) {
  var filePath = '.' + req.url
  if (filePath === './') {
    // 根目录，将启动index.html
    filepath = './index.html'
  }
  readFile(filepath, res)
}).listen(3000)


function readFile(path, res) {
  fs.readFile(path, 'utf-8', function (err, data) {
    if (err) {
      readFile('./index.html', res)
    } else {
      res.write(data)
      res.end()
    }
  })
}