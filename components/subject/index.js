// components/subject/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    subjectInfo: Object, //主题信息
    isJoin: Boolean, //是否加入圈子,显示圈子编辑及留言转发项
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
    // 切换编辑主题
    changeRedactSubject(event) {
      // console.log(event)

      this.triggerEvent('changeRedactSubject', {}, {})
    },
  }
})