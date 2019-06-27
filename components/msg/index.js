// components/msg/index.js
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
    msgList: Array,
    msgLength:Number,
  },

  /**
   * 组件的初始数据
   */
  data: {
    type: 1,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点赞
    changeLike(event) {
      console.log(event)
      const id = event.currentTarget.dataset.id
      util.judge(() => {

        if (this.properties.msgList[0].guestbook_id) {
          this.setData({
            type: 1,
          })
          // 文章留言点赞接口
          this.likeRequestArticle(id)
        } else {
          this.setData({
            type: 2,
          })
          // 主题点赞接口
          this.likeRequestSubject(id)
        }
      })
    },

    //删除留言
    deleteMsg(event) {
      const id = event.currentTarget.dataset.id
      util.judge(() => {

        if (this.properties.msgList[0].guestbook_id) {
          this.setData({
            type: 1,
          })
        } else {
          this.setData({
            type: 2,
          })
        }

        util._showModal('确定删除此留言？', '', () => {
          // 留言删除接口
          this.deleteRequest(id)
        })
      })
    },

    // 文章留言点赞接口
    likeRequestArticle(id) {
      http.request({
          url: api.API_UPLOADMSGLIKE,
          data: {
            source: 'xcx',
            user_id: wx.getStorageSync('user_id'),
            guestbook_id: id,
          }
        })
        .then(res => {
          console.log('-----------留言点赞成功------------')
          console.log(res)

          const msgList = this.properties.msgList
          for (let i = 0; i < msgList.length; i++) {
            if (id == msgList[i].guestbook_id) {
              if (msgList[i].isPraise == 1) {
                msgList[i].isPraise = 0
                msgList[i].countpraise = Number(msgList[i].countpraise) - 1
              } else {
                msgList[i].isPraise = 1
                msgList[i].countpraise = Number(msgList[i].countpraise) + 1
              }
            }
          }
          this.setData({
            msgList: msgList
          })
        })
    },


    // 主题点赞接口
    likeRequestSubject(id) {
      http.request({
          url: api.API_SUBJECTLIKE,
          data: {
            source: 'xcx',
            user_id: wx.getStorageSync('user_id'),
            data_id: id,
            type_id: 1, //1主题 2评论
          }
        })
        .then(res => {
          console.log('-----------点赞成功------------')
          console.log(res)

          const msgList = this.properties.msgList
          for (let i = 0; i < msgList.length; i++) {
            if (id == msgList[i].comment_id) {
              if (msgList[i].isPraise == 1) {
                msgList[i].isPraise = 0
                msgList[i].countpraise = Number(msgList[i].countpraise) - 1
              } else {
                msgList[i].isPraise = 1
                msgList[i].countpraise = Number(msgList[i].countpraise) + 1
              }
            }
          }
          this.setData({
            msgList: msgList
          })
        })
    },


    // 留言删除接口
    deleteRequest(id) {
      http.request({
          url: api.API_SUBJECTMSGDELETE,
          data: {
            user_id: wx.getStorageSync('user_id'),
            guestbook_id: id,
            type: this.data.type, // 1 新闻、文章 2主题
          }
        })
        .then(res => {
          console.log('-----------留言删除成功------------')
          console.log(res)

          const msgList = this.properties.msgList

          if (this.data.type == 1) {
            for (let i = 0; i < msgList.length; i++) {
              if (id == msgList[i].guestbook_id) {
                msgList.splice(i, 1)
              }
            }
          } else {
            for (let i = 0; i < msgList.length; i++) {
              if (id == msgList[i].comment_id) {
                msgList.splice(i, 1)
              }
            }
          }

          this.setData({
            msgList: msgList
          })
        })
    },

  }
})