var app = getApp();
const util = require('../../../utils/util.js')

import {
  HTTP
} from '../../../utils/http.js'
let http = new HTTP()
import {
  api
} from '../../../utils/api.js'
Page({
  data: {
    info: '123',
    indicatorDots: true,
    autoplay: true,
    interval: 30000,
    duration: 500,
    platform: app.globalData.platform,
    articleinfo: '',
    newsList: [],
    hotItem: [{
      image: "https://www.51jiantan.com/static/image/banner2.png",
      label: '建筑互联网大会',
    }],
  },


  onLoad: function() {

    console.log('----------index 打印openid-------------')
    console.log(wx.getStorageSync('openid'))

    console.log('系统信息')
    console.log(this.data.platform)

    // 获取首页轮播图信息
    this.getSwiper()
    // 获取每日一谈信息
    this.getNews()
    // 获取精品课程信息
    this.getCourse()
    // 获取热门话题圈信息
    this.getCircle()


  },




  // 轮播图跳转到相应页面
  jumpToActivityBanner(event) {
    console.log(event)
    const id = event.currentTarget.dataset.id,
      type = event.currentTarget.dataset.type

    // type_id 类型id. 1课程 2精品单文 3 作者 4活动
    if (type == '1') {
      wx.navigateTo({
        url: "/pages/sub_browse/pages/list/list?course_id=" + id,
      })
    } else if (type == '2') {
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
  jumpToAllNews: function() {
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



  //跳转到相应新闻
  jumpToNews(event) {
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
  onShareAppMessage() {

  },


  /**
   * 方法
   */
  // 跳转到热门话题圈
  toHotCircle() {
    wx.navigateTo({
      url: '/pages/sub_browse/pages/hotCircle/hotCircle',
    })
  },
  // 跳转到圈子详情
  toCircle() {
    wx.navigateTo({
      url: '/pages/sub_circle/pages/circleDetails/circleDetails',
    })
  },
  // 跳转到课程详情
  toCourse() {
    wx.navigateTo({
      url: '/pages/sub_circle/pages/circleDetails/circleDetails',
    })
  },



  /**
   *  网络请求
   */

  // 获取首页轮播图信息
  getSwiper() {
    http.request({
        url: api.API_INDEXPIC,
        data: {
          show: 'index'
        }
      })
      .then(res => {
        console.log('-------------首页轮播图------------------')
        console.log(res)
        this.setData({
          indexpicinfo: res.data
        })
      })
  },

  // 获取每日一谈信息
  getNews() {
    http.request({
        url: api.API_INDEXNEWS,
        data: {
          show: 'index'
        }
      })
      .then(res => {
        console.log('--------------首页新闻信息-------------')
        console.log(res)
        this.setData({
          newsinfo: res.data
        })
      })
  },

  // 获取热门话题圈信息
  getCircle() {
    http.request({
        url: api.API_INDEXCOURSE,
        data: {
          type: 1,
          page: 1,
          page_size: 3,
          isIndex: 1
        }
      })
      .then(res => {
        console.log('--------------首页热门话题圈信息-------------')
        console.log(res)
        this.setData({
          circleInfo: res.data.circleInfo,
          circle_page: res.data.page,
          cicle_page_count: res.data.page_count,
        })
      })
  },

  // 获取精品课程信息
  getCourse() {
    http.request({
        url: api.API_INDEXCOURSE,
        data: {
          type: 2,
          page: 1,
          page_size: 4,
          isIndex: 1
        }
      })
      .then(res => {
        console.log('--------------首页精品课程信息-------------')
        console.log(res)
        this.setData({
          courseInfo: res.data.circleInfo,
          course_page: res.data.page,
          course_page_count: res.data.page_count,
        })
      })
  },


})