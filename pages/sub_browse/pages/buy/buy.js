// pages/buy/buy.js


var app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: app.globalData.userInfo,
    isHaveAddress: true,
    recevinginfo: '',
    isArticle: null,
    phoneNumber: app.globalData.phoneNumber,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;

    // 获取上层页面传的参数
    console.log(options);
    console.log(app.globalData.phoneNumber)
    console.log(app.globalData.isBindingPhone)
    console.log(app.globalData.userInfo)


    if (options.course_id) {
      var course_id = options.course_id;
      that.setData({
        course_id: options.course_id,
        isArticle: false,
        msg: '0'
      })
      //获取课程列表数据
      that.getCourseInfo();

    } else {
      var article_id = options.article_id;
      that.setData({
        article_id: options.article_id,
        isArticle: true,
        msg: '1'
      })
      // 获取文章数据
      that.getArticleInfo();


    }


    // 获取收货地址信息
    this.getAddress();


    // console.log(app.globalData)
    // console.log(app.globalData.userInfo)
    this.setData({
      userInfo: app.globalData.userInfo,
      phoneNumber: app.globalData.phoneNumber

    })
    // console.log('------------userInfo-------------' + this.data.userInfo)


  },




  jumpToAddress() {
    wx.navigateTo({
      url: '/pages/sub_browse/pages/address/address',
    })
  },



  //跳转到用户反馈（客服）
  jumpToFeedback() {
    wx.navigateTo({
      url: '/pages/sub_personalCenter/pages/feedback/feedback'
    })
  },



  // 支付
  pay() {

    var that = this;

    // console.log(this.data.courseinfo.course_money)
    // console.log(wx.getStorageSync('openid'))
    // console.log(this.data.courseinfo.course_name)
    // console.log(this.data.courseinfo.course_id)



    if (that.data.msg == '0') {
      //查询订单号
      wx.request({
        url: 'https://wx.bjjy.com/iscreateorder',
        data: {
          msg: that.data.msg,
          course_id: that.data.courseinfo.course_id,
          openid: wx.getStorageSync('openid')
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        dataType: 'json',
        responseType: 'text',
        success: function(res) {
          console.log('-----------查询订单号成功了------------')
          console.log(res)
          that.setData({
            order_id: res.data.order_id
          })




          // 生成订单接口
          wx.request({
            url: 'https://wx.bjjy.com/unifiedorderhandle',
            data: {
              msg: that.data.msg,
              order_id: that.data.order_id,
              openid: wx.getStorageSync('openid'),
              order_price: that.data.courseinfo.course_money,
              order_name: that.data.courseinfo.course_name,
              course_id: that.data.courseinfo.course_id,
              is_discounts: 1,
              // discounts_id:'',
              original_price: that.data.courseinfo.course_money
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            dataType: 'json',
            responseType: 'text',
            success: function(res) {
              console.log('------------成功生成订单------------')
              console.log(res)
              // that.setData({
              //   timeStamp: res.data.timeStamp,
              //   nonceStr: res.data.nonceStr,
              //   package: res.data.package, 
              //   signType: res.data.signType, 
              //   paySign: res.data.paySign,
              // })




              // 微信支付统一下单
              wx.requestPayment({
                timeStamp: res.data.timeStamp,
                nonceStr: res.data.nonceStr,
                package: res.data.package,
                signType: res.data.signType,
                paySign: res.data.paySign,
                success: function(res) {
                  console.log('-----------支付成功了--------------')
                  console.log(res)


                  //修改订单状态接口
                  wx.request({
                    url: 'https://wx.bjjy.com/updateorderstatus',
                    data: {
                      order_id: that.data.order_id,
                      pay_amount: that.data.courseinfo.course_money,
                    },
                    header: {
                      'content-type': 'application/x-www-form-urlencoded'
                    },
                    method: 'POST',
                    dataType: 'json',
                    responseType: 'text',
                    success: function(res) {
                      console.log('----------修改订单状态成功了------------')

                      //跳转到相应页面
                      // wx.redirectTo({
                      //   url: "/pages/sub_browse/pages/list/list?course_id=" + that.data.courseinfo.course_id
                      // })

                      var pages = getCurrentPages();
                      var prevPage = pages[pages.length - 2];
                      prevPage.setData({
                        netState: '1',
                        buy:true,
                      })
                      prevPage.onShow();
                      wx.navigateBack({
                        delta: 1,
                      })

                    },
                    fail: function(res) {},
                  })


                },
                fail: function(res) {
                  console.log('-----------支付失败了-------------')
                },
              })






            },
            fail: function(res) {
              console.log('------------生成订单失败了------------')
            },
          })

        },
        fail: function(res) {
          console.log('--------查询订单失败了-----------')
        },
      })
    } else {
      console.log(that.data.msg)
      console.log(that.data.articleinfo.article_id)
      console.log(wx.getStorageSync('openid'))
      //查询订单号
      wx.request({
        url: 'https://wx.bjjy.com/iscreateorder',
        data: {
          msg: that.data.msg,
          article_id: that.data.articleinfo.article_id,
          openid: wx.getStorageSync('openid')
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        dataType: 'json',
        responseType: 'text',
        success: function(res) {
          console.log('-----------查询订单号成功了------------')
          console.log(res)
          that.setData({
            order_id: res.data.order_id
          })


          console.log(that.data.msg)
          console.log(that.data.order_id)
          console.log(wx.getStorageSync('openid'))
          console.log(that.data.articleinfo.article_price)
          console.log(that.data.articleinfo.article_title)
          console.log(that.data.articleinfo.article_id)
          console.log(that.data.articleinfo.article_price)
          console.log(that.data.msg)
          // 生成订单接口
          wx.request({
            url: 'https://wx.bjjy.com/unifiedorderhandle',
            data: {
              msg: that.data.msg,
              order_id: that.data.order_id,
              openid: wx.getStorageSync('openid'),
              order_price: that.data.articleinfo.article_price,
              order_name: that.data.articleinfo.article_title,
              article_id: that.data.articleinfo.article_id,
              is_discounts: 1,
              // discounts_id:'',
              original_price: that.data.articleinfo.article_price
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            dataType: 'json',
            responseType: 'text',
            success: function(res) {
              console.log('------------成功生成订单------------')
              console.log(res)
              // that.setData({
              //   timeStamp: res.data.timeStamp,
              //   nonceStr: res.data.nonceStr,
              //   package: res.data.package, 
              //   signType: res.data.signType, 
              //   paySign: res.data.paySign,
              // })




              // 微信支付统一下单
              wx.requestPayment({
                timeStamp: res.data.timeStamp,
                nonceStr: res.data.nonceStr,
                package: res.data.package,
                signType: res.data.signType,
                paySign: res.data.paySign,
                success: function(res) {
                  console.log('-----------支付成功了--------------')
                  console.log(res)


                  //修改订单状态接口
                  wx.request({
                    url: 'https://wx.bjjy.com/updateorderstatus',
                    data: {
                      order_id: that.data.order_id,
                      pay_amount: that.data.articleinfo.article_price,
                      article_id: that.data.article_id
                    },
                    header: {
                      'content-type': 'application/x-www-form-urlencoded'
                    },
                    method: 'POST',
                    dataType: 'json',
                    responseType: 'text',
                    success: function(res) {
                      console.log('----------修改订单状态成功了------------')

                      //跳转到相应页面
                      // wx.redirectTo({
                      //   url: "/pages/sub_browse/pages/article/article?article_id=" + that.data.articleinfo.article_id
                      // })

                      var pages = getCurrentPages();
                      var prevPage = pages[pages.length - 2];
                      prevPage.setData({
                          buy:true,                        
                      })
                      prevPage.onShow();
                      wx.navigateBack({
                        delta: 1,
                      })
                      
                      

                    },
                    fail: function(res) {},
                  })


                },
                fail: function(res) {
                  console.log('-----------支付失败了-------------')
                },
              })






            },
            fail: function(res) {
              console.log('------------生成订单失败了------------')
            },
          })
        },

        fail: function(res) {
          console.log('--------查询订单失败了-----------')
        },
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
    var that = this;

    // 获取收货地址信息
    this.getAddress();


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








  // ------------------------网络请求接口------------------------------
  //
  // 
  // 
  // 获取课程数据信息
  getCourseInfo() {
    var that = this;
    wx.request({
      url: 'https://wx.bjjy.com/courselistinfo',
      data: {
        'course_id': this.data.course_id,
        'openid': wx.getStorageSync('openid')
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log('-------------课程列表数据---------------')
        console.log(res)
        that.setData({
          courseinfo: res.data.courseinfo
        })
      },
      fail: function(res) {
        console.log('-------------失败啦---------------')
      },
    })
  },





  // 获取文章数据信息
  getArticleInfo() {
    var that = this;
    console.log('article_id' + this.data.article_id)
    console.log(wx.getStorageSync('openid'))
    wx.request({
      url: 'https://wx.bjjy.com/getArticleinfobyArticleId',
      data: {
        'article_id': that.data.article_id,
        'openid': wx.getStorageSync('openid'),
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      //dataType: 'json',
      //responseType: 'text',
      success: function(res) {
        console.log('-------------文章数据---------------')
        console.log(res)
        that.setData({
          articleinfo: res.data.articleinfo,
          // authorinfo: res.data.authorinfo,
        })
        // myaudio.src = res.data.articleinfo.audio_url;
        // WxParse.wxParse('content', 'html', res.data.articleinfo.content, that, 0)
      },
      fail: function(res) {
        console.log('-------------失败啦---------------')
      },
    })
  },




  // 获取收货地址信息
  getAddress() {
    var that = this;
    wx.request({
      url: 'https://wx.bjjy.com/searchRecevingAddress',
      data: {
        'openid': wx.getStorageSync('openid')
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log('------------onshow获取到收货信息了------------')
        console.log(res)
        if (res.data.msg == '0') {
          console.log('-----------已有收货地址---------------')
          that.setData({
            recevinginfo: res.data.recevinginfo,
            isHaveAddress: true
          })
        } else {
          console.log('-----------没有收货地址---------------')
          that.setData({
            isHaveAddress: false
          })
        }

      },
      fail: function(res) {
        console.log('------------失败了------------')
      },
    })
  }


})