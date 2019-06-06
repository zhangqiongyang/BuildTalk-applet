var app = getApp();
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
    windowHeight: app.globalData.windowHeight + 48 - 1,
    placeholder: '请描述您的问题或建议（必填）',
    currentNoteLen: 0,
    maxlength: '2000',
    value: '',
  },


  // 获取上层数据
  onLoad: function(options) {

  },


  /**
   * 生命周期函数--监听页面加载
   */


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

  // 字数限制
  bindWordLimit: function(e) {
    var value = e.detail.value,
      maxlength = this.data.maxlength,
      len = parseInt(value.length);

    if (len > maxlength) {
      return;
    }

    this.setData({
      currentNoteLen: len, //当前字数
      value: value //文本域内容
    })
  },

  //提交
  msgSubmit() {
    if (!util.isEmpty(this.data.value)) {
      //提交
      this.submitRequest()
    } else {
      util._showToast('内容不能为空')
    }
  },

  /**
   * 网络请求
   */
  //提交
  submitRequest() {
    http.request({
        url: api.API_FEEDBACK,
        data: {
          user_id: wx.getStorageSync('user_id'),
          content: this.data.value
        }
      })
      .then(res => {
        console.log('-----------反馈成功----------')
        console.log(res)

        util._showToastSuccess('反馈成功')

        wx.navigateBack({
          delta: 1,
        })
      })
  }
})