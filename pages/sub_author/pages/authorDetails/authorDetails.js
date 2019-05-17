// pages/sub_author/pages/authorDetails/authorDetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isArticle: true, // nav是否是精品文章
    authorInfo:{
      image:'/image/example.jpg',
      name:'关艾',
      title:'家具首席设计师',
      isVip:true,
      isAttention:false,
      circle:'3',
      fans:'2',
      collect:'3',
      attention:'2'
    },
    articleList: [{
        image: '/image/example.jpg',
        title: '科技宅 新生活',
        text: '建筑工业互联网峰会建筑工业互联网峰会建筑工业互联网峰会-浦小强'
      },
      {
        image: '/image/example.jpg',
        title: '乐智能 悦享家',
        text: '建筑工业互联网峰会建筑工业互联网峰会建筑工业互联网峰会-浦小强'
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
  changeNav(event) {
    console.log(event)
    const id = event.currentTarget.dataset.id
    if(id == 'article'){
      this.setData({
        isArticle:true
      })
      
    }else{
      this.setData({
        isArticle: false
      })
    }
  }
})