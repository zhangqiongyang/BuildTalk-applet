// pages/sub_circle/pages/circle/circle.js
const util = require('../../../utils/util.js')

import {
  HTTP
} from '../../../utils/http.js'
let http = new HTTP()
import {
  api
} from '../../../utils/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isRule: false, //圈主规则
    isChecked: true,
    circleList: [],
    page: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 获取圈子信息
    this.getCircle()
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
    this.setData({
      page: 1
    })

    // 获取圈子信息
    this.getCircle()

    wx.showLoading({
      title: '加载中',
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if(this.data.page<this.data.page_count){
      // 获取圈子信息
      this.getCircle(Number(this.data.page) + 1)

      wx.showLoading({
        title: '加载中',
      })
    }else{
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
  // 关闭圈主规则
  chageRule() {
    this.setData({
      isRule: false
    })
  },

  // 打开圈主规则
  toRule() {
    this.setData({
      isRule: true
    })
  },

  // 选中圈主规则
  toChecked() {
    this.setData({
      isChecked: !this.data.isChecked
    })
  },

  // 跳转到圈主规则
  toUserAgreement() {
    wx.navigateTo({
      url: '/pages/sub_circle/pages/userAgreement/userAgreement',
    })
  },

  // 跳转到创建圈子
  toCreatCircle() {
    wx.navigateTo({
      url: '/pages/sub_circle/pages/creatCircle/creatCircle',
    })
  },

  // 跳转到搜索圈子
  toSearchCircle() {
    wx.navigateTo({
      url: '/pages/sub_circle/pages/searchCircle/searchCircle?type='+2,
    })
  },

  // 跳转到圈子详情
  toCircle(event) {
    console.log(event)
    const circle_id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/sub_circle/pages/circleDetails/circleDetails?circle_id=' + circle_id,
    })
  },

  /**
   * 网络请求
   */
  // 获取圈子信息
  getCircle() {
    http.request({
        url: api.API_CIRCLE,
        data: {
          user_id: wx.getStorageSync('user_id'),
          page: this.data.page,
          page_size: 20,
        }
      })
      .then(res => {
        console.log('------------获取到我的圈子了------------')
        console.log(res)
        this.setData({
          circleList: res.data.circleInfo,
          page_count: res.data.page_count,
          page: res.data.page,
        })

        // 关闭刷新
        wx.hideLoading()
        wx.stopPullDownRefresh()
      })
  }
})