// pages/sub_browse/pages/authorDesc/authorDesc.js

var WxParse = require('../../../../wxParse/wxParse.js');
const api = require('../../../../utils/api.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    var that = this;
    let author_id = options.author_id
    // console.log(options.authorInfo)
    // console.log(JSON.parse(options.authorInfo))
    // let authorInfo = JSON.parse(options.authorInfo)
    // console.log(authorInfo)
    // this.setData({
    //   authorInfo: JSON.parse(options.authorInfo)
    // })
    // // if (options.remark == 'null'){

    // // }else{
    // //   WxParse.wxParse('content', 'html', options.remark, this, 0)
    // // }
    // console.log(this.data.authorInfo)
    // 查询作者信息接口
    wx.request({
      // url: 'https://wx.bjjy.com/getauthorarticle',
      url: api.API_GETAUTHORINFO,
      data: {
        author_id: author_id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log('---------------作者信息----------------------')
        console.log(res)
        that.setData({
          authorinfo: res.data.authorinfo
        })
        if (options.remark == 'null') {

        } else {
          WxParse.wxParse('content', 'html', res.data.authorinfo.remark, that, 0)
        }
      },
      fail: function(res) {
        console.log('出错啦')
      }
    })
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