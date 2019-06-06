// pages/sub_browse/pages/allNews/allNews.js

var app = getApp();
const util = require('../../../../utils/util.js')

import {
  HTTP
} from '../../../../utils/http.js'
let http = new HTTP()
import {
  api
} from '../../../../utils/api.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:1,
    newsInfo:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 查询全部新闻
    this.getNewsList()
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
    this.setData({
      page:1,
      newsInfo:[]
    }) 
    // 查询全部新闻
    this.getNewsList(1)
    wx.showLoading({
      title: '加载中',
    })
  },

  /** 
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (this.data.page < this.data.page_count){
      // 查询全部新闻
      this.getNewsList(Number(this.data.page) + 1)
      wx.showLoading({
        title: '加载中',
      })
    }else{
      wx.showToast({
        title: '没有更多数据了',
      })
    }
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  /**
   * 方法
   */

  // 跳转到每日一谈详情
  toAuthorDesc() {
    wx.navigateTo({
      url: '../authorDesc/authorDesc?author_id=' + this.data.authorInfo.author_id,
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
   * 网络请求
   */

  // 查询全部新闻
  getNewsList(page) {
    http.request({
        url: api.API_ALLNEWS,
        data: {
          page_size: 20,
          page: page ? page : this.data.page,
        }
      })
      .then(res => {
        console.log('------------查询到全部新闻信息了--------------')
        console.log(res)
        let newsInfo = this.data.newsInfo
        for (let i = 0; i < res.data.newsInfo.length;i++){
          newsInfo.push(res.data.newsInfo[i])
        }
        this.setData({
          newsInfo: newsInfo,
          authorInfo: res.data.authorInfo,
          page: res.data.page,
          page_count: res.data.page_count
        })
        wx.hideLoading()
        wx.stopPullDownRefresh()
      })
  }
})