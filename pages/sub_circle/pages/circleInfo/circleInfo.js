// pages/sub_circle/pages/circleInfo/circleInfo.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowHeight: app.globalData.windowHeight,
    isMaster: false, // 是否是圈主
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
  //跳转到圈子成员
  toCircleMember() {
    wx.navigateTo({
      url: '../circleMember/circleMember',
    })
  },

  // 跳转到名片
  toCard() {
    wx.navigateTo({
      url: '../card/card',
    })
  },

  // 跳转到圈子资料
  toCircleData() {
    if (this.data.isMaster) {
      wx.navigateTo({
        url: '../creatCircle/creatCircle',
      })
    }else{
      wx.navigateTo({
        url: '../circleData/circleData',
      })
    }
 
  },

  // 退出圈子
  exit() {
    wx.showModal({
      title: '',
      content: '确定退出此圈子？',
      showCancel: true,
      cancelColor: '#242831',
      confirmColor: '#32A7FF',
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      },
    })
  }
})