// pages/video/video.js


var WxParse = require('../../../../wxParse/wxParse.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // windowHeight:'',

    guestbookinfo: [{
        headimage: '/image/teacher.jpg',
        nickname: '小地瓜',
        is_valid: '0',
        countpraise: '10',
        content: '写的很好',
        guestbook_time: '2018-09-28'
      },
      {
        headimage: '/image/teacher.jpg',
        nickname: '小地瓜',
        is_valid: '0',
        countpraise: '10',
        content: '啦啦啦',
        guestbook_time: '2018-09-28'
      },
      {
        headimage: '/image/teacher.jpg',
        nickname: '小地瓜',
        is_valid: '0',
        countpraise: '10',
        content: '哈哈哈',
        guestbook_time: '2018-09-28'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;


    // 获取屏幕高度
    wx.getSystemInfo({
      success: function(res) {
        let clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR;
        console.log(calc)
        that.setData({
          windowHeight: calc
        });
      }
    });






    wx.showShareMenu({
      withShareTicket: true
    })


    //获取上层传输数据
    var article_id = options.article_id;

    console.log(article_id)
    this.setData({
      article_id: article_id
    })


    // 获取文章数据
    wx.request({
      url: 'https://wx.bjjy.com/getArticleinfobyArticleId',
      data: {
        'article_id': article_id,
        'openid': wx.getStorageSync('openid'),
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      //dataType: 'json',
      //responseType: 'text',
      success: function(res) {
        console.log('-------------文章数据---------------')
        console.log(res)
        that.setData({
          articleinfo: res.data.articleinfo,
          authorinfo: res.data.authorinfo,
        })
        WxParse.wxParse('content', 'html', res.data.articleinfo.content, that, 0)
      },
      fail: function(res) {
        console.log('-------------失败啦---------------')
      },
    })

    // 获取留言数据
    wx.request({
      url: 'https://wx.bjjy.com/orderbyguestbook',
      data: {
        'article_id': article_id,
        'openid': wx.getStorageSync('openid'),
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      //dataType: 'json',
      //responseType: 'text',
      success: function(res) {
        console.log('--------------留言数据-------------')
        console.log(res)
        that.setData({
          guestbookinfo: res.data.guestbookinfo
        })
      },
      fail: function(res) {
        console.log('failed')
      },
    })


  },






  // 跳转到写留言
  jumpToMsg: function(event) {
    console.log(event)
    var article_id = event.currentTarget.dataset.articleid;
    console.log(article_id)
    wx: wx.navigateTo({
      url: '/pages/sub_browse/pages/message/message?article_id=' + article_id
    })
  },

  // 文章点赞
  articleLike: function() {

    if (this.data.articleinfo.is_valid == '0') {
      this.setData({
        'articleinfo.is_valid': '1'
      });
      this.setData({
        'articleinfo.countcollect': Number(this.data.articleinfo.countcollect) - 1
      });
      this.artLikeUpload()
    } else {
      this.setData({
        'articleinfo.is_valid': '0'
      });
      this.setData({
        'articleinfo.countcollect': Number(this.data.articleinfo.countcollect) + 1
      });
      this.artLikeUpload()
    }
  },


  // 留言点赞
  msglike: function(event) {
    // console.log(params);
    // console.log(event)
    let key = event.currentTarget.dataset.key;
    let guestbook_id = event.currentTarget.dataset.guestbookid;
    // console.log('guestbook_id' + event.currentTarget.dataset.guestbookid);    
    // console.log('key' + event.currentTarget.dataset.key);
    let msgKey = 'guestbookinfo[' + key + '].is_valid';
    let msgnum = 'guestbookinfo[' + key + '].countpraise';
    let num = 'guestbookinfo[' + key + '].num';
    if (this.data.guestbookinfo[key].is_valid == '0') {
      this.setData({
        [msgKey]: '1'
      });
      this.setData({
        [msgnum]: Number(this.data.guestbookinfo[key].countpraise) - 1
      });
      this.setData({
        [num]: '-1'
      });
      console.log(this.data.guestbookinfo[key].num);
      this.setData({
        a: this.data.guestbookinfo[key].num
      });
      this.setData({
        b: guestbook_id
      })
      console.log(this.data.b)
      this.msgLikeUpload()
      //console.log(a)
    } else {
      this.setData({
        [msgKey]: '0'
      });
      this.setData({
        [msgnum]: Number(this.data.guestbookinfo[key].countpraise) + 1
      });
      this.setData({
        [num]: '1'
      });
      console.log(this.data.guestbookinfo[key].num);
      this.setData({
        a: this.data.guestbookinfo[key].num
      });
      this.setData({
        b: guestbook_id
      })
      console.log(this.data.b)
      this.msgLikeUpload()
      //console.log(a)
    }


  },




  // 留言点赞上传接口
  msgLikeUpload: function() {
    wx.request({
      url: 'https://wx.bjjy.com/updateguestbook',
      data: {
        'num': this.data.a,
        'guestbook_id': this.data.b,
        'openid': wx.getStorageSync('openid')
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log('留言点赞信息上传成功')
      },
      fail: function(res) {
        console.log('留言点赞信息上传失败')
      },
    })
  },




  // 文章收藏信息上传接口
  artLikeUpload: function() {
    wx.request({
      url: 'https://wx.bjjy.com/collectarticle',
      data: {
        'article_id': this.data.articleinfo.article_id,
        'openid': wx.getStorageSync('openid')
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log('-----------文章收藏信息上传成功啦------------')
      },
      fail: function(res) {
        console.log('-----------失败啦------------')
      },
    })
  },


  onShareAppMessage() {},


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;
    // 获取留言数据
    wx.request({
      url: 'https://wx.bjjy.com/orderbyguestbook',
      data: {
        'article_id': this.data.article_id,
        'openid': wx.getStorageSync('openid'),
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      //dataType: 'json',
      //responseType: 'text',
      success: function(res) {
        console.log('--------------留言数据-------------')
        console.log(res)
        that.setData({
          guestbookinfo: res.data.guestbookinfo
        })
      },
      fail: function(res) {
        console.log('failed')
      },
    })
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