// components/tabbar/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    isMsg: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 评论
    input() {
      this.setData({
        isMsg: true
      })
    },

    linechange(event) {
      console.log(event)
      const lineCount = event.detail.lineCount
    }
  }
})