// pages/address/address.js

var app = getApp();
const util = require('../../../../utils/util.js')
const api = require('../../../../utils/api.js');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    placeholder_name:'收货人',
    placeholder_phone:'手机号码',
    placeholder_address:'详细地址',
    recevinginfo:'',
    isNotName: false,
    isNotPhone: false,
    isNotAddress: false,
    windowHeight: app.globalData.windowHeight + 48,
  },




  writeNameFinish(event) {
    console.log(event)
    var value = event.detail.value;
    if (value == '') {
      console.log('-------------值为空-------------')
      this.setData({
        isNotName: true
      })
    } else {
      console.log('-------------值不为空-------------')
      this.setData({
        isNotName: false,
        'recevinginfo.consignee': value,
        placeholder_name:'请输入收货人姓名'
      })
    }
    console.log('------------修改的名字-------------')
    console.log(this.data.recevinginfo.consignee)
  },
  writePhoneFinish(event) {
    console.log(event)
    var value = event.detail.value;
    if (value == '') {
      console.log('-------------值为空-------------')
      this.setData({
        isNotPhone: true
      })
    } else {
      console.log('-------------值不为空-------------')
      this.setData({
        isNotPhone: false,
        'recevinginfo.telephone': value,
        placeholder_phone: '请输入手机号码'
      })
    }
  },
  writeAddressFinish(event) {
    console.log(event)
    var value = event.detail.value;
    if (value == '') {
      console.log('-------------值为空-------------')
      this.setData({
        isNotAddress: true
      })
    } else {
      console.log('-------------值不为空-------------')
      this.setData({
        isNotAddress: false,
        'recevinginfo.address': value,
        placeholder_address: '请输入详细地址'        
      })
    }
  },




  submit() {
    var that = this;
    if (!util.isEmpty(this.data.recevinginfo.consignee) && !util.isEmpty(this.data.recevinginfo.telephone) && !util.isEmpty(this.data.recevinginfo.address)) {
      console.log('----------上传收货信息-------------')
      console.log(wx.getStorageSync('openid'))

      wx.request({
        // url: 'https://wx.bjjy.com/saveRecevingAddress',
        url: api.API_UPLOADADDRESS,        
        data: {
          'openid': wx.getStorageSync('openid'),
          source: 'xcx',
          unionid: wx.getStorageSync('unionId'),
          'consignee': that.data.recevinginfo.consignee,
          'telephone': that.data.recevinginfo.telephone,
          'address': that.data.recevinginfo.address
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        dataType: 'json',
        responseType: 'text',
        success: function(res) {
          console.log('-----------收货信息上传成功了-------------')
        },
        fail: function(res) {
          console.log('-----------收货信息上传失败了-------------')
        },
      })
      wx.showToast({
        title: '保存成功',
        success: function(res) {},
      })



      console.log('------------ 获取全局变量----------------')
      console.log(app.globalData.recevinginfo)

      app.globalData.recevinginfo.consignee = that.data.recevinginfo.consignee
      app.globalData.recevinginfo.telephone = that.data.recevinginfo.telephone
      app.globalData.recevinginfo.address = that.data.recevinginfo.address

      console.log('------------ 获取全局变量----------------')
      console.log(app.globalData.recevinginfo)







      wx.navigateBack({
        delta: 1,
      })



    } else if (util.isEmpty(this.data.recevinginfo.consignee)) {
      this.setData({
        isNotName: true
      })
    } else if (util.isEmpty(this.data.recevinginfo.telephone)) {
      this.setData({
        isNotPhone: true
      })
    } else if (util.isEmpty(this.data.recevinginfo.address)) {
      this.setData({
        isNotAddress: true
      })
    }
  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;


    // this.updateData();

    // 获取收货地址信息
    wx.request({
      // url: 'https://wx.bjjy.com/searchRecevingAddress',
      url: api.API_GETADDRESS,
      data: {
        'openid': wx.getStorageSync('openid'),
        source: 'xcx',
        unionid: wx.getStorageSync('unionId')
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {

        if (res.data.msg == '0') {
          console.log('------------获取到收货信息了------------')
          console.log(res)
          that.setData({
            recevinginfo: res.data.recevinginfo
          })
        } else {
          console.log('-----------没有收货地址---------------')
        }

      },
      fail: function(res) {
        console.log('------------失败了------------')
      },
    })
  },






  updateData: function() {
    // console.log('------------修改的名字-------------')
    // console.log(this.data.name)
    // var that = this;
    // var pages = getCurrentPages();
    // var prevPage = pages[pages.length - 2];
    // prevPage.setData({
    //   recevinginfo: that.data.name,
    //   'recevinginfo.telephone': that.data.phone,
    //   'recevinginfo.address': that.data.address
    // })

  },









  /**
   * 生命周期函数--监听页面初次渲染完成
   */
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