var app=getApp()

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


//showToast
function _showToast(title) {
  wx.showToast({
    title: title,
    icon:'none',
    success: function (res) { },
  })
}

function _showToastSuccess(title){
  wx.showToast({
    title: title,
    image: '/image/showToast_success.png',
    success: function(res) {},
  })
}

function _showToastCancel(title) {
  wx.showToast({
    title: title,
    image: '/image/showToast_cancel.png',
    success: function (res) { },
  })
}


// 模态对话框 showModal
function _showModal(title,content,callback) {
  wx.showModal({
    title: title,
    content: content,
    cancelColor: '#242831',
    confirmColor: '#32A7FF',
    success: (res)=> {
      if (res.confirm) {
        console.log('用户点击确定')
        callback()
        return true

      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    }
  })
}

// loading
function _showLoading(){
  wx.showLoading({
    title: '加载中',
  })
}

// 判断登陆与绑定手机号
function judge(callback){
  var app=getApp()
  if (app.globalData.isLogin) {
    if (app.globalData.isHavePhone) {
      callback()
    } else {
      this._showModal('未绑定手机号', '请绑定手机号后进行操作', () => {
        wx.navigateTo({
          url: '/pages/sub_personalCenter/pages/bindPhone/bindPhone',
        })
      })
    }

  } else {
    this._showModal('未登录', '请登录后进行操作', () => {
      wx.switchTab({
        url: '/pages/tabbar/mine/mine',
      })
    })
  }
}


//判断字符是否为空的方法
function isEmpty(obj) {
  if (typeof obj == "undefined" || obj == null || obj == "" || obj == []) {
    return true;
  } else {
    return false;
  }
}


// 验证输入内容是否包含空格
function checkTextSpace(obj, temp) {
  var reg = /(^\s+)|(\s+$)/g;
  var alertValue = "输入内容包含空格，请出新输入!";
  //temp用来标识内容是否允许存在空格 1为可存在 0为不存在
  if (temp == 1) {
    reg = /(^\s{5,})|(\s{5,}$)|(\s{5,})/g;
    alertValue = "内容中连续输入空格数超过5个,请重新输入！";
  }
  if (reg.test(obj.value)) {
    console.log(alertValue);
    obj.focus();
    return false;
  }
}



// 去除空格
function delHtmlTag(str) {
  var str = str.replace(/<\/?[^>]*>/gim, ""); //去掉所有的html标记
  var result = str.replace(/(^\s+)|(\s+$)/g, ""); //去掉前后空格
  return result.replace(/\s/g, ""); //去除文章中间空格
}



module.exports = {
  formatTime: formatTime,
  _showToast,
  _showToastSuccess,
  _showToastCancel,
  _showModal,
  _showLoading,
  isEmpty,
  judge
}