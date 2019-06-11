// pages/sub_author/pages/authorDetails/authorDetails.js

import {
  HTTP
} from '../../../../utils/http.js'
let http = new HTTP()
import {
  api
} from '../../../../utils/api.js'

const util = require('../../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isArticle: true, // nav是否是精品文章
    authorInfo: {},
    articleList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      author_id: options.author_id
    })

    // 获取大咖信息
    this.authorInfo()
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
  // 切换导航
  changeNav(event) {
    console.log(event)
    const id = event.currentTarget.dataset.id
    if (id == 'article') {
      this.setData({
        isArticle: true
      })

    } else {
      this.setData({
        isArticle: false
      })
    }
  },

  // 跳转
  toArticle(event) {
    console.log(event)
    const id = event.currentTarget.dataset.id

    wx.navigateTo({
      url: '/pages/sub_browse/pages/video/video?article_id=' + id,
    })
  },

  /**
   * 网络请求
   */
  // 获取大咖信息
  authorInfo() {
    http.request({
        url: api.API_AUTHORDETAILS,
        data: {
          examine_user: wx.getStorageSync('user_id'),
          user_id: this.data.author_id,
          user_type: 1, //1大咖 2圈主
        }
      })
      .then(res => {
        console.log('--------获取到大咖信息了----------')
        console.log(res)

        this.setData({
          authorInfo: res.data,
          'authorInfo.isVip': true,
          'authorInfo.user_id': this.data.author_id,
          articleList: res.data.articleInfo,
        })
      })
  },


})