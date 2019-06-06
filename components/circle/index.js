// components/circle/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    circle: Object,
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
    // 跳转到圈子详情
    toCircle(event) {
      const circle_id = event.currentTarget.dataset.id
      wx.navigateTo({
        url: '/pages/sub_circle/pages/circleDetails/circleDetails?circle_id=' + circle_id,
      })
    }
  }
})