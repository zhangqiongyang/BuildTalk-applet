var base = "https://jt.chinabim.com"


const api = {
  //app.js
  API_FROMCODEGETLOGINID: base + "/jianTan/getLoginid", // 获取Loginid-_-
  API_CHECKLOGINIDISVALID: base + "/checkLogin_id", //判断多设备login_id是否一致-_-
  API_GETENCRYPTEDDATA: base + "/getloginEncryptedData", // 获取用户加密信息-_-

  //首页index
  API_INDEXPIC: base + "/getIndexPic", // 查询首页推荐轮播图-_-
  API_INDEXNEWS: base + "/searchRecommendNews", // 获取新闻信息接口-_-
  API_INDEXCOURSE: base + "/searchCircleInfoByType", // 查询首页上精品课程、热门话题圈接口 type：1热门话题圈 2精品课程-_-
  API_INDEXAUTHOR: base + "/searchrecommendauthor", // 获取推荐作者信息接口

  //个人中心mine
  API_MINEUPLOADINFO: base + "/operateuser", //上传用户的头像和昵称到数据库
  API_CHECKPHONE: base + "/checkisBindMobile", //检测用户是否绑定手机号-_-

  API_CHANGEPHONE: base + "/updatePhone", //更改手机号-_-
  API_CHANGEINFO: base + "/updateUserInfo", //更改名字、头像、背景-_-
  API_SELECTPERSONINFO: base + "/serachUserInfoByUser_id", //查询个人信息-_-
  API_FEEDBACK: base + "/questionFeedback", //问题反馈-_-



  //全部新闻页allNews
  API_ALLNEWS: base + "/searchAllNews", // 获取所有新闻的信息-_-


  //全部作者allauthor
  API_ALLAUTHOR: base + "/searchallauthor", // 获取所有作者的信息

  //收货地址address
  API_UPLOADADDRESS: base + "/saveRecevingAddress", //上传收货地址
  API_GETADDRESS: base + "/searchRecevingAddress", // 获取收货地址信息

  //已购alreadybuy
  API_ALREADYBUY: base + "/alreadybuy", // 获取已购课程信息接口

  //文章留言message

  API_DELETEMSG: base + "/deleteguestbook", // 删除留言接口
  API_GETMSG: base + "/getguestbookbyopenid", // 获取留言接口

  //我的留言mymsg
  API_GETMYMSG: base + "/myguestbook", //获取我的留言信息接口

  //我的留言详情mymsgdetail
  API_GETMYMSGBYID: base + "/getguestbookinfobyId", //根据留言id获取留言信息接口

  //全部课程allcourse
  API_ALLCOURSE: base + "/getrecommend", //获取所有课程信息接口

  //文章article，视频video
  API_GETARTICLEINFO: base + "/searchArticleInfo", // 获取文章数据-_-
  API_GETARTICLEMSG: base + "/serachManyGuestbook", // 获取文章留言数据-_-
  API_UPLOADTRACE: base + "/saveBrowseRecord", //上传用户浏览信息
  API_UPLOADMSGLIKE: base + "/guestbookPraise", // 留言点赞上传接口-_-
  API_UPLOADARTICLLIKE: base + "/collectarticle", // 文章收藏信息上传接口-_-
  API_UPLOADMSG: base + "/saveguestbook", //上传留言接口-_-

  //作者author
  API_SEARCHBUYARTICLE: base + "/searchbuyarticle", //查询用户当前文章是否购买
  API_GETAUTHORINFO: base + "/searchAuthorInfo", // 查询作者信息接口

  //购买buy
  API_SEARCHORDER: base + "/iscreateorder", //查询订单号
  API_CREATORDER: base + "/unifiedorderhandle", // 生成订单接口
  API_CHANGEORDERINFO: base + "/updateorderstatus", //修改订单状态接口
  API_COURSERINFO: base + "/courselistinfo", // 获取课程数据信息

  //列表list
  API_GETTRACE: base + "/getbrowseRecord", //获取浏览记录

  //手机号phone
  API_SENDCODE: base + "/sendSms", //发送短信接口-_-
  API_GETCODE: base + "/checkMobileCode", //提交手机号验证码-_-
  API_CHECKPHONE: base + '/checkisBindMobile', // 检查用户是否绑定手机号


  //搜索search
  API_GETHISTORY: base + "/getSearchHistory", // 查询历史记录接口
  API_SEARCH: base + "/searchkeywords", //搜索接口
  API_DELETEHISTORY: base + "/deleteSearchHistory", //删除历史纪录接口


  // 热门话题圈列表
  API_ALLCIRCLE: base + "/searchCircleInfoByType", // 1话题圈列表 2课程圈列表


  // 圈子
  API_CIRCLE: base + "/myCircle", // 我的圈子

  // 搜索
  API_SEARCHCIRCLE: base + "/searchCircleInfoBykeywords", // 搜索圈子
  API_SEARCHAUTHOR: base + "/searchAuthorByKeyword", // 搜索大咖
  API_HISTORY: base + "/searchHistory", // 历史纪录 2圈子 3大咖
  API_DELETEHISTORY: base + "/deleteHistory", // 删除搜索记录


  // 创建圈子
  API_SEARCHCIRCLETAGS: base + "/searchCircleTags", // 圈子标签
  API_CREATCIRCLE: base + "/createCircle", // 创建圈子
  API_UPDATECIRCLE: base + "/updateCircleInfo", // 修改圈子
  API_CIRCLEDATA: base + "/searchCircleInfo", // 圈子资料

  // 圈子详情
  API_PREVIEWCIRCLEINFO: base + "/searchAllCircleInfo", // 圈子预览
  API_PREVIEWSUBJECT: base + "/themePreview", // 预览主题
  API_COURSECATALOG: base + "/getCourseList", // 课程目录
  API_SUBJECT: base + "/getThemeInfoByType", // 主题 分类  1全部2图片3圈主4自己
  API_JIONCIRCLE: base + "/joinCircle", // 加入圈子



  // 主题详情
  API_SUBJECTDETAIL: base + "/searchThemeDetail", // 主题详情
  API_SUBJECTMSGINFO: base + "/commentPageHandle", // 留言
  API_SUBJECTMSG: base + "/publishThemeComment", // 提交主题留言

  API_SUBJECTLIKE: base + "/themeParise", // 主题、评论点赞
  API_SUBJECTCLASSIFY: base + "/searchUserThemeOperate", // 主题编辑权限
  API_DELETESUBJECT: base + "/deleteTheme", // 删除主题
  API_COLLECTSUBJECT: base + "/collectTheme", // 收藏主题


  // 圈子信息
  API_CIRCLEINFO: base + "/circleMasterInfo", // 圈子信息
  API_QUITCIRCLE: base + "/quitCircle", // 退出圈子


  // 圈子成员
  API_CIRCLEMEMBER: base + "/circleUser", // 圈子成员

  //名片信息
  API_CARD: base + "/myCard", // 圈子成员

  // 发布主题
  API_PUBLISHSUBJECT: base + "/publishTheme", // 发布主题
  API_SUBJECTINFO: base + "/searchThemeInfo", // 通过主题id查询主题内容
  API_CHANGESUBJECT: base + "/updateTheme", // 修改主题

  //谈主
  API_AUTHOR: base + "/searchIndustryMaster", // 行业大咖
  API_MAETER: base + "/searchCircleMaster", // 人气圈主
  API_ATTENTION: base + "/attentionUserOperate", // 关注、取消关注操作

  // 大咖列表
  API_AUTHORLIST: base + "/searchAuthor", // 大咖列表

  // 大咖详情
  API_AUTHORDETAILS: base + "/userDetail", // 1大咖详情 2圈主详情

  // 创建加入的圈子
  API_CIRCLECREATJOIN: base + "/searchUserCircle", // 1 创建 2加入

  //粉丝
  API_FANS: base + "/myFans", // 粉丝

  //关注
  API_MYATTENTION: base + "/myAttention", // 关注

  // 收藏
  API_COLLECT: base + "/myCollect", // 收藏
  API_DELETECOLLECT: base + "/deleteCollect", // 删除收藏

  // 个人信息
  API_MINEINFO: base + "/searchUserInfoByUser_id", // 个人信息
  API_CHANGEMINEINFO: base + "/updateUserInfo", // 修改个人信息


  // 交易明细
  API_BOUGHTINFO: base + "/alreadybuy", // 交易明细

  //支付
  API_BUY: base + "/unifiedorderhandle", // 支付



}

export {
  api
}