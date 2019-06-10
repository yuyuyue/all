// 封装wx.request 
// method get | post
// needSubDomain 子域名
const CONFIG = require('./config.js')
const API_BASE_URL = 'https://api.it120.cc'
const request = (url, needSubDomain, method, data) => {
  return new Promise((resolve, reject) => {
    const _url = API_BASE_URL + (needSubDomain?'/' + CONFIG.subDomain:'') + url
    console.log(_url)
    wx.request({
      url: _url,
      method: method,
      data: data,
      header: {
        'Content_Type': 'application/x-www-form-urlencoded'
      },
      success: (res) => {
        resolve(res.data)
      },
      fail: (err) => {
        reject(err)
      },
      complete() {

      }
    })
  })
}
module.exports = {
  goods: (data) => { //商品api
    return request('/shop/goods/list', true, 'post', data)
  },
  banners: (data) => {
    return request('/banner/list', true, 'get', data)
  },
  noticeList: (data) => {
    return request('/notice/list', true, 'post', data)
  }
}