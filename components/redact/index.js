// components/redact/index.js
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
    subjectclassify: Object,
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
    // 切换主题分类弹窗显示
    changeRedactSubject(event) {
      this.triggerEvent('changeRedactSubject', {}, {})
    },

    //修改主题
    change(){
      wx.navigateTo({
        url: '/pages/sub_circle/pages/publishSubject/publishSubject?circle_id=' + this.properties.subjectclassify.circle_id + '&theme_id=' + this.properties.subjectclassify.theme_id,
      })
    },


    //删除主题
    deleteSubject(){
      var that=this
      util._showModal('确认删除主题？','',()=>{
        //删除主题接口
        that.deleteSubjectRequest()
      })
      
    },

    /**
     * 网络请求
     */

    //删除主题接口
    deleteSubjectRequest(){
      http.request({
        url: api.API_DELETESUBJECT,
        data:{
          theme_id: this.properties.subjectclassify.theme_id,
          user_id:wx.getStorageSync('user_id')
        }
      })
      .then(res=>{
        console.log('-----------删除成功----------')
        console.log(res)

        util._showToastSuccess('删除成功')
        
        this.triggerEvent('deleteSubject', {}, {})
      })
    },

    // 收藏接口
    collect(){
      http.request({
        url: api.API_COLLECTSUBJECT,
        data:{
          theme_id: this.properties.subjectclassify.theme_id,
          user_id: wx.getStorageSync('user_id'),
          source:'xcx'
        }
      })
      .then(res=>{
        console.log('----------收藏成功-----------')
        console.log(res)

        if (this.properties.subjectclassify.collect_status == 1){
          this.setData({
            'subjectclassify.collect_status' : 0
          })
          util._showToastSuccess('取消成功')
          this.triggerEvent('collectSubject', {}, {})

        }else{
          this.setData({
            'subjectclassify.collect_status': 1
          })
          util._showToastSuccess('收藏成功')
          this.triggerEvent('collectSubject', {}, {})

        }
      })
    },
  }
})