var app = getApp();


Page({
  data: {
    info: '123',
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 500,
    // indexpicinfo: [{
    //     pic_url: '/image/index1.jpg'
    //   },
    //   {
    //     pic_url: '/image/index2.jpg'
    //   },
    //   {
    //     pic_url: '/image/index3.jpg'
    //   }

    // ],
    articleinfo: '',
    // newsList: [
    //   '技术交流 | 装配式铝模板施工工法',
    //   'BIM的5项国家标准',
    //   '当中国尊遇见BIM+FM，怎一个“爽”字了得',
    //   'BIM技术在施工过程中如何应用？'
    // ],
    // High_quality_goods_column: [{
    //     courseName: '虚拟建造',
    //     coursePrice: '$199/156期',
    //     courseIntroduce: '经济可控，进度可控、质量可控.',
    //     authorImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1536922334516&di=7de0e765464e8853066d887d130ff187&imgtype=0&src=http%3A%2F%2Fcdn.lizhi.fm%2Fradio_cover%2F2014%2F06%2F11%2F12222407220472452.jpg',
    //     authorName: '洪亮',
    //     authorPosition: '虚拟建造主管'
    //   },
    //   {
    //     courseName: 'BIM协同',
    //     coursePrice: '$199/156期',
    //     courseIntroduce: 'BIM协同，BIM协同，BIM协同',
    //     authorImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1536922334516&di=7de0e765464e8853066d887d130ff187&imgtype=0&src=http%3A%2F%2Fcdn.lizhi.fm%2Fradio_cover%2F2014%2F06%2F11%2F12222407220472452.jpg',
    //     authorName: '洪亮',
    //     authorPosition: 'BIM协同主管'
    //   },
    //   {
    //     courseName: 'ai技术内参',
    //     coursePrice: '$199/156期',
    //     courseIntroduce: '你的360度人工智能信息处理',
    //     authorImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1536922334516&di=7de0e765464e8853066d887d130ff187&imgtype=0&src=http%3A%2F%2Fcdn.lizhi.fm%2Fradio_cover%2F2014%2F06%2F11%2F12222407220472452.jpg',
    //     authorName: '洪亮',
    //     authorPosition: '数据科学主管'
    //   },
    //   {
    //     courseName: 'ai技术内参',
    //     coursePrice: '$199/156期',
    //     courseIntroduce: '你的360度人工智能信息处理',
    //     authorImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1536922334516&di=7de0e765464e8853066d887d130ff187&imgtype=0&src=http%3A%2F%2Fcdn.lizhi.fm%2Fradio_cover%2F2014%2F06%2F11%2F12222407220472452.jpg',
    //     authorName: '洪亮',
    //     authorPosition: '数据科学主管'
    //   },
    //   {
    //     courseName: 'ai技术内参',
    //     coursePrice: '$199/156期',
    //     courseIntroduce: '你的360度人工智能信息处理',
    //     authorImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1536922334516&di=7de0e765464e8853066d887d130ff187&imgtype=0&src=http%3A%2F%2Fcdn.lizhi.fm%2Fradio_cover%2F2014%2F06%2F11%2F12222407220472452.jpg',
    //     authorName: '洪亮',
    //     authorPosition: '数据科学主管'
    //   }
    // ],
    // courseList: [{
    //     teacherImg: '/image/teacher.jpg',
    //     courseName: '专业Revit课程45讲',
    //     CourseIntroduce: '掌握当下最热门的利器',
    //     teacherName: '王沛',
    //     teacherPosition: 'Ravit资深技术专家',
    //     courseTime: '45课时·约560分钟',
    //     coursePrice: '199'
    //   },
    //   {
    //     teacherImg: '/image/teacher2.jpg',
    //     courseName: 'ArchiCAD课程95讲',
    //     CourseIntroduce: 'ArchiCAD',
    //     teacherName: '洪亮',
    //     teacherPosition: 'ArchiCAD资深技术专家',
    //     courseTime: '95课时·约900分钟',
    //     coursePrice: '299'
    //   },
    //   {
    //     teacherImg: '/image/teacher3.jpg',
    //     courseName: 'BIM实战进阶28讲',
    //     CourseIntroduce: '掌握当下最热门的建筑利器',
    //     teacherName: '高山',
    //     teacherPosition: 'BIM中国研发中心资深技术专家',
    //     courseTime: '28课时·约280分钟',
    //     coursePrice: '399'
    //   }
    // ],
    // bookList: [{
    //     bookImg: '/image/book.jpg',
    //     bookName: '《BIM建造》',
    //     bookPrice: '43'
    //   },
    //   {
    //     bookImg: '/image/book.jpg',
    //     bookName: '《虚拟建造》',
    //     bookPrice: '22'
    //   },
    //   {
    //     bookImg: '/image/book.jpg',
    //     bookName: '《BIM协同》',
    //     bookPrice: '48'
    //   },
    //   {
    //     bookImg: '/image/book.jpg',
    //     bookName: '《BIM》',
    //     bookPrice: '23'
    //   },
    //   {
    //     bookImg: '/image/book.jpg',
    //     bookName: '《BIM》',
    //     bookPrice: '43'
    //   },
    //   {
    //     bookImg: '/image/book.jpg',
    //     bookName: '《BIM》',
    //     bookPrice: '43'
    //   },
    //   {
    //     bookImg: '/image/book.jpg',
    //     bookName: '《BIM》',
    //     bookPrice: '43'
    //   }
    // ],
    hotItem: [
      {
        image: '/image/activity.png',
        label:'建筑互联网大会'
      },
      {
        image: '/image/hotTopic.jpg',
        label: '热点'
      },
      {
        image: '/image/hotTopic.jpg',
        label: '热点'
      },
      {
        image: '/image/hotTopic.jpg',
        label: '热点'
      },
      {
        image: '/image/hotTopic.jpg',
        label: '热点'
      },
    ],
    // hotItem: [
    //   '/image/activity.png',
    //   '/image/hotTopic.jpg',
    //   '/image/hotTopic.jpg',
    //   '/image/hotTopic.jpg',
    //   '/image/hotTopic.jpg',
    //   '/image/hotTopic.jpg',
    //   '/image/hotTopic.jpg'
    // ],
    // videoItem: [{
    //     videoImg: '/image/video.jpg',
    //     videoName: 'BIM工程师：BIM的20种典型应用',
    //     videoAuthor: '卢林'
    //   },
    //   {
    //     videoImg: '/image/video.jpg',
    //     videoName: 'BIM工程师：BIM的20种典型应用',
    //     videoAuthor: '卢林'
    //   },
    //   {
    //     videoImg: '/image/video.jpg',
    //     videoName: 'BIM工程师：BIM的20种典型应用',
    //     videoAuthor: '卢林'
    //   },
    //   {
    //     videoImg: '/image/video.jpg',
    //     videoName: 'BIM工程师：BIM的20种典型应用',
    //     videoAuthor: '卢林'
    //   },
    //   {
    //     videoImg: '/image/video.jpg',
    //     videoName: 'BIM工程师：BIM的20种典型应用',
    //     videoAuthor: '卢林'
    //   },
    //   {
    //     videoImg: '/image/video.jpg',
    //     videoName: 'BIM工程师：BIM的20种典型应用',
    //     videoAuthor: '卢林'
    //   }
    // ]
  },








  // 跳转到搜索页
  jumpToSearch: function() {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },




  // 轮播图跳转到相应页面
  jumpToActivityBanner(event){
    console.log(event)
    var id = event.currentTarget.dataset.id;

    if (id == '21') {
      wx.navigateTo({
        url: '/pages/sub_browse/pages/activity/activity',
      })
    }
  },



  // 跳转到查看全部课程
  jumpToAllCourse: function() {
    wx: wx.navigateTo({
      url: "/pages/sub_browse/pages/AllCourse/AllCourse"
    })
    // wx.switchTab({
    //   url: '../../pages/AllCourse/AllCourse',
    // })
  },

  // 跳转到查看全部作者
  jumpToAllAuthor() {
    wx.switchTab({
      url: '/pages/tabbar/allAuthor/allAuthor',
    })
  },








  // 跳转到课程相应页面
  jumpToList: function(event) {
    var that = this;
    // console.log(event);

    var course_id = event.currentTarget.dataset.courseid;

    // console.log('课程id' + course_id)
    // console.log('openid' + '    ' + wx.getStorageSync('openid'))
    if (app.globalData.isLogin) {
      wx.request({
        url: 'https://wx.bjjy.com/courselistinfo',
        data: {
          'openid': wx.getStorageSync('openid'),
          'course_id': course_id
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        dataType: 'json',
        responseType: 'text',
        success: function(res) {
          console.log('------------这里是res--------------')
          console.log(res)
          if (res.data.msg == '1') {
            console.log('---------已经购买了------------')
            wx: wx.navigateTo({
              url: "/pages/sub_browse/pages/list/list?course_id=" + course_id
            })
          } else {
            console.log('---------还未购买------------')
            wx: wx.navigateTo({
              url: "/pages/sub_browse/pages/buy/buy?course_id=" + course_id
            })
          }
        },
      })
    } else {
      wx.showModal({
        title: '未登录',
        content: '请先登录',
        showCancel: true,
        cancelText: '取消',
        confirmText: '确定',
        success: function(res) {
          wx.switchTab({
            url: '/pages/tabbar/mine/mine',
          })
        },
        fail: function(res) {},
      })
    }

  },


  // 跳转到作者相应页面
  jumpToAuthor(event){
    // console.log(event)
    var author_id = event.currentTarget.dataset.author_id

    wx.navigateTo({
      url: '/pages/sub_browse/pages/author/author?author_id=' + author_id,
    })
  },



  // 跳转到作者标签搜索页
  jumpToSearchLabel(event){
    // console.log('-------------标签--------------------')
    // console.log(event)
    var label = event.currentTarget.dataset.label


    wx.navigateTo({
      url: '/pages/search/search?label=' + label,
    })
  },



  // 跳转到热点专题相应页面
  jumpToActivity(event){
    // console.log(event)
    var label = event.currentTarget.dataset.label;

    if(label == '建筑互联网大会'){
      wx.navigateTo({
        url: '/pages/sub_browse/pages/activity/activity',
      })
    }
  },




  onLoad: function() {

    console.log('----------index 打印openid-------------')
    console.log(wx.getStorageSync('openid'))




    // 查询首页推荐轮播图
    wx.request({
      url: 'https://wx.bjjy.com/getindexpic',
      data: {},
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log('-------------首页轮播图------------------')
        console.log(res)
        that.setData({
          indexpicinfo: res.data.indexpicinfo
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })





    // 查询首页上精品推荐的课程接口
    var that = this;
    wx.request({
      url: 'https://wx.bjjy.com/getindexinfo',
      data: {

      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log('-------------首页视频推荐课程数据-----------------')
        console.log(res)
        that.setData({
          courseinfo: res.data.courseinfo
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })



    // 获取推荐作者信息接口
    wx.request({
      url: 'https://wx.bjjy.com/searchrecommendauthor',
      data: '',
      header: {
        'content-type': 'application/x-www-form-urlencoded'        
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log('-----------首页推荐作者信息--------------------')
        console.log(res)
        that.setData({
          authorinfo: res.data.authorinfo
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })




    // console.log('----------------------------------')
    // console.log(JSON.stringify)
  },


  onShow() {
    // console.log(this.data.info)
  },


  onReady: function() {
    // wx.getSystemInfo({
    //   success: function (res) {
    //     console.log('--------------获取系统信息，获取屏幕高度---------------')
    //     console.log(res)
    //   },
    //   fail: function (res) { },
    //   complete: function (res) { },
    // })
  },


})