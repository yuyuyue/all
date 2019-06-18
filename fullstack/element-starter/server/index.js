const express = require('express')
const http = require('http')
const app = express()
const api = require('./api')

app.set('port', 3000)
app.use(api)
http
  .createServer(app)
  .listen(app.get('port'), '0.0.0.0', function () {
    console.log('express server start at 3000')
  })