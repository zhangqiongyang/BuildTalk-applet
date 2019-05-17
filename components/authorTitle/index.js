// components/authorTitle/index.js
const util = require('../../utils/util.js');

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    authorInfo: Object,
    isAuthor: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 关注
    attention(event) {
      console.log(event)
      util._showToastSuccess("已关注此大咖")
      this.setData({
        'authorInfo.isAttention': !this.properties.authorInfo.isAttention
      })
    },

    //取消关注
    cancelAttention() {
      util._showModal('确定退出此圈子？', '')
      util._showToastCancel("已取消关注此大咖")
      this.setData({
        'authorInfo.isAttention': !this.properties.authorInfo.isAttention
      })
    },

    //跳转到圈子
    toCirlce() {
      wx.navigateTo({
        url: '../circle/circle',
      })
    },

    //跳转到粉丝
    toFans() {
      wx.navigateTo({
        url: '../fans/fans',
      })
    },

    //跳转到收藏
    toCollect() {
      wx.navigateTo({
        url: '../collect/collect',
      })
    },

    //跳转到关注
    toAttention() {
      wx.navigateTo({
        url: '../attention/attention',
      })
    },
  }
})