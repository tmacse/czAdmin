/*
要求: 能根据接口文档定义接口请求
包含应用中所有接口请求函数的模块
每个函数的返回值都是promise

基本要求: 能根据接口文档定义接口请求函数
 */
import jsonp from 'jsonp'
import { message } from 'antd'
import ajax from './ajax'
// import { Base } from 'bizcharts';

// const BASE = 'http://28.27.40.126:4000'
const BASE = ''
// 登陆
export const reqGetJHXB = () => ajax(BASE + '/jhxb')
export const reqGetSDJD = () => ajax(BASE + '/sdjd')
export const reqGetZTJY = () => ajax(BASE + '/ztjy')
export const reqLogin = (username, password) => ajax(BASE + '/user/login', { username, password }, 'POST')

// 获取一级/二级分类的列表
export const reqCategorys = (parentId) => ajax(BASE + '/manage/category/list', { parentId })

// 获取一个分类
export const reqCategory = (categoryId) => ajax(BASE + '/manage/category/info', { categoryId })

// 获取商品分页列表
export const reqProducts = (pageNum, pageSize) => ajax(BASE + '/article/getArticleByPage', { pageNum, pageSize })

// 更新商品的状态(上架/下架)
export const reqUpdateStatus = (productId, status) => ajax(BASE + '/manage/product/updateStatus', { productId, status }, 'POST')



/*
搜索商品分页列表 (根据商品名称/商品描述)
searchType: 搜索的类型, productName/productDesc
 */
export const reqSearchProducts = ({ pageNum, pageSize, searchName, searchType }) => ajax(BASE + '/manage/product/search', {
  pageNum,
  pageSize,
  [searchType]: searchName,
})




//获取新闻总量
export const reqGetTotalNewsNum = () => ajax(BASE + '/article/totalNum')
export const reqGetLvzhiArticles = () => ajax(BASE + '/article/lvzhinews')
export const reqGetKongqinArticles = () => ajax(BASE + '/article/kongqinnews')
export const reqGetChangzhanArticles = () => ajax(BASE + '/article/changzhannews')
export const reqGetJiwuArticles = () => ajax(BASE + '/article/jiwunews')
//获取通知总量
export const reqGetTotalNoticesNum = () => ajax(BASE + '/notices/totalNum')
//获取BOOKFILES总量
export const reqGetTotalBookFilesNum = () => ajax(BASE + '/bookfile/totalNum')
//获取软件总量
export const reqGetTotalSoftwaresNum = () => ajax(BASE + '/software/totalNum')
//获取科室动态的总数
export const reqGetTotalMessageNum = () => ajax(BASE + '/departmentMessage/totalNum')

// 删除指定名称的图片(修改)
export const reqDeleteImg = (name) => ajax(BASE + '/imageFile/bannerdelete', { name }, 'POST')
//获取banner图片的地址
export const reqGetBannerImg = (urlList) => ajax(BASE + '/imageFile/getBannerList', { urlList })
//获取新闻列表
export const reqGetNews = (list) => ajax(BASE + '/article/getList', { list })
//获取分页的新闻列表（新闻待审核的）
export const reqArticles = (pageNum, pageSize) => ajax(BASE + '/article/list', { pageNum, pageSize })
//添加新闻页面
export const reqAddArticles = (aritcle) => ajax(BASE + '/article/add', aritcle, 'POST')
export const reqAddBannerpic = (bannerpic) => ajax(BASE + '/banner/add', bannerpic, 'POST')
//添加软件介绍页面
export const reqAddSoftwares = (software) => ajax(BASE + '/software/add', software, 'POST')
//添加视频介绍界面
export const reqAddVideos = (video) => ajax(BASE + '/video/add', video, 'POST')
//添加音乐界面
export const reqAddMusics = (music) => ajax(BASE + '/music/add', music, 'POST')
//制定删除新闻缩略图y
export const reqDeleteArticleImg = (name) => ajax(BASE + '/articlesImg/delete', { name }, 'POST')
//指定删除picshow 
export const reqDeletePicShowImg = (name) => ajax(BASE + '/picshowImg/delete', { name }, 'POST')
//指定删除软件
export const reqDeleteSoftware = (name) => ajax(BASE + '/softwareFile/delete', { name }, 'POST')
//指定删除视频
export const reqDeleteVideo = (name) => ajax(BASE + '/videoFile/delete', { name }, 'POST')
//删除指定音乐
export const reqDeleteMusic = (name) => ajax(BASE + '/musicFile/delete', { name }, 'POST')

//更新文章状态（是否审核过，审核过状态为true，未审核状态为false）
export const reqArticleUpdateStatus = (title) => ajax(BASE + '/article/updateStatus', { title }, 'POST')
export const reqArticleUpdateStatusToTop = (title) => ajax(BASE + '/article/updateStatusToTop', { title }, 'POST')
export const reqArticleUpdateStatusToDown = (title) => ajax(BASE + '/article/updateStatusToDown', { title }, 'POST')
//删除新闻(根据文章title删除文章)
export const reqDeleteArticle = (title) => ajax(BASE + '/article/delete', { title }, 'POST')
//获取分页的新闻列表（新闻经过审核过的）
export const reqCheckedArticles = (pageNum, pageSize) => ajax(BASE + '/article/checkedlist', { pageNum, pageSize })
export const reqCheckedTopArticles = (pageNum, pageSize) => ajax(BASE + '/article/checkedtoplist', { pageNum, pageSize })
export const reqCheckedSearchArticles = ({ pageNum, pageSize, searchName, searchType }) => ajax(BASE + '/article/search', {
  pageNum,
  pageSize,
  [searchType]: searchName,
})
//通知类的请求
export const reqNotices = (pageNum, pageSize) => ajax(BASE + '/notices/list', { pageNum, pageSize })

export const reqSearchNotices = ({ pageNum, pageSize, searchName, searchType }) => ajax(BASE + '/notices/search', {
  pageNum,
  pageSize,
  [searchType]: searchName,
})
//基层风采图片请求
export const reqPicShow = (pageNum, pageSize) => ajax(BASE + '/picshow/list', { pageNum, pageSize })
export const reqSearchPicshow = ({ pageNum, pageSize, searchName, searchType }) => ajax(BASE + '/picshow/search', {
  pageNum,
  pageSize,
  [searchType]: searchName,
})

//邮件类的请求
//获取经过审核的邮件列表
export const reqMailMessages = (pageNum, pageSize) => ajax(BASE + '/mail/checkedList', { pageNum, pageSize })
//获取未经过审核（查看的）邮件列表
export const reqMailUncheckedMessages = (pageNum, pageSize) => ajax(BASE + '/mail/listUnchecked', { pageNum, pageSize })
//获取经过审核的举报列表
export const reqInformMessages = (pageNum, pageSize) => ajax(BASE + '/mail/checkedListInform', { pageNum, pageSize })
//获取未经过审核（查看的）举报列表
export const reqInformUncheckedMessages = (pageNum, pageSize) => ajax(BASE + '/mail/listUncheckedInform', { pageNum, pageSize })

export const reqMailUpdateStatus = (content) => ajax(BASE + '/mail/updateStatus', { content }, 'POST')

export const reqDeleteMail = (_id) => ajax(BASE + '/mail/delete', { _id }, 'POST')
//查看邮箱
export const reqSearchInform = ({ pageNum, pageSize, searchName, searchType }) => ajax(BASE + '/mail/searchInform', { pageNum, pageSize, [searchType]: searchName, })
//删除举报信息和查看举报信息
export const reqDeleteInform = (_id) => ajax(BASE + '/mail/deleteInform', { _id }, 'POST')
//查看邮箱
export const reqSearchMails = ({ pageNum, pageSize, searchName, searchType }) => ajax(BASE + '/mail/search', { pageNum, pageSize, [searchType]: searchName, })

//教案类的请求
export const reqBookFiles = (pageNum, pageSize) => ajax(BASE + '/bookfile/list', { pageNum, pageSize })
//获取科室动态（消息）
export const reqDepartmentMessages = (pageNum, pageSize) => ajax(BASE + '/departmentMessage/list', { pageNum, pageSize })
export const reqSearchBookFiles = ({ pageNum, pageSize, searchName, searchType }) => ajax(BASE + '/bookfile/search', {
  pageNum,
  pageSize,
  [searchType]: searchName,
})
export const reqSearchMessages = ({ pageNum, pageSize, searchName, searchType }) => ajax(BASE + '/departmentMessage/search', {
  pageNum,
  pageSize,
  [searchType]: searchName,
})
export const reqDeleteBookFile = (title) => ajax(BASE + '/bookfile/delete', { title }, 'POST')
export const reqDeleteMessages = (title) => ajax(BASE + '/departmentMessage/delete', { title }, 'POST')

export const reqDeleteNotice = (title) => ajax(BASE + '/notices/delete', { title }, 'POST')
export const reqDeletePicShow = (title) => ajax(BASE + '/picshow/delete', { title }, 'POST')
//获取分页的软件列表
export const reqSearchSoftwares = ({ pageNum, pageSize, searchName, searchType }) => ajax(BASE + '/software/search', {
  pageNum,
  pageSize,
  [searchType]: searchName,
})
//获取分页的视频列表
export const reqSearchVideos = ({ pageNum, pageSize, searchName, searchType }) => ajax(BASE + '/video/search', {
  pageNum,
  pageSize,
  [searchType]: searchName,
})
//获取分页的音乐列表
export const reqSearchMusics = ({ pageNum, pageSize, searchName, searchType }) => ajax(BASE + '/music/search', {
  pageNum,
  pageSize,
  [searchType]: searchName,
})
//获取分页的软件
export const reqSoftwares = (pageNum, pageSize) => ajax(BASE + '/software/list', { pageNum, pageSize })
//获取分页的视频
export const reqVideos = (pageNum, pageSize) => ajax(BASE + '/video/list', { pageNum, pageSize })
//获取分页的视频
export const reqMusics = (pageNum, pageSize) => ajax(BASE + '/music/list', { pageNum, pageSize })
//删除软件(根据软件名字删除软件,这里的删除软件是指的删除软件在数据库的名字等信息)
export const reqDeleteSoftwares = (name) => ajax(BASE + '/software/delete', { name }, 'POST')
//删除视频
export const reqDeleteVideos = (name) => ajax(BASE + '/video/delete', { name }, 'POST')
//删除音乐
export const reqDeleteMusics = (name) => ajax(BASE + '/music/delete', { name }, 'POST')
//下载软件
export const reqDownloadSoftware = (name) => ajax(BASE + '/softwareFile/download', { name }, 'POST')
//增加通知
export const reqAddNotices = (notice) => ajax(BASE + '/notices/add', notice, 'POST')
//增加教案
export const reqAddBookFiles = (bookfile) => ajax(BASE + '/bookfile/add', bookfile, 'POST')
//增加科室动态（消息）
export const reqAddDepartmentMessage = (Dmessage) => ajax(BASE + '/departmentMessage/add', Dmessage, 'POST')





// 添加/修改商品
export const reqAddOrUpdateProduct = (product) => ajax(BASE + '/manage/product/' + (product._id ? 'update' : 'add'), product, 'POST')
// 修改商品
// export const reqUpdateProduct = (product) => ajax(BASE + '/manage/product/update', product, 'POST')
export const reqAddOrUpdateArticle = (article) => ajax(BASE + '/article/' + (article._id ? 'update' : 'add'), article, 'POST')
//添加或者修改基层风采
export const reqAddOrUpdatePicShow = (picshow) => ajax(BASE + '/picshow/' + (picshow._id ? 'update' : 'add'), picshow, 'POST')
//修改文章
export const reqAddOrUpdateBookFile = (bookfile) => ajax(BASE + '/bookfile/' + (bookfile._id ? 'update' : 'add'), bookfile, 'POST')
export const reqAddOrUpdateDepartmentMessage = (Dmessage) => ajax(BASE + '/departmentMessage/' + (Dmessage._id ? 'update' : 'add'), Dmessage, 'POST')
export const reqAddOrUpdateNotice = (notice) => ajax(BASE + '/notices/' + (notice._id ? 'update' : 'add'), notice, 'POST')
// 获取所有角色的列表
export const reqRoles = () => ajax(BASE + '/role/list')
// 添加角色
export const reqAddRole = (roleName) => ajax(BASE + '/role/add', { roleName }, 'POST')
// 添加角色
export const reqUpdateRole = (role) => ajax(BASE + '/role/update', role, 'POST')


// 获取所有用户的列表
export const reqUsers = () => ajax(BASE + '/user/list')
// 删除指定用户
export const reqDeleteUser = (userId) => ajax(BASE + '/user/delete', { userId }, 'POST')
// 添加/更新用户
export const reqAddOrUpdateUser = (user) => ajax(BASE + '/user/' + (user._id ? 'update' : 'add'), user, 'POST')

/*
json请求的接口请求函数
 */
export const reqWeather = (city) => {

  return new Promise((resolve, reject) => {
    const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
    // 发送jsonp请求
    jsonp(url, {}, (err, data) => {
      // console.log('jsonp()', err, data)
      // 如果成功了
      if (!err && data.status === 'success') {
        // 取出需要的数据
        const { dayPictureUrl, weather } = data.results[0].weather_data[0]
        resolve({ dayPictureUrl, weather })
      } else {
        // 如果失败了
        message.error('获取天气信息失败!')
      }

    })
  })
}
// reqWeather('北京')
/*
jsonp解决ajax跨域的原理
  1). jsonp只能解决GET类型的ajax请求跨域问题
  2). jsonp请求不是ajax请求, 而是一般的get请求
  3). 基本原理
   浏览器端:
      动态生成<script>来请求后台接口(src就是接口的url)
      定义好用于接收响应数据的函数(fn), 并将函数名通过请求参数提交给后台(如: callback=fn)
   服务器端:
      接收到请求处理产生结果数据后, 返回一个函数调用的js代码, 并将结果数据作为实参传入函数调用
   浏览器端:
      收到响应自动执行函数调用的js代码, 也就执行了提前定义好的回调函数, 并得到了需要的结果数据
 */