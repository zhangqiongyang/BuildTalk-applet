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
    currentTab: 0,
    type: 0,
    windowHeight: app.globalData.windowHeight - 2
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
    const current = event.detail.current,
      type = event.currentTarget.dataset.type
    this.setData({
      currentTab: current,
      type: type
    })
    //获取已购信息
    this.bought()
  },

  // 点击切换tab
  swichNav(event) {
    var that = this;
    // console.log(event)
    const current = event.currentTarget.dataset.current,
      type = event.currentTarget.dataset.type

    if (this.data.currentTab == current) {
      return
    } else {
      that.setData({
        currentTab: current,
        type: type
      })
      //获取已购信息
      this.bought()
    }

  },

  // 跳转
  toDetails(event){
    console.log(event)
    const type=event.currentTarget.dataset.type,
    id=event.currentTarget.dataset.id

    if(type == 2){
      wx.navigateTo({
        url: '/pages/sub_circle/pages/circleDetails/circleDetails?circle_id='+id,
      })
    }else{
      wx.navigateTo({
        url: '/pages/sub_browse/pages/video/video?article_id=' + id,
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

        this.setData({
          alreadyinfo: res.data
        })
      })
  },
})