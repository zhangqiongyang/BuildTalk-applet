// pages/sub_author/pages/attention/attention.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isMine: false,
    masterList: [
      {
        image: '/image/example.jpg',
        name: '小地瓜',
        isVip: false,
        attentionNum: '200',
        isAttention: false,
      },
      {
        image: '/image/example.jpg',
        name: '戴简',
        isVip: true,
        attentionNum: '180',
        isAttention: false,
      },
      {
        image: '/image/example.jpg',
        name: '辛德瑞拉',
        isVip: false,
        attentionNum: '100',
        isAttention: true,
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