// miniprogram/pages/add/add.js
// 云开发
// wx.cloud.database() 微信数据库
const db = wx.cloud.database()
// 
const productsCollection = db.collection('products')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  addData: function () {
    productsCollection
      .add(
        {
          data: {
            title: "Prodduct" + (Math.random() * 100).toString(),
            image: "https://developers.weixin.qq.com/miniprogram/dev/image/cat/0.jpg?t=18100816",
            tags: ["tag123", "tag123"],
            price: Math.random() * 100,
            color: 'blue',
            view: Math.floor(Math.random() * 10)
          }
        })
      .then(res => {
        console.log(res)
      })
  }
})