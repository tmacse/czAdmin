const menuList = [
  {
    title: '首页', // 菜单标题名称
    key: '/home', // 对应的path
    icon: 'home', // 图标名称
    isPublic: true, // 公开的
  },
  {
    title: 'banner图片管理',
    key: '/bannermanage',//此处还未实现
    icon: 'file-image',
  },
  {
    title: '文章管理',
    key: '/newsManage',
    icon: 'appstore',
    children: [ // 子菜单列表
      {
        title: '写文章',
        key: '/writenews',
        icon: 'bars'
      },
      {
        title: '审核文章',
        key: '/checknews',
        icon: 'tool'
      },
      {
        title: '管理文章',
        key: '/managenews',
        icon: 'search'
      },
      {
        title: '大文章',
        key: '/Topnews',
        icon: 'vertical-align-top'
      },
    ]
  },

  {
    title: '消息通知管理',
    key: '/noticesManage',//此处还未实现
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
    title: '音频管理',
    key: '/media/audio',
    icon: 'audio',
    children: [
      {
        title: '音频上传',
        key: '/media/musicupload',
        icon: 'to-top'
      },
      {
        title: '音频管理',
        key: '/media/musicmanage',
        icon: 'customer-service'
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
      // {
      //   title: 'vblog管理',      暂时先不做这一板块
      //   key: '/media/minividie',
      //   icon: 'play-square'
      // },
    ]
  },
  {
    title: '软件管理',
    key: '/software',
    icon: 'windows',
    children: [
      {
        title: '软件上传',
        key: '/software/upload',
        icon: 'file-exclamation'
      },
      {
        title: '软件管理',
        key: '/software/manage',
        icon: 'file-zip'
      },

    ]
  },
  {
    title: '教案管理',
    key: '/bookfile',
    icon: 'read',
    children: [
      {
        title: '发布教案',
        key: '/bookfile/write',
        icon: 'file-add'
      },
      {
        title: '教案管理',
        key: '/bookfile/manage',
        icon: 'file'
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
    title: '图形图表',
    key: '/charts',
    icon: 'area-chart',
    children: [
      {
        title: '柱形图',
        key: '/charts/bar',
        icon: 'bar-chart'
      },
      {
        title: '折线图',
        key: '/charts/line',
        icon: 'line-chart'
      },
      {
        title: '饼图',
        key: '/charts/pie',
        icon: 'pie-chart'
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
    title: '举报信息管理',
    key: 'imform',
    icon: 'mail',
    children: [
      {
        title: '已阅的举报',
        key: '/inform/checked',
        icon: 'vertical-align-top'
      },
      {
        title: '未审阅举报',
        key: '/inform/unchecked',
        icon: 'line-chart'
      },
    ]
  }
]

export default menuList