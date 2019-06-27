// components/author/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    author:Object
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
    // 跳转到大咖详情
    toAuthorDetails(event){
      const id=event.currentTarget.dataset.id
      wx.navigateTo({
        url: '/pages/sub_author/pages/authorDetails/authorDetails?author_user_id='+id,
      })
    }
  }
})
