// pages/sub_browse/pages/authorDesc/authorDesc.js

var WxParse = require('../../../../wxParse/wxParse.js');
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
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    let author_id = options.author_id
    this.setData({
      author_id: author_id
    })
    // 获取作者信息 
    this.searchAuthorInfo()

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
   * 网络请求
   */

  // 获取作者信息 
  searchAuthorInfo() {
    http.request({
        url: api.API_GETAUTHORINFO,
        data: {
          author_id: this.data.author_id
        }
      })
      .then(res => {
        console.log('----------获取到作者信息了-------------')
        console.log(res)
        this.setData({
          authorInfo: res.data
        })
      })
  }
})