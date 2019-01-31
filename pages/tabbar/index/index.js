var app = getApp();
const util = require('../../../utils/util.js')
const api = require('../../../utils/api.js');
Page({
  data: {
    info: '123',
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 500,
    platform:app.globalData.platform,
    articleinfo: '',
    newsList: [
      {
        article_id:11,
        newsNumber:'第一期',
        newsName:'第一期  技术交流 | 装配式铝模板施工工法'
      },
      {
        article_id: 12,
        newsNumber: '第二期',        
        newsName: '第二期  BIM的5项国家标准'
      },
      {
        article_id: 13,
        newsNumber: '第三期',        
        newsName: '第三期  当中国尊遇见BIM+FM，怎一个“爽”字了得'
      },
      {
        article_id: 14,
        newsNumber: '第四期',        
        newsName: '第四期  BIM技术在施工过程中如何应用？'
      }
    ],
    // bookList: [{
    //     bookImg: '/image/book.jpg',
    //     bookName: '《BIM建造》',
    //     bookPrice: '43'
    //   },
    //   {
    //     bookImg: '/image/book.jpg',
    //     bookName: '《虚拟建造》',
    //     bookPrice: '22'
    //   },
    //   {
    //     bookImg: '/image/book.jpg',
    //     bookName: '《BIM协同》',
    //     bookPrice: '48'
    //   },
    //   {
    //     bookImg: '/image/book.jpg',
    //     bookName: '《BIM》',
    //     bookPrice: '23'
    //   },
    //   {
    //     bookImg: '/image/book.jpg',
    //     bookName: '《BIM》',
    //     bookPrice: '43'
    //   },
    //   {
    //     bookImg: '/image/book.jpg',
    //     bookName: '《BIM》',
    //     bookPrice: '43'
    //   },
    //   {
    //     bookImg: '/image/book.jpg',
    //     bookName: '《BIM》',
    //     bookPrice: '43'
    //   }
    // ],
    hotItem: [{
        image: '/image/activity.png',
        label: '建筑互联网大会'
      },
      // {
      //   image: '/image/hotTopic.jpg',
      //   label: '热点'
      // },
      // {
      //   image: '/image/hotTopic.jpg',
      //   label: '热点'
      // },
      // {
      //   image: '/image/hotTopic.jpg',
      //   label: '热点'
      // },
      // {
      //   image: '/image/hotTopic.jpg',
      //   label: '热点'
      // },
    ],
    // hotItem: [
    //   '/image/activity.png',
    //   '/image/hotTopic.jpg',
    //   '/image/hotTopic.jpg',
    //   '/image/hotTopic.jpg',
    //   '/image/hotTopic.jpg',
    //   '/image/hotTopic.jpg',
    //   '/image/hotTopic.jpg'
    // ],
    // videoItem: [{
    //     videoImg: '/image/video.jpg',
    //     videoName: 'BIM工程师：BIM的20种典型应用',
    //     videoAuthor: '卢林'
    //   },
    //   {
    //     videoImg: '/image/video.jpg',
    //     videoName: 'BIM工程师：BIM的20种典型应用',
    //     videoAuthor: '卢林'
    //   },
    //   {
    //     videoImg: '/image/video.jpg',
    //     videoName: 'BIM工程师：BIM的20种典型应用',
    //     videoAuthor: '卢林'
    //   },
    //   {
    //     videoImg: '/image/video.jpg',
    //     videoName: 'BIM工程师：BIM的20种典型应用',
    //     videoAuthor: '卢林'
    //   },
    //   {
    //     videoImg: '/image/video.jpg',
    //     videoName: 'BIM工程师：BIM的20种典型应用',
    //     videoAuthor: '卢林'
    //   },
    //   {
    //     videoImg: '/image/video.jpg',
    //     videoName: 'BIM工程师：BIM的20种典型应用',
    //     videoAuthor: '卢林'
    //   }
    // ]
  },








  // 跳转到搜索页
  jumpToSearch: function() {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },




  // 轮播图跳转到相应页面
  jumpToActivityBanner(event) {
    console.log(event)
    var id = event.currentTarget.dataset.id;

    if (id == '21') {
      wx.navigateTo({
        url: '/pages/sub_browse/pages/activity/activity',
      })
    }
  },


  // 跳转到查看全部新闻
  jumpToAllNews: function () {
    wx: wx.navigateTo({
      url: "/pages/sub_browse/pages/allNews/allNews"
    })
  },


  // 跳转到查看全部课程
  jumpToAllCourse: function() {
    wx: wx.navigateTo({
      url: "/pages/sub_browse/pages/AllCourse/AllCourse"
    })
    // wx.switchTab({
    //   url: '../../pages/AllCourse/AllCourse',
    // })
  },

  // 跳转到查看全部作者
  jumpToAllAuthor() {
    wx.switchTab({
      url: '/pages/tabbar/allAuthor/allAuthor',
    })
  },



  //跳转到相应新闻
  jumpToNews(event){
    console.log(event);
    let article_id = event.currentTarget.dataset.article_id;
    wx.navigateTo({
      url: "/pages/sub_browse/pages/video/video?article_id=" + article_id
    })
  },




  // 跳转到课程相应页面
  jumpToList: function(event) {
    var that = this;
    // console.log(event);

    var course_id = event.currentTarget.dataset.courseid;
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

    // console.log('课程id' + course_id)
    // console.log('openid' + '    ' + wx.getStorageSync('openid'))


    // if (app.globalData.isLogin) {
    //   wx.request({
    //     url: 'https://wx.bjjy.com/courselistinfo',
    //     data: {
    //       'openid': wx.getStorageSync('openid'),
    // source: 'xcx',
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
    //   })
    // }

  },


  // 跳转到作者相应页面
  jumpToAuthor(event) {
    // console.log(event)
    var author_id = event.currentTarget.dataset.author_id

    wx.navigateTo({
      url: '/pages/sub_browse/pages/author/author?author_id=' + author_id,
    })
  },



  // 跳转到作者标签搜索页
  jumpToSearchLabel(event) {
    // console.log('-------------标签--------------------')
    // console.log(event)
    var label = event.currentTarget.dataset.label


    wx.navigateTo({
      url: '/pages/search/search?label=' + label,
    })
  },



  // 跳转到热点专题相应页面
  jumpToActivity(event) {
    // console.log(event)
    var label = event.currentTarget.dataset.label;

    if (label == '建筑互联网大会') {
      wx.navigateTo({
        url: '/pages/sub_browse/pages/activity/activity',
      })
    }
  },




  onLoad: function() {

    console.log('----------index 打印openid-------------')
    console.log(wx.getStorageSync('openid'))

    console.log('系统信息')
    console.log(this.data.platform)


    // 查询首页推荐轮播图
    wx.request({
      // url: 'https://wx.bjjy.com/getindexpic',
      url: api.API_INDEXPIC,

      data: {},
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log('-------------首页轮播图------------------')
        console.log(res)
        that.setData({
          indexpicinfo: res.data.indexpicinfo
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })




    //查询首页上新闻信息的接口
    wx.request({
      url: api.API_INDEXNEWS,
      data: '',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log('--------------首页新闻信息-------------')
        console.log(res)
        that.setData({
          newsinfo: res.data.newsinfo
        })
      },
    })



    // 查询首页上精品推荐的课程接口
    var that = this;
    wx.request({
      url: api.API_INDEXCOURSE,
      data: {

      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log('-------------首页视频推荐课程数据-----------------')
        console.log(res)
        that.setData({
          courseinfo: res.data.courseinfo
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })



    // 获取推荐作者信息接口
    wx.request({
      url: api.API_INDEXAUTHOR,
      data: '',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log('-----------首页推荐作者信息--------------------')
        console.log(res)
        that.setData({
          authorinfo: res.data.authorinfo
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })




    // console.log('----------------------------------')
    // console.log(JSON.stringify)
  },


  onShow() {
    // console.log('============================onshow(index)=============================')
    // let that =this;
    // //上传用户的头像和昵称到数据库
    // if (!util.isEmpty(wx.getStorageSync('unionid')) && !util.isEmpty(wx.getStorageSync('openid')) && !util.isEmpty(app.globalData.userInfo.nickName) && !util.isEmpty(app.globalData.userInfo.avatarUrl)) {
    //   wx.request({
    //     // url: 'https://wx.bjjy.com/operateuser',
    //     url: api.API_MINEUPLOADINFO,
    //     data: {
    //       source: 'xcx',
    //       unionid: wx.getStorageSync('unionid'),
    //       wx_openid: wx.getStorageSync('openid'),
    //       nickname: app.globalData.userInfo.nickName,
    //       headimage: app.globalData.userInfo.avatarUrl,
    //     },
    //     header: {
    //       'content-type': 'application/x-www-form-urlencoded'
    //     },
    //     method: 'POST',
    //     dataType: 'json',
    //     responseType: 'text',
    //     success: function (res) {
    //       console.log('-------------上传用户的头像和昵称到数据库了(mine.js)-----------------')
    //       console.log(wx.getStorageSync('openid'))
    //       console.log('---------------------------')
    //     },
    //     fail: function (res) {
    //       console.log('-------------上传用户的头像和昵称到数据库失败了-----------------')
    //     },
    //   })
    // }


  // var that =this;
  //   // 获取用户信息
  //   wx.getSetting({
  //     success: res => {
  //       if (res.authSetting['scope.userInfo']) {
  //         // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框

  //         app.globalData.isLogin = true

  //         wx.getUserInfo({
  //           success: res => {
  //             console.log('-------wx.getUserInfo.res---------')
  //             console.log(res)



  //             // 可以将 res 发送给后台解码出 unionId
  //             console.log('----------res.userInfo---------' + res.userInfo)
  //             app.globalData.userInfo = res.userInfo




  //             console.log('-----------加密信息所传数据---------------')
  //             console.log(res.encryptedData)
  //             console.log(res.iv)
  //             console.log(wx.getStorageSync('openid'))




  //             //获取用户加密信息
  //             wx.request({
  //               // url: 'https://wx.bjjy.com/getUserinfoEncryptedData',
  //               url: api.API_GETENCRYPTEDDATA,
  //               data: {
  //                 encryptedData: res.encryptedData,
  //                 iv: res.iv,
  //                 openid: wx.getStorageSync('openid'),
  //               },
  //               header: {
  //                 'content-type': 'application/x-www-form-urlencoded'
  //               },
  //               method: 'POST',
  //               success: function (res) {
  //                 console.log('----------成功返回数据')
  //                 console.log(res)
  //                 console.log(res.data)
  //                 console.log(res.data.returncode)
  //                 console.log('------------app.js解密获取openid---------------')
  //                 console.log(JSON.parse(res.data.returndata).openId)
  //                 console.log('------------app.js解密获取unionid---------------')
  //                 console.log(JSON.parse(res.data.returndata).unionId)


  //                 wx.setStorageSync('unionid', JSON.parse(res.data.returndata).unionId)
  //                 wx.setStorageSync('openid', JSON.parse(res.data.returndata).openId)
  //                 app.globalData.unionid = JSON.parse(res.data.returndata).unionId
  //                 app.globalData.openid = JSON.parse(res.data.returndata).openId
  //                 // console.log(unionId)
  //                 // console.log(wx.getStorageSync('unionid'))
  //                 //console.log('----------成功返回数据回数据app.js-----------')
  //                 console.log(res)
  //                 var userInfo = JSON.parse(res.data.returndata)
  //                 app.globalData.userInerInfo = userInfo
  //                 console.log(userInfo)
  //                 //console.log('--------返回数据结束据结束app.js-----------')



  //                 //检测用户是否绑定手机号
  //                 wx.request({
  //                   // url: 'https://wx.bjjy.com/checkbindmobile',
  //                   url: api.API_CHECKPHONE,
  //                   data: {
  //                     openid: wx.getStorageSync("openid"),
  //                     unionid: wx.getStorageSync('unionid')
  //                   },
  //                   header: {
  //                     'content-type': 'application/x-www-form-urlencoded'
  //                   },
  //                   method: 'POST',
  //                   dataType: 'json',
  //                   responseType: 'text',
  //                   success: function (res) {
  //                     console.log(res)
  //                     if (res.data.msg == "1") {
  //                       console.log("---------------已经绑定手机号---------------------")
  //                       app.globalData.isBindingPhone = true;
  //                       app.globalData.phoneNumber = res.data.mobile
  //                     } else {
  //                       console.log("---------------未绑定手机号---------------------")
  //                       app.globalData.isBindingPhone = false;
  //                       wx.navigateTo({
  //                         url: '/pages/phone/phone',
  //                       })
  //                     }
  //                   }
  //                 })


  //                 console.log(wx.getStorageSync('unionid'))
  //                 console.log(wx.getStorageSync('openid'))
  //                 console.log(app.globalData.userInfo.nickName)
  //                 console.log(app.globalData.userInfo.avatarUrl, '321')
            

  //                 //上传用户的头像和昵称到数据库
  //                 if (!util.isEmpty(wx.getStorageSync('unionid')) && !util.isEmpty(wx.getStorageSync('openid')) && !util.isEmpty(app.globalData.userInfo.nickName) && !util.isEmpty(app.globalData.userInfo.avatarUrl)) {

  //                   console.log('--------555555555555555---------')
  //                   console.log(wx.getStorageSync('unionid'))
  //                   console.log(wx.getStorageSync('openid'))
  //                   console.log(app.globalData.userInfo.nickName)
  //                   console.log(app.globalData.userInfo.avatarUrl)

  //                   console.log('-----------------打印 request 的参数 开始--------------')
  //                   console.log(api.API_MINEUPLOADINFO);
  //                   console.log(wx.getStorageSync('unionid'));
  //                   console.log(wx.getStorageSync('openid'));
  //                   console.log(app.globalData.userInfo.nickName);
  //                   console.log(app.globalData.userInfo.avatarUrl);


  //                   console.log('-----------------打印 request 的参数 结束--------------')

  //                   wx.request({
  //                     // url: 'https://wx.bjjy.com/operateuser',
  //                     url: api.API_MINEUPLOADINFO,
  //                     data: {
  //                       unionid: wx.getStorageSync('unionid'),
  //                       source: 'xcx',
  //                       wx_openid: wx.getStorageSync('openid'),
  //                       nickname: app.globalData.userInfo.nickName,
  //                       headimage: app.globalData.userInfo.avatarUrl
  //                     },
  //                     header: {
  //                       'content-type': 'application/x-www-form-urlencoded'
  //                     },
  //                     method: 'POST',
  //                     dataType: 'json',
  //                     responseType: 'text',
  //                     success: function (res) {
  //                       if (res.data.msg == '1') {
  //                         console.log('-------------上传用户的头像和昵称到数据库了(app.js)-----------------')
  //                         console.log('--------------1-------------')
  //                         console.log(wx.getStorageSync('openid'))
  //                       } else if (res.data.msg == '2') {
  //                         console.log('-------------上传用户的头像和昵称到数据库失敗了(app.js)-----------------')
  //                         console.log('--------------2-------------')
  //                         console.log(wx.getStorageSync('openid'))
  //                       } else if (res.data.msg == '3') {
  //                         console.log('-------------上传用户的头像和昵称到数据库更新成功了(app.js)-----------------')
  //                         console.log('--------------3-------------')
  //                         console.log(wx.getStorageSync('openid'))
  //                       } else if (res.data.msg == '4') {
  //                         console.log('-------------上传用户的头像和昵称到数据库更新失敗了(app.js)-----------------')
  //                         console.log('--------------4-------------')
  //                         console.log(wx.getStorageSync('openid'))
  //                       } else if (res.data.msg == '5') {
  //                         console.log('-------------无需更新(app.js)-----------------')
  //                         console.log('--------------5-------------')
  //                         console.log(wx.getStorageSync('openid'))
  //                       }

  //                       // console.log(res)
  //                     },
  //                     fail: function (res) {
  //                       console.log('-------------上传用户的头像和昵称到数据库失败了-----------------')
  //                     },
  //                   })

  //                   console.log('----------------中间------------------')

  //                   wx.request({
  //                     // url: 'https://wx.bjjy.com/operateuser',
  //                     url: api.API_MINEUPLOADINFO,
  //                     data: {
  //                       wx_openid: wx.getStorageSync('openid'),
  //                       source: 'xcx',
  //                       unionid: wx.getStorageSync('unionid'),
  //                       nickname: app.globalData.userInfo.nickName,
  //                       headimage: app.globalData.userInfo.avatarUrl,
  //                     },
  //                     header: {
  //                       'content-type': 'application/x-www-form-urlencoded'
  //                     },
  //                     method: 'POST',
  //                     dataType: 'json',
  //                     responseType: 'text',
  //                     success: function (res) {
  //                       if (res.data.msg == '1') {
  //                         console.log('-------------上传用户的头像和昵称到数据库了(mine.js)-----------------')
  //                         console.log('--------------1-------------')
  //                         console.log(wx.getStorageSync('openid'))
  //                       } else if (res.data.msg == '2') {
  //                         console.log('-------------上传用户的头像和昵称到数据库失敗了(mine.js)-----------------')
  //                         console.log('--------------2-------------')
  //                         console.log(wx.getStorageSync('openid'))
  //                       } else if (res.data.msg == '3') {
  //                         console.log('-------------上传用户的头像和昵称到数据库更新成功了(mine.js)-----------------')
  //                         console.log('--------------3-------------')
  //                         console.log(wx.getStorageSync('openid'))
  //                       } else if (res.data.msg == '4') {
  //                         console.log('-------------上传用户的头像和昵称到数据库更新失敗了(mine.js)-----------------')
  //                         console.log('--------------4-------------')
  //                         console.log(wx.getStorageSync('openid'))
  //                       } else if (res.data.msg == '5') {
  //                         console.log('-------------无需更新(mine.js)-----------------')
  //                         console.log('--------------5-------------')
  //                         console.log(wx.getStorageSync('openid'))
  //                       }
  //                     },
  //                     fail: function (res) {
  //                       console.log('-------------上传用户的头像和昵称到数据库失败了-----------------')
  //                     },
  //                   })
  //                 } else {
  //                   console.log('---------else----------')
  //                 }


  //                 console.log('----------------最下面------------------')

  //               },
  //               fail: function () {
  //                 console.log('------------数据失败---')
  //               }
  //             })
  //             // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
  //             // 所以此处加入 callback 以防止这种情况
  //             if (this.userInfoReadyCallback) {
  //               this.userInfoReadyCallback(res)
  //               console.log('================回调===================')
  //             }
  //           }
  //         })
  //       } else {
  //         console.log('什么都没有')
  //       }
  //     }
  //   })
  },


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
   * 用户点击右上角分享
   */
  onShareAppMessage(){

  }
})