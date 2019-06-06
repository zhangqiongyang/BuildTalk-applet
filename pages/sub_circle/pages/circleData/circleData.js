// pages/sub_circle/pages/circleData/circleData.js
var WxParse = require('../../../../wxParse/wxParse.js');

import {
  HTTP
} from '../../../../utils/http.js'
let http = new HTTP()
import {
  api
} from '../../../../utils/api.js'

const util = require('../../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isCourse: false, //是否是课程
    image: '/image/example.jpg',
    name: '建筑产业工业互联网联盟',
    label: ["装配式", "钢结构", "建筑产业工业互联网"],
    content: '建筑产业工业互联网平台为您带来全生命周期的建筑视觉体验建筑产业工业互联网平台为您带来全生命周期的建筑视觉体验建筑产业工业互联网平台为您带来全生命周期的建筑视觉体验建筑产业工业互联网平台为您带来全生命周期的建筑视觉体验建筑产业工业互联网平台为您带来全生命周期的建筑视觉体验'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    this.setData({
      circle_id: options.circle_id
    })

    // 圈子资料
    this.circleData()
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


  /**
   * 网络请求
   */
  // 圈子资料
  circleData() {
    http.request({
        url: api.API_CIRCLEDATA,
        data: {
          user_id: wx.getStorageSync("user_id"),
          circle_id: this.data.circle_id,
        }
      })
      .then(res => {
        console.log('------------查询圈子信息成功------------')
        console.log(res)

        // let tags = res.data.circle_tags.split(","),
        //   label = this.data.label
        // for (let i = 0; i < tags.length; i++) {
        //   for (let j = 0; j < label.length; j++) {
        //     if (tags[i] == label[j].tag_name) {
        //       label[j].isActive = true
        //       tags.splice(i, 1)
        //     }
        //   }
        //   label.push({
        //     tag_name: tags[i],
        //     isActive: true,
        //     isLabel: true,
        //   })
        // }

        this.setData({
          circle_desc: res.data.circle_desc,
          circle_image: res.data.circle_image.pic_url,
          circle_name: res.data.circle_name,
          label: res.data.circle_tags.split(","),
          isCourse: res.data.type == 1 ? false : true
        })
        WxParse.wxParse('lightSpot', 'html', res.data.lightSpot, this, 0)

      })
  },

})