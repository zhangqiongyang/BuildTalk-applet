// pages/sub_circle/pages/searchCircle/searchCircle.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isHistory: true,
    isSearchList: false,
    key: '',
    history: [{
        id: 1,
        value: '钢结构'
      },
      {
        id: 1,
        value: 'BIM'
      },
      {
        id: 1,
        value: '模型数据'
      },
      {
        id: 1,
        value: '建筑大数据'
      },
      {
        id: 1,
        value: '建筑大数据'
      },
    ],
    list: [{
        id: 1,
        image: '/image/example.jpg',
        title: '建筑行业工业互联网',
        author: '小地瓜',
        isCourse: true,
        isVip: true,
        label: ['BIM', '模型数据', '中国BIM建筑联盟', '建筑行业工业互联网']
      },
      {
        id: 1,
        image: '/image/example.jpg',
        title: '建筑行业工业互联网',
        author: '小地瓜',
        isCourse: true,
        isVip: false,
        label: ['BIM', '模型数据', '中国BIM建筑联盟', '建筑行业工业互联网']
      },
      {
        id: 1,
        image: '/image/example.jpg',
        title: '建筑行业工业互联网',
        author: '小地瓜',
        isCourse: false,
        isVip: true,
        label: ['BIM', '模型数据', '中国BIM建筑联盟', '建筑行业工业互联网']
      },
      {
        id: 1,
        image: '/image/example.jpg',
        title: '建筑行业工业互联网',
        author: '小地瓜',
        isCourse: false,
        isVip: false,
        label: ['BIM', '模型数据', '中国BIM建筑联盟', '建筑行业工业互联网']
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  /**
   * 方法
   */
  // 搜索
  search(event) {
    console.log(event)
    this.setData({
      key: event.detail.value
    })
  },

  // 清空输入框
  clear() {
    this.setData({
      key: ''
    })
    setTimeout(_ => {
      this.setData({
        key: ''
      })
    }, 300);
  },

  // 取消
  cancel() {
    wx.navigateBack({
      delta: 1,
    })
  },

  // 搜索历史纪录
  searchHistory(event){
    console.log(event)
    const key=event.currentTarget.dataset.value
    this.setData({
      key:key
    })
  },

  // 删除搜索历史
  deleteHistory(){
    wx.showModal({
      title: '是否确认删除',
      showCancel: true,
      cancelText: '取消',
      confirmText: '确认',
      success: (res)=> {
        if (res.confirm) {
          console.log('用户点击确定')
          this.setData({
            history: ''
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    }) 
  }

  /**
   * 网络请求
   */
})