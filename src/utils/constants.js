/*
包含一些常量值的模块
 */
export const BASE = 'http://localhost:5000'
// export const BASE = 'http://28.27.40.77:5000'
export const PAGE_SIZE = 10 // 每页显示的记录数
export const BASE_IMG_URL = BASE + '/public/image/articles/' // 上传图片的基础路径
export const BASE_PICSHOW_URL = BASE + '/public/image/picshow/'
export const BASE_MUSIC_URL = BASE + '/public/music/' //上传音乐的基础路径
export const BASE_SOFTWARE_URL = BASE + '/public/software/' //上传软件的基础路径
export const BASE_VIDEO_URL = BASE + '/public/video/' //上传视频的基础路径

//所有强军动态的五个单位
export const BASE_ZZ_DEPARTMENT = [
    '组织办', '人力资源办', '宣传保卫办', '部队管理办', '战勤办',
]
//场站的所有单位
export const BASE_ALL_DEPARTMENT = [
    '场站参谋部', '场站政治工作处',
    '财务股', '军需股', '油料股', '运输股', '机场营房股', '航材军械股', '飞行管制室', '气象台', '医院',
    '通信导航连', '警卫连', '汽车连', '场务连', '四站连'
]
export const BASE_ALL_TUPLE_DEPARTMENT = [
    { Cname: '场站参谋部', name: 'zmb' },
    { Cname: '场站政治工作处', name: 'zzc' },
    { Cname: '财务股', name: 'cw' },
    { Cname: '军需股', name: 'jx' },
    { Cname: '油料股', name: 'yl' },
    { Cname: '运输股', name: 'ys' },
    { Cname: '机场营房股', name: 'jy' },
    { Cname: '航材军械股', name: 'hj' },
    { Cname: '飞行管制室', name: 'fxgzs' },
    { Cname: '气象台', name: 'qxt' },
    { Cname: '医院', name: 'yy' },
    { Cname: '通信导航连', name: 'td' },
    { Cname: '警卫连', name: 'jw' },
    { Cname: '汽车连', name: 'qc' },
    { Cname: '场务连', name: 'cwl' },
    { Cname: '四站连', name: 'sz' }
]

