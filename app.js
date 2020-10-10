//app.js
App({
  
  onLaunch: function () {
    // 展示本地存储能力
    
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    //
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框

        }
      }
    })
  },
  onShow(option){
    console.log(option)
  },
  globalData: {
    userInfo: null
  }
})