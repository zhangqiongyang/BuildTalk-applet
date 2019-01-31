// pages/sub_browse/pages/allNews/allNews.js

var app = getApp();
const api = require('../../../../utils/api.js');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: 0,
    authorinfo: {},
    newsList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;

    //获取所有新闻信息的接口
    this.checkAllNews();
  },

  //获取所有新闻信息的接口
  checkAllNews() {
    var that = this;

    wx.request({
      url: api.API_ALLNEWS,
      data: {
        order_sort: this.data.order,
        // page_size: '',
        // page: ''
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log("------------获取到所有新闻信息了--------------")
        console.log(res)
        that.setData({
          authorinfo: res.data.authorinfo,
          newsinfo: res.data.newsinfo
        })
      },
    })
  },

  //切换正序倒序
  changeOrder(event) {
    console.log(event)
    let order = event.target.dataset.order
    this.setData({
      order: order
    })
    this.checkAllNews()
  },




  // 跳转到作者详情页面
  jumpToAuthorDesc(event) {
    console.log(event);
    let author_id = event.currentTarget.dataset.author_id;
    console.log(author_id);
    wx.navigateTo({
      url: '/pages/sub_browse/pages/authorDesc/authorDesc?author_id=' + author_id ,
    })
  },

  // 跳转到文章页面
  jumpToArticle(event) {
    console.log(event);
    let article_id = event.currentTarget.dataset.article_id;
    console.log(article_id)
    wx.navigateTo({
      url: '/pages/sub_browse/pages/video/video?article_id=' + article_id,
    })
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