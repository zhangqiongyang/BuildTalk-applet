Page({

  /**
   * 页面的初始数据
   */
  data: {
    placeholder:'欢迎踊跃留言',
    maxlength:'2000',
    value:'',
    myMsg:[]
  },

  // 字数限制
  bindWordLimit: function(e){
    var value = e.detail.value,
    maxlength = this.data.maxlength,
    len = parseInt(value.length);

    if (len > maxlength){
      return;
    }

    this.setData({
      currentNoteLen: len ,//当前字数
      value : value        //文本域内容
    })
  },



  //提交
  msgSubmit: function(e){
    if (this.data.value == ''){
      wx.showModal({
        title: '留言不能为空',
        content: '',
        showCancel:false,
      })
    }
    else{
      console.log(this.data.value);

      // let len = this.data.myMsg.length;
      // // let myMsgAdd = 'this.data.myMsg[' + len + ']';
      // let myMsg = this.data.myMsg;
      // console.log(len);
      // myMsg.push(this.data.value)

      // this.setData({
      //   // myMsg: this.data.value,
      //   myMsg
      // });

      setTimeout(_ => {
        this.setData({
          value: ''
        })
      }, 300);

      // console.log(len);


      wx.showToast({
        title: '提交成功',
      })
      this.msgUpload()
      this.getMsg()
    }

  },



  // 上传留言接口
  msgUpload: function () {
    var that = this;
    wx.request({
      url: 'https://wx.bjjy.com/saveguestbook',
      data: {
        'wx_openid': wx.getStorageSync('openid'),
        'article_id': that.data.article_id,
        'content': that.data.value
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log('--------------留言上传成功啦----------------')
        // console.log(res)
        // that.setData({
        //   guestbookinfo: res.data.guestbookinfo
        // })
      },
      fail: function (res) {
        console.log('--------------失败啦----------------')
      },
    })
  },




  // 我的留言删除
  myMsgDel: function(event){
    console.log(event);
    var guestbook_id = event.currentTarget.dataset.guestbookid;
    this.setData({
      guestbook_id: guestbook_id
    })

    var that = this;
    wx.showModal({
      title: '删除',
      content: '是否删除该留言',
      success:function(res){
        if(res.confirm){
          that.delMsg()
          that.getMsg()
        }
      }
    })





    // let index = event.currentTarget.dataset.index;
    // console.log(index);
    // console.log(event)

    // let myMsg = this.data.myMsg;

    // myMsg.splice( index , 1)

    // this.setData({
    //   myMsg
    // })
  },
  




  // 删除留言接口
  delMsg:function(){
    var that = this;
    wx.request({
      url: 'https://wx.bjjy.com/deleteguestbook',
      data: {
        'openid':wx.getStorageSync('openid'),
        'guestbook_id': that.data.guestbook_id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log('----------留言删除成功啦---------')
      },
      fail: function(res) {
        console.log('----------失败啦---------')
      },
    })
  },





  // 获取上层数据
  onLoad: function (options) {
    var article_id = options.article_id
    this.setData({
      article_id: article_id
    })
    this.getMsg()
  },






  // 获取留言接口
  getMsg:function () {
    var that = this ;
    wx.request({
      url: 'https://wx.bjjy.com/getguestbookbyopenid',
      data: {
        'openid':wx.getStorageSync('openid'),
        'article_id': that.data.article_id,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log('--------------留言信息获取成功啦----------------')
        console.log(res)
        that.setData({
          guestbookinfo: res.data.guestbookinfo
        })
      },
      fail: function(res) {
        console.log('--------------失败啦----------------')
      },
    })
  },






  /**
   * 生命周期函数--监听页面加载
   */


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