// pages/AllCourse/AllCourse.js

var app = getApp();
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
    platform: app.globalData.platform,
    courseinfo:[],
    page:1,
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 课程圈
    this.circleInfo() 
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
  // 跳转到课程详情
  toCourse(event) {
    console.log(event)
    const circle_id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/sub_circle/pages/circleDetails/circleDetails?circle_id=' + circle_id,
    })
  },


  /**
   * 网络请求
   */
  // 课程圈
  circleInfo() {
    http.request({
        url: api.API_ALLCIRCLE,
        data: {
          type: 2,
          isIndex: 0,
          page: this.data.page,
          page_size: 20
        }
      })
      .then(res => {
        console.log('------------获取到课程圈了-----------')
        console.log(res)
        this.setData({
          courseinfo: res.data.circleInfo
        })


        // 关闭刷新
        wx.hideLoading()
        wx.stopPullDownRefresh()
      })
  }
})