const req = require('./request')

module.exports = (keyword) => {
  keyword = encodeURIComponent(keyword)
  console.log(keyword)
  const url = `https://api.imjad.cn/cloudmusic/?type=search&search_type=1&s=${keyword}`
  return req(url)
}