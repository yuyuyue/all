

//app.js
App({
  onLaunch: function (options) {

    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
        env: 'yby-d2ju2'
      })
    }

    this.globalData.shareParam = options.query
    const self = this
    // 查询是否授权
    wx.getSetting({
      success(settingRes) {
        // 已经授权
        if (settingRes.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: (infoRes) => {
              self.globalData.userInfo = infoRes.userInfo
              if (self.cathUserInfo) {
                self.cathUserInfo(infoRes.userInfo)
              }
              // 如果是旧用户就更新信息
              wx.cloud.callFunction({
                name: 'createUser',
                data: {
                  avataUrl: infoRes.userInfo.avatarUrl,
                  name: '',
                  nickName: infoRes.userInfo.nickName,
                  sex: infoRes.userInfo.gender
                }
              })
            },
            fail: (err) => {
              console.log('---------------',err)
            },
            complete: () => {

            }
          })
        } else {
          wx.redirectTo({
            url: `./pages/login/login?back=${options.path.split('/')}`
          })
        }
      }
    })
    wx.cloud.callFunction({
      name: 'getUserInfo',
      data: {},
      success(res) {
        self.globalData.userInfoFromCloud = res.result.storeUser
      }
    })
  },
  globalData: {
    currentGroupInfo: null,
    currentGroupUserList: [],
    currentBill: null,
    userInfo: null,
    shareParam: null,
    billId: '',
    userInfoFromCloud: null,
    userRemark: {}
  }
})
