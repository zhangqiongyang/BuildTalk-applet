// pages/myMsgDetails/myMsgDetails.js
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
  onLoad: function (options) {
    var that = this;
    var guestbook_id = options.guestbook_id;
    console.log(guestbook_id)


    // 查询留言信息接口
    wx.request({
      // url: 'https://wx.bjjy.com/getguestbookinfobyId',
      url: api.API_GETMYMSGBYID,      
      data: {
        guestbook_id: guestbook_id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'        
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log('------------此条留言信息----------------')
        console.log(res)
        that.setData({
          guestbookinfo: res.data.guestbookinfo
        })
      },
      fail: function(res) {},
    })




  },



  // 跳转到留言相应文章
  jumpToArticle(event) {
    // console.log(event)
    var article_id = event.currentTarget.dataset.article_id,
      audio_id = event.currentTarget.dataset.audio_id
    

    if (audio_id) {
      console.log('--------------跳转到音频文章-------------')
      wx.navigateTo({
        url: "/pages/sub_browse/pages/article/article?article_id=" + article_id
      })
    } else {
      console.log('--------------跳转到视频文章-------------')
      wx.navigateTo({
        url: "/pages/sub_browse/pages/video/video?article_id=" + article_id
      })
    }
  },


  // 我的留言删除
  myMsgDel: function (event) {
    console.log(event);
    var guestbook_id = event.currentTarget.dataset.guestbook_id;
    this.setData({
      guestbook_id: guestbook_id
    })

    var that = this;
    wx.showModal({
      title: '删除',
      content: '是否删除该留言',
      success: function (res) {
        if (res.confirm) {
          that.delMsg()
          wx.navigateBack({
            delta: 1,
          })
        }
      }
    })

  },





  // 删除留言接口
  delMsg: function () {
    var that = this;
    wx.request({
      // url: 'https://wx.bjjy.com/deleteguestbook',
      url: api.API_DELETEMSG,
      data: {
        'openid': wx.getStorageSync('openid'),
        source: 'xcx',
        unionid: wx.getStorageSync('unionId'),
        'guestbook_id': that.data.guestbook_id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log('----------留言删除成功啦---------')
      },
      fail: function (res) {
        console.log('----------失败啦---------')
      },
    })
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
  onShareAppMessage: function () {

  }
})