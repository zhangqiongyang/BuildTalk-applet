// components/tabbar/index.js
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
    list: Object,
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
    input(event) {
      console.log(event)
      const value = event.detail.value
      this.setData({
        isMsg: true,
        value: value
      })
    },

    submit(id) {

      this.triggerEvent('uploadmsg', {
        value: this.data.value
      }, {})

      this.setData({
        value: '',
        isMsg: false
      })
    },

    // 点赞
    like(event) {

      if (this.properties.list.isArticle) {
        // 文章点赞接口
        this.likeRequestArticle()
      } else {
        // 主题点赞接口
        this.likeRequestSubject()
      }

    },
    // 文章点赞网络请求
    likeRequestArticle() {
      http.request({
          url: api.API_UPLOADARTICLLIKE,
          data: {
            source: 'xcx',
            user_id: wx.getStorageSync('user_id'),
            article_id: this.properties.list.article_id,
          }
        })
        .then(res => {
          console.log('-----------留言点赞成功------------')
          console.log(res)
          const list = this.properties.list
          if (list.isCollect == 1) {
            list.isCollect = 0
            list.countCollect = Number(list.countCollect) - 1
            util._showToastSuccess('取消成功')

          } else {
            list.isCollect = 1
            list.countCollect = Number(list.countCollect) + 1
            util._showToastSuccess('点赞成功')
          }
          this.setData({
            list: list
          })
        })
    },

    // 主题点赞接口
    likeRequestSubject() {
      http.request({
          url: api.API_SUBJECTLIKE,
          data: {
            source: 'xcx',
            user_id: wx.getStorageSync('user_id'),
            data_id: this.properties.list.article_id,
            type_id: 1, //1主题 2评论
          }
        })
        .then(res => {
          console.log('-----------点赞成功------------')
          console.log(res)

          const list = this.properties.list
          if (list.isCollect == 1) {
            list.isCollect = 0
            list.countCollect = Number(list.countCollect) - 1
            util._showToastSuccess('取消成功')

          } else {
            list.isCollect = 1
            list.countCollect = Number(list.countCollect) + 1
            util._showToastSuccess('点赞成功')
          }
          this.setData({
            list: list
          })
        })
    },
  }
})