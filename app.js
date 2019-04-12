//app.js

const util = require('/utils/util.js');
const api = require('/utils/api.js');

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

        if (wx.getStorageSync('openid')) {
          console.log('---------有openid---------')
          console.log(wx.getStorageSync('openid'))



          //检测用户是否绑定手机号
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
            success: function (res) {
              console.log(res)
              if (res.data.msg == "1") {
                console.log("---------------已经绑定手机号---------------------")
                that.globalData.isBindingPhone = true;
                that.globalData.phoneNumber = res.data.mobile
              } else {
                console.log("---------------未绑定手机号---------------------")
                that.globalData.isBindingPhone = false;
                wx.navigateTo({
                  url: '/pages/phone/phone',
                })
              }
            }
          })



          // 获取用户信息
          wx.getSetting({
            success: res => {
              if (res.authSetting['scope.userInfo']) {
                // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框

                that.globalData.isLogin = true

                wx.getUserInfo({
                  success: res => {
                    console.log('-------wx.getUserInfo.res---------')
                    console.log(res)



                    // 可以将 res 发送给后台解码出 unionId
                    console.log('----------res.userInfo---------' + res.userInfo)
                    that.globalData.userInfo = res.userInfo






                    console.log('-----------加密信息所传数据---------------')
                    console.log(res.encryptedData)
                    console.log(res.iv)
                    console.log(wx.getStorageSync('openid'))







                    //获取用户加密信息
                    wx.request({
                      // url: 'https://wx.bjjy.com/getUserinfoEncryptedData',
                      url: api.API_GETENCRYPTEDDATA,
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
                        console.log('------------app.js解密获取openid---------------')
                        console.log(JSON.parse(res.data.returndata).openId)
                        console.log('------------app.js解密获取unionid---------------')
                        console.log(JSON.parse(res.data.returndata).unionId)


                        wx.setStorageSync('unionid', JSON.parse(res.data.returndata).unionId)
                        wx.setStorageSync('openid', JSON.parse(res.data.returndata).openId)
                        that.globalData.unionid = JSON.parse(res.data.returndata).unionId
                        that.globalData.openid = JSON.parse(res.data.returndata).openId
                        // console.log(unionId)
                        // console.log(wx.getStorageSync('unionid'))
                        //console.log('----------成功返回数据回数据app.js-----------')
                        console.log(res)
                        var userInfo = JSON.parse(res.data.returndata)
                        that.globalData.userInerInfo = userInfo
                        console.log(userInfo)
                        //console.log('--------返回数据结束据结束app.js-----------')





                        console.log(wx.getStorageSync('unionid'))
                        console.log(wx.getStorageSync('openid'))
                        console.log(that.globalData.userInfo.nickName)
                        console.log(that.globalData.userInfo.avatarUrl, '321')
               

                        //上传用户的头像和昵称到数据库
                        if (!util.isEmpty(wx.getStorageSync('unionid')) && !util.isEmpty(wx.getStorageSync('openid')) && !util.isEmpty(that.globalData.userInfo.nickName) && !util.isEmpty(that.globalData.userInfo.avatarUrl)) {

                          wx.request({
                            // url: 'https://wx.bjjy.com/operateuser',
                            url: api.API_MINEUPLOADINFO,
                            data: {
                              unionid: wx.getStorageSync('unionid'),
                              source: 'xcx',
                              wx_openid: wx.getStorageSync('openid'),
                              nickname: that.globalData.userInfo.nickName,
                              headimage: that.globalData.userInfo.avatarUrl
                            },
                            header: {
                              'content-type': 'application/x-www-form-urlencoded'
                            },
                            method: 'POST',
                            dataType: 'json',
                            responseType: 'text',
                            success: function(res) {
                              console.log(res)
                              if (res.data.msg == '1') {
                                console.log('-------------上传用户的头像和昵称到数据库了(app.js)-----------------')
                                console.log('--------------1-------------')
                                console.log(wx.getStorageSync('openid'))
                              } else if (res.data.msg == '2') {
                                console.log('-------------上传用户的头像和昵称到数据库失敗了(app.js)-----------------')
                                console.log('--------------2-------------')
                                console.log(wx.getStorageSync('openid'))
                              } else if (res.data.msg == '3') {
                                console.log('-------------上传用户的头像和昵称到数据库更新成功了(app.js)-----------------')
                                console.log('--------------3-------------')
                                console.log(wx.getStorageSync('openid'))
                              } else if (res.data.msg == '4') {
                                console.log('-------------上传用户的头像和昵称到数据库更新失敗了(app.js)-----------------')
                                console.log('--------------4-------------')
                                console.log(wx.getStorageSync('openid'))
                              } else if (res.data.msg == '5') {
                                console.log('-------------无需更新(app.js)-----------------')
                                console.log('--------------5-------------')
                                console.log(wx.getStorageSync('openid'))
                              } else {
                                console.log('------------什么都没有------------')
                              }

                              // console.log(res)
                            },
                            fail: function(res) {
                              console.log('-------------上传用户的头像和昵称到数据库失败了-----------------')
                            },
                          })
                       
                        } else {
                          console.log('---------else----------')
                        }



                      },
                      fail: function() {
                        console.log('------------数据失败---')
                      }
                    })
                    // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                    // 所以此处加入 callback 以防止这种情况
                    if (that.userInfoReadyCallback) {
                      that.userInfoReadyCallback(res)
                      console.log('================回调===================')
                    }
                  }
                })
              } else {
                console.log('什么都没有')
              }
            }
          })

        } else {
          console.log('--------没有openid----------')
          wx.login({
            success: function(res) {
              console.log('-----------wx.login.res----------')
              console.log(res)
              if (res.code) {
                wx.request({
                  // url: 'https://wx.bjjy.com/getloginopenid',
                  url: api.API_GETOPENID,
                  data: {
                    code: res.code
                  },
                  header: {
                    'content-type': 'application/x-www-form-urlencoded'
                  },
                  method: 'POST',
                  success: function(res) {

                    that.globalData.openid = res.data.openid
                    console.log('-------通过code换取的res---------')
                    console.log(res)
                    // console.log(res.data.openid)
                    wx.setStorageSync('openid', res.data.openid)
                    // wx.setStorageSync('unionid', res.data.unionid)
                    // if(res.Status == 'SUCCESS' && res.)
                    // wx.setStorageSync('', data)
                    // console.log('下面输出openid<br>')
                    // console.log(that.globalData.openid)
                    // console.log('----------openid-------------')
                    console.log(wx.getStorageSync('openid'))
                    // console.log(wx.getStorageSync('unionid'))
                    if (that.openidCallback) {
                      that.openidCallback(res.data.openid)
                    }





                    //检测用户是否绑定手机号
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
                      success: function (res) {
                        console.log(res)
                        if (res.data.msg == "1") {
                          console.log("---------------已经绑定手机号---------------------")
                          that.globalData.isBindingPhone = true;
                          that.globalData.phoneNumber = res.data.mobile
                        } else {
                          console.log("---------------未绑定手机号---------------------")
                          that.globalData.isBindingPhone = false;
                          wx.navigateTo({
                            url: '/pages/phone/phone',
                          })
                        }
                      }
                    })




                    // 获取用户信息
                    wx.getSetting({
                      success: res => {
                        if (res.authSetting['scope.userInfo']) {
                          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框

                          that.globalData.isLogin = true

                          wx.getUserInfo({
                            success: res => {
                              console.log('-------wx.getUserInfo.res---------')
                              console.log(res)



                              // 可以将 res 发送给后台解码出 unionId
                              console.log('----------res.userInfo---------' + res.userInfo)
                              that.globalData.userInfo = res.userInfo




                              console.log('-----------加密信息所传数据---------------')
                              console.log(res.encryptedData)
                              console.log(res.iv)
                              console.log(wx.getStorageSync('openid'))




                              //获取用户加密信息
                              wx.request({
                                // url: 'https://wx.bjjy.com/getUserinfoEncryptedData',
                                url: api.API_GETENCRYPTEDDATA,
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
                                  console.log('------------app.js解密获取openid---------------')
                                  console.log(JSON.parse(res.data.returndata).openId)
                                  console.log('------------app.js解密获取unionid---------------')
                                  console.log(JSON.parse(res.data.returndata).unionId)


                                  wx.setStorageSync('unionid', JSON.parse(res.data.returndata).unionId)
                                  wx.setStorageSync('openid', JSON.parse(res.data.returndata).openId)
                                  that.globalData.unionid = JSON.parse(res.data.returndata).unionId
                                  that.globalData.openid = JSON.parse(res.data.returndata).openId
                                  // console.log(unionId)
                                  // console.log(wx.getStorageSync('unionid'))
                                  //console.log('----------成功返回数据回数据app.js-----------')
                                  console.log(res)
                                  var userInfo = JSON.parse(res.data.returndata)
                                  that.globalData.userInerInfo = userInfo
                                  console.log(userInfo)
                                  //console.log('--------返回数据结束据结束app.js-----------')



                                  console.log(wx.getStorageSync('unionid'))
                                  console.log(wx.getStorageSync('openid'))
                                  console.log(that.globalData.userInfo.nickName)
                                  console.log(that.globalData.userInfo.avatarUrl, '321')


                                  //上传用户的头像和昵称到数据库
                                  if (!util.isEmpty(wx.getStorageSync('unionid')) && !util.isEmpty(wx.getStorageSync('openid')) && !util.isEmpty(that.globalData.userInfo.nickName) && !util.isEmpty(that.globalData.userInfo.avatarUrl)) {

                                    console.log('--------555555555555555---------')
                                    console.log(wx.getStorageSync('unionid'))
                                    console.log(wx.getStorageSync('openid'))
                                    console.log(that.globalData.userInfo.nickName)
                                    console.log(that.globalData.userInfo.avatarUrl)

                                    console.log('-----------------打印 request 的参数 开始--------------')
                                    console.log(api.API_MINEUPLOADINFO);
                                    console.log(wx.getStorageSync('unionid'));
                                    console.log(wx.getStorageSync('openid'));
                                    console.log(that.globalData.userInfo.nickName);
                                    console.log(that.globalData.userInfo.avatarUrl);


                                    console.log('-----------------打印 request 的参数 结束--------------')

                                    wx.request({
                                      // url: 'https://wx.bjjy.com/operateuser',
                                      url: api.API_MINEUPLOADINFO,
                                      data: {
                                        unionid: wx.getStorageSync('unionid'),
                                        source: 'xcx',
                                        wx_openid: wx.getStorageSync('openid'),
                                        nickname: that.globalData.userInfo.nickName,
                                        headimage: that.globalData.userInfo.avatarUrl
                                      },
                                      header: {
                                        'content-type': 'application/x-www-form-urlencoded'
                                      },
                                      method: 'POST',
                                      dataType: 'json',
                                      responseType: 'text',
                                      success: function(res) {
                                        console.log(res)
                                        if (res.data.msg == '1') {
                                          console.log('-------------上传用户的头像和昵称到数据库了(app.js)-----------------')
                                          console.log('--------------1-------------')
                                          console.log(wx.getStorageSync('openid'))
                                        } else if (res.data.msg == '2') {
                                          console.log('-------------上传用户的头像和昵称到数据库失敗了(app.js)-----------------')
                                          console.log('--------------2-------------')
                                          console.log(wx.getStorageSync('openid'))
                                        } else if (res.data.msg == '3') {
                                          console.log('-------------上传用户的头像和昵称到数据库更新成功了(app.js)-----------------')
                                          console.log('--------------3-------------')
                                          console.log(wx.getStorageSync('openid'))
                                        } else if (res.data.msg == '4') {
                                          console.log('-------------上传用户的头像和昵称到数据库更新失敗了(app.js)-----------------')
                                          console.log('--------------4-------------')
                                          console.log(wx.getStorageSync('openid'))
                                        } else if (res.data.msg == '5') {
                                          console.log('-------------无需更新(app.js)-----------------')
                                          console.log('--------------5-------------')
                                          console.log(wx.getStorageSync('openid'))
                                        }

                                        // console.log(res)
                                      },
                                      fail: function(res) {
                                        console.log('-------------上传用户的头像和昵称到数据库失败了-----------------')
                                      },
                                    })
                                  } else {
                                    console.log('---------else----------')
                                  }



                                },
                                fail: function() {
                                  console.log('------------数据失败---')
                                }
                              })
                              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                              // 所以此处加入 callback 以防止这种情况
                              if (that.userInfoReadyCallback) {
                                that.userInfoReadyCallback(res)
                                console.log('================回调===================')
                              }
                            }
                          })
                        } else {
                          console.log('什么都没有')
                        }
                      }
                    })

                  },
                  fail: function() {
                    console.log('获取openid无效')
                  }
                })
              }
            }
          })
        }

      },
      fail: function() {
        console.log('session_key已过期，请重新获取')



        wx.login({
          success: function(res) {
            console.log('-----------wx.login.res----------')
            console.log(res)
            if (res.code) {
              wx.request({
                // url: 'https://wx.bjjy.com/getloginopenid',
                url: api.API_GETOPENID,
                data: {
                  code: res.code
                },
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                method: 'POST',
                success: function(res) {

                  that.globalData.openid = res.data.openid
                  console.log('-------通过code换取的res---------')
                  console.log(res)
                  // console.log(res.data.openid)
                  wx.setStorageSync('openid', res.data.openid)
                  // wx.setStorageSync('unionid', res.data.unionid)
                  // if(res.Status == 'SUCCESS' && res.)
                  // wx.setStorageSync('', data)
                  // console.log('下面输出openid<br>')
                  // console.log(that.globalData.openid)
                  // console.log('----------openid-------------')
                  console.log(wx.getStorageSync('openid'))
                  // console.log(wx.getStorageSync('unionid'))
                  if (that.openidCallback) {
                    that.openidCallback(res.data.openid)
                  }







                  //检测用户是否绑定手机号
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
                    success: function (res) {
                      console.log(res)
                      if (res.data.msg == "1") {
                        console.log("---------------已经绑定手机号---------------------")
                        that.globalData.isBindingPhone = true;
                        that.globalData.phoneNumber = res.data.mobile
                      } else {
                        console.log("---------------未绑定手机号---------------------")
                        that.globalData.isBindingPhone = false;
                        wx.navigateTo({
                          url: '/pages/phone/phone',
                        })
                      }
                    }
                  })




                  // 获取用户信息
                  wx.getSetting({
                    success: res => {
                      if (res.authSetting['scope.userInfo']) {
                        // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框

                        that.globalData.isLogin = true

                        wx.getUserInfo({
                          success: res => {
                            console.log('-------wx.getUserInfo.res---------')
                            console.log(res)



                            // 可以将 res 发送给后台解码出 unionId
                            console.log('----------res.userInfo---------' + res.userInfo)
                            that.globalData.userInfo = res.userInfo




                            console.log('-----------加密信息所传数据---------------')
                            console.log(res.encryptedData)
                            console.log(res.iv)
                            console.log(wx.getStorageSync('openid'))




                            //获取用户加密信息
                            wx.request({
                              // url: 'https://wx.bjjy.com/getUserinfoEncryptedData',
                              url: api.API_GETENCRYPTEDDATA,
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
                                console.log('------------app.js解密获取openid---------------')
                                console.log(JSON.parse(res.data.returndata).openId)
                                console.log('------------app.js解密获取unionid---------------')
                                console.log(JSON.parse(res.data.returndata).unionId)


                                wx.setStorageSync('unionid', JSON.parse(res.data.returndata).unionId)
                                wx.setStorageSync('openid', JSON.parse(res.data.returndata).openId)
                                that.globalData.unionid = JSON.parse(res.data.returndata).unionId
                                that.globalData.openid = JSON.parse(res.data.returndata).openId
                                // console.log(unionId)
                                // console.log(wx.getStorageSync('unionid'))
                                //console.log('----------成功返回数据回数据app.js-----------')
                                console.log(res)
                                var userInfo = JSON.parse(res.data.returndata)
                                that.globalData.userInerInfo = userInfo
                                console.log(userInfo)
                                //console.log('--------返回数据结束据结束app.js-----------')


                                console.log(wx.getStorageSync('unionid'))
                                console.log(wx.getStorageSync('openid'))
                                console.log(that.globalData.userInfo.nickName)
                                console.log(that.globalData.userInfo.avatarUrl, '321')


                                //上传用户的头像和昵称到数据库
                                if (!util.isEmpty(wx.getStorageSync('unionid')) && !util.isEmpty(wx.getStorageSync('openid')) && !util.isEmpty(that.globalData.userInfo.nickName) && !util.isEmpty(that.globalData.userInfo.avatarUrl)) {

                               
                                  wx.request({
                                    // url: 'https://wx.bjjy.com/operateuser',
                                    url: api.API_MINEUPLOADINFO,
                                    data: {
                                      unionid: wx.getStorageSync('unionid'),
                                      source: 'xcx',
                                      wx_openid: wx.getStorageSync('openid'),
                                      nickname: that.globalData.userInfo.nickName,
                                      headimage: that.globalData.userInfo.avatarUrl
                                    },
                                    header: {
                                      'content-type': 'application/x-www-form-urlencoded'
                                    },
                                    method: 'POST',
                                    dataType: 'json',
                                    responseType: 'text',
                                    success: function(res) {
                                      console.log(res)
                                      if (res.data.msg == '1') {
                                        console.log('-------------上传用户的头像和昵称到数据库了(app.js)-----------------')
                                        console.log('--------------1-------------')
                                        console.log(wx.getStorageSync('openid'))
                                      } else if (res.data.msg == '2') {
                                        console.log('-------------上传用户的头像和昵称到数据库失敗了(app.js)-----------------')
                                        console.log('--------------2-------------')
                                        console.log(wx.getStorageSync('openid'))
                                      } else if (res.data.msg == '3') {
                                        console.log('-------------上传用户的头像和昵称到数据库更新成功了(app.js)-----------------')
                                        console.log('--------------3-------------')
                                        console.log(wx.getStorageSync('openid'))
                                      } else if (res.data.msg == '4') {
                                        console.log('-------------上传用户的头像和昵称到数据库更新失敗了(app.js)-----------------')
                                        console.log('--------------4-------------')
                                        console.log(wx.getStorageSync('openid'))
                                      } else if (res.data.msg == '5') {
                                        console.log('-------------无需更新(app.js)-----------------')
                                        console.log('--------------5-------------')
                                        console.log(wx.getStorageSync('openid'))
                                      }else{
                                        console.log('------------什么都没有------------')
                                      }

                                      // console.log(res)
                                    },
                                    fail: function(res) {
                                      console.log('-------------上传用户的头像和昵称到数据库失败了-----------------')
                                    },
                                  })
                           
                                } else {
                                  console.log('---------else----------')
                                }



                              },
                              fail: function() {
                                console.log('------------数据失败---')
                              }
                            })
                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                            if (that.userInfoReadyCallback) {
                              that.userInfoReadyCallback(res)
                              console.log('================回调===================')
                            }
                          }
                        })
                      } else {
                        console.log('什么都没有')
                      }
                    }
                  })

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




    // // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框

    //       this.globalData.isLogin = true

    //       wx.getUserInfo({
    //         success: res => {
    //           console.log('-------wx.getUserInfo.res---------')
    //           console.log(res)



    //           // 可以将 res 发送给后台解码出 unionId
    //           console.log('----------res.userInfo---------' + res.userInfo)
    //           this.globalData.userInfo = res.userInfo




    //           console.log('-----------加密信息所传数据---------------')
    //           console.log(res.encryptedData)
    //           console.log(res.iv)
    //           console.log(wx.getStorageSync('openid'))




    //           //获取用户加密信息
    //           wx.request({
    //             // url: 'https://wx.bjjy.com/getUserinfoEncryptedData',
    //             url: api.API_GETENCRYPTEDDATA,
    //             data: {
    //               encryptedData: res.encryptedData,
    //               iv: res.iv,
    //               openid: wx.getStorageSync('openid'),
    //             },
    //             header: {
    //               'content-type': 'application/x-www-form-urlencoded'
    //             },
    //             method: 'POST',
    //             success: function (res) {
    //               console.log('----------成功返回数据')
    //               console.log(res)
    //               console.log(res.data)
    //               console.log(res.data.returncode)
    //               console.log('------------app.js解密获取openid---------------')
    //               console.log(JSON.parse(res.data.returndata).openId)
    //               console.log('------------app.js解密获取unionid---------------')
    //               console.log(JSON.parse(res.data.returndata).unionId)


    //               wx.setStorageSync('unionid', JSON.parse(res.data.returndata).unionId)
    //               wx.setStorageSync('openid', JSON.parse(res.data.returndata).openId)
    //               that.globalData.unionid = JSON.parse(res.data.returndata).unionId
    //               that.globalData.openid = JSON.parse(res.data.returndata).openId
    //               // console.log(unionId)
    //               // console.log(wx.getStorageSync('unionid'))
    //               //console.log('----------成功返回数据回数据app.js-----------')
    //               console.log(res)
    //               var userInfo = JSON.parse(res.data.returndata)
    //               that.globalData.userInerInfo = userInfo
    //               console.log(userInfo)
    //               //console.log('--------返回数据结束据结束app.js-----------')



    //               //检测用户是否绑定手机号
    //               wx.request({
    //                 // url: 'https://wx.bjjy.com/checkbindmobile',
    //                 url: api.API_CHECKPHONE,
    //                 data: {
    //                   openid: wx.getStorageSync("openid"),
    //                   unionid: wx.getStorageSync('unionid')
    //                 },
    //                 header: {
    //                   'content-type': 'application/x-www-form-urlencoded'
    //                 },
    //                 method: 'POST',
    //                 dataType: 'json',
    //                 responseType: 'text',
    //                 success: function (res) {
    //                   console.log(res)
    //                   if (res.data.msg == "1") {
    //                     console.log("---------------已经绑定手机号---------------------")
    //                     that.globalData.isBindingPhone = true;
    //                     that.globalData.phoneNumber = res.data.mobile
    //                   } else {
    //                     console.log("---------------未绑定手机号---------------------")
    //                     that.globalData.isBindingPhone = false;
    //                     wx.navigateTo({
    //                       url: '/pages/phone/phone',
    //                     })
    //                   }
    //                 }
    //               })


    //               console.log(wx.getStorageSync('unionid'))
    //               console.log(wx.getStorageSync('openid'))
    //               console.log(that.globalData.userInfo.nickName)
    //               console.log(that.globalData.userInfo.avatarUrl, '321')
    //               var a = 5

    //               if (!util.isEmpty(wx.getStorageSync('unionid')) && !util.isEmpty(wx.getStorageSync('openid')) && !util.isEmpty(that.globalData.userInfo.nickName) && !util.isEmpty(that.globalData.userInfo.avatarUrl)) {
    //                 console.log('----------------相等---------------')
    //               } else {
    //                 console.log('---------------不等-------------')
    //               }


    //               //上传用户的头像和昵称到数据库
    //               if (!util.isEmpty(wx.getStorageSync('unionid')) && !util.isEmpty(wx.getStorageSync('openid')) && !util.isEmpty(that.globalData.userInfo.nickName) && !util.isEmpty(that.globalData.userInfo.avatarUrl)) {

    //                 console.log('--------555555555555555---------')
    //                 console.log(wx.getStorageSync('unionid'))
    //                 console.log(wx.getStorageSync('openid'))
    //                 console.log(that.globalData.userInfo.nickName)
    //                 console.log(that.globalData.userInfo.avatarUrl)

    //                 console.log('-----------------打印 request 的参数 开始--------------')
    //                 console.log(api.API_MINEUPLOADINFO);
    //                 console.log(wx.getStorageSync('unionid'));
    //                 console.log(wx.getStorageSync('openid'));
    //                 console.log(that.globalData.userInfo.nickName);
    //                 console.log(that.globalData.userInfo.avatarUrl);


    //                 console.log('-----------------打印 request 的参数 结束--------------')

    //                 wx.request({
    //                   // url: 'https://wx.bjjy.com/operateuser',
    //                   url: api.API_MINEUPLOADINFO,
    //                   data: {
    //                     unionid: wx.getStorageSync('unionid'),
    //                     source: 'xcx',
    //                     wx_openid: wx.getStorageSync('openid'),
    //                     nickname: that.globalData.userInfo.nickName,
    //                     headimage: that.globalData.userInfo.avatarUrl
    //                   },
    //                   header: {
    //                     'content-type': 'application/x-www-form-urlencoded'
    //                   },
    //                   method: 'POST',
    //                   dataType: 'json',
    //                   responseType: 'text',
    //                   success: function (res) {
    //                     if (res.data.msg == '1') {
    //                       console.log('-------------上传用户的头像和昵称到数据库了(app.js)-----------------')
    //                       console.log('--------------1-------------')
    //                       console.log(wx.getStorageSync('openid'))
    //                     } else if (res.data.msg == '2') {
    //                       console.log('-------------上传用户的头像和昵称到数据库失敗了(app.js)-----------------')
    //                       console.log('--------------2-------------')
    //                       console.log(wx.getStorageSync('openid'))
    //                     } else if (res.data.msg == '3') {
    //                       console.log('-------------上传用户的头像和昵称到数据库更新成功了(app.js)-----------------')
    //                       console.log('--------------3-------------')
    //                       console.log(wx.getStorageSync('openid'))
    //                     } else if (res.data.msg == '4') {
    //                       console.log('-------------上传用户的头像和昵称到数据库更新失敗了(app.js)-----------------')
    //                       console.log('--------------4-------------')
    //                       console.log(wx.getStorageSync('openid'))
    //                     } else if (res.data.msg == '5') {
    //                       console.log('-------------无需更新(app.js)-----------------')
    //                       console.log('--------------5-------------')
    //                       console.log(wx.getStorageSync('openid'))
    //                     }

    //                     // console.log(res)
    //                   },
    //                   fail: function (res) {
    //                     console.log('-------------上传用户的头像和昵称到数据库失败了-----------------')
    //                   },
    //                 })
    //                 wx.request({
    //                   // url: 'https://wx.bjjy.com/operateuser',
    //                   url: api.API_MINEUPLOADINFO,
    //                   data: {
    //                     wx_openid: wx.getStorageSync('openid'),
    //                     source: 'xcx',
    //                     unionid: wx.getStorageSync('unionid'),
    //                     nickname: that.globalData.userInfo.nickName,
    //                     headimage: that.globalData.userInfo.avatarUrl,
    //                   },
    //                   header: {
    //                     'content-type': 'application/x-www-form-urlencoded'
    //                   },
    //                   method: 'POST',
    //                   dataType: 'json',
    //                   responseType: 'text',
    //                   success: function (res) {
    //                     if (res.data.msg == '1') {
    //                       console.log('-------------上传用户的头像和昵称到数据库了(mine.js)-----------------')
    //                       console.log('--------------1-------------')
    //                       console.log(wx.getStorageSync('openid'))
    //                     } else if (res.data.msg == '2') {
    //                       console.log('-------------上传用户的头像和昵称到数据库失敗了(mine.js)-----------------')
    //                       console.log('--------------2-------------')
    //                       console.log(wx.getStorageSync('openid'))
    //                     } else if (res.data.msg == '3') {
    //                       console.log('-------------上传用户的头像和昵称到数据库更新成功了(mine.js)-----------------')
    //                       console.log('--------------3-------------')
    //                       console.log(wx.getStorageSync('openid'))
    //                     } else if (res.data.msg == '4') {
    //                       console.log('-------------上传用户的头像和昵称到数据库更新失敗了(mine.js)-----------------')
    //                       console.log('--------------4-------------')
    //                       console.log(wx.getStorageSync('openid'))
    //                     } else if (res.data.msg == '5') {
    //                       console.log('-------------无需更新(mine.js)-----------------')
    //                       console.log('--------------5-------------')
    //                       console.log(wx.getStorageSync('openid'))
    //                     }
    //                   },
    //                   fail: function (res) {
    //                     console.log('-------------上传用户的头像和昵称到数据库失败了-----------------')
    //                   },
    //                 })
    //               } else {
    //                 console.log('---------else----------')
    //               }



    //             },
    //             fail: function () {
    //               console.log('------------数据失败---')
    //             }
    //           })
    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //             console.log('================回调===================')
    //           }
    //         }
    //       })
    //     } else {
    //       console.log('什么都没有')
    //     }
    //   }
    // })





    wx.getSystemInfo({
      success: function(res) {
        that.globalData.platform = res.platform
        // if (res.platform == "devtools") {
        //               PC
        // } else if (res.platform == "ios") {
        //               IOS
        // } else if (res.platform == "android") {
        //               android
        // }
      }
    })





    // 获取屏幕高度
    wx.getSystemInfo({
      success: function(res) {
        that.globalData.windowHeight = res.windowHeight
        that.globalData.scrollHeight = res.screenHeight-res.statusBarHeight
        console.log('============屏幕高度=============')
        console.log(res)

      }

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
    unionid: '',
    recevinginfo: {
      telephone: '',
      address: '',
      consignee: ''
    },
    isLogin: null,
    isBindingPhone: null,
    phoneNumber: '',
    windowHeight: '',
    scrollHeight:null,
    platform: ''
  }
})