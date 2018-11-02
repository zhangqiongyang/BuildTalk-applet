// pages/author/author.js

var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isArticle: true,
    articleinfo: '',
    courseinfo: '',
    isHaveArticle: null,
    isHaveCoruse: null
  },


  // 切换精品单文与系列课程
  switchMode(event) {
    // console.log(event)
    var that = this;
    var productionMode = event.currentTarget.dataset.id;
    if (productionMode == 'article') {
      that.setData({
        isArticle: true
      })
    } else {
      that.setData({
        isArticle: false
      })
    }
    // console.log(this.data.isArticle)
  },



  // 跳转到精品单文的文章
  jumpToArticle(event) {
    // console.log(event);
    var that = this
    var article_id = event.currentTarget.dataset.article_id,
      article_price = event.currentTarget.dataset.article_price;
    console.log(article_price)



    if (app.globalData.isLogin) {
      //判断文章是否免费
      //免费直接观看
      //付费再进行下一步判断
      if (article_price == '0.00') {
        wx.navigateTo({
          url: "/pages/sub_browse/pages/article/article?article_id=" + article_id,
        })
      } else {

        //查询用户当前文章是否购买
        // 已购买可以直接观看，根据article_id跳转到当前文章页
        // 未购买跳转到购买页面
        wx.request({
          url: 'https://wx.bjjy.com/searchbuyarticle',
          data: {
            'openid': wx.getStorageSync('openid'),
            'article_id': article_id
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          method: 'POST',
          dataType: 'json',
          responseType: 'text',
          success: function(res) {
            console.log('------------这里是res--------------')
            console.log(res)
            if (res.data.msg == '1') {
              console.log('---------已经购买了------------')
              wx.navigateTo({
                url: "/pages/sub_browse/pages/article/article?article_id=" + article_id
              })
            } else {
              console.log('---------还未购买------------')
              wx.navigateTo({
                url: "/pages/sub_browse/pages/buy/buy?article_id=" + article_id
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
        fail: function(res) {},
      })
    }

  },









  // 跳转到系列课程的课程列表
  jumpToCourse(event) {
    // console.log(event);
    var course_id = event.currentTarget.dataset.course_id;
    // console.log(course_id)
    // wx.navigateTo({
    //   url: "/pages/sub_browse/pages/list/list?course_id=" + course_id,
    // })

    if (app.globalData.isLogin) {
      wx.request({
        url: 'https://wx.bjjy.com/courselistinfo',
        data: {
          'openid': wx.getStorageSync('openid'),
          'course_id': course_id
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        dataType: 'json',
        responseType: 'text',
        success: function(res) {
          console.log('------------这里是res--------------')
          console.log(res)
          if (res.data.msg == '1') {
            console.log('---------已经购买了------------')
            wx.navigateTo({
              url: "/pages/sub_browse/pages/list/list?course_id=" + course_id
            })
          } else {
            console.log('---------还未购买------------')
            wx.navigateTo({
              url: "/pages/sub_browse/pages/buy/buy?course_id=" + course_id
            })
          }
        },
      })
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
        fail: function(res) {},
      })
    }
  },






  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    console.log(options)
    var author_id = options.author_id;
    console.log(author_id)



    // 查询作者信息接口
    wx.request({
      url: 'https://wx.bjjy.com/getauthorarticle',
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
        if (res.data.articleinfo.length == '0' && res.data.courseinfo.length == '0') {
          that.setData({
            isHaveArticle: false,
            isHaveCoruse: false,
            authorinfo: res.data.authorinfo
          })
          console.log('-----------全部都没有----------')
        } else if (res.data.articleinfo.length == '0') {
          that.setData({
            isArticle: false,
            isHaveArticle: false,
            isHaveCoruse: true,
            courseinfo: res.data.courseinfo,
            authorinfo: res.data.authorinfo
          })
          console.log('-----------没有单文----------')
        } else if (res.data.courseinfo.length == '0') {
          that.setData({
            isHaveArticle: true,
            isHaveCoruse: false,
            articleinfo: res.data.articleinfo,
            authorinfo: res.data.authorinfo
          })
          // var i = 0
          // var isFree = 'articleinfo['+i+'].isFree'
          for (var i = 0; i < res.data.articleinfo.length; i++) {
            var isFree = 'articleinfo[' + i + '].isFree';
            if (res.data.articleinfo[i].article_price == '0.00') {
              that.setData({
                [isFree]: true,
              })
            } else {
              that.setData({
                [isFree]: false,
              })
            }
          };
          // console.log(that.data.articleinfo)
          console.log('-----------没有课程----------')
        } else {
          that.setData({
            isHaveArticle: true,
            isHaveCoruse: true,
            articleinfo: res.data.articleinfo,
            courseinfo: res.data.courseinfo,
            authorinfo: res.data.authorinfo
          })
          // var i = 0
          // var isFree = 'articleinfo[' + i + '].isFree';
          for (var i = 0; i < res.data.articleinfo.length; i++) {
            var isFree = 'articleinfo[' + i + '].isFree';
            if (res.data.articleinfo[i].article_price == '0.00') {
              that.setData({
                [isFree]: true,
              })
            } else {
              that.setData({
                [isFree]: false,
              })
            }
          };
          // console.log(that.data.articleinfo)
          console.log('-----------全部都有----------')
        }

      },
      fail: function(res) {},
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