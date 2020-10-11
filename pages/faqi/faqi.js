// pages/faqi/faqi.js
import location from '../../location/location'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    events:[],
    sessionKey:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAll();
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

  },
  getAll(){
    var that = this;
    wx.getStorage({
      key: 'sessionKey',
      success: function(res){
        // success
        that.setData({
          sessionKey:res.data
        })
        console.log('jijiujiu',that.data.sessionKey)
        wx.request({
          url: location.baseUrl+'/getEventListByWxId',
          data:{
            'sessionKey':that.data.sessionKey
          },
          success:res=>{
            console.log(res)
            that.setData({
              events:res.data.data
            })
            var event2 = [];
            for(var i = 0;i<res.data.data.length;i++){
              var index = i;
              var event = {}
              console.log(res.data.data[i].id)
               event = res.data.data[i]
               event.photo = "/static/jiazai2.gif"
               event2.push(event)
            }
            that.setData({
              events:event2
            })
          }
        })
      }
    });

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
  }
})