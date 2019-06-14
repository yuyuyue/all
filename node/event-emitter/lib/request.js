const request = require('request')

module.exports = (url) => {
  return new Promise((resolve, reject) => {
    request({
      url,
      json: true
    }, (err, res, body) => {
      if (err) {
        resolve('err')
      }
      resolve(body)
    })
  })
}