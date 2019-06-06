// pages/sub_circle/pages/creatCircle/creatCircle.js
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
    isAlready: false,
    labelActive: 0,
    label: [],
    labelText: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 查询可用标签
    this.searchLabel()

    if (options.circle_id) {
      this.setData({
        circle_id: options.circle_id
      })

      // 查询圈子信息
      this.selcetCircleInfo()

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
  // 选择标签
  choseLable(event) {
    console.log(event)
    const name = event.currentTarget.dataset.name,
      labelActive = this.data.labelActive
    let label = this.data.label

    if (labelActive > 5) {
      util._showToast('标签不可以超过5个')
    } else {
      for (let i = 0; i < label.length; i++) {
        if (name == label[i].tag_name) {
          label[i].isActive = !label[i].isActive
        }
      }
      let labelText = []
      for (let k = 0; k < label.length; k++) {
        if (label[k].isActive == true) {
          labelText.push(label[k].tag_name)
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
    const index = event.currentTarget.dataset.index
    let label = this.data.label

    label.splice(index, 1)

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
      } else if (len == 0) {
        util._showToast('请输入')
      } else {
        label.push({
          isLabel: true,
          tag_name: value,
          isActive: true
        })


        let labelText = this.data.labelText

        labelText.push(value)

        this.setData({
          label: label,
          labelText: labelText,
          value: ''
        })


        // 标签大于5个隐藏自定义标签输入框
        this.checklabel()
      }
    }
    // 判断是否全部填写
    this.check()
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
    // 判断是首次创建还是修改
    if (this.data.circle_id) {
      // 修改表单接口
      this.changeSubmit()
    } else {
      // 提交表单接口
      this.submitRequest()
    }
  },


  /**
   * 网络请求
   */

  // 查询可用标签
  searchLabel() {
    http.request({
        url: api.API_SEARCHCIRCLETAGS,
        data: {}
      })
      .then(res => {
        console.log('------------获取到圈子标签了------------')
        console.log(res)
        let label = res.data
        for (let i = 0; i < res.data.length; i++) {
          label[i].isActive = false
        }
        this.setData({
          label: label
        })
      })
  },
  // 查询圈子信息
  selcetCircleInfo() {
    http.request({
        url: api.API_CIRCLEDATA,
        data: {
          user_id: wx.getStorageSync("user_id"),
          circle_id: this.data.circle_id,
        }
      })
      .then(res => {
        console.log('------------查询圈子信息成功------------')
        console.log(res)

        let tags = res.data.circle_tags.split(","),
          label = this.data.label
        for (let i = 0; i < tags.length; i++) {
          for (let j = 0; j < label.length; j++) {
            if (tags[i] == label[j].tag_name) {
              label[j].isActive = true
              tags.splice(i, 1)
            }
          }
          label.push({
            tag_name: tags[i],
            isActive: true,
            isLabel: true,
          })
        }

        this.setData({
          intro: res.data.circle_desc,
          logo: res.data.circle_image.pic_url,
          name: res.data.circle_name,
          labelText: res.data.circle_tags.split(","),
          label: label
        })
      })
  },
  // 提交表单接口
  submitRequest() {
    http.request({
        url: api.API_CREATCIRCLE,
        data: {
          user_id: wx.getStorageSync("user_id"),
          circle_image: this.data.logo,
          circle_name: this.data.name,
          circle_tags: this.data.labelText.toString(),
          circle_desc: this.data.intro,
          source: 'xcx',
        }
      })
      .then(res => {
        console.log('------------创建圈子成功------------')
        console.log(res)
        const circle_id = res.data
        util._showToastSuccess('创建成功')
        wx.redirectTo({
          url: '../circleDetails/circleDetails?circle_id=' + circle_id,
        })
      })
  },


  // 修改表单接口
  changeSubmit() {
    http.request({
        url: api.API_UPDATECIRCLE,
        data: {
          user_id: wx.getStorageSync("user_id"),
          circle_id: this.data.circle_id,
          circle_image: this.data.logo,
          circle_name: this.data.name,
          circle_tags: this.data.labelText.toString(),
          circle_desc: this.data.intro,
        }
      })
      .then(res => {
        console.log('------------修改圈子成功------------')
        console.log(res)
        util._showToastSuccess('修改成功')
      })
  },
})