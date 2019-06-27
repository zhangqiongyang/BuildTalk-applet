// pages/sub_circle/pages/circleInfo/circleInfo.js
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
    windowHeight: app.globalData.windowHeight + 49 - 1.5,
    isMaster: false, // 是否是圈主
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    this.setData({
      circle_id: options.circle_id,
      operate_user: options.operate_user
    })
    // 圈子信息
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
  //跳转到圈子成员
  toCircleMember() {
    wx.navigateTo({
      url: '../circleMember/circleMember?circle_id=' + this.data.circle_id,
    })
  },

  // 跳转到名片
  toCard() {
    wx.navigateTo({
      url: '../card/card?circle_id=' + this.data.circle_id,
    })
  },

  // 跳转到圈子资料
  toCircleData() {
    if (this.data.circleInfo.is_circleMaster == 1) {
      wx.navigateTo({
        url: '../creatCircle/creatCircle?circle_id=' + this.data.circle_id,
      })
    } else {
      wx.navigateTo({
        url: '../circleData/circleData?circle_id=' + this.data.circle_id,
      })
    }

  },

  // 退出圈子
  exit() {
    let that = this
    util._showModal('确定退出此圈子？', '', function() {
      // 退出圈子
      that.quitCircle()
    })

    // util._showModal('确定退出此圈子？', '', ()=> {
    //   // 退出圈子
    //   that.quitCircle()
    // })
  },


  /**
   * 网络请求
   */

  // 圈子信息
  circleInfo() {
    http.request({
        url: api.API_CIRCLEINFO,
        data: {
          user_id: wx.getStorageSync('user_id'),
          circle_id: this.data.circle_id,
          source: 'xcx',
          operate_user: this.data.operate_user,
        }
      })
      .then(res => {
        console.log('--------圈子信息---------')
        console.log(res)
        this.setData({
          circleInfo: res.data
        })
        if (res.data.countUser == 0) {
          this.setData({
            isMaster: false
          })
        } else if (res.data.is_circleMaster == 1 && res.data.countUser > 0) {
          this.setData({
            isMaster: true
          })
        }
      })
  },


  // 退出圈子
  quitCircle() {
    http.request({
        url: api.API_QUITCIRCLE,
        data: {
          circle_id: this.data.circle_id,
          user_id: wx.getStorageSync("user_id"),
        }
      })
      .then(res => {
        console.log('----------退出成功-----------')
        console.log(res)

        util._showToastSuccess('退出成功')

        wx.navigateBack({
          delta: 2,
        })
        wx.switchTab({
          url: '../../../../pages/tabbar/circle/circle',
        })
      })
  },
})