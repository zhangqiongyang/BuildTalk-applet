// components/subject/index.js
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
    subjectInfo: Object, //主题信息
    isJoin: Boolean, //是否加入圈子,显示圈子编辑及留言转发项
  },

  /**
   * 组件的初始数据
   */
  data: {
    isMsg: false,
    page: 1,
    page_count: 1,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 跳转到主题详情页面
    toSubjectDetails() {
      wx.navigateTo({
        url: '../subjectDetails/subjectDetails?theme_id=' + this.properties.subjectInfo.theme_id + '&circle_id=' + this.properties.subjectInfo.circle_id,
      })
    },

    // 切换编辑主题
    changeRedactSubject(event) {
      util.judge(() => {

      this.triggerEvent('changeRedactSubject', {
        theme_id: this.properties.subjectInfo.theme_id
      }, {})
      })
    },

    // 点赞
    like() {
      util.judge(() => {

      // 点赞接口
      this.likeRequest()
      })
    },

    // 打开留言框
    isMsg(event) {
      const type = event.currentTarget.dataset.type
      util.judge(() => {

      if (type == 'open') {
        this.setData({
          isMsg: true
        })
      } else {
        this.setData({
          isMsg: false
        })
      }
      })

    },

    // 输入
    input(event) {
      console.log(event)
      const content = event.detail.value
      this.setData({
        content: content
      })
    },

    // 提交留言
    submit() {
      //提交留言接口
      this.submitRequest()
    },

    // 键盘获取焦点
    textareafocus(event) {
      console.log(event)
      const height = event.detail.height

    },

    // 留言查看更多
    more() {

      // 主题留言
      this.guestbookInfo(Number(this.data.page) + 1)
    },


    /**
     * 网络请求
     */

    //提交留言接口
    submitRequest() {
      http.request({
          url: api.API_SUBJECTMSG,
          data: {
            source: 'xcx',
            user_id: wx.getStorageSync('user_id'),
            theme_id: this.properties.subjectInfo.theme_id,
            content: this.data.content,
          }
        })
        .then(res => {
          console.log('-----------留言提交成功------------')
          console.log(res)


          util._showToastSuccess('提交成功')
          this.setData({
            isMsg: false,
            'subjectInfo.comment_content': res.data.commentInfo
          })
        })
    },

    // 点赞接口
    likeRequest() {
      http.request({
          url: api.API_SUBJECTLIKE,
          data: {
            source: 'xcx',
            user_id: wx.getStorageSync('user_id'),
            data_id: this.properties.subjectInfo.theme_id,
            type_id: 1, //1主题 2评论
          }
        })
        .then(res => {
          console.log('-----------点赞成功------------')
          console.log(res)

          if (this.properties.subjectInfo.is_parise == 0) {
            util._showToastSuccess('点赞成功')

            this.setData({
              'subjectInfo.is_parise': 1,
              'subjectInfo.parise_nickName': res.data.nickName
            })
          } else {
            util._showToastSuccess('取消成功')

            this.setData({
              'subjectInfo.is_parise': 0,
              'subjectInfo.parise_nickName': res.data.nickName
            })
          }

        })
    },

    // 主题留言
    guestbookInfo(page) {
      http.request({
          url: api.API_SUBJECTMSGINFO,
          data: {
            user_id: wx.getStorageSync('user_id'),
            theme_id: this.properties.subjectInfo.theme_id,
            page: page ? page : this.data.page,
            page_size: 10,
          }
        })
        .then(res => {
          console.log('----------留言----------')
          console.log(res)

          let comment = this.properties.subjectInfo.comment_content

          comment.push(res.data.commentInfo)

          this.setData({
            'subjectInfo.comment_content': comment,
            // 'tabbarlist.guestbookNum': res.data.commentInfo.length,
            page: res.data.page,
            page_count: res.data.page_count,
          })

          // 关闭刷新
          wx.hideLoading()
          wx.stopPullDownRefresh()
        })
    },
  }
})