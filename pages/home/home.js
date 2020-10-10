// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    images:null,
    events:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.request({
      url: 'http://192.168.43.70:7070/getAll',
      success:res=>{
        console.log(res.data.data)
        this.setData({
          events:res.data.data
        })
        console.log(res.data.data)
        var event2 = [];
        for(var event in res.data.data){
          console.log(event)
          wx.request({
              url: 'http://192.168.43.70:7070/getPhoto?id='+event+'&width=200&height=200',
              responseType: 'arraybuffer',
              success:res=>{
                console.log(res.data)
                event.photo = 'data:image/png;base64,'+wx.arrayBufferToBase64(res.data);
              },
              header:{
                'content-type': 'application/octet-stream',
              }
            })
            event2.push(event)
        }
        this.setData({
          events:event2
        })
      }
    })
    // wx.request({
    //   url: 'http://localhost:7070/getPhoto?id=11&width=200&height=200',
    //   responseType: 'arraybuffer',
    //   success:res=>{
    //     console.log(res.data)
    //     this.setData({
    //       images:'data:image/png;base64,'+wx.arrayBufferToBase64(res.data)
    //     })
    //   },
    //   header:{
    //     'content-type': 'application/octet-stream',
    //   }
    // })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})