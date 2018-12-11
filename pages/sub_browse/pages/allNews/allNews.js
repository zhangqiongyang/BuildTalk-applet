// pages/sub_browse/pages/allNews/allNews.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isFirstOpen:true,
    authorinfo:{
      author_pic: "http://wx.bjjy.com/static/image/zhangming.png",
      author_name: "谈小建",
      author_desc: "建谈负责人",
      author_id:88
    },
    newsList:[
      {
        newsNum:'第一期',
        newsTitle:'我们能从奈飞学到什么？',
        newsTime:'16小时前',
        newsLearned:'16565人学过',
        article_id:11
      },
      {
        newsNum: '第二期',
        newsTitle: '不赚钱的项目都是耍流氓吗',
        newsTime: '16小时前',
        newsLearned: '16565人学过',
        article_id: 12
      },
      {
        newsNum: '第三期',
        newsTitle: '唐诗为什么值得你花时间',
        newsTime: '16小时前',
        newsLearned: '16565人学过',
        article_id: 13
      },
      {
        newsNum: '第四期',
        newsTitle: '老干妈为什么不上市',
        newsTime: '16小时前',
        newsLearned: '16565人学过',
        article_id: 14
      },
      {
        newsNum: '第五期',
        newsTitle: '建造迪士尼难在哪里',
        newsTime: '16小时前',
        newsLearned: '16565人学过',
        article_id: 15
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },


  changeFirstOpen(event){
    this.setData({
      isFirstOpen: !this.data.isFirstOpen
    })
  },


  // 跳转到作者详情页面
  jumpToAuthorDesc(event){
    console.log(event);
    let author_id = event.currentTarget.dataset.author_id;
    console.log(author_id);
    wx.navigateTo({
      url: '/pages/sub_browse/pages/authorDesc/authorDesc?author_id=' + author_id,
    })
  },

  // 跳转到文章页面
  jumpToArticle(event){
    console.log(event);
    let article_id = event.currentTarget.dataset.article_id;
    console.log(article_id)
    wx.navigateTo({
      url: '/pages/sub_browse/pages/video/video?article_id=' + article_id ,
    })
  },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})