const app = getApp()
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
    windowHeight: app.globalData.windowHeight - 0.5,
    phoneNumber: app.globalData.mobile,
    headImage: app.globalData.headImage,
    nickName: app.globalData.nickName,
    userInfo: {},
    hasUserInfo: false,
    isHavePhone: '', //用户是否绑定手机号
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isLogin: app.globalData.isLogin,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log('----------是否登陆-----------')
    console.log(app.globalData.isLogin)
    wx.showLoading({
      title: '加载中',
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }


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
    if (!app.globalData.isHavePhone) {
      // 查询用户是否绑定手机号
      this.checkIsHavePhone()
    } else {
      this.setData({
        isHavePhone: true
      })
    }

    this.setData({
      mobile: app.globalData.mobile,
      headImage: app.globalData.headImage,
      nickName: app.globalData.nickName,
    })


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
    wx.showLoading({
      title: '加载中',
    })
    if (!app.globalData.isHavePhone) {
      // 查询用户是否绑定手机号
      this.checkIsHavePhone()
    } else {
      this.setData({
        isHavePhone: true
      })
    }

    this.setData({
      mobile: app.globalData.mobile,
      headImage: app.globalData.headImage,
      nickName: app.globalData.nickName,
    })

    wx.hideLoading()
    wx.stopPullDownRefresh()

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

  //登录
  getUserInfo: function(e) {
    console.log(e)
    if (e.detail.errMsg == "getUserInfo:fail auth deny") {
      this.setData({
        hasUserInfo: false
      })

    } else {
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
      app.globalData.isLogin = true
      //isHaveUnionId为false，代表不含unionId，需要解密
      if (!app.globalData.isHaveUnionId) {

        // 解密获取用户unionId
        this.getSecretInfo(e.detail.encryptedData, e.detail.iv)
      }
      // 查询用户是否绑定手机号
      this.checkIsHavePhone()
    }
  },


  // 跳转到信息
  toMineInfo() {
    util.judge(() => {
      wx.navigateTo({
        url: '/pages/sub_personalCenter/pages/mineInfo/mineInfo',
      })
    })
  },
  // 跳转到钱包
  toAccount() {
    util.judge(() => {
      wx.navigateTo({
        url: '/pages/sub_personalCenter/pages/account/account',
      })
    })
  },
  // 跳转到设置
  toSet() {
    wx.navigateTo({
      url: '/pages/sub_personalCenter/pages/set/set',
    })
  },
  // 跳转到问题反馈
  toFeedback() {
    wx.navigateTo({
      url: '/pages/sub_personalCenter/pages/feedback/feedback',
    })
  },

  // 跳转到绑定手机号
  toBindPhone() {
    wx.navigateTo({
      url: '/pages/sub_personalCenter/pages/bindPhone/bindPhone',
    })
  },


  /**
   * 网络请求
   */

  // 解密获取用户unionId
  getSecretInfo(tencryptedData, iv) {
    http.request({
        url: api.API_GETENCRYPTEDDATA,
        data: {
          login_id: wx.getStorageSync('login_id'),
          encryptedData: tencryptedData,
          iv: iv
        }
      })
      .then(res => {
        console.log('---------获取到用户加密信息----------')
        console.log(res)
        app.globalData.isLogin = true

        wx.hideLoading()
        wx.stopPullDownRefresh()
      })

  },


  // 查询用户是否绑定手机号
  checkIsHavePhone() {
    http.request({
        url: api.API_CHECKPHONE,
        data: {
          login_id: wx.getStorageSync('login_id')
        }
      })
      .then(res => {
        console.log('---------已经绑定手机号-----------')
        console.log(res)
        this.setData({
          isHavePhone: true,
          mobile: res.data.mobile
        })

        app.globalData.isHavePhone = true
        app.globalData.mobile = res.data.mobile
        app.globalData.headImage = res.data.headImage
        app.globalData.nickName = res.data.nickName
        app.globalData.user_id = res.data.user_id
        app.globalData.isLogin = true

        this.setData({
          isHavePhone: true,
          isLogin: true,
          mobile: res.data.mobile,
          headImage: res.data.headImage,
          nickName: res.data.nickName,
        })

        wx.setStorageSync('user_id', res.data.user_id)
        console.log(wx.getStorageSync('user_id'))


        console.log(app.globalData.isHavePhone)

        wx.hideLoading()
        wx.stopPullDownRefresh()
      })
      .catch(err => {
        console.log('------------未绑定手机号------------')
        wx.navigateTo({
          url: '/pages/sub_personalCeter/pages/bindPhone/bindPhone',
        })
      })
  }

})