// pages/video/video.js

const app = getApp();
import {
  HTTP
} from '../../../../utils/http.js'
let http = new HTTP()
import {
  api
} from '../../../../utils/api.js'
const util = require('../../../../utils/util.js')

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
    user_id: '',
    page: 1, //留言页数
    tabbarlist: {}, // tabbar信息
    articleinfo: '', // 文章信息
    guestbookinfo: '', // 留言信息
    windowHeight: app.globalData.windowHeight,
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

    wx.showLoading({
      title: '请等待',
    })

    //获取上层传输数据
    const article_id = options.article_id;
    console.log(article_id)
    this.setData({
      article_id: article_id
    })

    // 获取文章信息
    this.getArticleInfo()
    // 获取留言信息
    this.getGuestbook()

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
  onShow: function() {},

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
    console.log('监听用户下拉动作')
    this.setData({
      page: 1,
      guestbookinfo: '', // 留言信息
    })
    // 获取文章信息
    this.getArticleInfo()
    // 获取留言信息
    this.getGuestbook(1)
    wx.showLoading({
      title: '加载中',
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    console.log('页面上拉触底事件的处理函数')

    if (this.data.page < this.data.page_count) {
      // 获取留言信息
      this.getGuestbook(Number(this.data.page) + 1)
      wx.showLoading({
        title: '加载中',
      })
    } else {
      wx.showToast({
        title: '没有更多数据了',
      })
    }
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

    }


  },

  /**
   *方法
   * 
   */

  // 音频播放器
  //播放
  play: function() {
    myaudio.play();
    this.setData({
      isplay: true
    });

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


  // 发表留言
  uploadMsg(event) {
    console.log(event)
    const value = event.detail.value

    // 留言接口
    this.submitRequest(value)
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


  /**
   * 网络请求
   * 
   */

  //文章信息
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
            haveVideoHeight = haveVideoHeight - (210 / 375) * app.globalData.windowWidth - 49
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
  },


  // 获取文章信息
  getArticleInfo() {
    http.request({
        url: api.API_GETARTICLEINFO,
        data: {
          user_id: wx.getStorageSync('user_id'),
          article_id: this.data.article_id,
          source: 'xcx'
        }
      })
      .then(res => {
        console.log('----------获取到文章信息了-------------')
        console.log(res)
        this.setData({
          articleinfo: res.data.newsInfo,
          'tabbarlist.countCollect': res.data.newsInfo.countCollect,
          'tabbarlist.isCollect': res.data.newsInfo.isCollect,
          'tabbarlist.article_id': res.data.newsInfo.article_id,
          'tabbarlist.isArticle': true

        })
        var that = this
        myaudio.src = res.data.newsInfo.audio_url;
        WxParse.wxParse('content', 'html', res.data.newsInfo.content, that, 0)
        //判断是否含有音频和视频
        //根据是否有audio_id来判断是否含有音频，如果有audio_id则含有音频，isHaveAudio为true,如果没有则不含有音频，isHaveAudio为false,
        //根据是否有video_id来判断是否含有视频，如果有video_id则含有视频，isHaveVideo为true,如果没有则不含有视频，isHaveVideo为false,
        if (res.data.newsInfo.audio_id) {
          console.log('------含有音频---------')
          that.setData({
            isHaveAudio: true,
            minute: parseInt(res.data.newsInfo.audio_duration / 60),
            second: parseInt(res.data.newsInfo.audio_duration % 60)
          })
        }
        if (res.data.newsInfo.video_id) {
          console.log('------含有视频---------')
          let haveVideoHeight = app.globalData.scrollHeight - 44
          haveVideoHeight = haveVideoHeight - (210 / 375) * app.globalData.windowWidth - 49
          that.setData({
            isHaveVideo: true,
            haveVideoHeight: haveVideoHeight
          })
        }

        // 动态设置当前页面标题
        if (res.data.newsInfo.type == 'article'){
          wx.setNavigationBarTitle({
            title: res.data.newsInfo.article_title
          })
        }else{
          wx.setNavigationBarTitle({
            title: '每日一谈'
          })
        }
        
        // 关闭刷新
        wx.hideLoading()
        wx.stopPullDownRefresh()
      })
  },

  // 获取留言信息
  getGuestbook() {
    http.request({
        url: api.API_GETARTICLEMSG,
        data: {
          article_id: this.data.article_id,
          page: this.data.page,
          page_size: 20
        }
      })
      .then(res => {
        console.log('----------获取到留言信息了-------------')
        console.log(res)
        this.setData({
          guestbookinfo: res.data.guestbookInfo,
          page_count: res.data.page_count,
          'tabbarlist.guestbookNum': res.data.guestbookInfo.length
        })
        wx.hideLoading()
        wx.stopPullDownRefresh()
      })
  },

  // 留言接口
  submitRequest(value) {
    http.request({
        url: api.API_UPLOADMSG,
        data: {
          source: 'xcx',
          user_id: wx.getStorageSync('user_id'),
          article_id: this.data.article_id,
          content: value
        }
      })
      .then(res => {
        console.log('-----------上传留言成功------------')
        console.log(res)
        util._showToastSuccess('上传留言成功')
        this.setData({
          value: '',
          guestbookinfo: res.data.guestbookInfo,
          page_count: res.data.page_count,
          'tabbarlist.guestbookNum': res.data.guestbookInfo.length
        })
      })


  }
})