// components/pay/index.js
const app = getApp();
import {
  HTTP
} from '../../utils/http.js'
let http = new HTTP()
import {
  api
} from '../../utils/api.js'

const util = require('../../utils/util.js')

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    circleInfo:Object,
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
    

    /**
     * 网络请求
     */

    //支付
    pay() {
      http.request({
        url: api.API_BUY,
        data: {
          user_id: wx.getStorageSync("user_id"),
          type_id: 2,//1文章 2课程
          data_id: this.properties.circleInfo.course_id,
          order_name: this.properties.circleInfo.circle_name,
          source: 'xcx',
          order_price: this.properties.circleInfo.course_money
        }
      })
        .then(res => {
          console.log('----------统一下单成功-----------')
          console.log(res)

          util._showToastSuccess('成功加入')

          var that = this
          // 发起支付
          wx.requestPayment({
            timeStamp: res.data.timeStamp,
            nonceStr: res.data.nonceStr,
            package: res.data.package,
            signType: res.data.signType,
            paySign: res.data.paySign,
            success: function(res) {
              console.log('----------支付成功-----------')
              util._showToastSuccess('成功加入')

              that.triggerEvent('pay',{},{})
            },
            fail: function(res) {
              console.log('----------支付失败-----------')
              util._showToastCancel('支付失败')
            },
          })
        })
    }
  }
})
