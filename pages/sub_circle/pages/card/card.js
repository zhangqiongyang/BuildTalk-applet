// pages/sub_circle/pages/card/card.js
const app = getApp();

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
    windowHeight: app.globalData.windowHeight + 49 - 1,
    isMaster: false, // 是否是圈主
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      circle_id: options.circle_id
    })

    //名片
    this.cardInfo()
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
  //名片
  cardInfo(){
    http.request({
      url: api.API_CARD,
      data: {
        circle_id: this.data.circle_id,
        user_id: wx.getStorageSync("user_id")
      }
    })
      .then(res => {
        console.log('--------名片---------')
        console.log(res)
        this.setData({
          info: res.data
        })
      })
  },

})