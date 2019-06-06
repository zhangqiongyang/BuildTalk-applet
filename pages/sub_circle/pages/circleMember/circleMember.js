// pages/sub_circle/pages/circleMember/circleMember.js

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
    memberList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      circle_id: options.circle_id
    })
    // 圈子成员
    this.memberList()
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
  // 跳转到成员详情
  toDetails(event) {
    const id = event.currentTarget.dataset.id,
      type = event.currentTarget.dataset.type
    if (type == 'author') {
      wx.navigateTo({
        url: '/pages/sub_author/pages/masterDetails/masterDetails?user_id=' + id,
      })
    }else{
      wx.navigateTo({
        url: '/pages/sub_author/pages/authorDetails/authorDetails?user_id=' + id,
      })
    }
  },

  /**
   * 网络请求
   */

  // 圈子成员
  memberList() {
    http.request({
        url: api.API_CIRCLEMEMBER,
        data: {
          circle_id: this.data.circle_id,
        }
      })
      .then(res => {
        console.log('--------圈子成员---------')
        console.log(res)
        this.setData({
          memberList: res.data
        })
      })
  },
})