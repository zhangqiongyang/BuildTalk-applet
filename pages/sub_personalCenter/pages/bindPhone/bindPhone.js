// pages/phone/phone.js
import {
  HTTP
} from '../../../../utils/http.js'
let http = new HTTP()
import {
  api
} from '../../../../utils/api.js'

const util = require('../../../../utils/util.js')
var app = getApp();

const phoneRexp = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    quhao: ['86', "886", "852", "853"],
    current: '86',
    isSellect: false,
    windowHeight: app.globalData.windowHeight - 1,
    isGetCode: false,
    countDown: '300',
    btnText: '获取验证码',
    formData: {
      phone: '',
      code: ''
    },
    type: 1,
  },






  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.type == 2) {
      this.setData({
        type: 2
      })
    }
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

  //选择国际区号
  seeCode() {
    this.setData({
      isSellect: true
    })
  },

  //选择国际区号
  choseCode(event) {
    console.log(event)
    const index = event.currentTarget.dataset.index
    const current = this.data.quhao[index]
    this.setData({
      current: current,
      isSellect: false
    })
  },
  // 键盘输入事件
  input(event) {
    // console.log(event)
    var that = this;
    var formData = this.data.formData,
      inputType = event.target.dataset.id,
      inputValue = event.detail.value;
    inputType === 'phone' ? formData.phone = inputValue : formData.code = inputValue;
    this.setData({
      formData: formData
    })
    if (!this.data.formData.phone == '') {
      this.setData({
        isHavePhone: true
      })
    } else {
      this.setData({
        isHavePhone: false
      })
    }

    if (!this.data.formData.phone == '' && !this.data.formData.code == "") {
      this.setData({
        isHaveAllNum: true
      })
    } else {
      this.setData({
        isHaveAllNum: false
      })
    }
    console.log(this.data.formData)
  },


  // 表单提交
  formSubmit(event) {
    let errMsg = '';
    if (!this.data.formData.phone) {
      errMsg = '手机号不能为空'
    } else if (!this.data.formData.code) {
      errMsg = '验证码不能为空'
    } else if (this.data.formData.phone) {
      if (!phoneRexp.test(this.data.formData.phone)) {
        errMsg: '手机号格式错误！'
      }
    }
    if (errMsg) {
      util._showToast(errMsg);
      return false;
    }

    // 验证手机号验证码
    this.checkCode()

  },




  // 获取手机验证码
  getPhoneCode() {
    let that = this;
    let formdata = this.data.formData,
      errMsg = '';
    errMsg = !formdata.phone ? '手机号不能为空' : formdata.phone && !phoneRexp.test(formdata.phone) ? '手机号格式错误！' : '';
    if (errMsg) {
      util._showToast(errMsg)
      return false
    }
    this.timer();

    //调用发送短信接口
    this.sendSms();


    that.setData({
      isGetCode: true
    })
  },




  // 验证码倒计时
  timer() {
    let that = this;
    let countDown = this.data.countDown;
    let clock = setInterval(() => {
      countDown--;
      if (countDown >= 0) {
        that.setData({
          countDown: countDown
        })
      } else {
        clearInterval(clock)
        that.setData({
          isGetCode: false,
          btnText: '重新获取',
          countDown: '300'
        })
      }
    }, 1000)
  },



  /**
   * 网络请求接口
   */

  //发送短信接口
  sendSms() {
    http.request({
        url: api.API_SENDCODE,
        data: {
          mobile: this.data.formData.phone
        }
      })
      .then(res => {
        console.log('-------短信发送成功-------')
      })
  },




  //提交
  checkCode() {
    http.request({
        url: api.API_GETCODE,
        data: {
          mobile: this.data.formData.phone,
          checkCode: this.data.formData.code,
          source: 'xcx',
          login_id: wx.getStorageSync('login_id'),
          type: this.data.type, //1绑定手机 2更改手机号
          headImage: this.data.type==1?app.globalData.userInfo.avatarUrl:'',
          nickName: this.data.type == 1 ? app.globalData.userInfo.nickName : '',
        }
      })
      .then(res => {
        console.log('---------绑定成功，获取到信息了----------')
        console.log(res)

        wx.setStorageSync("user_id", res.data.user_id) //用户id
        wx.setStorageSync("headImage", res.data.headImage) //用户头像
        wx.setStorageSync("nickName", res.data.nickName) //用户昵称
        wx.setStorageSync("mobile", this.data.formData.phone) //手机号

        app.globalData.isHavePhone = true
        app.globalData.mobile = this.data.formData.phone
        app.globalData.headImage = res.data.headImage
        app.globalData.nickName = res.data.nickName
        app.globalData.user_id = res.data.user_id
        wx.setStorageSync('user_id', res.data.user_id)

        util._showToastSuccess("绑定成功")

        wx.navigateBack({
          delta: 1,
        })

      })
      .catch(err => {
        console.log('------------绑定失败------------')
        console.log(err)
        util._showToastCancel(err.errorMsg)
      })
  },





})