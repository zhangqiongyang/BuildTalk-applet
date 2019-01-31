// pages/search/search.js

var app = getApp();
var WxParse = require('../../wxParse/wxParse.js');
const util = require('../../utils/util.js')
const api = require('../../utils/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    history: true,
    keyword: '',
    value: '',
    platform: app.globalData.platform,
  },







  // 取消，返回首页
  jumpBackIndex: function() {
    wx.navigateBack({

    })
  },






  // 清空搜索输入框内容
  clearSearch: function(event) {
    console.log(event)
    this.setData({
      value: ''
    })
    setTimeout(_ => {
      this.setData({
        value: ''
      })
    }, 300);
    this.setData({
      history: true
    })

    this.selectHistoryPort()
  },


  // 查询历史记录接口
  selectHistoryPort: function() {
    var that = this;
    wx.request({
      // url: 'https://wx.bjjy.com/getSearchHistory',
      url: api.API_GETHISTORY,      
      data: {
        'openid': wx.getStorageSync('openid'),
        source: 'xcx',
        unionid: wx.getStorageSync('unionid')
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log('-----------------历史记录查询出来啦-------------------')
        console.log(res)
        that.setData({
          searchhistory: res.data.searchhistory
        })
        if (res.data.searchhistory == '') {
          that.setData({
            isClearHistory: false
          })
        } else {
          that.setData({
            isClearHistory: true
          })
        }
      },
      fail: function(res) {
        console.log('-----------------失败啦-------------------')
      },
    })
  },





  // 将搜索记录的keyword放到输入框中
  searchKeyword: function(event) {
    var search_keyword = event.currentTarget.dataset.search_keyword
    event.detail.value = search_keyword
    this.setData({
      value: search_keyword
    })

    this.search(event)
  },




  // 搜索，按关键字查询,获取输入框中的关键字
  search: function(event) {
    console.log(event);
    var value = event.detail.value;
    this.setData({
      keyword: value
    })

    // 调用搜索接口
    this.keyRequest(value);


  },


  /**
   * 根据指定字符，请求网络
   * @key 指定搜索字符，不可为空
   */
  keyRequest: function(key) {

    //TODO 做一步key为空的判断，比如 直接为null/空格/
    if (!util.isEmpty(key)) {



      // 搜索接口
      var that = this;
      wx.request({
        // url: 'https://wx.bjjy.com/searchkeywords',
        url: api.API_SEARCH,        
        data: {
          'keyword': key,
          'openid': wx.getStorageSync('openid'),
          source: 'xcx',
          unionid: wx.getStorageSync('unionid')
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        dataType: 'json',
        responseType: 'text',
        success: function(res) {
          console.log('---------------搜索结果出来了-----------------')
          console.log(typeof(res))
          console.log(res)
          if (res.data.msg == '3') {
            console.log('--------------没有找到搜索数据---------------')
            that.setData({
              isHaveCourse: false
            })
          } else if (res.data.msg == '0') {
            that.setData({
              courseinfo: res.data.courseinfo,
              isHaveCourse: true,
              isCourseinfo: 'c'
            })

            // 用循环的方式
            // 将对象中一项带标签的文本用WxParse转换
            // 然后赋值给原数组
            for (var i = 0; i < that.data.courseinfo.length; i++) {
              WxParse.wxParse('content', 'html', that.data.courseinfo[i].course_name, that, 0)
              var name = 'courseinfo[' + i + '].course_name';
              that.setData({
                [name]: that.data.content,
              })
            }



            for (var i = 0; i < that.data.courseinfo.length; i++) {
              WxParse.wxParse('content', 'html', that.data.courseinfo[i].course_desc, that, 0)
              var name = 'courseinfo[' + i + '].course_desc';
              that.setData({
                [name]: that.data.content,
              })
            }




            for (var i = 0; i < that.data.courseinfo.length; i++) {
              WxParse.wxParse('content', 'html', that.data.courseinfo[i].author_name, that, 0)
              var name = 'courseinfo[' + i + '].author_name';
              that.setData({
                [name]: that.data.content,
              })
            }



            for (var i = 0; i < that.data.courseinfo.length; i++) {
              WxParse.wxParse('content', 'html', that.data.courseinfo[i].author_desc, that, 0)
              var name = 'courseinfo[' + i + '].author_desc';
              that.setData({
                [name]: that.data.content,
              })
            }




          } else if (res.data.msg == '1') {
            that.setData({
              articleinfo: res.data.articleinfo,
              isHaveCourse: true,
              isCourseinfo: 'a'
            })

            // 用循环的方式
            // 将对象中一项带标签的文本用WxParse转换
            // 然后赋值给原数组




            for (var i = 0; i < that.data.articleinfo.length; i++) {
              WxParse.wxParse('content', 'html', that.data.articleinfo[i].article_title, that, 0)
              var name = 'articleinfo[' + i + '].article_title';
              that.setData({
                [name]: that.data.content,
              })
            }




          }
        },
        fail: function(res) {
          console.log('--------------------失败啦----------------------')
        },
      })





      that.setData({
        history: !that.data.history
      })

    }
  },



  // 跳转到相应页面
  jumpToArticle: function(event) {
    console.log(event);
    if (event.currentTarget.dataset.mode == 'course'){
      var course_id = event.currentTarget.dataset.course_id;

      console.log(course_id)
      //判断是否登录
      //如果登录，进行下一步判断，如果未登录，引导用户先登录
      if (app.globalData.isLogin) {
        //判断用户是否绑定手机号
        //如果已经绑定手机号，可以进行页面跳转，如果没有绑定，引导用户先绑定手机号
        if (app.globalData.isBindingPhone) {
          wx: wx.navigateTo({
            url: "/pages/sub_browse/pages/list/list?course_id=" + course_id
          })
        }
        else {
          wx.showModal({
            title: '未绑定手机号',
            content: '请先绑定手机号',
            showCancel: true,
            cancelText: '取消',
            confirmText: '确定',
            success: function (res) {
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
          success: function (res) {
            wx.switchTab({
              url: '/pages/tabbar/mine/mine',
            })
          },
        })
      }
    }else{
      var article_id = event.currentTarget.dataset.article_id;

      console.log(article_id)
      //判断是否登录
      //如果登录，进行下一步判断，如果未登录，引导用户先登录
      if (app.globalData.isLogin) {
        //判断用户是否绑定手机号
        //如果已经绑定手机号，可以进行页面跳转，如果没有绑定，引导用户先绑定手机号
        if (app.globalData.isBindingPhone) {
          wx: wx.navigateTo({
            url: "/pages/sub_browse/pages/video/video?article_id=" + article_id
          })
        }
        else {
          wx.showModal({
            title: '未绑定手机号',
            content: '请先绑定手机号',
            showCancel: true,
            cancelText: '取消',
            confirmText: '确定',
            success: function (res) {
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
          success: function (res) {
            wx.switchTab({
              url: '/pages/tabbar/mine/mine',
            })
          },
        })
      }
    }
    

    // if (app.globalData.isLogin) {


    //   wx.request({
    //     url: 'https://wx.bjjy.com/courselistinfo',
    //     data: {
    //       'openid': wx.getStorageSync('openid'),
    //source: 'xcx',
    //       'course_id': course_id,
    //unionid: wx.getStorageSync('unionid')
    //     },
    //     header: {
    //       'content-type': 'application/x-www-form-urlencoded'
    //     },
    //     method: 'POST',
    //     dataType: 'json',
    //     responseType: 'text',
    //     success: function(res) {
    //       console.log('------------这里是res--------------')
    //       console.log(res)
    //       if (res.data.msg == '1') {
    //         console.log('---------已经购买了------------')
    //         wx: wx.navigateTo({
    //           url: "/pages/sub_browse/pages/list/list?course_id=" + course_id
    //         })
    //       } else {
    //         console.log('---------还未购买------------')
    //         wx: wx.navigateTo({
    //           url: "/pages/sub_browse/pages/buy/buy?course_id=" + course_id
    //         })
    //       }
    //     },
    //   })
    // } else {
    //   wx.showModal({
    //     title: '未登录',
    //     content: '请先登录',
    //     showCancel: true,
    //     cancelText: '取消',
    //     confirmText: '确定',
    //     success: function(res) {
    //       wx.switchTab({
    //         url: '/pages/tabbar/mine/mine',
    //       })
    //     },
    //     fail: function(res) {},
    //     complete: function(res) {},
    //   })
    // }



  },


  // 删除历史记录
  delHistory: function(event) {
    console.log(event)
    var keyword = event.currentTarget.dataset.keyword
    this.setData({
      keyword: keyword
    })
    console.log(this.data.keyword)
    

    this.delHistoryPort()

    this.selectHistoryPort()

    var that = this;
    if (this.data.searchhistory == '') {
      that.setData({
        isClearHistory: false
      })
    } else {
      that.setData({
        isClearHistory: true
      })
    }

  },



  // 清空历史记录
  delAllHistory: function(event) {
    this.setData({
      keyword: ''
    })
    console.log(this.data.keyword)

    this.delHistoryPort()

    this.selectHistoryPort()

    var that = this;
    if (this.data.searchhistory == '') {
      that.setData({
        isClearHistory: false
      })
    } else {
      that.setData({
        isClearHistory: true
      })
    }
  },


  // 删除历史纪录接口
  delHistoryPort: function() {
    var that = this;
    wx.request({
      // url: 'https://wx.bjjy.com/deleteSearchHistory',
      url: api.API_DELETEHISTORY,      
      data: {
        'openid': wx.getStorageSync('openid'),
        source: 'xcx',
        'keyword': that.data.keyword,
        unionid: wx.getStorageSync('unionid')
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POSt',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log('----------------删除历史纪录成功啦--------------')
        console.log(res)
      },
      fail: function(res) {
        console.log('---------------失败啦------------------')
      },
    })
  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;

    var label = options.label;
    if (!util.isEmpty(label)) {
      that.keyRequest(label)
      that.setData({
        value: label
      })
    }


    // 获取屏幕高度
    // wx.getSystemInfo({
    //   success: function(res) {
    //     let clientHeight = res.windowHeight,
    //       clientWidth = res.windowWidth,
    //       rpxR = 750 / clientWidth;
    //     var calc = clientHeight * rpxR;
    //     console.log(calc)        
    //     that.setData({
    //       windowHeight: calc
    //     });
    //   }
    // });




    this.selectHistoryPort()



    console.log(wx.getStorageSync('openid'))


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

  }
})