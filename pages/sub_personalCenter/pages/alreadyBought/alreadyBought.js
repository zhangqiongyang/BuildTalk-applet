// pages/alreadyBought/alreadyBought.js
const api = require('../../../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab:'0'
  },




  // 跳转到课程列表页面
  jumpToList(event){
    console.log(event)
    var course_id = event.currentTarget.dataset.course_id;
    wx.navigateTo({
      url: '/pages/sub_browse/pages/list/list?course_id=' + course_id,
    })
  },


  jumpToArticle(event){
    console.log(event)
    var article_id = event.currentTarget.dataset.article_id;
    var audio_id = event.currentTarget.dataset.audio_id;    
    if (audio_id) {
      console.log('--------------跳转到音频文章-------------')
      wx.navigateTo({
        url: "/pages/sub_browse/pages/article/article?article_id=" + article_id
      })
    } else {
      console.log('--------------跳转到视频文章-------------')
      wx.navigateTo({
        url: "/pages/sub_browse/pages/video/video?article_id=" + article_id
      })
    }
  },


  // 滑动切换tab
  bindChange(event){
    console.log(event)
    var current = event.detail.current;
    this.setData({
      currentTab : current
    })
  },

  // 点击切换tab
  swichNav(event){
    var that =this;
    // console.log(event)
    var current = event.currentTarget.dataset.current
    if (this.data.currentTab == current){
      return
    }else{
      that.setData({
        currentTab: current
      })
    }
  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    // 获取屏幕高度
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          windowHeight:res.windowHeight
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })




    // 获取已购课程信息接口
    wx.request({
      // url: 'https://wx.bjjy.com/alreadybuy',
      url: api.API_ALREADYBUY,      
      data: {
        openid : wx.getStorageSync('openid')
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log('---------------已购课程-------------------')
        console.log(res)
        that.setData({
          articlebuyinfo: res.data.articlebuyinfo,
          coursebuyinfo: res.data.coursebuyinfo
        })
      },
      fail: function(res) {
        console.log('-------------已购课程数据查询失败------------------')
      },
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