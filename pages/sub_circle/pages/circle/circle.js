// pages/sub_circle/pages/circle/circle.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isRule:false,//圈主规则
    circleList: [{
        id: 1,
        image: '/image/example.jpg',
        title: '建筑工业互联网联盟',
        author: '小地瓜',
        isVip: true,
        isCourse: false,
      },
      {
        id: 1,
        image: '/image/example.jpg',
        title: 'cad',
        author: '刘新科',
        isVip: true,
        isCourse: false,
      },
      {
        id: 1,
        image: '/image/example.jpg',
        title: 'revit',
        author: '张明',
        isVip: false,
        isCourse: true
      },
    ]
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
  // 关闭圈主规则
  chageRule(){
    this.setData({
      isRule: false
    })
  },

  // 打开圈主规则
  toRule() {
    this.setData({
      isRule:true
    })
  },

  // 跳转到圈主规则
  toUserAgreement(){
    wx.navigateTo({
      url: '../userAgreement/userAgreement',
    })
  },

  // 跳转到创建圈子
  toCreatCircle() {
    wx.navigateTo({
      url: '../creatCircle/creatCircle',
    })
  },

  // 跳转到搜索圈子
  toSearchCircle() {
    wx.navigateTo({
      url: '../searchCircle/searchCircle',
    })
  },
})