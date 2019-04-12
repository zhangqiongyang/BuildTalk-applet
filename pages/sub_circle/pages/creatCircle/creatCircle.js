// pages/sub_circle/pages/creatCircle/creatCircle.js

const util = require('../../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isAlready: false,
    labelActive: 0,
    label: [{
        id: 1,
        text: 'BIM',
        isActive: true
      },
      {
        id: 2,
        text: '装配式',
        isActive: true
      },
      {
        id: 3,
        text: '钢结构',
        isActive: false
      },
    ],
    labelText: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
  // 选择标签
  choseLable(event) {
    console.log(event)
    const id = event.currentTarget.dataset.id,
      labelActive = this.data.labelActive
    let label = this.data.label

    if (labelActive > 5) {
      util._showToast('标签不可以超过5个')
    } else {
      for (let i = 0; i < label.length; i++) {
        if (id == label[i].id) {
          label[i].isActive = true
        }
      }
      let labelText = []
      for (let k = 0; k < label.length; k++) {
        if (label[k].isActive == true) {
          labelText.push(label[k].text)
        }
      }
      this.setData({
        label: label,
        labelText: labelText
      })

      // 标签大于5个隐藏自定义标签输入框
      this.checklabel()
    }

    // 判断是否全部填写
    this.check()

  },

  // 删除标签
  deleteLabel(event) {
    console.log(event)
    const id = event.currentTarget.dataset.id
    let label = this.data.label
    for (let i = 0; i < label.length; i++) {
      if (id == label[i].id) {
        label[i].isActive = false
      }
    }
    let labelText = []
    for (let k = 0; k < label.length; k++) {
      if (label[k].isActive == true) {
        labelText.push(label[k].text)
      }
    }
    this.setData({
      label: label,
      labelText: labelText
    })

    console.log(this.data.label)

    // 标签大于5个隐藏自定义标签输入框
    this.checklabel()

    // 判断是否全部填写
    this.check()
  },

  // 标签大于5个隐藏自定义标签输入框
  checklabel() {
    let labelActive = 0,
      label = this.data.label
    for (let j = 0; j < label.length; j++) {
      if (label[j].isActive == true) {
        labelActive++
      }
    }
    this.setData({
      labelActive: labelActive
    })
  },

  // 上传图片
  uploadImage(event) {
    console.log(event)
    this.setData({
      logo: event.detail.imageList
    })
    // 判断是否全部填写
    this.check()
  },

  // 输入
  input(event) {
    console.log(event)
    const type = event.currentTarget.dataset.type,
      value = event.detail.value
    if (type == 'name') {
      this.setData({
        name: value
      })
    } else if (type == 'intro') {
      let len = parseInt(value.length)
      if (len > 200) {
        util._showToast('不能超过200个字符')
      } else {
        this.setData({
          intro: value
        })
      }

    } else if (type == 'label') {
      let label = this.data.label,
        len = parseInt(value.length)
      if (len > 10) {
        util._showToast('不能超过10个字符')
      } else {
        label.push({
          id: Math.random(),
          text: value,
          isActive: true
        })


        let labelText = this.data.labelText

        labelText.push(value)

        this.setData({
          label: label,
          labelText: labelText
        })


        // 标签大于5个隐藏自定义标签输入框
        this.checklabel()
      }
      // 判断是否全部填写
      this.check()

    }
  },

  // 判断是否全部填写
  check() {
    if (!util.isEmpty(this.data.logo) && !util.isEmpty(this.data.labelText) && !util.isEmpty(this.data.name) && !util.isEmpty(this.data.intro)) {
      console.log('-------全部填写-------')
      this.setData({
        isAlready: true
      })
    } else if (util.isEmpty(this.data.logo)) {
      console.log('---------圈子封面未添加---------')
      util._showToast('圈子封面未添加')
      this.setData({
        isAlready: false
      })
    } else if (util.isEmpty(this.data.name)) {
      console.log('---------圈子名称不能为空---------')
      util._showToast('圈子名称不能为空')
      this.setData({
        isAlready: false
      })
    } else if (util.isEmpty(this.data.labelText)) {
      console.log('---------圈子标签不能为空---------')
      util._showToast('圈子标签不能为空')
      this.setData({
        isAlready: false
      })
    } else if (util.isEmpty(this.data.intro)) {
      console.log('---------圈子介绍不能为空---------')
      util._showToast('圈子介绍不能为空')
      this.setData({
        isAlready: false
      })
    }
  },

  // 提交表单
  submit() {

  }

  /**
   * 网络请求
   */
})