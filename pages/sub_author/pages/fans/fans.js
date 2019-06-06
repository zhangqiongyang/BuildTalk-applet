// pages/sub_author/pages/fans/fans.js

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
    isMine:false,
    masterList: [],
    page:1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      user_id:options.user_id,
      name:options.name
    })

    if (options.user_id == wx.getStorageSync('user_id')) {
      this.setData({
        isMine: true
      })
    }
    //粉丝
    this.fans()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },


  /**
   * 方法
   */



  /**
   * 网络请求
   */
  // 粉丝
  fans(){
    http.request({
      url: api.API_FANS,
      data:{
        examine_user:wx.getStorageSync('user_id'),
        user_id:this.data.user_id,
        page:this.data.page,
        page_size:20,
      }
    })
    .then(res=>{
      console.log('------------粉丝-------------')
      console.log(res)

      this.setData({
        masterList:res.data.myFansInfo,
        page:res.data.page,
        page_count: res.data.page_count
      })



      if (this.data.isMine) {
        wx.setNavigationBarTitle({
          title: '我的粉丝'
        })
      } else {
        wx.setNavigationBarTitle({
          title: this.data.name + '的粉丝'
        })
      }

    })
  }


})