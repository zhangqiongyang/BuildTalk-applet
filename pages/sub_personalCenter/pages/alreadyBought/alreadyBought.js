// pages/alreadyBought/alreadyBought.js
import {
  HTTP
} from '../../../../utils/http.js'
let http = new HTTP()
import {
  api
} from '../../../../utils/api.js'

const util = require('../../../../utils/util.js')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: '0',
    type: 0,
  },




  // 跳转到课程列表页面
  jumpToList(event) {
    console.log(event)
    var course_id = event.currentTarget.dataset.course_id;
    wx.navigateTo({
      url: '/pages/sub_browse/pages/list/list?course_id=' + course_id,
    })
  },


  jumpToArticle(event) {
    console.log(event)
    var article_id = event.currentTarget.dataset.article_id;
    var audio_id = event.currentTarget.dataset.audio_id;

    console.log('--------------跳转到视频文章-------------')
    wx.navigateTo({
      url: "/pages/sub_browse/pages/video/video?article_id=" + article_id
    })

  },





  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //获取已购信息
    this.bought()
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


  // 滑动切换tab
  bindChange(event) {
    console.log(event)
    var current = event.detail.current;
    this.setData({
      currentTab: current
    })
  },

  // 点击切换tab
  swichNav(event) {
    var that = this;
    // console.log(event)
    var current = event.currentTarget.dataset.current
    if (this.data.currentTab == current) {
      return
    } else {
      that.setData({
        currentTab: current
      })
    }
  },

  /**
   * 网络请求
   */
  //获取已购信息
  bought() {
    http.request({
        url: api.API_BOUGHTINFO,
        data: {
          user_id: wx.getStorageSync('user_id'),
          source: 'xcx',
          type: this.data.type, //0全部 1文章 2课程
        }
      })
      .then(res => {
        console.log('-----------获取到已购信息了----------')
        console.log(res)
      })
  },
})