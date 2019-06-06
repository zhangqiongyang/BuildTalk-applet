// pages/sub_author/pages/masterDetails/masterDetails.js

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
    text: '圈主详情',
    authorInfo: {},
    circleList: [],
    creat_page: 1,
    join_page: 1,
    isCreat: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      user_id: options.user_id
    })

    // 获取圈主信息
    this.masterInfo()
    // 圈子
    this.circleList(1)
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

  // 切换导航
  changeNav(event) {
    console.log(event)
    const type = event.currentTarget.dataset.type
    if (type == 'creat') {
      this.setData({
        isCreat: true
      })
      // 创建的圈子
      this.circleList(1)
    } else {
      this.setData({
        isCreat: false
      })
      // 加入的圈子
      this.circleList(2)
    }
  },




  /**
   * 网络请求
   */
  // 获取圈主信息
  masterInfo() {
    http.request({
        url: api.API_AUTHORDETAILS,
        data: {
          examine_user: wx.getStorageSync('user_id'),
          user_id: this.data.user_id,
          user_type: 2, //1大咖 2圈主
        }
      })
      .then(res => {
        console.log('--------获取到圈主信息了----------')
        console.log(res)

        this.setData({
          authorInfo: res.data,
          'authorInfo.isVip': false,
          'authorInfo.user_id': this.data.user_id,
          // articleList: res.data.articleInfo,
        })
      })
  },


  // 圈子
  circleList(circle_type) {
    http.request({
        url: api.API_CIRCLECREATJOIN,
        data: {
          circle_type: circle_type, //1 创建 2加入
          examine_user: wx.getStorageSync('user_id'),
          user_id: this.data.user_id,
          page: circle_type == 1 ? this.data.creat_page : this.data.join_page,
          page_size: 20
        }
      })
      .then(res => {
        console.log('----------圈子信息----------')
        console.log(res)

        if (circle_type == 1) {
          this.setData({
            creatCircleList: res.data.myCircleInfo,
            creat_page: res.data.page,
            creat_page_count: res.data.page_count
          })
        } else {
          this.setData({
            joinCircleList: res.data.myCircleInfo,
            join_page: res.data.page,
            join_page_count: res.data.page_count
          })
        }
      })
  },
})