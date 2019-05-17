// pages/sub_author/pages/authorRecommend/authorRecommend.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    authorList: ["https://www.51jiantan.com/static/image/lr.png",
      "https://www.51jiantan.com/static/image/pyq.png",
      "https://www.51jiantan.com/static/image/zm.png"
    ],
    masterList: [{
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
  // 跳转到搜索
  search(){
    wx.navigateTo({
      url: '/pages/sub_circle/pages/searchCircle/searchCircle',
    })
  },

  //跳转到大咖列表
  toAuthorList() {
    wx.navigateTo({
      url: '/pages/sub_author/pages/authorList/authorList',
    })
  },
  //跳转到圈主列表
  toMasterList() {
    wx.navigateTo({
      url: '/pages/sub_author/pages/masterList/masterList',
    })
  },
  //跳转到大咖
  toAuthor(){
    wx.navigateTo({
      url: '/pages/sub_author/pages/authorDetails/authorDetails',
    })
  },
  //跳转到圈主
  toMaster() {
    wx.navigateTo({
      url: '/pages/sub_author/pages/masterDetails/masterDetails',
    })
  },
})