// components/msg/index.js
import {
  HTTP
} from '../../utils/http.js'
let http = new HTTP()
import {
  api
} from '../../utils/api.js'

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    msgList: Array
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    // 点赞
    changeLike(event) {
      console.log(event)
      const id = event.currentTarget.dataset.id

      if (this.properties.msgList.guestbook_id){
        // 文章留言点赞接口
        this.likeRequestArticle(id)
      }else{
        // 主题点赞接口
        this.likeRequestSubject(id)
      }
      
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

          // const list = this.properties.list
          // if (list.isCollect == 1) {
          //   list.isCollect = 0
          //   list.countCollect = Number(list.countCollect) - 1
          //   util._showToastSuccess('取消成功')

          // } else {
          //   list.isCollect = 1
          //   list.countCollect = Number(list.countCollect) + 1
          //   util._showToastSuccess('点赞成功')
          // }
          // this.setData({
          //   list: list
          // })

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
    
  }
})