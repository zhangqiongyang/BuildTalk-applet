// pages/giftCertificate/giftCertificate.js


var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowHeight: app.globalData.windowHeight + 48,
    certificateList:[
      {
        certificateName:'老用户专享优惠券',
        certificateTime:'2018.09.30-2018.10.30',
        certificateIntroduce:'《快速上手 kotlin》专享',
        isAdd:'可与限时优惠同享',
        price:'10'
      },
      {
        certificateName: '新用户专享优惠券',
        certificateTime: '2018.09.30-2018.10.30',
        certificateIntroduce: '《快速上手 kotlin》专享',
        isAdd: '可与限时优惠同享',
        price: '20'
      },
      {
        certificateName: '老用户专享优惠券',
        certificateTime: '2018.09.30-2018.10.30',
        certificateIntroduce: '《快速上手 kotlin》专享',
        isAdd: '可与限时优惠同享',
        price: '30'
      },
      {
        certificateName: '老用户专享优惠券',
        certificateTime: '2018.09.30-2018.10.30',
        certificateIntroduce: '《快速上手 kotlin》专享',
        isAdd: '可与限时优惠同享',
        price: '10'
      },
    ]
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

  }
})