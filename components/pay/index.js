// components/pay/index.js
const app = getApp();

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
    windowHeight: app.globalData.windowHeight,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 取消
    cancel(){
      this.triggerEvent('cancel', {}, {})

    },

    // 支付
    pay(){
      
    },

  }
})
