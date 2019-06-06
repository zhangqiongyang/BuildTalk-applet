// pages/sub_author/pages/collect/collect.js

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
    isMine: false,
    page: 1,
    collectList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      user_id: options.user_id,
      name: options.name
    })

    if (options.user_id == wx.getStorageSync('user_id')) {
      this.setData({
        isMine: true
      })
    }

    // 收藏
    this.collect()
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
  // 删除收藏
  deleteCollect(event) {
    const id = event.currentTarget.dataset.id,
      index = event.currentTarget.dataset.index
    util._showModal('确认删除该主题？', '', () => {
      // 删除收藏
      this.deleteCollectRequest(id)
    })

  },


  /**
   * 网络请求
   */
  // 关注
  collect() {
    http.request({
        url: api.API_COLLECT,
        data: {
          examine_user: wx.getStorageSync('user_id'),
          user_id: this.data.user_id,
          page: this.data.page,
          page_size: 20,
        }
      })
      .then(res => {
        console.log('------------收藏-------------')
        console.log(res)

        this.setData({
          collectList: res.data.myCollectInfo,
          page: res.data.page,
          page_count: res.data.page_count
        })

        if (this.data.isMine) {
          wx.setNavigationBarTitle({
            title: '我的收藏'
          })
        } else {
          wx.setNavigationBarTitle({
            title: this.data.name + '的收藏'
          })
        }
      })
      .catch(err => {
        console.log('---------没有收藏----------')
        this.setData({
          collectList: []
        })

      })
  },

  // 删除收藏
  deleteCollectRequest(id) {
    http.request({
        url: api.API_DELETECOLLECT,
        data: {
          collect_id: id,
        }
      })
      .then(res => {
        console.log('------------删除收藏-------------')
        console.log(res)

        // 关注
        this.collect()
      })
  }


})