// components/master/index.js
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
    master: Object,
    isMineAttention: Boolean,
    isMineFans: Boolean,
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
      const id = event.currentTarget.dataset.id

      // 关注接口
      this.attentionRequest(id)
    },

    // 跳转到圈主详情
    toMasterDetails(event){
      const id = event.currentTarget.dataset.id
      wx.navigateTo({
        url: '/pages/sub_author/pages/masterDetails/masterDetails?user_id=' + id,
      })
    },


    /**
     * 网络请求
     */

    // 关注
    attentionRequest(id) {
      http.request({
          url: api.API_ATTENTION,
          data: {
            examine_user: wx.getStorageSync('user_id'),
            user_id: id,
            source: 'xcx',
          }
        })
        .then(res => {
          console.log('---------关注信息--------')
          console.log(res)
          if (this.properties.master.is_attention == 1) {
            this.setData({
              'master.is_attention': 0
            })
            util._showToastCancel('已取消关注')
          } else {
            this.setData({
              'master.is_attention': 1
            })
            util._showToastSuccess('关注成功')
          }
        })
    },

  }
})