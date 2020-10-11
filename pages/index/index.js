//index.js
//获取应用实例
const app = getApp()
import location from '../../location/location'

Page({
  data: {
    show:true,
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    
    username:'',
    password:'',
    code :'',
    phone:'',
    yzm:'',
    wx_id:''
  },
  wxShouQuan(){
    var this_1 = this;
    this_1.setData({
      show:true
    })
    
    wx.showLoading({
      title: '授权中',
      mask:true
    })
    wx.login({
        success: res => {
          console.log(res)
          if(res.errMsg == "login:ok"){
            wx.getUserInfo({
              success: res => {
                // 可以将 res 发送给后台解码出 unionId
                console.log(res)
                app.globalData.userInfo = res.userInfo
                // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                // 所以此处加入 callback 以防止这种情况
                if (app.userInfoReadyCallback) {
                  app.userInfoReadyCallback(res)
                }
              }
            })
            console.log("this",this_1)
            this_1.setData({
              show:false,
              code : res.code
            })
            console.log("code"+this.data.code)
            wx.request({
              url: location.baseUrl+'/wechat/index?code='+this_1.data.code,
              success:res2=>{
                console.log("session",res2.data.data)
                wx.setStorageSync('sessionKey', res2.data.data)
                if(res2.data.status == 200){
                  wx.reLaunch({
                    url: '../home/home',
                  })
                }else if(res2.data.status == 400){
                  this_1.setData({
                    wx_id:res2.data.data
                  })
                }
              }
            })
            wx.hideLoading({
              success: (res) => {},
            })
            wx.showToast({
              title: '授权成功',
            })
          }
          // 发送 res.code 到后台换取 openId, sessionKey, unionId

        }
      })
  },
  info(){
    var this_1 = this;
    console.log("codes",this.data.code)
    wx.request({
      url: location.baseUrl+'/wechat/fillInfo?username='+this.data.username+"&phone="+this.data.phone+"&wx_id="+this.data.wx_id+"&code="+this.data.code,
      method:'POST',
      success(res)
      {
        if(res.data.status == 200){
          wx.switchTab({
            url: '/pages/home/home',
          })
          console.log(res.data.data)
          console.log('绑定成功')
          this_1.setData({
            phone : '',
            username:''
          })
        }else{
          console.log('登录失败');
        }
      }
      

    })
  },
  getPhone(){
    wx.request({
      url: location.baseUrl+'/getPhone?phone='+this.data.phone,
      success:res2=>{
        console.log(res2)
        if(res2.data.status == 200){
          console.log("成功")
        wx.showToast({
          title: '发送成功',
        })
        }else if(res2.data.status == 400){
          console.log("失败")
          wx.showToast({
            title: '失败',
          })
        }
      }
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    this.wxShouQuan();
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
