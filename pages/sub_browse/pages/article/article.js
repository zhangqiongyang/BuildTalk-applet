const app = getApp();
const api = require('../../../../utils/api.js');
const myaudio = wx.createInnerAudioContext();
var WxParse = require('../../../../wxParse/wxParse.js');
Page({
  data: {
    isplay: false, //是否播放
    isHaveAudio: false, //是否含有音频
    a: '',
    articleinfo: '',
    course_id: ''
  },





  onLoad: function(options) {
    var that = this
    // var postId = option.id;
    // console.log(postId);
    // this.data.currentPostId = postId;
    // var postData = postsData.postList[postId];
    // this.setData({
    //   postData: postData
    // })
    // wx.getStorageSync('articles');
    // wx.getStorageSync('picurlinfo');
    // console.log(wx.getStorageSync('articles'))
    // this.setData({
    //   articles: wx.getStorageSync('articles'),
    //   picurlinfo: wx.getStorageSync('picurlinfo'),
    // })




    wx.showShareMenu({
      withShareTicket: true
    })


    //获取上层传输数据
    var article_id = options.article_id;
    console.log("文章id" + article_id)
    console.log(wx.getStorageSync('openid'))
    this.setData({
      article_id: article_id
    })



    // 获取文章数据
    wx.request({
      // url: 'https://wx.bjjy.com/getArticleinfobyArticleId',
      url: api.API_GETARTICLEINFO,      
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

        //判断是否登录
        //如果登录，进行下一步判断，如果未登录，引导用户先登录
        if (app.globalData.isLogin) {


          //判断该课程是否为试听
          //



          //判断用户是否购买
          //msg=1 代表已购买
          //msg=0 代表未购买
          if (res.data.msg == "1") {


            //判断是否含有音频
            if (res.data.articleinfo.audio_id) {
              that.setData({
                isHaveAudio: true
              })
            }
            that.setData({
              articleinfo: res.data.articleinfo,
              authorinfo: res.data.authorinfo,
            })
            myaudio.src = res.data.articleinfo.audio_url;
            WxParse.wxParse('content', 'html', res.data.articleinfo.content, that, 0)
          } else {
            // 跳转到购买页
            // 判断是单文还是课程中的文章
            // course_id = 0为单文
            if (res.data.articleinfo.course_id == "0") {
              wx.navigateTo({
                url: "/pages/sub_browse/pages/buy/buy?article_id=" + res.data.article_id
              })
            } else {
              wx.navigateTo({
                url: "/pages/sub_browse/pages/buy/buy?course_id=" + res.data.course_id
              })
            }
            //判断是否含有音频
            if (res.data.articleinfo.audio_id) {
              that.setData({
                isHaveAudio: true
              })
            }
            that.setData({
              articleinfo: res.data.articleinfo,
              authorinfo: res.data.authorinfo,
            })
            myaudio.src = res.data.articleinfo.audio_url;
            WxParse.wxParse('content', 'html', res.data.articleinfo.content, that, 0)
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
      fail: function(res) {
        console.log('-------------失败啦---------------')
      },
    })

    // 获取留言数据
    wx.request({
      // url: 'https://wx.bjjy.com/orderbyguestbook',
      url: api.API_GETARTICLEMSG,
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
      // url: 'https://wx.bjjy.com/saveBrowseRecord',
      url: api.API_UPLOADTRACE,      
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







  // onShow: function () {
  //   // myaudio.src = this.data.articles.audio_url;
  //   // myaudio.src = this.data.articleinfo.audio_url;
  //   console.log('onshow的方法')
  //   myaudio.src = "http://wx.bjjy.com/uploads/20180912/a2dec56f5252ee3fa745e8f055440a9b.mp3";
  //   console.log('这是音乐地址' + this.data.articleinfo.audio_url)
  //   console.log('-----------------' + this.data.articleinfo)
  // },










  // 音频播放器
  //播放
  play: function() {
    myaudio.play();
    console.log(myaudio.duration);
    this.setData({
      isplay: true
    });
  },
  // 停止
  stop: function() {
    myaudio.pause();
    this.setData({
      isplay: false
    });
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
      // url: 'https://wx.bjjy.com/updateguestbook',
      url: api.API_UPLOADMSGLIKE,      
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
      // url: 'https://wx.bjjy.com/collectarticle',
      url: api.API_UPLOADARTICLLIKE,      
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




  onShow() {
    var that = this;
    // 获取留言数据
    wx.request({
      // url: 'https://wx.bjjy.com/orderbyguestbook'
      url: api.API_GETARTICLEMSG,      
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


  // 分享到朋友圈
  // 下载小程序码到本地，拿到临时路径
  //   onShow:function(){
  //     var that = this;
  //     console.log('--------------------这里是app.globalData.userInfo.avatarUrl----------------------------')
  //     console.log(app.globalData.userInfo.avatarUrl)
  //     wx.downloadFile({
  //       url: app.globalData.userInfo.avatarUrl,
  //       success: function(res) {
  //         console.log('--------------------这里是downloadFile的res--------------------')
  //         console.log(res)
  //         // 缓存头像图片
  //         that.setData({
  //           portrait_temp:res.tempFilePath
  //         })
  //       },
  //     })
  //     console.log('-------------这里是qrcode--------------')
  //     console.log(this.data.qrcode)
  //     wx.downloadFile({
  //       url: this.data.qrcode,
  //       success: function(res) {
  //         console.log('------------这里是res----------------')
  //         console.log(res)
  //       },
  //     })



  //   },



  //   pengyouquan(){
  //     wx.downloadFile({
  //       url: app.globalData.userInfo.avatarUrl,
  //       success: function (res1) {

  //         //缓存头像图片
  //         that.setData({
  //           portrait_temp: res1.tempFilePath
  //         })
  //         //缓存canvas绘制小程序二维码
  //         wx.downloadFile({
  //           url: that.data.qrcode,
  //           success: function (res2) {
  //             console.log('二维码：' + res2.tempFilePath)
  //             //缓存二维码
  //             that.setData({
  //               qrcode_temp: res2.tempFilePath
  //             })
  //             console.log('开始绘制图片')
  //             that.drawImage();
  //             wx.hideLoading();
  //             setTimeout(function () {
  //               that.canvasToImage()
  //             }, 200)
  //           }
  //         })
  //       }
  //     })
  //   },


  // drawImage() {
  //     //绘制canvas图片
  //     var that = this
  //     const ctx = wx.createCanvasContext('myCanvas')
  //     var bgPath = '../../../images/share_bg.png'
  //     var portraitPath = that.data.portrait_temp
  //     var hostNickname = app.globalData.userInfo.nickName

  //     var qrPath = that.data.qrcode_temp
  //     var windowWidth = that.data.windowWidth
  //     that.setData({
  //       scale: 1.6
  //     })
  //     //绘制背景图片
  //     ctx.drawImage(bgPath, 0, 0, windowWidth, that.data.scale * windowWidth)

  //     //绘制头像
  //     ctx.save()
  //     ctx.beginPath()
  //     ctx.arc(windowWidth / 2, 0.32 * windowWidth, 0.15 * windowWidth, 0, 2 * Math.PI)
  //     ctx.clip()
  //     ctx.drawImage(portraitPath, 0.7 * windowWidth / 2, 0.17 * windowWidth, 0.3 * windowWidth, 0.3 * windowWidth)
  //     ctx.restore()
  //     //绘制第一段文本
  //     ctx.setFillStyle('#ffffff')
  //     ctx.setFontSize(0.037 * windowWidth)
  //     ctx.setTextAlign('center')
  //     ctx.fillText(hostNickname + ' 正在参加疯狂红包活动', windowWidth / 2, 0.52 * windowWidth)
  //     //绘制第二段文本
  //     ctx.setFillStyle('#ffffff')
  //     ctx.setFontSize(0.037 * windowWidth)
  //     ctx.setTextAlign('center')
  //     ctx.fillText('邀请你一起来领券抢红包啦~', windowWidth / 2, 0.57 * windowWidth)
  //     //绘制二维码
  //     ctx.drawImage(qrPath, 0.64 * windowWidth / 2, 0.75 * windowWidth, 0.36 * windowWidth, 0.36 * windowWidth)
  //     //绘制第三段文本
  //     ctx.setFillStyle('#ffffff')
  //     ctx.setFontSize(0.037 * windowWidth)
  //     ctx.setTextAlign('center')
  //     ctx.fillText('长按二维码领红包', windowWidth / 2, 1.36 * windowWidth)
  //     ctx.draw();
  //   },





  //   canvasToImage() {
  //     var that = this
  //         wx.canvasToTempFilePath({
  //       x: 0,
  //       y: 0,
  //       width: that.data.windowWidth,
  //       height: that.data.windowWidth * that.data.scale,
  //       destWidth: that.data.windowWidth * 4,
  //       destHeight: that.data.windowWidth * 4 * that.data.scale,
  //       canvasId: 'myCanvas',
  //       success: function (res) {
  //         console.log('朋友圈分享图生成成功:' + res.tempFilePath)
  //         wx.previewImage({
  //           current: res.tempFilePath, // 当前显示图片的http链接
  //           urls: [res.tempFilePath] // 需要预览的图片http链接列表
  //         })
  //       },
  //       fail: function (err) {
  //         console.log('失败')
  //         console.log(err)
  //       }
  //     })
  //   },



})