// pages/AllCourse/AllCourse.js



var app = getApp();





Page({

  /**
   * 页面的初始数据
   */
  data: {
    platform: app.globalData.platform,
  },










  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;




    wx.request({
      url: 'https://wx.bjjy.com/getrecommend',
      data: '',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log(res)
        that.setData({
          courseinfo: res.data.courseinfo
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },



  // 跳转到相应页面
  jumpToArticle: function(event) {
    console.log(event);

    var course_id = event.currentTarget.dataset.courseid;

    console.log(course_id)
    if (app.globalData.isLogin) {

      wx: wx.navigateTo({
        url: "/pages/sub_browse/pages/list/list?course_id=" + course_id
      })

    }
    else {
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

    // if (app.globalData.isLogin){
    //   wx.request({
    //     url: 'https://wx.bjjy.com/courselistinfo',
    //     data: {
    //       'openid': wx.getStorageSync('openid'),
    //       'course_id': course_id
    //     },
    //     header: {
    //       'content-type': 'application/x-www-form-urlencoded'
    //     },
    //     method: 'POST',
    //     dataType: 'json',
    //     responseType: 'text',
    //     success: function (res) {
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
    //     success: function (res) {
    //       wx.switchTab({
    //         url: '/pages/tabbar/mine/mine',
    //       })
    //     },
    //   })
    // }




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