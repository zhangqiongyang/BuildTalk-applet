// pages/sub_author/pages/masterDetails/masterDetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text:'圈主详情',
    authorInfo: {
      image: '/image/example.jpg',
      name: '关艾',
      isVip: true,
      isAttention: false,
      fans: '2',
      collect: '3',
      attention: '2'
    },
    circleList: [
      {
        image: '/image/example.jpg',
        title: '建筑产业工业互联网联盟',
        name: '小地瓜',
        label: ["BIM", "模型数据", "装配式钢结构"],
        isVip: false,
        isCourse: false
      },
      {
        image: '/image/example.jpg',
        title: '建筑产业工业互联网联盟',
        name: '小地瓜',
        label: ["BIM", "模型数据", "装配式钢结构"],
        isVip: true,
        isCourse: false
      },
      {
        image: '/image/example.jpg',
        title: '建筑产业工业互联网联盟',
        name: '小地瓜',
        label: ["BIM", "模型数据", "装配式钢结构"],
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

  }
})