// pages/sub_author/pages/authorRecommend/authorRecommend.js
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
    author_page: 1,
    authorList: [],
    masterList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //行业大咖
    this.author()
    // 人气圈主
    this.master()
    wx.showLoading({
      title: '加载中',
    })
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
      author_page: 1,
    })
    //行业大咖
    this.author()
    // 人气圈主
    this.master()
    wx.showLoading({
      title: '加载中',
    })
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

  // 关注
  attention(event) {
    console.log(event)
    const id = event.currentTarget.dataset.id
    // 关注
    this.attentionRequest(id)
  },

  // 换一换
  change() {
    // 获取行业大咖信息
    if (this.data.author_page < this.data.author_page_count) {
      this.author(Number(this.data.author_page) + 1)
    } else {
      this.author(1)
    }
  },

  // 跳转到搜索
  search() {
    wx.navigateTo({
      url: '/pages/sub_circle/pages/searchCircle/searchCircle?type=' + 3,
    })
  },

  //跳转到大咖列表
  toAuthorList() {
    wx.navigateTo({
      url: '/pages/sub_author/pages/authorList/authorList',
    })
  },
  //跳转到圈主列表
  toMasterList() {
    wx.navigateTo({
      url: '/pages/sub_author/pages/masterList/masterList',
    })
  },
  //跳转到大咖
  toAuthor(event) {
    console.log(event)
    const author_id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/sub_author/pages/authorDetails/authorDetails?author_id=' + author_id,
    })
  },
  //跳转到圈主
  toMaster(event) {
    const user_id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/sub_author/pages/masterDetails/masterDetails?user_id=' + user_id,
    })
  },

  /**
   * 网络请求
   */

  //行业大咖
  author(page) {
    http.request({
        url: api.API_AUTHOR,
        data: {
          page: page ? page : this.data.author_page,
          page_size: 3,
        }
      })
      .then(res => {
        console.log('---------获取到大咖信息了--------')
        console.log(res)
        this.setData({
          authorList: res.data.masterInfo,
          author_page: res.data.page,
          author_page_count: res.data.page_count
        })
        wx.hideLoading()
        wx.stopPullDownRefresh()
      })
  },

  // 人气圈主
  master() {
    http.request({
        url: api.API_MAETER,
        data: {
          show: 1, //1 人气圈主 2排行榜
          user_id: wx.getStorageSync('user_id'),
        }
      })
      .then(res => {
        console.log('---------获取到人气圈主信息了--------')
        console.log(res)
        this.setData({
          masterList: res.data,
        })
        wx.hideLoading()
        wx.stopPullDownRefresh()
      })
  },

  // 关注
  attentionRequest(id) {
    http.request({
        url: api.API_ATTENTION,
        data: {
          examine_user: wx.getStorageSync('user_id'),
          user_id: id,
          source: 'xcx',
        }
      })
      .then(res => {
        console.log('---------关注信息--------')
        console.log(res)

        let masterList = this.data.masterList
        for (let i = 0; i < masterList.length; i++) {
          if (id == masterList[i].user_id) {
            if (masterList[i].is_attention == 1) {
              masterList[i].is_attention = 0
              util._showToastCancel('已取消关注')
            } else {
              masterList[i].is_attention = 1
              util._showToastSuccess('关注成功')
            }
          }
        }

        this.setData({
          masterList: masterList
        })
      })
  },

})