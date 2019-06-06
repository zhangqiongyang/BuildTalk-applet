// pages/sub_circle/pages/searchCircle/searchCircle.js
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
    type: 2, // 2圈子 3大咖
    isHistory: true,
    isSearchList: false,
    isAuthorList: false,
    key: '',
    page: 1,
    history: [],
    list: [],
    authorList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      type: options.type
    })
    wx.showLoading({
      title: '加载中',
    })
    // 搜索记录
    this.searchHistoryRequest()
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
    if (this.data.type == 2) {
      // 搜索圈子
      this.searchCircle(key, Number(this.data.page) + 1)
    } else {
      // 搜索大咖
      this.searchAuthor(key, Number(this.data.page) + 1)
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
  // 搜索
  search(event) {
    console.log(event)
    const key = event.detail.value
    this.setData({
      key: key
    })
    if (this.data.type == 2) {
      // 搜索圈子
      this.searchCircle(key)
    } else {
      // 搜索大咖
      this.searchAuthor(key)
    }
  },

  // 清空输入框
  clear() {
    this.setData({
      key: ''
    })
    setTimeout(_ => {
      this.setData({
        key: '',
        isHistory: true,
        isAuthorList:false,
        isSearchList:false,
      })
    }, 300);
  },

  // 取消
  cancel() {
    wx.navigateBack({
      delta: 1,
    })
  },

  // 搜索历史纪录
  searchHistory(event) {
    console.log(event)
    const key = event.currentTarget.dataset.value
    this.setData({
      key: key
    })
    if (this.data.type == 2) {
      // 搜索圈子
      this.searchCircle(key)
    } else {
      // 搜索大咖
      this.searchAuthor(key)
    }
  },

  // 删除搜索历史
  deleteHistory() {
    wx.showModal({
      title: '是否确认删除',
      showCancel: true,
      cancelText: '取消',
      confirmText: '确认',
      success: (res) => {
        if (res.confirm) {
          console.log('用户点击确定')

          // 删除搜索记录
          this.deleteHistoryRequest()
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  /**
   * 网络请求
   */

  // 搜索记录
  searchHistoryRequest() {
    http.request({
        url: api.API_HISTORY,
        data: {
          user_id: wx.getStorageSync("user_id"),
          type: this.data.type
        }
      })
      .then(res => {
        console.log("-----------搜索历史----------")
        console.log(res)
        this.setData({
          history: res.data
        })

        // 关闭刷新
        wx.hideLoading()
        wx.stopPullDownRefresh()
      })
      .catch(err => {
        // 关闭刷新
        wx.hideLoading()
        wx.stopPullDownRefresh()
      })
  },

  // 搜索圈子
  searchCircle(value, page) {
    http.request({
        url: api.API_SEARCHCIRCLE,
        data: {
          user_id: wx.getStorageSync("user_id"),
          searchKeyword: value,
          source: 'xcx',
          page_size: 20,
          page: page ? page : this.data.page
        }
      })
      .then(res => {
        console.log("-----------搜索结果（圈子）----------")
        console.log(res)
        this.setData({
          isSearchList: true,
          isHistory: false,
          circleInfo: res.data.circleInfo,
          page: res.data.page,
          page_count: res.data.page_count
        })

        // 关闭刷新
        wx.hideLoading()
        wx.stopPullDownRefresh()
      })
  },

  // 搜索大咖
  searchAuthor(value, page) {
    http.request({
        url: api.API_SEARCHAUTHOR,
        data: {
          user_id: wx.getStorageSync("user_id"),
          search_keyword: value,
          source: 'xcx',
          page_size: 20,
          page: page ? page : this.data.page
        }
      })
      .then(res => {
        console.log("-----------搜索结果（大咖）----------")
        console.log(res)
        this.setData({
          isAuthorList: true,
          isHistory: false,
          authorList: res.data.authorInfo,
          page: res.data.page,
          page_count: res.data.page_count
        })

        // 关闭刷新
        wx.hideLoading()
        wx.stopPullDownRefresh()
      })
  },

  // 删除搜索记录
  deleteHistoryRequest() {
    http.request({
        url: api.API_DELETEHISTORY,
        data: {
          user_id: wx.getStorageSync("user_id"),
          type: this.data.type
        }
      })
      .then(res => {
        console.log("-----------删除搜索记录成功----------")
        console.log(res)
        this.setData({
          history: ''
        })
        // 关闭刷新
        wx.hideLoading()
        wx.stopPullDownRefresh()
      })
  }

})