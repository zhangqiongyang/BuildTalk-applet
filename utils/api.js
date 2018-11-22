var base = "https://wx.bjjy.com"


module.exports = {
  //app.js
  API_GETOPENID: base + "/getloginopenid", // 获取openid
  API_GETENCRYPTEDDATA: base + "/getUserinfoEncryptedData", // 获取用户加密信息
  
  //首页index
  API_INDEXPIC: base + "/getindexpic", // 查询首页推荐轮播图
  API_INDEXCOURSE: base + "/getindexinfo", // 查询首页上精品推荐的课程接口
  API_INDEXAUTHOR: base + "/searchrecommendauthor", // 获取推荐作者信息接口

  //个人中心mine
  API_MINEUPLOADINFO: base + "/operateuser", //上传用户的头像和昵称到数据库
  API_CHECKPHONE: base + "/checkbindmobile", //检测用户是否绑定手机号

  //全部作者allauthor
  API_ALLAUTHOR: base + "/searchallauthor", // 获取所有作者的信息

  //收货地址address
  API_UPLOADADDRESS: base + "/saveRecevingAddress", //上传收货地址
  API_GETADDRESS: base + "/searchRecevingAddress", // 获取收货地址信息

  //已购alreadybuy
  API_ALREADYBUY: base + "/alreadybuy", // 获取已购课程信息接口

  //文章留言message
  API_UPLOADMSG: base + "/saveguestbook", //上传留言接口
  API_DELETEMSG: base + "/deleteguestbook", // 删除留言接口
  API_GETMSG: base + "/getguestbookbyopenid", // 获取留言接口

  //我的留言mymsg
  API_GETMYMSG: base + "/myguestbook", //获取我的留言信息接口

  //我的留言详情mymsgdetail
  API_GETMYMSGBYID: base + "/getguestbookinfobyId", //根据留言id获取留言信息接口

  //全部课程allcourse
  API_ALLCOURSE: base + "/getrecommend", //获取所有课程信息接口

  //文章article，视频video
  API_GETARTICLEINFO: base + "/getArticleinfobyArticleId", // 获取文章数据
  API_GETARTICLEMSG: base + "/orderbyguestbook", // 获取文章留言数据
  API_UPLOADTRACE: base + "/saveBrowseRecord", //上传用户浏览信息
  API_UPLOADMSGLIKE: base + "/updateguestbook", // 留言点赞上传接口
  API_UPLOADARTICLLIKE: base + "/collectarticle", // 文章收藏信息上传接口

  //作者author
  API_SEARCHBUYARTICLE: base + "/searchbuyarticle", //查询用户当前文章是否购买
  API_GETAUTHORINFO: base + "/getauthorarticle", // 查询作者信息接口

  //购买buy
  API_SEARCHORDER: base + "/iscreateorder", //查询订单号
  API_CREATORDER: base + "/unifiedorderhandle", // 生成订单接口
  API_CHANGEORDERINFO: base + "/updateorderstatus", //修改订单状态接口
  API_COURSERINFO: base + "/courselistinfo", // 获取课程数据信息

  //列表list
  API_GETTRACE: base + "/getbrowseRecord", //获取浏览记录

  //手机号phone
  API_SENDCODE: base + "/sendSms", //发送短信接口
  API_GETCODE: base + "/checkcodevalid", //获取验证码接口

  //搜索search
  API_GETHISTORY: base + "/getSearchHistory", // 查询历史记录接口
  API_SEARCH: base + "/searchkeywords", //搜索接口
  API_DELETEHISTORY: base + "/deleteSearchHistory", //删除历史纪录接口
}