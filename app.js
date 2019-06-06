//app.js

import {
  HTTP
} from '/utils/http.js'
let http = new HTTP()

import {
  api
} from '/utils/api.js'

const util = require('/utils/util.js');

App({
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)


    //登录
    var that = this;
    wx.checkSession({
      success: function() {
        if (util.isEmpty(wx.getStorageSync('login_id'))) {
          // 登录
          wx.login({
            success: res => {
              // 发送 res.code 到后台换取 openId, sessionKey, unionId
              console.log('-------wx.login res--------')
              console.log(res)
              if (res.code) {
                // 发起网络请求，通过code换取login_id
                http.request({
                    url: api.API_FROMCODEGETLOGINID,
                    data: {
                      code: res.code
                    }
                  })
                  .then(res => {
                    console.log('--------通过code换取的res---------')
                    console.log(res)


                    wx.setStorageSync('login_id', res.data.login_id)
                    wx.setStorageSync('sessionkey_id', res.data.sessionkey_id)

                    console.log('---------login_id----------')
                    console.log(wx.getStorageSync('login_id'))
                    // res.getUnionid代表后台是否含有unionId
                    // 0代表未含有，需要走解密流程，1代表含有，不需要解密
                    if (res.data.getUnionid == '1') {
                      that.globalData.isHaveUnionId = true
                      console.log('-------已经含有unionId，不需要解密--------')

                    } else {

                    }
                  })

              } else {
                console.log('登录失败！' + res.errMsg)
              }
            }
          })
        }
        // session_key 未过期，并且在本生命周期一直有效
        console.log('----session_key 未过期，并且在本生命周期一直有效-----')
        // console.log(wx.getStorageSync('sessionkey_id'))
        console.log(wx.getStorageSync('login_id'))
        http.request({
            url: api.API_CHECKLOGINIDISVALID,
            data: {
              login_id: wx.getStorageSync('login_id'),
              sessionkey_id: wx.getStorageSync('sessionkey_id'),
            }
          })
          .then(res => {
            console.log('-------------检测到login_id是否有效了-------------')
            console.log(res)
            //res.data.getUnionid代表unionId是否存在
            // 1 存在， 0 不存在
            // 1不需要再次解密，0需要解密
            if (res.data.getUnionid == 1) {
              that.globalData.isHaveUnionId = true
              console.log('-------已经含有unionId，不需要解密--------')
            }
            if (res.data.exist_mobile == 1) {
              that.globalData.isHavePhone = true
              that.globalData.mobile = res.data.userInfo.mobile
              that.globalData.headImage = res.data.userInfo.headImage
              that.globalData.nickName = res.data.userInfo.nickName
              that.globalData.user_id = res.data.userInfo.user_id
              wx.setStorageSync('user_id', res.data.userInfo.user_id)
              console.log(wx.getStorageSync('user_id'))

            }

          })

      },
      fail: function() {
        console.log('session_key已过期，请重新获取')

        // 登录
        wx.login({
          success: res => {
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            console.log('-------wx.login res--------')
            console.log(res)
            if (res.code) {
              // 发起网络请求，通过code换取login_id
              http.request({
                  url: api.API_FROMCODEGETLOGINID,
                  data: {
                    code: res.code
                  }
                })
                .then(res => {
                  console.log('--------通过code换取的res---------')
                  console.log(res)


                  wx.setStorageSync('login_id', res.data.login_id)
                  wx.setStorageSync('sessionkey_id', res.data.sessionkey_id)

                  console.log('---------login_id----------')
                  console.log(wx.getStorageSync('login_id'))
                  // res.getUnionid代表后台是否含有unionId
                  // 0代表未含有，需要走解密流程，1代表含有，不需要解密
                  if (res.data.getUnionid == '1') {
                    that.globalData.isHaveUnionId = true
                    console.log('-------已经含有unionId，不需要解密--------')

                  } else {

                  }
                })

            } else {
              console.log('登录失败！' + res.errMsg)
            }
          }
        })
      }
    })

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              console.log('---------wx.getUserInfo 的 res-----------')
              console.log(res)
              //isHaveUnionId为false，代表不含unionId，需要解密
              if (!this.globalData.isHaveUnionId) {
                // 解密获取用户unionId
                http.request({
                    url: api.API_GETENCRYPTEDDATA,
                    data: {
                      login_id: wx.getStorageSync('login_id'),
                      encryptedData: res.encryptedData,
                      iv: res.iv
                    }
                  })
                  .then(res => {
                    console.log('---------获取到用户加密信息----------')
                    console.log(res)

                  })

              }

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })


    // 获取屏幕高度与系统信息
    wx.getSystemInfo({
      success: function(res) {
        that.globalData.platform = res.platform
        that.globalData.windowHeight = res.windowHeight
        that.globalData.scrollHeight = res.screenHeight - res.statusBarHeight
        that.globalData.windowWidth = res.windowWidth
        that.globalData.screenWidth = res.screenWidth
        that.globalData.screenHeight = res.screenHeight
        console.log('============屏幕高度=============')
        console.log(res)
      }

    })


  },
  globalData: {
    userInfo: null,
    scrollHeight: null,
    windowHeight: null,
    windowWidth: null,
    screenWidth: null,
    screenHeight: null,
    platform: null,
    headImage: null,
    nickName: null,
    mobile: null,
    isHavePhone: null,
  }
})