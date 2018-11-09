// pages/video/video.js

const app = getApp();

var WxParse = require('../../../../wxParse/wxParse.js');

Page({

  /**
   * 页面的初始数据
   * arcData:当前页面数据
   * articleinfo
   * authorinfo
   * content
   * buy:用户是否已购
   */
  data: {
    platform: app.globalData.platform,
    arcData: null,
    articleinfo: null,
    authorinfo: null,
    buy: false,


    // windowHeight:'',
    course_id: '',
    // guestbookinfo: [{
    //     headimage: '/image/teacher.jpg',
    //     nickname: '小地瓜',
    //     is_valid: '0',
    //     countpraise: '10',
    //     content: '写的很好',
    //     guestbook_time: '2018-09-28'
    //   },
    //   {
    //     headimage: '/image/teacher.jpg',
    //     nickname: '小地瓜',
    //     is_valid: '0',
    //     countpraise: '10',
    //     content: '啦啦啦',
    //     guestbook_time: '2018-09-28'
    //   },
    //   {
    //     headimage: '/image/teacher.jpg',
    //     nickname: '小地瓜',
    //     is_valid: '0',
    //     countpraise: '10',
    //     content: '哈哈哈',
    //     guestbook_time: '2018-09-28'
    //   }
    // ]
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
    console.log(wx.getStorageSync('openid'))
    this.setData({
      article_id: article_id
    })

    // 请求当前文章内容
    wx.showToast({
      title: '请等待',
      icon: 'loading',
      mask: true,
    })
    that.requestArc();


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




    //上传用户浏览信息
    wx.request({
      url: 'https://wx.bjjy.com/saveBrowseRecord',
      data: {
        openid: wx.getStorageSync("openid"),
        article_id: article_id,
        course_id: this.data.course_id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log(res)
        if (res.data.msg == "0") {
          console.log("-------------浏览记录保存成功---------------")
        } else {
          console.log("-------------浏览记录保存失败---------------")
        }
      }
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


// 跳转到购买页

  jumpToBuy() {
    var that =this
    if (this.data.platform == 'ios'){
      wx.showModal({
        content: '由于相关规范，iOS用户暂不可在小程序内订阅',
        showCancel: false,
        confirmText: '确定',
        success: function(res) {}

      })
    }else{
      wx.showModal({
        // title: '购买',
        content: '是否购买',
        showCancel: true,
        cancelText: '取消',
        // cancelColor: '',
        confirmText: '确定',
        // confirmColor: '',
        success: function (res) {
          console.log(res)
          if (res.confirm) {
            console.log('用户点击确定')
            // 判断是单文还是课程中的文章
            // course_id = 0为单文
            if (that.data.articleinfo.course_id == "0") {
              wx.navigateTo({
                url: "/pages/sub_browse/pages/buy/buy?article_id=" + that.data.articleinfo.article_id
              })
            } else {
              wx.navigateTo({
                url: "/pages/sub_browse/pages/buy/buy?course_id=" + that.data.articleinfo.course_id
              })
            }
          } else if (res.cancel) {
            console.log('用户点击取消')
          }

        }
      })
    }
    
   
  },

  onShareAppMessage() {

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
    var that = this;

    // if (that.data.buy && that.data.arcData != null && that.data.articleinfo == null) {
    //   that.setData({
    //     articleinfo: that.data.arcData.articleinfo,
    //     authorinfo: that.data.arcData.authorinfo,
    //   })
    //   WxParse.wxParse('content', 'html', that.data.arcData.content, that, 0)
    // }

    // 获取留言数据
    wx.request({
      url: 'https://wx.bjjy.com/orderbyguestbook',
      data: {
        'article_id': that.data.article_id,
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
  onShareAppMessage: function(res) {
    var that = this;
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '建谈' + that.data.articleinfo.article_title,
      path: "/pages/sub_browse/pages/video/video?article_id=" + that.data.article_id,
      // success: function (res) {
      //   // 转发成功  
      //   var shareTickets = res.shareTickets;
      //   var shareTicket = shareTickets;
      //   wx.getShareInfo({
      //     shareTicket: shareTicket,
      //     success: function (res) {
      //       console.log('success');
      //       console.log(res);
      //       //console.log(res);  
      //       wx.showToast({
      //         title: '转发成功',
      //         duration: 5000
      //       })
      //     },
      //     fail: function (res) {
      //       console.log('fail');
      //       console.log(res);
      //       wx.showToast({
      //         title: 'fail:' + res.errMsg,
      //         duration: 5000
      //       })
      //     }
      //   });
      // },
      // fail: function (res) {
      //   // 转发失败  
      // }  
    }


  },

  /**
   * 请求服务当前文章信息
   * 
   */
  requestArc: function() {
    var that = this
    // 获取文章数据
    wx.request({
      url: 'https://wx.bjjy.com/getArticleinfobyArticleId',
      data: {
        'article_id': that.data.article_id,
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


        //判断是否登录
        //如果登录，进行下一步判断，如果未登录，引导用户先登录
        if (app.globalData.isLogin) {


          /**
           * 无论用户是否购买，先进行赋值，在onshow时，判断用户是否购买，
           * 无购买，不对字段进行使用 
           * 
           */
          that.setData({
            arcData: res.data,
          })


          // 判断该文章是否为试读课程
          //is_audition为1则为试读课程，课程可读，进行赋值操作
          //is_audition为1则为非试读课程，进行下一步判断
          if (res.data.articleinfo.is_audition == '1') {
            that.setData({
              buy: true,
              articleinfo: res.data.articleinfo,
              authorinfo: res.data.authorinfo,
            })
            WxParse.wxParse('content', 'html', res.data.articleinfo.content, that, 0)
          } else {
            that.setData({
              articleinfo: res.data.articleinfo,
              authorinfo: res.data.authorinfo,
            })
            WxParse.wxParse('content', 'html', res.data.articleinfo.content, that, 0)

            //判断用户是否购买
            //msg=1 代表已购买
            //msg=0 代表未购买
            if (res.data.msg == "1") {
              that.setData({
                buy: true,
              })
            } else {
              // 跳转到购买页
              // 判断是单文还是课程中的文章
              // course_id = 0为单文
              // if (res.data.articleinfo.course_id == "0") {
              //   wx.navigateTo({
              //     url: "/pages/sub_browse/pages/buy/buy?article_id=" + res.data.articleinfo.article_id
              //   })
              // } else {
              //   wx.navigateTo({
              //     url: "/pages/sub_browse/pages/buy/buy?course_id=" + res.data.articleinfo.course_id
              //   })
              // }

            }
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
          })
        }

        wx.hideToast();
      },
      fail: function(res) {
        console.log('-------------失败啦---------------')
      },
    })
  }

})