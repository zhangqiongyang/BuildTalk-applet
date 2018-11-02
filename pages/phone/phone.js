// pages/phone/phone.js

var app = getApp();
const util = require('../../utils/util.js')


const phoneRexp = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowHeight: app.globalData.windowHeight,
    isGetCode: false,
    countDown:'60',
    btnText:'获取验证码',
    formData : {
      phone:'',
      code:''
    }
  },

  // 键盘输入事件
  input(event){
    // console.log(event)
    var that = this;
    var formData = this.data.formData,
        inputType = event.target.dataset.id,
        inputValue = event.detail.value;
    inputType === 'phone' ? formData.phone = inputValue : formData.code = inputValue;
    this.setData({
      formData : formData
    })
    console.log(this.data.formData)
  },





  // 表单提交
  formSubmit(event){
    let that = this;
    let formData = event.detail.value,
        errMsg = '';
    if(!formData.phone){
      errMsg = '手机号不能为空'
    }else if(!formData.code){
      errMsg = '验证码不能为空'
    }else if(formData.phone){
      if(!phoneRexp.test(formData.phone)){
        errMsg : '手机号格式错误！'
      }
    }
    if(errMsg){
      util._showToast(errMsg);
      return false;
    }





    // 验证手机号验证码





  },




  // 获取手机验证码
  getPhoneCode(){
    let that = this;
    let formdata = this.data.formData,
        errMsg = '';
    errMsg = !formdata.phone ? '手机号不能为空' : formdata.phone && !phoneRexp.test(formdata.phone) ? '手机号格式错误！' : '';
    if(errMsg){
      util._showToast(errMsg)
      return false
    }
    this.timer();
    //获取验证码接口








    that.setData({
      isGetCode : true
    })
  },




  // 验证码倒计时
  timer(){
    let that = this;
    let countDown = this.data.countDown;
    let clock = setInterval(()=>{
      countDown--;
      if(countDown>=0){
        that.setData({
          countDown : countDown
        })
      }else{
        clearInterval(clock)
        that.setData({
          isGetCode:false,
          btnText:'重新获取',
          countDown:'60'
        })
      }
    },1000)
  },






  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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