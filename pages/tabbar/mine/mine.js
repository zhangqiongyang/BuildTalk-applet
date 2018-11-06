const app = getApp()
const util = require('../../../utils/util.js')
// console.log(app)
// console.log('----------12334-----')
// console.log(app.globalData.openid)

Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowHeight: app.globalData.windowHeight,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    accountList: [{
        accountImg: '/image/mine_account.png',
        accountName: '账户',
        accountNumber: '0.00'
      },
      {
        accountImg: '/image/mine_account.png',
        accountName: '收货地址',
        accountNumber: ''

      },
      {
        accountImg: '/image/mine_bought.png',
        accountName: '已购',
        accountNumber: ''
      },
      {
        accountImg: '/image/mine_giftCertificate.png',
        accountName: '礼券',
        accountNumber: '1'
      },
      // {
      //   accountImg: '/image/mine_redPacket.png',
      //   accountName: '分享有赏',
      //   accountNumber: ''
      // },
      {
        accountImg: '/image/mine_friend.png',
        accountName: '邀请好友',
        accountNumber: '各得30元'
      }
    ],
    mineList: [
    // {
    //     mineImg: '/image/mine_note.png',
    //     mineName: '我的笔记'
    //   },
      {
        mineImg: '/image/mine_message.png',
        mineName: '我的留言'
      },
      // {
      //   mineImg: '/image/mine_collect.png',
      //   mineName: '我的收藏'
      // },
      // {
      //   mineImg: '/image/mine_download.png',
      //   mineName: '我的下载'
      // }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    console.log('----------mine 打印openid-------------')
    console.log(wx.getStorageSync('openid'))

    // if ((wx.getStorageSync('openid')) == '') {
    //   if (app.globalData.openid && app.globalData.openid != '') {
    //     console.log('-----------1-----------')
    //     openid = app.globalData.openid
    //   } else {
    //     console.log('-----------2-------------')
    //     app.openidCallback = openidCallback => {
    //       if (openidCallback != '') {
    //         app.globalData.openid = openidCallback;
    //         that.setData({
    //           openid: app.globalData.openid,
    //         })
    //       }
    //     }
    //   }
    // } else {
    //   this.setData({
    //     openid: wx.getStorageSync('openid')
    //   })
    // }





    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回.
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        console.log(res.userInfo)
        console.log(app.globalData.userInfo.nickName)
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
        },
        fail: res => {
          this.setData({
            hasUserInfo: false
          })
        }
      })
    }
  },













  getUserInfo: function(res) {
    var that = this;
    console.log('==============res=============')
    console.log(res)
    console.log(res.detail)
    console.log(res.detail.userInfo)


    app.globalData.userInfo = res.detail.userInfo



    // console.log('==============res.detail.encryptedData=============' +'    ' + res.detail.encryptedData)
    // console.log('==============res.detail.iv=============' + '    ' + res.detail.iv)

    // wx.request({
    //   url: 'https://wx.bjjy.com/getUserinfoEncryptedData',
    //   data: {
    //     encryptedData: res.detail.encryptedData,
    //     iv: res.detail.iv
    //   },
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded'
    //   },
    //   method: 'POST',
    //   success: function(res) {
    //     console.log('----------成功返回数据-----------')
    //     console.log(res)

    //   },
    // })
    console.log(app.globalData.userInfo)

    if (res.detail.errMsg == "getUserInfo:fail auth deny") {
      app.globalData.isLogin = false
      that.setData({
        hasUserInfo: false
      })
    } else {



      that.setData({
        userInfo: res.detail.userInfo,
        hasUserInfo: true
      })


      console.log('-------------获取全局变量----------------')
      console.log(app.globalData)

      app.globalData.isLogin = true

      console.log('-------------赋值后获取全局变量----------------')
      console.log(app.globalData)


      console.log(this.data.userInfo.nickName)



      //上传用户的头像和昵称到数据库
      if (!util.isEmpty(wx.getStorageSync('openid')) && !util.isEmpty(that.data.userInfo.nickName) && !util.isEmpty(that.data.userInfo.avatarUrl)) {
        wx.request({
          url: 'https://wx.bjjy.com/operateuser',
          data: {
            'wx_openid': wx.getStorageSync('openid'),
            'nickname': that.data.userInfo.nickName,
            'headimage': that.data.userInfo.avatarUrl
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          method: 'POST',
          dataType: 'json',
          responseType: 'text',
          success: function(res) {
            console.log('-------------上传用户的头像和昵称到数据库了(mine.js)-----------------')
            console.log(wx.getStorageSync('openid'))
            console.log('---------------------------')
          },
          fail: function(res) {
            console.log('-------------上传用户的头像和昵称到数据库失败了-----------------')
          },
        })
      }
    }
  },


  jumpToAddress() {
    if (app.globalData.isLogin) {
      wx.navigateTo({
        url: "/pages/sub_personalCenter/pages/address/address",
      })
    } else {
      wx.showModal({
        title: '未登录',
        content: '请先登录',
        showCancel: true,
        cancelText: '取消',
        confirmText: '确定',
        success: function(res) {
          wx.switchTab({
            url: '/pages/tabbar/mine/mine',
          })
        },
        fail: function(res) {},
        complete: function(res) {},
      })
    }

  },

  jumpToAlreadyBought() {
    if (app.globalData.isLogin) {
      wx.navigateTo({
        url: "/pages/sub_personalCenter/pages/alreadyBought/alreadyBought",
      })
    } else {
      wx.showModal({
        title: '未登录',
        content: '请先登录',
        showCancel: true,
        cancelText: '取消',
        confirmText: '确定',
        success: function (res) {
          wx.switchTab({
            url: '/pages/tabbar/mine/mine',
          })
        },
      })
    }

  },

  jumpTogiftCertificate() {
    if (app.globalData.isLogin) {
      wx.navigateTo({
        url: "/pages/sub_personalCenter/pages/giftCertificate/giftCertificate",
      })
    } else {
      wx.showModal({
        title: '未登录',
        content: '请先登录',
        showCancel: true,
        cancelText: '取消',
        confirmText: '确定',
        success: function (res) {
          wx.switchTab({
            url: '/pages/tabbar/mine/mine',
          })
        },
      })
    }

  },


  jumpToInviteFriends() {
    if (app.globalData.isLogin) {
      wx.navigateTo({
        url: "/pages/sub_personalCenter/pages/inviteFriends/inviteFriends",
      })
    } else {
      wx.showModal({
        title: '未登录',
        content: '请先登录',
        showCancel: true,
        cancelText: '取消',
        confirmText: '确定',
        success: function (res) {
          wx.switchTab({
            url: '/pages/tabbar/mine/mine',
          })
        },
      })
    }

  },



  jumpToMyMsg() {
    if (app.globalData.isLogin) {
      wx.navigateTo({
        url: "/pages/sub_personalCenter/pages/myMsg/myMsg",
      })
    } else {
      wx.showModal({
        title: '未登录',
        content: '请先登录',
        showCancel: true,
        cancelText: '取消',
        confirmText: '确定',
        success: function (res) {
          wx.switchTab({
            url: '/pages/tabbar/mine/mine',
          })
        },
      })
    }

  },



  jumpToFeedback() {
    if (app.globalData.isLogin) {
      wx.navigateTo({
        url: "/pages/sub_personalCenter/pages/feedback/feedback",
      })
    } else {
      wx.showModal({
        title: '未登录',
        content: '请先登录',
        showCancel: true,
        cancelText: '取消',
        confirmText: '确定',
        success: function (res) {
          wx.switchTab({
            url: '/pages/tabbar/mine/mine',
          })
        },
        fail: function (res) { },
        complete: function (res) { },
      })
    }

  },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    // wx.getSystemInfo({
    //   success: function (res) {
    //     console.log('--------------获取系统信息，获取屏幕高度---------------')
    //     console.log(res)
    //   },
    //   fail: function (res) { },
    //   complete: function (res) { },
    // })
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

  }
})