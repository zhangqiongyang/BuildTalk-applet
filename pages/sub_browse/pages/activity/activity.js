// pages/activity/activity.js
const app = getApp();
const api = require('../../../../utils/api.js');
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
        authorImg: 'http://wx.bjjy.com/static/image/actionimage/zhangming.jpg',
        time: '2018年11月03日',
        article_id:'87'
      },
      {
        articleName: '建筑产品体系',
        authorName: '蒲小强',
        authorInfo: '北京建谊投资发展（集团）有限公司建筑产品总监',
        authorImg: 'http://wx.bjjy.com/static/image/actionimage/puxiaoqiang.jpg',
        time: '2018年11月03日',
        article_id: '88'
      },
      {
        articleName: '数字建筑集成数字城市',
        authorName: '杨海潮',
        authorInfo: '北京建谊投资发展（集团）有限公司政府服务总监',
        authorImg: 'http://wx.bjjy.com/static/image/actionimage/yanghaichao.jpg',
        time: '2018年11月03日',
        article_id: '89'
      },
      {
        articleName: '工业互联网与建筑产业跨界融合，创建建筑新生态',
        authorName: '苏磊',
        authorInfo: '北京建谊投资发展（集团）有限公司副总裁',
        authorImg: 'http://wx.bjjy.com/static/image/actionimage/sulei.jpg',
        time: '2018年11月03日',
        article_id: '90'
      },
      {
        articleName: '体验·场景·社群，互联网重塑住宅服务',
        authorName: '龙睿',
        authorInfo: '北京建谊投资发展（集团）有限公司用户产品总监',
        authorImg: 'http://wx.bjjy.com/static/image/actionimage/longrui.jpg',
        time: '2018年11月03日',
        article_id: '91'
      },
      {
        articleName: '成本控制模型体系',
        authorName: '张海玲',
        authorInfo: '北京建谊投资发展（集团）有限公司成本管理总监',
        authorImg: 'http://wx.bjjy.com/static/image/actionimage/zhanghailing.jpg',
        time: '2018年11月03日',
        article_id: '92'
      },
      {
        articleName: '建筑产业资源地域经济互联网',
        authorName: '赵伟宏',
        authorInfo: '北京建谊投资发展（集团）有限公司资源管理总监',
        authorImg: 'http://wx.bjjy.com/static/image/actionimage/zhaoweihong.jpg',
        time: '2018年11月03日',
        article_id: '93'
      },
      {
        articleName: '建筑产业工业互联网走向世界，使边穷地区享有建筑新科技',
        authorName: '朱晓斌',
        authorInfo: '北京建谊投资发展（集团）有限公司战略总监',
        authorImg: 'http://wx.bjjy.com/static/image/actionimage/zhuxiaobin.jpg',
        time: '2018年11月03日',
        article_id: '94'
      },
      // {
      //   articleName:'工业互联网平台发展趋势',
      //   authorName:'余晓晖',
      //   authorInfo:'工业互联网产业联盟秘书长',
      //   authorImg:'http://wx.bjjy.com/static/image/actionimage/yuxiaohui.jpg',
      //   time:'2018年11月03日',
      //   article_id: '86'
      // },
      // {
      //   articleName: '民营经济平台化发展展望',
      //   authorName: '王燕国',
      //   authorInfo: '中国民营经济国际合作商会党委书记、常务副会长',
      //   authorImg: 'http://wx.bjjy.com/static/image/actionimage/wangyanguo.jpg',
      //   time: '2018年11月03日',
      //   article_id: '86'
      // },
      // {
      //   articleName: '平台与欧盟双赢合作展望',
      //   authorName: '张毅',
      //   authorInfo: '欧盟中国城市发展委员会主席',
      //   authorImg: 'http://wx.bjjy.com/static/image/actionimage/zhangyi.jpg',
      //   time: '2018年11月03日',
      //   article_id: '86'
      // },
      // {
      //   articleName: '装配式建筑产业平台协同效应',
      //   authorName: '胡育科',
      //   authorInfo: '中国建筑金属结构协会钢结构分会副会长',
      //   authorImg: 'http://wx.bjjy.com/static/image/actionimage/huyuke.jpg',
      //   time: '2018年11月03日',
      //   article_id: '86'
      // },
      
      
      // {
      //   articleName: '建筑产业工业互联网平台创新价值',
      //   authorName: '邓智铭',
      //   authorInfo: '阿里云资深产品专家、架构师',
      //   authorImg: 'http://wx.bjjy.com/static/image/actionimage/dengzhiming.jpg',
      //   time: '2018年11月03日',
      //   article_id: '86'
      // },
      // {
      //   articleName: 'GRAOPHIOSFT（图软）工业互联网BIM协同平台',
      //   authorName: '曹尚',
      //   authorInfo: '图软中国区业务负责人',
      //   authorImg: 'http://wx.bjjy.com/static/image/actionimage/caoshang.jpg',
      //   time: '2018年11月03日',
      //   article_id: '86'
      // },
      
      // {
      //   articleName: '装配式装修平台化项目管理',
      //   authorName: '魏曦',
      //   authorInfo: '中国建筑标准设计研究院装配式建筑研究院副院长',
      //   authorImg: 'http://wx.bjjy.com/static/image/actionimage/weixi.jpg',
      //   time: '2018年11月03日',
      //   article_id: '86'
      // },
      
      // {
      //   articleName: '未造先知，匠心协同！基于BIM的BDIP建筑数据集成平台的应用实践',
      //   authorName: '林敏',
      //   authorInfo: '毕埃慕（BIM）建筑数据技术股份有限公司创始人、首席顾问',
      //   authorImg: 'http://wx.bjjy.com/static/image/actionimage/linmin.jpg',
      //   time: '2018年11月03日',
      //   article_id: '86'
      // },
      
      // {
      //   articleName: '建筑产业工业互联网平台如何为企业真正创造价值',
      //   authorName: '刘立明',
      //   authorInfo: '北京建谊投资发展（集团）有限公司副总裁',
      //   authorImg: 'http://wx.bjjy.com/static/image/actionimage/liuliming.jpg',
      //   time: '2018年11月03日',
      //   article_id: '86'
      // },
      // {
      //   articleName: '建筑产业工业互联网平台如何为企业真正创造价值',
      //   authorName: '魏曦',
      //   authorInfo: '中国建筑标准设计研究院装配式建筑研究院副院长',
      //   authorImg: 'http://wx.bjjy.com/static/image/actionimage/weixi.jpg',
      //   time: '2018年11月03日',
      //   article_id: '86'
      // },
      // {
      //   articleName: '建筑产业工业互联网平台如何为企业真正创造价值',
      //   authorName: '张曦',
      //   authorInfo: 'PMCAFF产品经理社区总裁',
      //   authorImg: 'http://wx.bjjy.com/static/image/actionimage/zhangxi.jpg',
      //   time: '2018年11月03日',
      //   article_id: '86'
      // },
      // {
      //   articleName: '建筑产业工业互联网平台如何为企业真正创造价值',
      //   authorName: '顾永涛',
      //   authorInfo: '国家发改委城市和小城镇改革发展中心规划院综合所所长',
      //   authorImg: 'http://wx.bjjy.com/static/image/actionimage/guyongtao.jpg',
      //   time: '2018年11月03日',
      //   article_id: '86'
      // },
      // {
      //   articleName: '建筑产业工业互联网平台如何为企业真正创造价值',
      //   authorName: '胡育科',
      //   authorInfo: '中国建筑金属结构协会钢结构分会副会长',
      //   authorImg: 'http://wx.bjjy.com/static/image/actionimage/huyuke.jpg',
      //   time: '2018年11月03日',
      //   article_id: '86'
      // },
      // {
      //   articleName: '建筑产业工业互联网平台如何为企业真正创造价值',
      //   authorName: '林敏',
      //   authorInfo: '毕埃慕（BIM）建筑数据技术股份有限公司创始人、首席顾问',
      //   authorImg: 'http://wx.bjjy.com/static/image/actionimage/linmin.jpg',
      //   time: '2018年11月03日',
      //   article_id: '86'
      // },
      
      
    ]
  },




  //跳转到相应文章
  jumpToArticle(event){
    var article_id = event.currentTarget.dataset.article_id
    // wx.navigateTo({
    //   url: "/pages/sub_browse/pages/video/video?article_id=" + article_id
    // })
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