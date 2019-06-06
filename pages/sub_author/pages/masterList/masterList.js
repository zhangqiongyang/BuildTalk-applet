// pages/sub_author/pages/masterList/masterList.js

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
    page: 1,
    masterList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中',
    })
    // 人气圈主
    this.master()
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
  // 



  /**
   * 网络请求
   */

  // 人气圈主
  master(page) {
    http.request({
        url: api.API_MAETER,
        data: {
          show: 2, //1 人气圈主 2排行榜
          user_id: wx.getStorageSync('user_id'),
          page: page ? page : this.data.page,
          page_size: 20,
        }
      })
      .then(res => {
        console.log('---------获取到人气圈主排行榜信息了--------')
        console.log(res)

        let masterList = this.data.masterList
        for (let i = 0; i < res.data.circleInfo.length; i++) {
          masterList.push(res.data.circleInfo[i])
        }

        this.setData({
          masterList: masterList,
          page: res.data.page,
          page_count: res.data.page_count
        })

        // 关闭刷新
        wx.hideLoading();
        wx.stopPullDownRefresh()
      })
  },

})