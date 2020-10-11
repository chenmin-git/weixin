// pages/home/home.js
import location from '../../location/location'
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
    wx.stopPullDownRefresh({
      success: (res) => {},
    })
this.getAll();
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
    console.log("刷新了")
    this.getAll();
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

  },
  imagesLoad(e){
    console.log(e.currentTarget.dataset.index,e.currentTarget.dataset.id)
    wx.request({
      url: location.baseUrl+'/getPhoto?id='+e.currentTarget.dataset.id+'&width=200&height=200',
      responseType: 'arraybuffer',
      success:res2=>{
        console.log(res2.data)
        var event2 = this.data.events;
        event2[e.currentTarget.dataset.index].photo = 'data:image/png;base64,'+wx.arrayBufferToBase64(res2.data);
        this.setData({
          events:event2
        })
      },
      header:{
        'content-type': 'application/octet-stream',
      }
    })
  },
  shangchuan(){
    console.log("fsfs")
    wx.navigateTo({
      url: '/pages/add/add'
    })
  },
  getAll(){
    wx.request({
      url: location.baseUrl+'/getAll',
      success:res=>{
        console.log(res.data.data)
        this.setData({
          events:res.data.data
        })
        console.log(res.data.data)
        var event2 = [];
        for(var i = 0;i<res.data.data.length;i++){
          var index = i;
          var event = {}
          console.log(res.data.data[i].id)
           event = res.data.data[i]
           event.photo = "/static/jiazai2.gif"
           event2.push(event)
        }
        this.setData({
          events:event2
        })
      }
    })
  }
})