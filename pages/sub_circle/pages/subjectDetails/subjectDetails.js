// pages/sub_circle/pages/subjectDetails/subjectDetails.js


import {
  md5
} from "../../../../utils/md5.js"


import {
  HTTP
} from '../../../../utils/http.js'
let http = new HTTP()
import {
  api
} from '../../../../utils/api.js'
var WxParse = require('../../../../wxParse/wxParse.js');

const util = require('../../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    subjectInfo: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    this.setData({
      theme_id: options.theme_id,
      circle_id: options.circle_id
    })

    // 主题详情
    this.subjectDetail()
    // 留言
    this.guestbookInfo()
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
  // 发表留言
  uploadMsg(event) {
    console.log(event)
    const value = event.detail.value

    // 留言接口
    this.submitRequest(value)
  },

  // 切换编辑主题
  changeRedactSubject(event) {
    console.log(event)
    const type = event.currentTarget.dataset.type
    if (type == 'open') {
      // 主题权限查看
      this.subjectclassifyRequest()
      this.setData({
        isRedactSubject: true
      })
    } else {
      this.setData({
        isRedactSubject: false
      })
    }
  },

  // 删除主题成功
  deleteSubject(){
    this.setData({
      isRedactSubject:false
    })
  },

  // 收藏主题成功
  collectSubject(){
    this.setData({
      isRedactSubject: false
    })
  },

  /**
   * 网络请求
   */

  // 主题详情
  subjectDetail() {
    http.request({
        url: api.API_SUBJECTDETAIL,
        data: {
          theme_id: this.data.theme_id,
          user_id: wx.getStorageSync('user_id'),
        }
      })
      .then(res => {
        console.log('----------主题详情----------')
        console.log(res)

        this.setData({
          subjectInfo: res.data,
          'tabbarlist.countCollect': res.data.themeCountParise,
          'tabbarlist.isCollect': res.data.is_parise,
          'tabbarlist.article_id': res.data.theme_id,
          'tabbarlist.isArticle': false
        })

        // 关闭刷新
        wx.hideLoading()
        wx.stopPullDownRefresh()
      })
  },

  // 留言
  guestbookInfo() {
    http.request({
        url: api.API_SUBJECTMSGINFO,
        data: {
          user_id: wx.getStorageSync('user_id'),
          theme_id: this.data.theme_id,
          page: this.data.page,
          page_size: 20,
        }
      })
      .then(res => {
        console.log('----------留言----------')
        console.log(res)

        this.setData({
          commentInfo: res.data.commentInfo,
          'tabbarlist.guestbookNum': res.data.commentInfo.length,
          page: res.data.page,
          page_count: res.data.page_count,
        })

        // 关闭刷新
        wx.hideLoading()
        wx.stopPullDownRefresh()
      })
  },

  //提交留言接口
  submitRequest(value) {
    http.request({
        url: api.API_SUBJECTMSG,
        data: {
          source: 'xcx',
          user_id: wx.getStorageSync('user_id'),
          theme_id: this.data.theme_id,
          content: value,
        }
      })
      .then(res => {
        console.log('-----------留言提交成功------------')
        console.log(res)


        util._showToastSuccess('提交成功')
        this.setData({
          commentInfo: res.data.commentInfo,
          'tabbarlist.guestbookNum': res.data.commentInfo.length,
          page: res.data.page,
          page_count: res.data.page_count,
        })
      })
  },



  // 主题权限查看
  subjectclassifyRequest() {
    http.request({
      url: api.API_SUBJECTCLASSIFY,
      data: {
        theme_id: this.data.theme_id,
        user_id: wx.getStorageSync("user_id"),
      }
    })
      .then(res => {
        console.log('----------主题权限查看----------')
        console.log(res)

        this.setData({
          'subjectclassify.is_upadate': res.data.is_upadate, //是否有修改权限 0无修改权限 1有修改权限
          'subjectclassify.is_delete': res.data.is_delete, //是否有删除权限 0无删除权限 1有删除权限
          'subjectclassify.is_collect': res.data.is_collect, //是否有收藏权限 0无收藏权限 1有收藏权限
          'subjectclassify.collect_status': res.data.collect_status, //0未收藏  1已收藏
          'subjectclassify.theme_id': this.data.theme_id, //主题id
          'subjectclassify.circle_id': this.data.circle_id, //圈子id
        })

        // 关闭刷新
        wx.hideLoading()
      })
  },
})