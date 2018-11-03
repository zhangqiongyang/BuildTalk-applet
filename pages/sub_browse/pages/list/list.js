Page({

  /**
   * 页面的初始数据
   */
  data: {
    article: ['lalallalalal', '/image/index1.jpg', 'asdfas'],
    mode: true,
    order: true,
    articlelist: '',
    toView: 'inToView5',
  },




  // 切换列表模式与图文模式
  changMode: function() {
    this.setData({
      mode: !this.data.mode
    })
  },




  // 切换列表模式与图文模式
  changeOrder: function() {
    this.setData({
      order: !this.data.order
    })
  },




  // 跳转到相应页面
  jumpToArticle: function(event) {
    console.log(event);
    var that = this;
    var article_id = event.currentTarget.dataset.articleid,
      audio_id = event.currentTarget.dataset.audioid,
      is_audition = event.currentTarget.dataset.is_audition;
    console.log(article_id)
    console.log(audio_id)
    console.log(is_audition)
    if (this.data.isBuy) {
      if (audio_id) {
        console.log('--------------跳转到音频文章-------------')
        wx: wx.navigateTo({
          url: "/pages/sub_browse/pages/article/article?article_id=" + article_id
        })
      } else {
        console.log('--------------跳转到视频文章-------------')
        wx: wx.navigateTo({
          url: "/pages/sub_browse/pages/video/video?article_id=" + article_id
        })
      }
    } else {
      if (is_audition == '1') {
        if (audio_id) {
          console.log('--------------跳转到音频文章-------------')
          wx: wx.navigateTo({
            url: "/pages/sub_browse/pages/article/article?article_id=" + article_id
          })
        } else {
          console.log('--------------跳转到视频文章-------------')
          wx: wx.navigateTo({
            url: "/pages/sub_browse/pages/video/video?article_id=" + article_id
          })
        }
      } else {
        console.log('---------还未购买------------')
        wx: wx.redirectTo({
          url: "/pages/sub_browse/pages/buy/buy?course_id=" + that.data.course_id
        })
      }

    }

  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log('------------list onLoad-------------')
    // this.updateData();



    // 更新文章数
    // this.setData({
    //   articleLen: this.data.articlelist.length
    // })






    // 获取上层页面传的参数
    var course_id = options.course_id;
    console.log('---------------------获取上层页面传的参数-------------------------')
    console.log(course_id);
    console.log(wx.getStorageSync('openid'))
    console.log('---------------------获取上层页面传的参数-------------------------')
    var that = this;
    //获取课程列表数据
    wx.request({
      url: 'https://wx.bjjy.com/courselistinfo',
      data: {
        'course_id': course_id,
        'openid': wx.getStorageSync('openid')
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log('-------------课程列表数据---------------')
        console.log(res)
        //判断是否购买
        //msg=1代表已购买，msg=0代表未购买
        //已购买正常添加课程列表数据
        //未购买，将课程前五节isAudition设为true，反之false
        if (res.data.msg == '1') {
          that.setData({
            articlelist: res.data.articlelist,
            articleLen: res.data.articlelist.length,
            course_id: res.data.courseinfo.course_id,
            isBuy: true
          })
        } else {
          that.setData({
            articlelist: res.data.articlelist,
            articleLen: res.data.articlelist.length,
            course_id: res.data.courseinfo.course_id,
            isBuy: false
          })
          if (res.data.articlelist.length >= 5) {
            for (var i = 0; i < 5; i++) {
              var is_audition = 'articlelist[' + i + '].is_audition';
              that.setData({
                [is_audition]: '1'
              })
            }
          } else {
            that.setData({
              'articlelist[0].is_audition': '1'
            })
          }

        }
        console.log(that.data.articlelist)

      },
      fail: function(res) {
        console.log('-------------失败啦---------------')
      },

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
    console.log('------------list onShow-------------')
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    console.log('------------list onHide-------------')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    console.log('------------list onUnload-------------')
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



  // updateData: function () {
  //   var pages = getCurrentPages();
  //     var prevPage = pages[pages.length - 2];
  //     prevPage.setData({
  //       info: 'LaternKiwis'
  //     })
  //   }


})