const app = getApp()
const util = require('../../../utils/util.js')
const api = require('../../../utils/api.js');

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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    console.log('----------mine 打印openid-------------')
    console.log(wx.getStorageSync('openid'))
    


    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回.
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
      
        wx.request({
          url: 'https://wx.bjjy.com/getUserinfoEncryptedData',
          data: {
            openid: wx.getStorageSync('openid'),
            encryptedData: res.encryptedData,
            iv: res.iv
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          method: 'POST',
          success: function(re) {
            console.log('--------12------')
            console.log(re)
            console.log('--------34--------')
            var userInfo = JSON.parse(re.data.returndata)
            console.log(userInfo)
            wx.setStorageSync('unionid', userInfo.unionId)
            //console.log(userInfo.openId)
            that.setData({
              userInfo: userInfo,
              openid: userInfo.openId,
              hasUserInfo: true
            })
            //console.log('----------成功返回数据-------')
            //var userInfo = JSON.parse(res.data.returndata)
            //console.log(userInfo)
            console.log('--------返回数据结束12-------')
          },
          fail: function() {
            console.log('------------数据失败---')
          },
          complete: function() {
            console.log('执行啦执行拉')
          }
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


    // this.checkPhone()
  },


  getUserInfo: function(e) {
    var that = this;
    console.log('==============res=============')
    console.log(e)


    app.globalData.userInfo = e.detail.userInfo


    console.log(app.globalData.userInfo)

    if (e.detail.errMsg == "getUserInfo:fail auth deny") {
      app.globalData.isLogin = false
      that.setData({
        hasUserInfo: false
      })
    } else {



      that.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })


      console.log('-------------获取全局变量----------------')
      console.log(app.globalData)

      app.globalData.isLogin = true

      console.log('-------------赋值后获取全局变量----------------')
      console.log(app.globalData)


      console.log(this.data.userInfo.nickName)

      wx.request({
        // url: 'https://wx.bjjy.com/getUserinfoEncryptedData',
        url: api.API_GETENCRYPTEDDATA,
        data: {
          openid: wx.getStorageSync('openid'),
          //openid: 'oDpcQ5YZXI7gOzUmOCvMnLiQ6Wkg',
          encryptedData: e.detail.encryptedData,
          iv: e.detail.iv
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        success: function(re) {
          var userInfo = JSON.parse(re.data.returndata)
          console.log(userInfo)
          wx.setStorageSync('unionid', userInfo.unionId)

          //上传用户的头像和昵称到数据库
          if (!util.isEmpty(wx.getStorageSync('unionid')) && !util.isEmpty(wx.getStorageSync('openid')) && !util.isEmpty(that.data.userInfo.nickName) && !util.isEmpty(that.data.userInfo.avatarUrl)) {
            wx.request({
              // url: 'https://wx.bjjy.com/operateuser',
              url: api.API_MINEUPLOADINFO,
              data: {
                wx_openid: wx.getStorageSync('openid'),
                source: 'xcx',
                unionid: wx.getStorageSync('unionid'),
                nickname: that.data.userInfo.nickName,
                headimage: that.data.userInfo.avatarUrl,
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              method: 'POST',
              dataType: 'json',
              responseType: 'text',
              success: function(res) {
                if (res.data.msg == '1') {
                  console.log('-------------上传用户的头像和昵称到数据库了(mine.js)-----------------')
                  console.log('--------------1-------------')
                  console.log(wx.getStorageSync('openid'))
                } else if (res.data.msg == '2') {
                  console.log('-------------上传用户的头像和昵称到数据库失敗了(mine.js)-----------------')
                  console.log('--------------2-------------')
                  console.log(wx.getStorageSync('openid'))
                } else if (res.data.msg == '3') {
                  console.log('-------------上传用户的头像和昵称到数据库更新成功了(mine.js)-----------------')
                  console.log('--------------3-------------')
                  console.log(wx.getStorageSync('openid'))
                } else if (res.data.msg == '4') {
                  console.log('-------------上传用户的头像和昵称到数据库更新失敗了(mine.js)-----------------')
                  console.log('--------------4-------------')
                  console.log(wx.getStorageSync('openid'))
                } else if (res.data.msg == '5') {
                  console.log('-------------无需更新(mine.js)-----------------')
                  console.log('--------------5-------------')
                  console.log(wx.getStorageSync('openid'))
                }
              },
              fail: function(res) {
                console.log('-------------上传用户的头像和昵称到数据库失败了-----------------')
              },
            })
          }
        },

        fail: function() {
          console.log('------------数据失败---')
        },
        complete: function() {
          console.log('执行啦执行拉')
        }
      })
    }
    this.checkPhone()




  },

 
  //检测用户是否绑定手机号
  checkPhone() {
    var that = this
    wx.request({
      // url: 'https://wx.bjjy.com/checkbindmobile',
      url: api.API_CHECKPHONE,
      data: {
        openid: wx.getStorageSync("openid"),
        unionid: wx.getStorageSync('unionid')
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
          console.log('============================')
          console.log(that.data.phoneNumber)
        } else {
          console.log("---------------未绑定手机号---------------------")
          app.globalData.isBindingPhone = false;
          wx.navigateTo({
            url: '/pages/phone/phone',
          })
        }
      }
    })
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





  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
   
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

    this.setData({
      phoneNumber:app.globalData.phoneNumber
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

  // 跳转到信息
  toMineInfo(){
    wx.navigateTo({
      url: '/pages/sub_personalCenter/pages/info/info',
    })
  },
  // 跳转到钱包
  toAccount() {
    wx.navigateTo({
      url: '/pages/sub_personalCenter/pages/account/account',
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
})