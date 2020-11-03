/*
要求: 能根据接口文档定义接口请求
包含应用中所有接口请求函数的模块
每个函数的返回值都是promise

基本要求: 能根据接口文档定义接口请求函数
 */
import ajax from './ajax'

// const BASE = 'http://28.27.40.126:4000'
const BASE = ''
// 登陆
export const reqLogin = (username, password) => ajax(BASE + '/user/login', { username, password }, 'POST')

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

//添加视频介绍界面
export const reqAddVideos = (video) => ajax(BASE + '/video/add', video, 'POST')

//制定删除新闻缩略图y
export const reqDeleteArticleImg = (name) => ajax(BASE + '/articlesImg/delete', { name }, 'POST')

//指定删除视频
export const reqDeleteVideo = (name) => ajax(BASE + '/videoFile/delete', { name }, 'POST')
//删除指定音乐

//更新文章状态（是否审核过，审核过状态为true，未审核状态为false）
export const reqArticleUpdateStatus = (title) => ajax(BASE + '/article/updateStatus', { title }, 'POST')
//删除新闻(根据文章title删除文章)
export const reqDeleteArticle = (title) => ajax(BASE + '/article/delete', { title }, 'POST')
//获取分页的新闻列表（新闻经过审核过的）
export const reqCheckedArticles = (pageNum, pageSize) => ajax(BASE + '/article/checkedlist', { pageNum, pageSize })
export const reqCheckedSearchArticles = ({ pageNum, pageSize, searchName, searchType }) => ajax(BASE + '/article/search', {
  pageNum,
  pageSize,
  [searchType]: searchName,
})
//CZ通知列表
export const reqNotices = (pageNum, pageSize) => ajax(BASE + '/list/notices', { pageNum, pageSize })
export const reqAddOrUpdateNotice = (notice) => ajax(BASE + '/notices/' + (notice._id ? 'update' : 'add'), notice, 'POST')
export const reqSearchNotices = ({ pageNum, pageSize, searchName, searchType }) => ajax(BASE + '/notices/search', {
  pageNum,
  pageSize,
  [searchType]: searchName,
})
//cz邮件类的请求
//获取经过审核的邮件列表
export const reqMailMessages = (pageNum, pageSize) => ajax(BASE + '/mail/checkedList', { pageNum, pageSize })
//获取未经过审核（查看的）邮件列表
export const reqMailUncheckedMessages = (pageNum, pageSize) => ajax(BASE + '/mail/listUnchecked', { pageNum, pageSize })


export const reqMailUpdateStatus = (content) => ajax(BASE + '/mail/updateStatus', { content }, 'POST')

export const reqDeleteMail = (_id) => ajax(BASE + '/mail/delete', { _id }, 'POST')
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

//获取分页的视频列表
export const reqSearchVideos = ({ pageNum, pageSize, searchName, searchType }) => ajax(BASE + '/video/search', {
  pageNum,
  pageSize,
  [searchType]: searchName,
})
//获取分页的软件
export const reqVideos = (pageNum, pageSize) => ajax(BASE + '/video/list', { pageNum, pageSize })
//获取分页的视频
//删除视频
export const reqDeleteVideos = (name) => ajax(BASE + '/video/delete', { name }, 'POST')
//增加通知
export const reqAddNotices = (notice) => ajax(BASE + '/notices/add', notice, 'POST')
//增加教案
export const reqAddBookFiles = (bookfile) => ajax(BASE + '/bookfile/add', bookfile, 'POST')
//增加科室动态（消息）
export const reqAddDepartmentMessage = (Dmessage) => ajax(BASE + '/departmentMessage/add', Dmessage, 'POST')
export const reqAddOrUpdateArticle = (article) => ajax(BASE + '/article/' + (article._id ? 'update' : 'add'), article, 'POST')
//修改文章
export const reqAddOrUpdateBookFile = (bookfile) => ajax(BASE + '/bookfile/' + (bookfile._id ? 'update' : 'add'), bookfile, 'POST')
export const reqAddOrUpdateDepartmentMessage = (Dmessage) => ajax(BASE + '/departmentMessage/' + (Dmessage._id ? 'update' : 'add'), Dmessage, 'POST')

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
