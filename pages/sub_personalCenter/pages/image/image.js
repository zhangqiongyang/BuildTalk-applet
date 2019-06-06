// pages/sub_personalCenter/pages/image/image.js
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
    windowHeight: app.globalData.windowHeight + 49 - 2,
    windowWidth: app.globalData.windowWidth,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    this.setData({
      isHeadImage: options.isHeadImage,
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

  // 从相册选图片
  upload() {
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album'],
      success(res) {
        console.log(res)
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'https://www.51jiantan.com/picuploadhandle',
          filePath: tempFilePaths[0],
          name: 'file',
          success(res) {
            console.log(res)
            const data = JSON.parse(res.data)
            // do something
            console.log(data)
            if (that.data.isHeadImage == "true") {
              that.setData({
                'mineInfo.headImage': data.pic_url
              })
              //修改头像接口
              that.changeHeadImage()
            } else {
              that.setData({
                'mineInfo.bg_pic': data.pic_url
              })
              //修改背景接口
              that.changeBackImage()
            }
          }
        })
      }
    })
  },

  // 拍照
  camera() {
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['camera'],
      success(res) {
        console.log(res)
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'https://www.51jiantan.com/picuploadhandle',
          filePath: tempFilePaths[0],
          name: 'file',
          success(res) {
            console.log(res)
            const data = JSON.parse(res.data)
            // do something
            console.log(data)
            if (that.data.isHeadImage == "true") {
              that.setData({
                'mineInfo.headImage': data.pic_url
              })
              //修改头像接口
              that.changeHeadImage() 
            } else {
              that.setData({
                'mineInfo.bg_pic': data.pic_url
              })
              //修改背景接口
              that.changeBackImage() 
            }
          }
        })
      }
    })
  },

  /**
   * 网络请求
   */

  //修改头像接口
  changeHeadImage() {
    http.request({
        url: api.API_CHANGEMINEINFO,
        data: {
          type: 2,//1名字 2头像 3背景
          user_id: wx.getStorageSync('user_id'),
          headImage: this.data.mineInfo.headImage,
        }
      })
      .then(res => {
        console.log('-------修改头像成功-------')
        console.log(res)

        app.globalData.headImage=this.data.mineInfo.headImage
      })
  },
  //修改背景接口
  changeBackImage() {
    http.request({
      url: api.API_CHANGEMINEINFO,
      data: {
        type: 3,//1名字 2头像 3背景
        user_id: wx.getStorageSync('user_id'),
        bg_pic: this.data.mineInfo.bg_pic,
      }
    })
      .then(res => {
        console.log('-------修改背景成功-------')
        console.log(res)
      })
  },
})