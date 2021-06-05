const menuList = [
  {
    title: '首页', // 菜单标题名称
    key: '/home', // 对应的path
    icon: 'home', // 图标名称
    isPublic: true, // 公开的
  },
  {
    title: '通知管理',
    key: '/noticesManage',
    icon: 'sound',
    children: [
      {
        title: '发通知',
        key: '/noticesManage/add',
        icon: 'notification'
      },
      {
        title: '管理通知',
        key: '/noticesManage/manage',
        icon: 'message'
      },]
  },
  {
    title: '课程、案例、新闻、法规',
    key: '/newsManage',
    icon: 'appstore',
    children: [ // 子菜单列表
      {
        title: '写新闻（案例、法规等）',
        key: '/writenews',
        icon: 'bars'
      },
      {
        title: '管理文章',
        key: '/managenews',
        icon: 'search'
      },
    ]
  },
  {
    title: '基层风采管理',
    key: '/picshow',
    icon: 'build',
    children: [
      {
        title: '图片上传',
        key: '/picshow/uploads',
        icon: 'line-chart'
      },
      {
        title: '图片管理',
        key: '/picshow/manage',
        icon: 'line-chart'
      },
    ]
  },
  {
    title: '科室动态管理',
    key: '/departmentMessage',
    icon: 'book',
    children: [
      {
        title: '发布科室动态',
        key: '/departmentMessage/write',
        icon: 'file-add'
      },
      {
        title: '内容管理',
        key: '/departmentMessage/manage',
        icon: 'file'
      },

    ]
  },

  {
    title: '视频管理',
    key: '/media/video',
    icon: 'play-square',
    children: [
      {
        title: '视频上传',
        key: '/mdeia/videoupload',
        icon: 'upload'
      },
      {
        title: '视频管理',
        key: '/mdeia/videomanage',
        icon: 'video-camera'
      },
    ]
  },
  {
    title: '更新值班首长',
    key: '/leader/write',
    icon: 'user'
  },

  {
    title: '用户管理',
    key: '/user',
    icon: 'user'
  },
  {
    title: '角色管理',
    key: '/role',
    icon: 'safety',
  },
  {
    title: '留言管理',
    key: 'mail',
    icon: 'mail',
    children: [
      {
        title: '已审核留言',
        key: '/mail/checked',
        icon: 'vertical-align-top'
      },
      {
        title: '未审核留言',
        key: '/mail/unchecked',
        icon: 'line-chart'
      },
    ]
  },
  {
    title: '双争评比',
    key: '/quantization',
    icon: 'play-square',
    children: [
      {
        title: '先进单位',
        key: '/quantization/unit',
        icon: 'upload'
      },
      {
        title: '先进个人',
        key: '/quantization/solo',
        icon: 'video-camera'
      },
    ]
  }
]

export default menuList