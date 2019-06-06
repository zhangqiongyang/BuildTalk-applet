// pages/sub_personalCenter/pages/changeName/changeName.js
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
    value: '荀',
    windowHeight: app.globalData.windowHeight + 49 - 2,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      mineInfo: JSON.parse(options.mineInfo)
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

  // 清空输入框
  clear() {
    this.setData({
      'mineInfo.nickName': ''
    })
  },

  //输入
  input(event){
    console.log(event)
    const value=event.detail.value
    this.setData({
      'mineInfo.nickName':value
    })
  },

  // 提交
  submit(evnet) {
    console.log(evnet)
    if (!util.isEmpty(this.data.mineInfo.nickName)){

      //修改接口
      this.change() 
    }else{
      util._showToast('昵称不能为空')
    }
  },

  /**
   *  网络请求
   */


  //修改接口
  change() {
    http.request({
        url: api.API_CHANGEMINEINFO,
        data: {
          type: 1, //1名字 2头像 3背景
          user_id: wx.getStorageSync('user_id'),
          nickName: this.data.mineInfo.nickName,
        }
      })
      .then(res => {
        console.log('-------修改名字成功-------')
        console.log(res)

        app.globalData.nickName = this.data.mineInfo.nickName

        util._showToastSuccess('修改成功')

      })
  },
})