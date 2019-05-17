import { api } from './api.js'
// const md5 = require('../utils/md5.js')
import {
  md5
} from "./md5.js"
class HTTP {

  request({ url, data = {} }) {
    // 复制对象进行操作
    let objNew = JSON.parse(JSON.stringify(data))
    console.log('45656', data)

    // 删除空元素
    function deleteNull(obj) {
      let newKey = Object.keys(obj).sort()
      for (let k = 0; k < newKey.length; k++) {
        if (obj[newKey[k]] == '') {
          let age = newKey[k]
          delete obj.age
        }
      }
    }

    deleteNull(objNew)//执行函数
    console.log('22222222222', objNew)



    // 添加时间戳
    objNew.timestamp = new Date().getTime()
    console.log('==============================')
    console.log(objNew)


    // 对对象进行排序
    function objKeySort(obj) { //排序的函数
      let newKey = Object.keys(obj).sort(); //先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
      let newObj = {} //创建一个新的对象，用于存放排好序的键值对
      for (let i = 0; i < newKey.length; i++) { //遍历newkey数组
        newObj[newKey[i]] = obj[newKey[i]] //向新创建的对象中按照排好的顺序依次增加键值对
      }
      return newObj //返回排好序的新对象
    }

    objKeySort(objNew) //执行函数
    console.log(objNew)


    // 将对象转化为字符串
    let str = ''
    function changeStr(obj) {
      let newKey = Object.keys(objNew).sort()
      for (let j = 0; j < newKey.length; j++) {
        str += newKey[j] + objNew[newKey[j]]
      }
      console.log(str)
      return str
    }
    changeStr(objNew)//执行函数
    console.log('22将对象转化为字符串', str)



    // 添加passSecret进行MD5加密，并转化为大写
    let passSecret = 'a0ny1099ec8yek4wa1pi3l4cf2h86wptorv6o3einn79u',
      passid = 'z7gcawmtu4g1blzgnzftns5435638tdl'
    var strVal = passSecret + str + passSecret //拼接字符串
    console.log(strVal)
    var strValMd5 = md5(strVal) //MD5加密
    var sign = strValMd5.toUpperCase() //转化为大写





    return new Promise((resolve, reject) => {
      this._request(url, passid, sign, objNew.timestamp, resolve, reject, data)
    })
  }

  _request(url, passid, sign, timestamp, resolve, reject, data = {}) {
    wx.request({
      url: url,
      data: data,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        passid: passid,
        sign: sign,
        timestamp: timestamp,
      },
      method: 'POST',
      success: (res) => {
        //errorCode   1、成功 2、失败
        if (res.data.errorCode == 1) {
          resolve(res.data)
        } else {
          reject(res.data)
        }
      },
      fail: function (res) {
        console.log('------网络请求失败-------')
        reject()
        wx.showToast({
          title: '错误',
          icon: 'none',
          duration: 2000,
        })
      }
    })
  }
}

export { HTTP }


