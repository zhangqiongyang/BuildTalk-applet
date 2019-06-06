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
    hotItem: [{
      image: "https://www.51jiantan.com/static/image/banner2.png",
      label: '建筑互联网大会',
    }],
    indexpicinfo: [],
    newsinfo: [],
    circleInfo: [],
    courseInfo: [],
    circle_page: 1,
    course_page: 1,
    cicle_page_count: '',
    course_page_count: '',
  },


  onLoad: function() {
    wx.showLoading({
      title: '加载中',
    })
    // 获取首页轮播图信息
    this.getSwiper()
    // 获取每日一谈信息
    this.getNews()
    // 获取精品课程信息
    this.getCourse()
    // 获取热门话题圈信息
    this.getCircle()

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.setData({
      indexpicinfo: [],
      newsinfo: [],
      circleInfo: [],
      courseInfo: [],
      circle_page: 1,
      course_page: 1,
      cicle_page_count: '',
      course_page_count: '',
    })
    // 获取首页轮播图信息
    this.getSwiper()
    // 获取每日一谈信息
    this.getNews()
    // 获取精品课程信息
    this.getCourse()
    // 获取热门话题圈信息
    this.getCircle()
    wx.showLoading({
      title: '加载中',
    })
  },


  // 跳转到课程相应页面
  jumpToList: function(event) {
    var that = this
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },


  /**
   * 方法
   */

  // 轮播图跳转到相应页面
  jumpToActivityBanner(event) {
    console.log(event)
    const id = event.currentTarget.dataset.id,
      type = event.currentTarget.dataset.type

    // type_id 类型id. 1课程 2精品单文 3 作者 4活动
    if (type == '1') {
      wx.navigateTo({
        url: "/pages/sub_circle/pages/courseCircleDetails/courseCircleDetails?course_id=" + id,
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

  // 跳转到热门话题圈
  toHotCircle() {
    wx.navigateTo({
      url: '/pages/sub_browse/pages/hotCircle/hotCircle',
    })
  },

  // 跳转到查看全部课程
  jumpToAllCourse: function() {
    wx.navigateTo({
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

  // 跳转到圈子详情
  toCircle(event) {
    const circle_id= event.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/sub_circle/pages/circleDetails/circleDetails?circle_id=' + circle_id,
    })
  },

  // 跳转到热点专题相应页面
  jumpToActivity(event) {
    // console.log(event)
    const label = event.currentTarget.dataset.label;

    if (label == '建筑互联网大会') {
      wx.navigateTo({
        url: '/pages/sub_browse/pages/activity/activity',
      })
    }
  },

  // 换一换
  change(event) {
    console.log(event)
    const type = event.currentTarget.dataset.type
    if (type == 'circle') {
      // 获取热门话题圈信息
      if (this.data.circle_page < this.data.cicle_page_count) {
        this.getCircle(Number(this.data.circle_page) + 1)
      } else {
        this.getCircle(1)
      }
    } else {
      // 获取精品课程信息
      if (this.data.course_page < this.data.course_page_count) {
        this.getCourse(Number(this.data.circle_page) + 1)
      } else {
        this.getCourse(1)
      }
    }
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
        wx.hideLoading()
        wx.stopPullDownRefresh()
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
        wx.hideLoading()
        wx.stopPullDownRefresh()
      })
  },

  // 获取热门话题圈信息
  getCircle(page) {
    http.request({
        url: api.API_INDEXCOURSE,
        data: {
          type: 1,
          page: page ? page : this.data.circle_page,
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
        wx.hideLoading()
        wx.stopPullDownRefresh()
      })
  },

  // 获取精品课程信息
  getCourse(page) {
    http.request({
        url: api.API_INDEXCOURSE,
        data: {
          type: 2,
          page: page ? page : this.data.course_page,
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
        wx.hideLoading()
        wx.stopPullDownRefresh()
      })
  },


})