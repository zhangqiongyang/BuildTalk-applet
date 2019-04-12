var app = getApp();
const util = require('../../../utils/util.js')
const api = require('../../../utils/api.js');
Page({
  data: {
    info: '123',
    indicatorDots: true,
    autoplay: true,
    interval: 30000,
    duration: 500,
    platform:app.globalData.platform,
    articleinfo: '',
    newsList: [],
    hotItem: [
      {
        image:'/image/activity.png',
        label:'建筑互联网大会',
      }
    ],
  },


  onLoad: function () {

    console.log('----------index 打印openid-------------')
    console.log(wx.getStorageSync('openid'))

    console.log('系统信息')
    console.log(this.data.platform)


    // 查询首页推荐轮播图
    wx.request({
      // url: 'https://wx.bjjy.com/getindexpic',
      url: api.API_INDEXPIC,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log('-------------首页轮播图------------------')
        console.log(res)
        that.setData({
          indexpicinfo: res.data.data
        })
      },
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
      success: function (res) {
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
      success: function (res) {
        console.log('-------------首页视频推荐课程数据-----------------')
        console.log(res)
        that.setData({
          courseinfo: res.data.courseinfo
        })
      },
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
      success: function (res) {
        console.log('-----------首页推荐作者信息--------------------')
        console.log(res)
        that.setData({
          authorinfo: res.data.authorinfo
        })
      },
    })

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
    const id = event.currentTarget.dataset.id,
      type = event.currentTarget.dataset.type

    // type_id 类型id. 1课程 2精品单文 3 作者 4活动
    if(type == '1'){
      wx.navigateTo({
        url: "/pages/sub_browse/pages/list/list?course_id=" + id,
      })
    } else if (type == '2'){
      wx.navigateTo({
        url: "/pages/sub_browse/pages/video/video?article_id=" + id,
      })
    } else if (type == '3') {
      wx.navigateTo({
        url: '/pages/sub_browse/pages/author/author?author_id=' + id,
      })
    } else if (type == '4') {
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

  
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage(){

  }
})