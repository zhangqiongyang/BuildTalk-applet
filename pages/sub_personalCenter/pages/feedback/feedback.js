var app = getApp();
const api = require('../../../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowHeight: app.globalData.windowHeight + 48,    
    placeholder: '由作者筛选后的优质留言将会公开显示，欢迎踊跃留言',
    maxlength: '2000',
    value: '',
    myMsg: [],
    image:[
      // "http://tmp/wx729a85a2d7af0ca0.o6zAJsxLV2QZyUUrDjDHRlDgCpVg.EefzO4d7DriF8ac27f79b4f79eea646a455bf92e8b0a.jpg",
      // "http://tmp/wx729a85a2d7af0ca0.o6zAJsxLV2QZyUUrDjDHRlDgCpVg.EefzO4d7DriF8ac27f79b4f79eea646a455bf92e8b0a.jpg",
      // "http://tmp/wx729a85a2d7af0ca0.o6zAJsxLV2QZyUUrDjDHRlDgCpVg.EefzO4d7DriF8ac27f79b4f79eea646a455bf92e8b0a.jpg",
      // "http://tmp/wx729a85a2d7af0ca0.o6zAJsxLV2QZyUUrDjDHRlDgCpVg.EefzO4d7DriF8ac27f79b4f79eea646a455bf92e8b0a.jpg",
      // "http://tmp/wx729a85a2d7af0ca0.o6zAJsxLV2QZyUUrDjDHRlDgCpVg.EefzO4d7DriF8ac27f79b4f79eea646a455bf92e8b0a.jpg",
      // "http://tmp/wx729a85a2d7af0ca0.o6zAJsxLV2QZyUUrDjDHRlDgCpVg.EefzO4d7DriF8ac27f79b4f79eea646a455bf92e8b0a.jpg",
      // "http://tmp/wx729a85a2d7af0ca0.o6zAJsxLV2QZyUUrDjDHRlDgCpVg.EefzO4d7DriF8ac27f79b4f79eea646a455bf92e8b0a.jpg",
      // "http://tmp/wx729a85a2d7af0ca0.o6zAJsxLV2QZyUUrDjDHRlDgCpVg.EefzO4d7DriF8ac27f79b4f79eea646a455bf92e8b0a.jpg",
      // "http://tmp/wx729a85a2d7af0ca0.o6zAJsxLV2QZyUUrDjDHRlDgCpVg.EefzO4d7DriF8ac27f79b4f79eea646a455bf92e8b0a.jpg"
    ]
  },

  // 字数限制
  bindWordLimit: function (e) {
    var value = e.detail.value,
      maxlength = this.data.maxlength,
      len = parseInt(value.length);

    if (len > maxlength) {
      return;
    }

    this.setData({
      currentNoteLen: len,//当前字数
      value: value        //文本域内容
    })
  },



  //上传图片
  uploadImage(){
    var that = this;
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],  //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: function(res) {
        console.log('-------------图片信息----------------')
        console.log(res)
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths


        //显示在页面中
        let image = that.data.image
        image.push(tempFilePaths[0])
        that.setData({
          image
        })

        // console.log(that.data.image)



        //上传到服务器


      },
    })

  },



  //预览图片
  imagePreview(event){
    var that = this;
    // console.log(event)
    let index = event.currentTarget.dataset.index
    wx.previewImage({
      current: this.data.image[index],
      urls: this.data.image
    })
  },



  //删除图片
  imageDel(event){
    var that = this
    console.log(event)
    let index = event.currentTarget.dataset.index;
    let image = that.data.image
    wx.showModal({
      title: '删除图片',
      content: '确认要删除此图片?',
      showCancel: true,
      cancelText: '取消',
      confirmText: '确定',
      success: function(res) {
        if (res.confirm) {
          // console.log('用户点击确定')
          console.log("删除")
          image.splice(index, 1)
          that.setData({
            image
          })
        } else if (res.cancel) {
          // console.log('用户点击取消')
        }
        
      }
    })
    
  },



  //上传到服务器
  msgSubmit(){
    wx.uploadFile({
      url: '',
      filePath: '',
      name: '',
      header: {},
      formData: {},
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },



  //提交
  // msgSubmit: function (e) {
  //   if (this.data.value == '') {
  //     wx.showModal({
  //       title: '留言不能为空',
  //       content: '',
  //       showCancel: false,
  //     })
  //   }
  //   else {
  //     console.log(this.data.value);

  //     // let len = this.data.myMsg.length;
  //     // // let myMsgAdd = 'this.data.myMsg[' + len + ']';
  //     // let myMsg = this.data.myMsg;
  //     // console.log(len);
  //     // myMsg.push(this.data.value)

  //     // this.setData({
  //     //   // myMsg: this.data.value,
  //     //   myMsg
  //     // });

  //     setTimeout(_ => {
  //       this.setData({
  //         value: ''
  //       })
  //     }, 300);

  //     // console.log(len);


  //     wx.showToast({
  //       title: '提交成功',
  //     })
  //     this.msgUpload()
  //     this.getMsg()
  //   }

  // },



  // 上传留言接口
  // msgUpload: function () {
  //   var that = this;
  //   wx.request({
  //     url: 'https://wx.bjjy.com/saveguestbook',
  //     url: api.API_UPLOADMSG,
  //     data: {
  //       'wx_openid': wx.getStorageSync('openid'),
  // source: 'xcx',
  //unionid: wx.getStorageSync('unionid'),
  //       'article_id': that.data.article_id,
  //       'content': that.data.value
  //     },
  //     header: {
  //       'content-type': 'application/x-www-form-urlencoded'
  //     },
  //     method: 'POST',
  //     dataType: 'json',
  //     responseType: 'text',
  //     success: function (res) {
  //       console.log('--------------留言上传成功啦----------------')
  //       // console.log(res)
  //       // that.setData({
  //       //   guestbookinfo: res.data.guestbookinfo
  //       // })
  //     },
  //     fail: function (res) {
  //       console.log('--------------失败啦----------------')
  //     },
  //   })
  // },




  // 我的留言删除
  myMsgDel: function (event) {
    console.log(event);
    var guestbook_id = event.currentTarget.dataset.guestbookid;
    this.setData({
      guestbook_id: guestbook_id
    })

    var that = this;
    wx.showModal({
      title: '删除',
      content: '是否删除该留言',
      success: function (res) {
        if (res.confirm) {
          that.delMsg()
          that.getMsg()
        }
      }
    })





    // let index = event.currentTarget.dataset.index;
    // console.log(index);
    // console.log(event)

    // let myMsg = this.data.myMsg;

    // myMsg.splice( index , 1)

    // this.setData({
    //   myMsg
    // })
  },





  // 删除留言接口
  delMsg: function () {
    var that = this;
    wx.request({
      // url: 'https://wx.bjjy.com/deleteguestbook',
      url: api.API_DELETEMSG,      
      data: {
        'openid': wx.getStorageSync('openid'),
        source: 'xcx',
        unionid: wx.getStorageSync('unionid'),
        'guestbook_id': that.data.guestbook_id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log('----------留言删除成功啦---------')
      },
      fail: function (res) {
        console.log('----------失败啦---------')
      },
    })
  },





  // 获取上层数据
  onLoad: function (options) {
    var article_id = options.article_id
    this.setData({
      article_id: article_id
    })
    this.getMsg()
  },






  // 获取留言接口
  getMsg: function () {
    var that = this;
    wx.request({
      // url: 'https://wx.bjjy.com/getguestbookbyopenid',
      url: api.API_GETMSG,      
      data: {
        'openid': wx.getStorageSync('openid'),
        source: 'xcx',
        unionid: wx.getStorageSync('unionid'),
        'article_id': that.data.article_id,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log('--------------留言信息获取成功啦----------------')
        console.log(res)
        that.setData({
          guestbookinfo: res.data.guestbookinfo
        })
      },
      fail: function (res) {
        console.log('--------------失败啦----------------')
      },
    })
  },








  /**
   * 生命周期函数--监听页面加载
   */


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})