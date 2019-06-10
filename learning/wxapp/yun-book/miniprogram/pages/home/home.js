// miniprogram/pages/home/home.js
Page({
  data: {

  },
  navigateToAdd() {
    wx.navigateTo({
      url: '../add/add'
    })
  },
  navigateToComplex() {
    wx.navigateTo({
      url: '../complex/complex'
    })
  },
  navigateToIndex() {
    wx.navigateTo({
      url: '../index/index'
    })
  }
})