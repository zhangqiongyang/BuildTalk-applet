// pages/sub_browse/pages/hotCircle/hotCircle.js
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
    list: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 热门话题圈
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


  /**
   * 网络请求
   */

  // 热门话题圈
  circleInfo() {
    http.request({
        url: api.API_ALLCIRCLE,
        data: {
          type: 1,
          isIndex: 0,
          page: this.data.page,
          page_size: 20
        }
      })
      .then(res => {
        console.log('------------获取到热门话题圈了-----------')
        console.log(res)
        this.setData({
          list: res.data.circleInfo
        })

        // 关闭刷新
        wx.hideLoading()
        wx.stopPullDownRefresh()
      })
  }
})