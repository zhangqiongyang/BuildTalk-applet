// pages/sub_author/pages/authorList/authorList.js

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
    authorList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中',
    })
    // 大咖列表
    this.author()
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
    wx.showLoading({
      title: '加载中',
    })
    this.setData({
      page: 1,
      authorList: []
    })

    // 大咖列表
    this.author()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    wx.showLoading({
      title: '加载中',
    })
    // 获取大咖信息
    if (this.data.page < this.data.page_count) {
      this.author(Number(this.data.page) + 1)
    } else {
      util._showToast('没有更多了')
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
  // 



  /**
   * 网络请求
   */

  // 大咖列表
  author(page) {
    http.request({
        url: api.API_AUTHORLIST,
        data: {
          show: 2,
          page: page ? page : this.data.page,
          page_size: 20,
        }
      })
      .then(res => {
        console.log('---------获取到大咖列表了--------')
        console.log(res)
        let authorList = this.data.authorList
        for (let i = 0; i < res.data.authorInfo.length; i++) {
          authorList.push(res.data.authorInfo[i])
        }
        this.setData({
          authorList: authorList,
          page: res.data.page,
          page_count: res.data.page_count
        })

        // 关闭刷新
        wx.hideLoading();
        wx.stopPullDownRefresh()
      })
  },

})