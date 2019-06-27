// pages/activity/activity.js
const app = getApp();
const api = require('../../../../utils/api.js');
const util = require('../../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:"建筑产业工业互联网平台高峰论坛",
    authorList:[
      {
        articleName: '建筑产业工业互联网',
        authorName: '张鸣',
        authorInfo: '北京建谊投资发展（集团）有限公司总裁',
        authorImg: 'https://www.51jiantan.com/static/image/actionimage/zhangming.jpg',
        time: '2018年11月03日',
        article_id:'87'
      },
      {
        articleName: '建筑产品体系',
        authorName: '蒲小强',
        authorInfo: '北京建谊投资发展（集团）有限公司建筑产品总监',
        authorImg: 'https://www.51jiantan.com/static/image/actionimage/puxiaoqiang.jpg',
        time: '2018年11月03日',
        article_id: '88'
      },
      {
        articleName: '数字建筑集成数字城市',
        authorName: '杨海潮',
        authorInfo: '北京建谊投资发展（集团）有限公司政府服务总监',
        authorImg: 'https://www.51jiantan.com/static/image/actionimage/yanghaichao.jpg',
        time: '2018年11月03日',
        article_id: '89'
      },
      {
        articleName: '工业互联网与建筑产业跨界融合，创建建筑新生态',
        authorName: '苏磊',
        authorInfo: '北京建谊投资发展（集团）有限公司副总裁',
        authorImg: 'https://www.51jiantan.com/static/image/actionimage/sulei.jpg',
        time: '2018年11月03日',
        article_id: '90'
      },
      {
        articleName: '体验·场景·社群，互联网重塑住宅服务',
        authorName: '龙睿',
        authorInfo: '北京建谊投资发展（集团）有限公司用户产品总监',
        authorImg: 'https://www.51jiantan.com/static/image/actionimage/longrui.jpg',
        time: '2018年11月03日',
        article_id: '91'
      },
      {
        articleName: '成本控制模型体系',
        authorName: '张海玲',
        authorInfo: '北京建谊投资发展（集团）有限公司成本管理总监',
        authorImg: 'https://www.51jiantan.com/static/image/actionimage/zhanghailing.jpg',
        time: '2018年11月03日',
        article_id: '92'
      },
      {
        articleName: '建筑产业资源地域经济互联网',
        authorName: '赵伟宏',
        authorInfo: '北京建谊投资发展（集团）有限公司资源管理总监',
        authorImg: 'https://www.51jiantan.com/static/image/actionimage/zhaoweihong.jpg',
        time: '2018年11月03日',
        article_id: '93'
      },
      {
        articleName: '建筑产业工业互联网走向世界，使边穷地区享有建筑新科技',
        authorName: '朱晓斌',
        authorInfo: '北京建谊投资发展（集团）有限公司战略总监',
        authorImg: 'https://www.51jiantan.com/static/image/actionimage/zhuxiaobin.jpg',
        time: '2018年11月03日',
        article_id: '94'
      },
      
    ]
  },




  //跳转到相应文章
  jumpToArticle(event){
    var article_id = event.currentTarget.dataset.article_id
    
    util.judge(() => {
      wx.navigateTo({
        url: '../video/video?article_id=' + article_id,
      })
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    var that =this
    return {
      title: '建谈' + that.data.title,
      path: "/pages/sub_browse/pages/activity/activity"
    }
  }

})