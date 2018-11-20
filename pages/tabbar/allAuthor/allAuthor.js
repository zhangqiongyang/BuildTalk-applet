// pages/allAuthor/allAuthor.js



var app = getApp();
const api = require('../../../utils/api.js');




Page({

  /**
   * 页面的初始数据
   */
  data: {

  },










  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;



    // 获取所有作者的信息
    wx.request({
      // url: 'https://wx.bjjy.com/searchallauthor',
      url: api.API_ALLAUTHOR,      
      data: '',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log('-----------全部作者的信息---------------')
        console.log(res)
        that.setData({
          authorinfo: res.data.authorinfo
        })
      },
      fail: function(res) {},
    })




    // wx.request({
    //   url: 'https://wx.bjjy.com/getrecommend',
    //   data: '',
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded'
    //   },
    //   method: 'POST',
    //   dataType: 'json',
    //   responseType: 'text',
    //   success: function (res) {
    //     console.log(res)
    //     that.setData({
    //       courseinfo: res.data.courseinfo
    //     })
    //   },
    //   fail: function (res) { },
    //   complete: function (res) { },
    // })
  },



  // 跳转到相应页面
  jumpToAuthor: function (event) {
    console.log(event);
    var author_id = event.currentTarget.dataset.author_id

    wx.navigateTo({
      url: '/pages/sub_browse/pages/author/author?author_id=' + author_id,
    })    

  },

  // 跳转到作者标签搜索页
  jumpToSearchLabel(event) {
    // console.log('-------------标签--------------------')
    // console.log(event)
    var label = event.currentTarget.dataset.label


    wx.navigateTo({
      url: '/pages/search/search?label=' + label,
    })
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