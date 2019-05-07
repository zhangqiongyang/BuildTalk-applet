// pages/sub_circle/pages/subjectDetails/subjectDetails.js

// var utilMd5 = require('./utils/md5.js');
// var password = utilMd5.hexMD5(password); 
import {
  md5
} from "../../../../utils/md5.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msgList: [{
        id: 1,
        image: '/image/example.jpg',
        name: '小地瓜',
        isMaster: true,
        time: '2019-01-13 12:30:09',
        isLike: true,
        likeNum: 4,
        content: '我也有同类的资源，在我网盘里大家可以下载浏览哦，网址：链接: https://pan.baidu.com/s/1Z9Inl0LNa6zGIDXUgmGnhw  密码: l6ag'
      },
      {
        id: 1,
        image: '/image/example.jpg',
        name: '小地瓜',
        isMaster: false,
        time: '2019-01-13 12:30:09',
        isLike: true,
        likeNum: 3,
        content: '一点新素材希望能帮到大家'
      },
      {
        id: 1,
        image: '/image/example.jpg',
        name: '小地瓜',
        isMaster: false,
        time: '2019-01-13 12:30:09',
        isLike: false,
        likeNum: 45,
        content: '我也有同类的资源，在我网盘里大家可以下载浏览哦，网址：链接: https://pan.baidu.com/s/1Z9Inl0LNa6zGIDXUgmGnhw  密码: l6ag'
      },
    ],
    subjectInfo: {
      name: '小地瓜',
      photo: '/image/example.jpg',
      isMaster: true,
      time: '2019-01-13 12:30:09',
      content: '今年流行的几种装修材料',
      imageList: ['/image/example.jpg', '/image/example.jpg', '/image/example.jpg', '/image/example.jpg'],
      liked: [{
          name: '傲慢 & 偏见',
          isVip: false
        },
        {
          name: '建筑大师的大师',
          isVip: true
        },
        {
          name: '我是你兄弟',
          isVip: false
        },
        {
          name: '辛德瑞拉',
          isVip: true
        },
        {
          name: '心语心愿',
          isVip: false
        }
      ],
      
    },
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

  }
})