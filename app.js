//app.js

const util = require('/utils/util.js')

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
        console.log('session_key未过期，并且在本生命周期一直有效')
      },
      fail: function() {
        console.log('session_key已过期，请重新获取')



        wx.login({
          success: function(res) {
            if (res.code) {
              wx.request({
                url: 'https://wx.bjjy.com/getloginopenid',
                data: {
                  code: res.code
                },
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                method: 'POST',
                success: function(res) {
                  that.globalData.openid = res.data.openid
                  console.log('-------res.data的值是---------')
                 // console.log(res.data.openid)
                  wx.setStorageSync('openid', res.data.openid)
                  // if(res.Status == 'SUCCESS' && res.)
                  // wx.setStorageSync('', data)
                  // console.log('下面输出openid<br>')
                  // console.log(that.globalData.openid)
                  // console.log('----------openid-------------')
                  // console.log(wx.getStorageSync('openid'))
                  if (that.openidCallback) {
                    that.openidCallback(res.data.openid)
                  }
                },
                fail: function() {
                  console.log('获取openid无效')
                }
              })
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

          this.globalData.isLogin = true

          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              console.log('----------res.userInfo---------'+res.userInfo)
              this.globalData.userInfo = res.userInfo
              //上传用户的头像和昵称到数据库
              if (!util.isEmpty(wx.getStorageSync('openid')) && !util.isEmpty(this.globalData.userInfo.nickName) && !util.isEmpty(this.globalData.userInfo.avatarUrl)) {
                wx.request({
                  url: 'https://wx.bjjy.com/operateuser',
                  data: {
                    'wx_openid': wx.getStorageSync('openid'),
                    'nickname': this.globalData.userInfo.nickName,
                    'headimage': this.globalData.userInfo.avatarUrl
                  },
                  header: {
                    'content-type': 'application/x-www-form-urlencoded'
                  },
                  method: 'POST',
                  dataType: 'json',
                  responseType: 'text',
                  success: function(res) {
                    console.log('-------------上传用户的头像和昵称到数据库了(app.js)-----------------')
                    console.log(wx.getStorageSync('openid'))
                    console.log('---------------------------')

                  },
                  fail: function(res) {
                    console.log('-------------上传用户的头像和昵称到数据库失败了-----------------')
                  },
                })
              }
              //获取用户加密信息
              wx.request({
                url: 'https://wx.bjjy.com/getUserinfoEncryptedData',
                data: {
                  encryptedData: res.encryptedData,
                  iv: res.iv,
                  openid: wx.getStorageSync('openid'),
                },
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                method: 'POST',
                success: function(res) {
                  console.log('----------成功返回数据')
                  console.log(res)
                  console.log(res.data)
                  console.log(res.data.returncode)
                  console.log(JSON.parse(res.data.returndata).openId)

                  //console.log('----------成功返回数据回数据app.js-----------')
                  console.log(res)
                  var userInfo = JSON.parse(res.data.returndata)
                  that.globalData.userInerInfo = userInfo
                  console.log(userInfo)
                  //console.log('--------返回数据结束据结束app.js-----------')

                },
                fail: function() {
                  console.log('------------数据失败---')
                }
              })
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        } else {
          console.log('什么都没有')
        }
      }
    })







    // 获取屏幕高度
    wx.getSystemInfo({
      success: function (res) {
        that.globalData.windowHeight = res.windowHeight
      },
      fail: function (res) { },
      complete: function (res) { },
    })




    //获取用户转发信息
    // wx.getShareInfo({
    //   shareTicket: 'a',
    //   success: function(res) {
    //     console.log('获取转发信息')
    //     console.log(res)
    //   },
    //   fail: function(res) {},
    //   complete: function(res) {},
    // })


  },
  globalData: {
    userInfo: '',
    openid: '',
    recevinginfo:{
      telephone :'',
      address : '',
      consignee : ''
    },
    isLogin:null,
    isBindingPhone:null,
    windowHeight:''
  }
})