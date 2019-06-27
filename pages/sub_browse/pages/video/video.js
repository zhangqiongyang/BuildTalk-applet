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

  //解锁
  jumpToBuy() {
    var that =this
    wx.showModal({
      title: '支付' + this.data.articleinfo.article_price + '元解锁此课程',
      cancelColor: '#242831',
      confirmColor: '#32A7FF',
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          that.pay()
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      },
    })
  },


  // 发表留言
  uploadMsg(event) {
    console.log(event)
    const value = event.detail.value
    util.judge(() => {

      // 留言接口
      this.submitRequest(value)
    })
  },


  /**
   * 网络请求
   * 
   */


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

        if (res.data.newsInfo.is_buy == 1) {
          this.setData({
            buy: true
          })
        }

        // 动态设置当前页面标题
        if (res.data.newsInfo.type == 'article') {

          wx.setNavigationBarTitle({
            title: res.data.newsInfo.article_title
          })
        } else {
          this.setData({
            buy: true
          })
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
          user_id: wx.getStorageSync('user_id'),
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
          countCommentNum: res.data.countGuestbookNum,
          'tabbarlist.guestbookNum': res.data.countGuestbookNum
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
          'tabbarlist.guestbookNum': res.data.countGuestbookNum
        })
      })
  },


  //支付
  pay() {
    http.request({
        url: api.API_BUY,
        data: {
          user_id: wx.getStorageSync("user_id"),
          type_id: 1, //1文章 2课程
          data_id: this.data.articleinfo.article_id,
          order_name: this.data.articleinfo.article_title,
          source: 'xcx',
          order_price: this.data.articleinfo.article_price
        }
      })
      .then(res => {
        console.log('----------统一下单成功-----------')
        console.log(res)

        util._showToastSuccess('成功加入')

        var that = this
        // 发起支付
        wx.requestPayment({
          timeStamp: res.data.timeStamp,
          nonceStr: res.data.nonceStr,
          package: res.data.package,
          signType: res.data.signType,
          paySign: res.data.paySign,
          success: function(res) {
            console.log('----------支付成功-----------')
            util._showToastSuccess('支付成功')

            // 获取文章信息
            that.getArticleInfo()
          },
          fail: function(res) {
            console.log('----------支付失败-----------')
            util._showToastCancel('支付失败')
          },
        })
      })
  }
})