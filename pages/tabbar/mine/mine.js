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
    phoneNumber: app.globalData.phoneNumber,
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
    // console.log(app.globalData.phoneNumber)

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


    this.checkPhone()
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

    this.checkPhone()




  },




  //检测用户是否绑定手机号
  checkPhone() {
    var that =this
    wx.request({
      url: 'https://wx.bjjy.com/checkbindmobile',
      data: {
        openid: wx.getStorageSync("openid")
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log(res)
        if (res.data.msg == "1") {
          console.log("---------------已经绑定手机号---------------------")
          app.globalData.isBindingPhone = true;
          app.globalData.phoneNumber = res.data.mobile
          that.setData({
            phoneNumber: res.data.mobile
          })
        } else {
          console.log("---------------未绑定手机号---------------------")
          app.globalData.isBindingPhone = false;
        }
      }
    })
  },





  jumpToAddress() {
    //判断是否登录
    //如果登录，进行下一步判断，如果未登录，引导用户先登录
    if (app.globalData.isLogin) {
      //判断用户是否绑定手机号
      //如果已经绑定手机号，可以进行页面跳转，如果没有绑定，引导用户先绑定手机号
      if (app.globalData.isBindingPhone) {
        wx.navigateTo({
          url: "/pages/sub_personalCenter/pages/address/address",
        })
      } else {
        wx.showModal({
          title: '未绑定手机号',
          content: '请先绑定手机号',
          showCancel: true,
          cancelText: '取消',
          confirmText: '确定',
          success: function(res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '/pages/phone/phone',
              })
            } else if (res.cancel) {

            }
          },
        })
      }
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
        }
      })
    }

  },

  jumpToAlreadyBought() {
    //判断是否登录
    //如果登录，进行下一步判断，如果未登录，引导用户先登录
    if (app.globalData.isLogin) {
      //判断用户是否绑定手机号
      //如果已经绑定手机号，可以进行页面跳转，如果没有绑定，引导用户先绑定手机号
      if (app.globalData.isBindingPhone) {
        wx.navigateTo({
          url: "/pages/sub_personalCenter/pages/alreadyBought/alreadyBought",
        })
      } else {
        wx.showModal({
          title: '未绑定手机号',
          content: '请先绑定手机号',
          showCancel: true,
          cancelText: '取消',
          confirmText: '确定',
          success: function(res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '/pages/phone/phone',
              })
            } else if (res.cancel) {

            }
          },
        })
      }
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
      })
    }

  },

  jumpTogiftCertificate() {
    //判断是否登录
    //如果登录，进行下一步判断，如果未登录，引导用户先登录
    if (app.globalData.isLogin) {
      //判断用户是否绑定手机号
      //如果已经绑定手机号，可以进行页面跳转，如果没有绑定，引导用户先绑定手机号
      if (app.globalData.isBindingPhone) {
        wx.navigateTo({
          url: "/pages/sub_personalCenter/pages/giftCertificate/giftCertificate",
        })
      } else {
        wx.showModal({
          title: '未绑定手机号',
          content: '请先绑定手机号',
          showCancel: true,
          cancelText: '取消',
          confirmText: '确定',
          success: function(res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '/pages/phone/phone',
              })
            } else if (res.cancel) {

            }
          },
        })
      }
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
      })
    }

  },


  jumpToInviteFriends() {
    //判断是否登录
    //如果登录，进行下一步判断，如果未登录，引导用户先登录
    if (app.globalData.isLogin) {
      //判断用户是否绑定手机号
      //如果已经绑定手机号，可以进行页面跳转，如果没有绑定，引导用户先绑定手机号
      if (app.globalData.isBindingPhone) {
        wx.navigateTo({
          url: "/pages/sub_personalCenter/pages/inviteFriends/inviteFriends",
        })
      } else {
        wx.showModal({
          title: '未绑定手机号',
          content: '请先绑定手机号',
          showCancel: true,
          cancelText: '取消',
          confirmText: '确定',
          success: function(res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '/pages/phone/phone',
              })
            } else if (res.cancel) {

            }
          },
        })
      }
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
      })
    }

  },



  jumpToMyMsg() {
    //判断是否登录
    //如果登录，进行下一步判断，如果未登录，引导用户先登录
    if (app.globalData.isLogin) {
      //判断用户是否绑定手机号
      //如果已经绑定手机号，可以进行页面跳转，如果没有绑定，引导用户先绑定手机号
      if (app.globalData.isBindingPhone) {
        wx.navigateTo({
          url: "/pages/sub_personalCenter/pages/myMsg/myMsg",
        })
      } else {
        wx.showModal({
          title: '未绑定手机号',
          content: '请先绑定手机号',
          showCancel: true,
          cancelText: '取消',
          confirmText: '确定',
          success: function(res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '/pages/phone/phone',
              })
            } else if (res.cancel) {

            }
          },
        })
      }
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
      })
    }

  },



  jumpToFeedback() {
    //判断是否登录
    //如果登录，进行下一步判断，如果未登录，引导用户先登录
    if (app.globalData.isLogin) {
      //判断用户是否绑定手机号
      //如果已经绑定手机号，可以进行页面跳转，如果没有绑定，引导用户先绑定手机号
      if (app.globalData.isBindingPhone) {
        wx.navigateTo({
          url: "/pages/sub_personalCenter/pages/feedback/feedback",
        })
      } else {
        wx.showModal({
          title: '未绑定手机号',
          content: '请先绑定手机号',
          showCancel: true,
          cancelText: '取消',
          confirmText: '确定',
          success: function(res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '/pages/phone/phone',
              })
            } else if (res.cancel) {

            }
          },
        })
      }
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




  // 拨打电话
  call(){
    wx.makePhoneCall({
      phoneNumber: '12356789' //仅为示例，并非真实的电话号码
    })
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