// components/authorTitle/index.js
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
      const id = event.currentTarget.dataset.id
      util.judge(() => {

      // 关注接口
      this.attentionRequest(id)
      })
    },


    //跳转到圈子
    toCirlce(event) {
      console.log(event)
      const id = event.currentTarget.dataset.id

      wx.navigateTo({
        url: '../circle/circle?user_id='+id + '&name='+this.properties.authorInfo.name,
      })
    },

    //跳转到粉丝
    toFans(event) {
      console.log(event)
      const id = event.currentTarget.dataset.id

      wx.navigateTo({
        url: '../fans/fans?user_id=' + id + '&name=' + this.properties.authorInfo.name,
      })
    },

    //跳转到收藏
    toCollect(event) {
      console.log(event)
      const id = event.currentTarget.dataset.id

      wx.navigateTo({
        url: '../collect/collect?user_id=' + id + '&name=' + this.properties.authorInfo.name,
      })
    },

    //跳转到关注
    toAttention(event) {
      console.log(event)
      const id = event.currentTarget.dataset.id

      wx.navigateTo({
        url: '../attention/attention?user_id=' + id + '&name=' + this.properties.authorInfo.name,
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
          if (this.properties.authorInfo.is_attention == 1) {
            this.setData({
              'authorInfo.is_attention': 0
            })
            util._showToastCancel('已取消关注')
          } else {
            this.setData({
              'authorInfo.is_attention': 1
            })
            util._showToastSuccess('关注成功')
          }
        })
    },

  }
})