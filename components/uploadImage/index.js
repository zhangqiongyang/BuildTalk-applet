// components/uploadImage/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    pic:String,
  },

  /**
   * 组件的初始数据
   */
  data: {
    pic:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 上传图片
    upload(){
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
              that.setData({
                pic: data.pic_url
              })


              that.triggerEvent('uploadImage', {
                imageList: that.data.pic
              }, {})

            }
          })
        }
      })
    }
  }
})
