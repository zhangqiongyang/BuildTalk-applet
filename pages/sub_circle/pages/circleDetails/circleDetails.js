// pages/sub_circle/pages/circleDetails/circlrDetails.js

import {
  HTTP
} from '../../../../utils/http.js'
let http = new HTTP()
import {
  api
} from '../../../../utils/api.js'

const util = require('../../../../utils/util.js')

var WxParse = require('../../../../wxParse/wxParse.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isJoin: false, //是否加入圈子
    isCourse: false, //是否为课程
    isIntro: false, //是否显示圈子介绍
    isCatalog: false, //是否显示目录详情
    isHide: false, //是否隐藏主题、导航、
    nav: 'theme', //导航  theme主题  essence精华
    isRedactSubject: false, //编辑主题弹窗
    isSubjectClassify: false, //主题分类弹窗
    classify: 1, //主题分类 1全部2图片3圈主4自己
    classifyText: '全部主题', //主题分类名称
    subject_page: 1, // 主题页数
    course_page: 1, //课程页数
    circleList: [],
    catalogList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const circle_id = options.circle_id
    this.setData({
      circle_id: circle_id
    })

    util._showLoading

    // 预览圈信息
    this.circleInfo()
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

  },

  /**
   * 方法
   */
  //切换圈子介绍显示
  changeIntro(event) {
    console.log(event)
    const type = event.target.dataset.type
    if (type == 'open') {
      this.setData({
        isIntro: true,
        isHide: true
      })
    } else {
      this.setData({
        isIntro: false,
        isHide: false
      })
    }
  },

  //切换课程目录显示
  changeCatalog(event) {
    console.log(event)
    const type = event.target.dataset.type
    if (type == 'open') {
      this.setData({
        isCatalog: true,
        isHide: true
      })
    } else {
      this.setData({
        isCatalog: false,
        isHide: false
      })
    }

  },

  //切换导航
  changeNav(event) {
    console.log(event)
    const id = event.currentTarget.dataset.id
    this.setData({
      nav: id
    })
  },

  // 切换编辑主题
  changeRedactSubject(event) {
    console.log(event)
    const type = event.currentTarget.dataset.type,
      theme_id = event.detail.theme_id
    if (type == 'open') {
      // 主题权限查看
      this.subjectclassifyRequest(theme_id)
      this.setData({
        isRedactSubject: true
      })
    } else {
      this.setData({
        isRedactSubject: false
      })
    }
  },

  // 切换主题分类
  changeSubjectClassify(event) {
    console.log(event)
    const type = event.currentTarget.dataset.type,
      text = event.currentTarget.dataset.text
    this.setData({
      classify: type,
      classifyText: text,
      isSubjectClassify: false
    })
    // 根据分类查询主题
    this.subject()
  },

  // 切换主题分类弹窗显示
  changeclassify(event) {
    console.log(event)
    const type = event.currentTarget.dataset.type
    if (type == 'open') {
      this.setData({
        isSubjectClassify: true
      })
    } else {
      this.setData({
        isSubjectClassify: false
      })
    }
  },


  // 删除主题成功
  deleteSubject() {
    this.setData({
      isRedactSubject: false
    })
  },

  // 收藏主题成功
  collectSubject() {
    this.setData({
      isRedactSubject: false
    })
  },


  //跳转到视频播放页面
  toVideo(event) {
    const article_id= event.currentTarget.dataset.article_id
    wx.navigateTo({
      url: '../courseCircleDetails/courseCircleDetails?article_id=' + article_id,
    })
  },

  // 跳转到圈子信息页面
  toCircleInfo() {
    wx.navigateTo({
      url: '../circleInfo/circleInfo?circle_id=' + this.data.circle_id + '&operate_user=' + this.data.circleInfo.user_id,
    })
  },

  // 跳转到发表主题页面
  toPublishSubject() {
    wx.navigateTo({
      url: '../publishSubject/publishSubject?circle_id=' + this.data.circle_id ,
    })
  },


  //打开付款框
  pay() {
    this.setData({
      isPay: true
    })
  },

  // 取消付款
  cancel() {
    this.setData({
      isPay: false
    })
  },

  // 完成付款
  payment(){
    this.setData({
      isPay: false
    })

    // 预览圈信息
    this.circleInfo()
  },



  /**
   * 网络请求
   */

  // 圈子信息
  circleInfo() {
    http.request({
        url: api.API_PREVIEWCIRCLEINFO,
        data: {
          circle_id: this.data.circle_id,
          user_id: wx.getStorageSync("user_id"),
          source: 'xcx'
        }
      })
      .then(res => {
        console.log('----------圈子信息----------')
        console.log(res)

        // 判断是否加入
        if (res.data.isJoin == 1) {
          this.setData({
            isJoin: true
          })
          // 根据分类查询主题
          this.subject()
        } else {
          // 查询预览主题
          this.previewSubject()
        }

        //判断是话题圈还是课程圈
        if (res.data.circleInfo.type == 2) {
          this.setData({
            isCourse: true,
            course_id: res.data.circleInfo.data_id
          })
          // 课程目录
          this.courseCatalog()
        }

        this.setData({
          circleInfo: res.data.circleInfo
        })

        WxParse.wxParse('lightSpot', 'html', res.data.circleInfo.lightSpot, this, 0)



        // 关闭刷新
        wx.hideLoading()
        wx.stopPullDownRefresh()
      })
  },


  // 查询预览主题
  previewSubject() {
    http.request({
        url: api.API_PREVIEWSUBJECT,
        data: {
          circle_id: this.data.circle_id,
        }
      })
      .then(res => {
        console.log('----------预览主题----------')
        console.log(res)

        this.setData({
          themeInfo: res.data
        })

        // 关闭刷新
        wx.hideLoading()
        wx.stopPullDownRefresh()
      })
      .catch(err => {
        console.log(err.errorMsg)
        this.setData({
          themeInfo: []
        })
      })
  },

  // 根据分类查询主题
  subject() {
    http.request({
        url: api.API_SUBJECT,
        data: {
          circle_id: this.data.circle_id,
          page: this.data.subject_page,
          page_size: 20,
          type_id: this.data.classify,
          user_id: wx.getStorageSync("user_id"),
        }
      })
      .then(res => {
        console.log('---------主题----------')
        console.log(res)

        let themeInfo = res.data.themeInfo

        for (let i = 0; i < themeInfo.length; i++) {
          const isLiked = themeInfo[i].isHaveLiked
          if (themeInfo[i].parise_nickName.length > 0) {
            this.setData({
              isHaveLiked: true
            })
          } else {
            this.setData({
              isHaveLiked: false
            })
          }
        }

        this.setData({
          subject_page: res.data.page,
          subject_page_count: res.data.page_count,
          themeInfo: themeInfo
        })



        // 关闭刷新
        wx.hideLoading()
        wx.stopPullDownRefresh()
      })
      .catch(err => {
        console.log(err.errorMsg)
        this.setData({
          themeInfo: []
        })
      })
  },


  // 课程目录
  courseCatalog() {
    http.request({
        url: api.API_COURSECATALOG,
        data: {
          course_id: this.data.course_id,
          page: this.data.course_page,
          page_size: 20,
        }
      })
      .then(res => {
        console.log('----------课程目录----------')
        console.log(res)

        this.setData({
          countCourse: res.data.countCourse,
          countUpdateCourse: res.data.countUpdateCourse,
          courselist: res.data.courselist,
          course_page: res.data.page,
          course_page_count: res.data.page_count,
        })

        // 关闭刷新
        wx.hideLoading()
        wx.stopPullDownRefresh()
      })
  },

  // 主题权限查看
  subjectclassifyRequest(id) {
    http.request({
        url: api.API_SUBJECTCLASSIFY,
        data: {
          theme_id: id,
          user_id: wx.getStorageSync("user_id"),
        }
      })
      .then(res => {
        console.log('----------主题权限查看----------')
        console.log(res)

        this.setData({
          'subjectclassify.is_upadate': res.data.is_upadate, //是否有修改权限 0无修改权限 1有修改权限
          'subjectclassify.is_delete': res.data.is_delete, //是否有删除权限 0无删除权限 1有删除权限
          'subjectclassify.is_collect': res.data.is_collect, //是否有收藏权限 0无收藏权限 1有收藏权限
          'subjectclassify.collect_status': res.data.collect_status, //0未收藏  1已收藏
          'subjectclassify.theme_id': id, //主题id
          'subjectclassify.circle_id': this.data.circle_id, //圈子id
        })

        // 关闭刷新
        wx.hideLoading()
      })
  },

  // 加入圈子
  joinCircle(){
    http.request({
      url: api.API_JIONCIRCLE,
      data:{
        circle_id: this.data.circle_id,
        user_id: wx.getStorageSync("user_id"),
      }
    })
    .then(res=>{
      console.log('----------加入成功-----------')
      console.log(res)

      util._showToastSuccess('成功加入')

      // 圈子信息
      this.circleInfo()
    })
  },

 
})