// pages/video/video.js

const app = getApp();
const api = require('../../../../utils/api.js');
var WxParse = require('../../../../wxParse/wxParse.js');
const myaudio = wx.createInnerAudioContext();


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
    windowHeight: app.globalData.windowHeight,
    // haveVideoHeight: app.globalData.windowHeight-420rpx,
    platform: app.globalData.platform,
    arcData: null,
    articleinfo: null,
    authorinfo: null,
    buy: false,
    isplay: false, //是否播放
    isHaveAudio: false, //是否含有音频
    isHaveVideo: false, //是否含有视频
    course_id: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;

    // 获取屏幕高度
    // wx.getSystemInfo({
    //   success: function(res) {
    //     let clientHeight = res.windowHeight,
    //       clientWidth = res.windowWidth,
    //       rpxR = 750 / clientWidth;
    //     var calc = clientHeight * rpxR;
    //     console.log(calc)
    //     that.setData({
    //       windowHeight: calc
    //     });
    //   }
    // });





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
      // url: 'https://wx.bjjy.com/orderbyguestbook',
      url: api.API_GETARTICLEMSG,
      data: {
        article_id: article_id,
        openid: wx.getStorageSync('openid'),
        source: 'xcx',
        unionid: wx.getStorageSync('unionid')
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
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




    //上传用户浏览信息(文章)
    wx.request({
      // url: 'https://wx.bjjy.com/saveBrowseRecord',
      url: api.API_UPLOADTRACE,
      data: {
        openid: wx.getStorageSync("openid"),
        source: 'xcx',
        unionid: wx.getStorageSync('unionid'),
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
        console.log(res);
        if (res.data.msg == '1') {
          console.log('---------用户浏览记录上传成功-----------')
        } else if (res.data.msg == '2') {
          console.log("-------------浏览记录保存失败---------------")
        } else if (res.data.msg == '3') {
          console.log("-------------浏览记录更新成功---------------")
        } else if (res.data.msg == '4') {
          console.log('---------浏览记录更新失败----------')
        } else {
          console.log('---------------浏览记录接口失败-------------------')
        }
      }
    })

  },

  // 音频播放器
  //播放
  play: function() {
    myaudio.play();
    this.setData({
      isplay: true
    });

    // setTimeout(() => {
    //   console.log(myaudio.duration)//2.795102
    // }, 1000)
  },
  // 暂停
  pause: function() {
    myaudio.pause();
    this.setData({
      isplay: false
    });
  },
  // 播放完毕
  finish: function() {
    myaudio.stop();
    this.setData({
      isplay: false
    })
  },



  // 跳转到写留言
  jumpToMsg: function(event) {
    console.log(event)
    var article_id = event.currentTarget.dataset.articleid;
    console.log(article_id)
    // wx: wx.navigateTo({
    //   url: '/pages/sub_browse/pages/message/message?article_id=' + article_id
    // })
    //判断是否登录
    //如果登录，进行下一步判断，如果未登录，引导用户先登录
    if (app.globalData.isLogin) {
      //判断用户是否绑定手机号
      //如果已经绑定手机号，可以进行页面跳转，如果没有绑定，引导用户先绑定手机号
      if (app.globalData.isBindingPhone) {
        wx.navigateTo({
          url: '/pages/sub_browse/pages/message/message?article_id=' + article_id
        })
      } else {
        wx.showModal({
          title: '未绑定手机号',
          content: '请先绑定手机号',
          showCancel: true,
          cancelText: '取消',
          confirmText: '确定',
          success: function(res) {
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
        success: function(res) {
          wx.switchTab({
            url: '/pages/tabbar/mine/mine',
          })
        },
      })
    }
  },

  // 文章点赞
  articleLike: function() {

    // if (this.data.articleinfo.is_valid == '0') {
    //   this.setData({
    //     'articleinfo.is_valid': '1'
    //   });
    //   this.setData({
    //     'articleinfo.countcollect': Number(this.data.articleinfo.countcollect) - 1
    //   });
    //   this.artLikeUpload()
    // } else {
    //   this.setData({
    //     'articleinfo.is_valid': '0'
    //   });
    //   this.setData({
    //     'articleinfo.countcollect': Number(this.data.articleinfo.countcollect) + 1
    //   });
    //   this.artLikeUpload()
    // }
    var that = this;
    //判断是否登录
    //如果登录，进行下一步判断，如果未登录，引导用户先登录
    if (app.globalData.isLogin) {
      //判断用户是否绑定手机号
      //如果已经绑定手机号，可以进行操作，如果没有绑定，引导用户先绑定手机号
      if (app.globalData.isBindingPhone) {

        if (that.data.articleinfo.is_valid == '0') {
          that.setData({
            'articleinfo.is_valid': '1',
            'articleinfo.countcollect': Number(that.data.articleinfo.countcollect) - 1
          });

          that.artLikeUpload()
        } else {
          that.setData({
            'articleinfo.is_valid': '0',
            'articleinfo.countcollect': Number(that.data.articleinfo.countcollect) + 1
          });
          that.artLikeUpload()
        }

      } else {
        wx.showModal({
          title: '未绑定手机号',
          content: '请先绑定手机号',
          showCancel: true,
          cancelText: '取消',
          confirmText: '确定',
          success: function(res) {
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
        success: function(res) {
          wx.switchTab({
            url: '/pages/tabbar/mine/mine',
          })
        },
      })
    }
  },


  // 留言点赞
  msglike: function(event) {
    // console.log(params);
    // console.log(event)
    let that = this;
    let key = event.currentTarget.dataset.key;
    let guestbook_id = event.currentTarget.dataset.guestbookid;
    // console.log('guestbook_id' + event.currentTarget.dataset.guestbookid);    
    // console.log('key' + event.currentTarget.dataset.key);
    let msgKey = 'guestbookinfo[' + key + '].is_valid';
    let msgnum = 'guestbookinfo[' + key + '].countpraise';
    let num = 'guestbookinfo[' + key + '].num';
    // console.log(that.data.guestbookinfo[key].is_valid);
    // if (that.data.guestbookinfo[key].is_valid == '0' ) {


    //   that.setData({
    //     [msgKey]: '1',
    //     [msgnum]: Number(that.data.guestbookinfo[key].countpraise) - 1,
    //     [num]: '1',
    //     b: guestbook_id
    //   });
    //   console.log(that.data.guestbookinfo[key].num);
    //   console.log(that.data.b)
    //   that.msgLikeUpload()
    //   //console.log(a)


    // } else {

    //   that.setData({
    //     [msgKey]: '0',
    //     [msgnum]: Number(that.data.guestbookinfo[key].countpraise) + 1,
    //     [num]: '-1',
    //     b: guestbook_id
    //   });
    //   console.log(that.data.guestbookinfo[key].num);
    //   console.log(that.data.b)
    //   that.msgLikeUpload()
    //   //console.log(a)

    // }

    //判断是否登录
    //如果登录，进行下一步判断，如果未登录，引导用户先登录
    if (app.globalData.isLogin) {
      //判断用户是否绑定手机号
      //如果已经绑定手机号，可以进行操作，如果没有绑定，引导用户先绑定手机号
      if (app.globalData.isBindingPhone) {
        if (that.data.guestbookinfo[key].is_valid == '0') {


          that.setData({
            [msgKey]: '1',
            [msgnum]: Number(that.data.guestbookinfo[key].countpraise) - 1,
            [num]: '1',
            b: guestbook_id
          });
          console.log(that.data.guestbookinfo[key].num);
          console.log(that.data.b)
          that.msgLikeUpload()
          //console.log(a)


        } else {

          that.setData({
            [msgKey]: '0',
            [msgnum]: Number(that.data.guestbookinfo[key].countpraise) + 1,
            [num]: '-1',
            b: guestbook_id
          });
          console.log(that.data.guestbookinfo[key].num);
          console.log(that.data.b)
          that.msgLikeUpload()
          //console.log(a)

        }
      } else {
        wx.showModal({
          title: '未绑定手机号',
          content: '请先绑定手机号',
          showCancel: true,
          cancelText: '取消',
          confirmText: '确定',
          success: function(res) {
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
        success: function(res) {
          wx.switchTab({
            url: '/pages/tabbar/mine/mine',
          })
        },
      })
    }
  },




  // 留言点赞上传接口
  msgLikeUpload: function() {
    // console.log(this.data.b)
    // console.log(wx.getStorageSync('openid'))
    // console.log(wx.getStorageSync('unionid'))

    wx.request({
      // url: 'https://wx.bjjy.com/updateguestbook',
      url: api.API_UPLOADMSGLIKE,
      data: {
        'guestbook_id': this.data.b,
        'openid': wx.getStorageSync('openid'),
        source: 'xcx',
        unionid: wx.getStorageSync('unionid')
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
      // url: 'https://wx.bjjy.com/collectarticle',
      url: api.API_UPLOADARTICLLIKE,
      data: {
        'article_id': this.data.articleinfo.article_id,
        'openid': wx.getStorageSync('openid'),
        source: 'xcx',
        unionid: wx.getStorageSync('unionid')
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
    var that = this
    if (this.data.platform == 'ios') {
      wx.showModal({
        content: '由于相关规范，iOS用户暂不可在小程序内订阅',
        showCancel: false,
        confirmText: '确定',
        success: function(res) {}

      })
    } else {
      //判断是否登录
      //如果登录，进行下一步判断，如果未登录，引导用户先登录
      if (app.globalData.isLogin) {
        //判断用户是否绑定手机号
        //如果已经绑定手机号，可以进行操作，如果没有绑定，引导用户先绑定手机号
        if (app.globalData.isBindingPhone) {
          wx.showModal({
            // title: '购买',
            content: '是否购买',
            showCancel: true,
            cancelText: '取消',
            // cancelColor: '',
            confirmText: '确定',
            // confirmColor: '',
            success: function(res) {
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
        } else {
          wx.showModal({
            title: '未绑定手机号',
            content: '请先绑定手机号',
            showCancel: true,
            cancelText: '取消',
            confirmText: '确定',
            success: function(res) {
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
          success: function(res) {
            wx.switchTab({
              url: '/pages/tabbar/mine/mine',
            })
          },
        })
      }

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
      // url: 'https://wx.bjjy.com/orderbyguestbook',
      url: api.API_GETARTICLEMSG,
      data: {
        article_id: that.data.article_id,
        openid: wx.getStorageSync('openid'),
        source: 'xcx',
        unionid: wx.getStorageSync('unionid')
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
    this.pause();
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    this.finish();
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
      title: that.data.articleinfo.article_title,
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
      // url: 'https://wx.bjjy.com/getArticleinfobyArticleId',
      url: api.API_GETARTICLEINFO,
      data: {
        article_id: that.data.article_id,
        openid: wx.getStorageSync('openid'),
        source: 'xcx',
        unionid: wx.getStorageSync('unionid')
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


          //判断是否含有音频和视频
          //根据是否有audio_id来判断是否含有音频，如果有audio_id则含有音频，isHaveAudio为true,如果没有则不含有音频，isHaveAudio为false,
          //根据是否有video_id来判断是否含有视频，如果有video_id则含有视频，isHaveVideo为true,如果没有则不含有视频，isHaveVideo为false,
          if (res.data.articleinfo.audio_id) {
            console.log('------含有音频---------')
            that.setData({
              isHaveAudio: true,
              minute: parseInt(res.data.articleinfo.audio_duration / 60),
              second: parseInt(res.data.articleinfo.audio_duration % 60)
            })
          }
          if (res.data.articleinfo.video_id) {
            console.log('------含有视频---------')
            let haveVideoHeight = app.globalData.scrollHeight - 44
            haveVideoHeight = haveVideoHeight - (210/375)* app.globalData.windowWidth - 49
            that.setData({
              isHaveVideo: true,
              haveVideoHeight: haveVideoHeight
            })
          }
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
          //is_audition为0则为非试读课程，进行下一步判断
          if (res.data.articleinfo.is_audition == '1') {
            that.setData({
              buy: true,
              articleinfo: res.data.articleinfo,
              authorinfo: res.data.authorinfo,
            })
            myaudio.src = res.data.articleinfo.audio_url;

            WxParse.wxParse('content', 'html', res.data.articleinfo.content, that, 0)
          } else {
            that.setData({
              articleinfo: res.data.articleinfo,
              authorinfo: res.data.authorinfo,
            })
            myaudio.src = res.data.articleinfo.audio_url;
            WxParse.wxParse('content', 'html', res.data.articleinfo.content, that, 0)

            //判断用户是否购买
            //msg=1 代表已购买
            //msg=0 代表未购买
            if (res.data.msg == "1") {
              that.setData({
                buy: true,
              })
            } else {

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