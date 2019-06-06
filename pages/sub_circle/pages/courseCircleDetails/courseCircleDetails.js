// pages/sub_circle/pages/courseCircleDetails/courseCircleDetails.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowHeight: app.globalData.windowHeight,
    isCatalog: false, // 是否显示目录详情
    isPicture: false, // 是否显示图文详情
    isPay: false, // 是否显示付费框
    catalogList: [],
    circleList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  /**
   * 方法
   */

  //切换课程目录显示
  changeCatalog() {
    this.setData({
      isCatalog: !this.data.isCatalog,
      isHide: !this.data.isHide
    })
  },

  //切换图文详情模式显示
  changePictureMode() {
    this.setData({
      isPictureMode: !this.data.isPictureMode,
      isHide: !this.data.isHide,
    })
  },

  //打开付款框
  pay(){
    this.setData({
      isPay:true
    })
  },

  // 取消付款
  cancel() {
    this.setData({
      isPay: false
    })
  }

})