// pages/sub_circle/pages/publishSubject/publishSubject.js
import {
  HTTP
} from '../../../../utils/http.js'
let http = new HTTP()
import {
  api
} from '../../../../utils/api.js'

const util = require('../../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pic: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      circle_id: options.circle_id
    })
    if (options.theme_id) {
      this.setData({
        theme_id: options.theme_id
      })
      //查询主题内容
      this.subjectInfo()
    }

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

  },

  /**
   * 方法
   */
  // 上传图片
  upload() {
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        console.log(res)
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'https://www.51jiantan.com/picuploadhandle',
          filePath: tempFilePaths[0],
          name: 'file',
          success(res) {
            console.log(res)
            const data = JSON.parse(res.data)
            // do something
            console.log(data)
            let pic = that.data.pic
            pic.push(data.pic_url)
            that.setData({
              pic: pic
            })
          }
        })
      }
    })
  },

  // 删除图片
  deleteImage(event) {
    console.log(event)
    const index = event.currentTarget.dataset.index
    let pic = this.data.pic

    pic.splice(index, 1)

    this.setData({
      pic: pic
    })

  },

  // textarea 获取焦点时
  focus(event) {
    console.log(event)
    const height = event.detail.height
    this.setData({
      height: height
    })
  },

  //textarea 失去焦点时
  blur(event) {
    console.log(event)
    // const height = event.detail.height
    this.setData({
      height: 0
    })
  },

  // 输入
  input(event) {
    console.log(event)
    const content = event.detail.value
    this.setData({
      content: content
    })
  },

  //发布主题
  submit() {
    if (!util.isEmpty(this.data.content)) {
      if (this.data.theme_id) {
        //修改主题
        this.change()
      } else {
        //发表主题
        this.publish()
      }
    } else if (util.isEmpty(this.data.content)) {
      util._showToast('主题内容不能为空')
    }
  },


  /**
   * 网络请求
   */
  //查询主题内容
  subjectInfo() {
    http.request({
        url: api.API_SUBJECTINFO,
        data: {
          theme_id: this.data.theme_id,
        }
      })
      .then(res => {
        console.log('-----------获取到主题内容了----------')
        console.log(res)

        let pic = this.data.pic
        for (let i = 0; i < res.data.theme_image.length; i++) {
          pic.push(res.data.theme_image[i].pic_url)
        }

        this.setData({
          content: res.data.theme_content,
          pic: pic
        })

      })
  },
  //发表主题
  publish() {
    http.request({
        url: api.API_PUBLISHSUBJECT,
        data: {
          theme_content: this.data.content,
          theme_image: this.data.pic,
          circle_id: this.data.circle_id,
          user_id: wx.getStorageSync("user_id"),
          source: 'xcx'
        }
      })
      .then(res => {
        console.log('-----------发布成功----------')
        console.log(res)

        wx.redirectTo({
          url: '../circleDetails/circleDetails?circle_id=' + this.data.circle_id,
        })
      })
  },

  //修改主题
  change() {
    http.request({
        url: api.API_CHANGESUBJECT,
        data: {
          theme_content: this.data.content,
          theme_image: this.data.pic.toString(),
          theme_id: this.data.theme_id,
          user_id: wx.getStorageSync("user_id"),
        }
      })
      .then(res => {
        console.log('-----------修改成功----------')
        console.log(res)

        wx.redirectTo({
          url: '../circleDetails/circleDetails?circle_id=' + this.data.circle_id,
        })
      })
  },
})