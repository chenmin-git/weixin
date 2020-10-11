// pages/add/add.js
import location from '../../location/location'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl:'',
    weizhi:'',
    miaoshu:'',
    photo:[],
    sessionKey:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  chooseImage(){
    wx.chooseImage({
      count: 1,
      sizeType: [],
      sourceType: [],
      success: (result) => {
        var imgs = result.tempFilePaths;
        for (var i = 0; i < imgs.length; i++) {
          this.data.photo.push(imgs[i])
        }
        console.log(result)
        this.setData({
          imgUrl:result.tempFilePaths[0]
        })
      },
      fail: (res) => {},
      complete: (res) => {},
    })
  },
  chooseLocation(){
    wx.chooseLocation({
      latitude: 29.473930899,
      longitude:113.23496045,
      success:res=>{
        console.log(res)
        this.setData({
          weizhi:res.name
        })
      }
    })
  },
  tijiao(){
    console.log("提交")
    this.uploadimg({
      url: location.baseUrl+"/addEmpInfo", //这里是你图片上传的接口
      path: this.data.photo, //这里是选取的图片的地址数组
    })
  },
  uploadimg: function (data) {
    wx.showLoading({
      title: '上传中...',
      mask: true,
    })
    var that = this,
      i = data.i ? data.i : 0,
      success = data.success ? data.success : 0,
      fail = data.fail ? data.fail : 0;
      //获取存储信息
      wx.getStorage({
        key: 'sessionKey',
        success: function(res){
          // success
          that.setData({
            sessionKey:res.data
          })
          console.log('jijiujiu',that.data.sessionKey)
          wx.uploadFile({
            url: data.url,
            filePath: data.path[i],
            name: 'photo',
            formData: {"content":that.data.miaoshu,"weizhi":that.data.weizhi,"sessionKey":that.data.sessionKey},
            success: (resp) => {
              wx.hideLoading();
              success++;
              var str = resp.data //返回的结果，可能不同项目结果不一样
              console.log(resp.data)
                wx.reLaunch({
                  url: '/pages/home/home',
                })
              // var pic = JSON.parse(str);
              // var pic_name = that.data.showUrl + pic.Data;
              // var detailPics = that.data.detailPics;
              // detailPics.push(pic_name)
              // that.setData({
              //   detailPics: detailPics
              // })
            },
            fail: (res) => {
              fail++;
              console.log('fail:' + i + "fail:" + fail);
            },
            complete: () => {
              // i++;
              // if (i == data.path.length) { //当图片传完时，停止调用     
              //   console.log('执行完毕');
              //   console.log('成功：' + success + " 失败：" + fail);
              //   // var myEventDetail = {
              //   //   picsList: that.data.detailPics
              //   // } // detail对象，提供给事件监听函数
              //   // var myEventOption = {} // 触发事件的选项
              //   // that.triggerEvent('myevent', myEventDetail, myEventOption)//结果返回调用的页面
              // } else { //若图片还没有传完，则继续调用函数
              //   data.i = i;
              //   data.success = success;
              //   data.fail = fail;
              //   that.uploadimg(data);//递归，回调自己
              // }
            }
          });
        }
      })

  }
})