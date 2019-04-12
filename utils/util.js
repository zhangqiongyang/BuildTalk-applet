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






// 提示框，showToast
function _showToast(title) {
  wx.showToast({
    icon: "none",
    title: title,
  })
}

// 模态对话框 showModel
function _showModel(title,content) {
  wx.showModal({
    title: title,
    content: content,
    success: (res)=> {
      if (res.confirm) {
        console.log('用户点击确定')
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    }
  })
}


//判断字符是否为空的方法
function isEmpty(obj) {
  if (typeof obj == "undefined" || obj == null || obj == "") {
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
  isEmpty
}