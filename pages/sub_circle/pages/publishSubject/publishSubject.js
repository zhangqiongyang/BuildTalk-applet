// pages/sub_circle/pages/publishSubject/publishSubject.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pic: ["/image/example.jpg", "/image/example.jpg", "/image/example.jpg", "/image/example.jpg",
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

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
            let pic=that.data.pic
            pic.push(data.pic_url)
            that.setData({
              pic: pic
            })
          }
        })
      }
    })
  },
  // 输入
  input(event){
    console.log(event)
    const content=event.detail.value
    this.setData({
      content:content
    })
  }
})