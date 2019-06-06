// pages/sub_personalCenter/pages/mineInfo/mineInfo.js
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
    isAuthor: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 查询个人信息
    this.mineInfo()
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
   *  方法
   */

  // 跳转到修改头像
  toImage(event) {
    const isHeadImage = event.currentTarget.dataset.type == 'headImage' ? true : false
    wx.navigateTo({
      url: '../image/image?isHeadImage=' + isHeadImage + '&mineInfo=' + JSON.stringify(this.data.mineInfo),
    })
  },

  // 跳转到修改名字
  toChangeName() {
    wx.navigateTo({
      url: '../changeName/changeName?mineInfo=' + JSON.stringify(this.data.mineInfo),
    })
  },

  // 跳转到修改手机号
  toPhone() {
    wx.navigateTo({
      url: '../phone/phone?mobile=' + this.data.mineInfo.mobile,
    })
  },

  /**
   *  网络请求
   */

  // 查询个人信息
  mineInfo() {
    http.request({
        url: api.API_MINEINFO,
        data: {
          user_id: wx.getStorageSync('user_id')
        }
      })
      .then(res => {
        console.log('-------获取到个人信息了-------')
        console.log(res)

        this.setData({
          mineInfo: res.data
        })

        if (res.data.user_type == 2) {
          this.setData({
            isAuthor: true
          })
        }
      })
  },

})