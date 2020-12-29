import React, { Component } from 'react'
import { BASE_VIDEO_URL } from '../../utils/constants';
import './video.less'

export default class TruncVideo extends Component {
    constructor(props) {
        super(props)
        console.log(this.props.data)

        this.state = {
            inputVideoUrl: '',
            video_duration: '',//视频总时长
            time_d: 0,//视频当前时长
            thumbnail: '',//缩略图
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log("componentWillReceiveProps===>", nextProps)
        if (nextProps.url[0]) {
            this.setState({
                inputVideoUrl: `${BASE_VIDEO_URL}${nextProps.url[0].name}`
            })
        }


    }

    componentDidMount() {
        const video = document.getElementById('video')
        video.currentTime = 5//设置视频当前时长

        // loadeddata:提示当前帧的数据是可用的
        // 当当前帧的数据已加载，但没有足够的数据来播放指定音频/视频的下一帧时，会发生 loadeddata 事件。
        video.addEventListener('loadeddata', () => {
            this.captureImage()
            this.setState({
                video_duration: video.duration//获取视频总时长
            }, () => {
                this.mouseMoveFun()
            })
        });
    }

    // 自动截取视频第一帧作为封面
    captureImage() {
        const video = document.getElementById('video')
        const preview = document.getElementById('preview')

        const canvas = document.createElement('canvas')                            //创建一个canvas
        canvas.width = video.offsetWidth
        canvas.height = video.offsetHeight

        canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height)//绘制图像
        const img = new Image()                                                    //创建img
        img.src = canvas.toDataURL('image/png')                                    //将绘制的图像用img显示
        preview.appendChild(img)
        this.setState({ thumbnail: img.src })

    }
    // 手动截取视频画面作为封面
    buttonFun() {
        const canvas = document.getElementById('canvas')
        const video = document.getElementById('video')
        const preview = document.getElementById('preview')

        let context = canvas.getContext('2d');
        context.clearRect(0, 0, 400, 200);                                         //清除画布内容
        context.drawImage(video, 0, 0, 400, 200);
        canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height)//绘制图像
        const img = new Image()                                                    //创建img
        img.src = canvas.toDataURL('image/png')                                    //将绘制的图像用img显示
        preview.appendChild(img)
        // console.log(img.src)
        this.setState({ thumbnail: img.src })
        // console.log(this.state.thumbnail)
    }
    //获取缩略图的方法
    getThumbnail = () => {
        return this.state.thumbnail
    }
    //监听鼠标在容器内的位置
    mouseMoveFun() {
        let { video_duration } = this.state
        let _this = this
        const preview = document.getElementById('preview')
        const scrllo_val = document.getElementById('scrllo_val')

        preview.onmousemove = function (event) {
            event = event || window.event;
            //2.获取鼠标在整个页面的位置  
            let pagex = event.pageX;
            let pagey = event.pageY;
            //3.获取盒子在整个页面的位置  
            let xx = preview.offsetLeft;
            let yy = preview.offsetTop
            //4.用鼠标的位置减去盒子的位置赋值给盒子的内容。  
            let targetx = pagex - xx;
            let targety = pagey - yy;
            console.log(targety)
            // this.innerHTML = "鼠标在盒子中的X坐标为：" + targetx + "px;<br>鼠标在盒子中的Y坐标为：" + targety + "px;"

            let preview_width = preview.offsetWidth
            let time = targetx / preview_width
            let time_d = time * video_duration//鼠标当前时长

            let scrllo_val_wid = preview_width * time
            scrllo_val.style.width = scrllo_val_wid + 'px'//实时更新进度条


            _this.setState({
                time_d
            }, () => {
                // console.log(time_d)
                if (Number(time_d.toFixed(0)) % 20 === 0) {//避免密集截屏导致卡顿
                    _this.previewFun()
                }
            })
        }
    }
    // 鼠标视频实时预览
    previewFun() {
        let { time_d } = this.state
        const canvas = document.createElement('canvas')
        const video = document.getElementById('video')
        const preview = document.getElementById('preview')

        video.currentTime = time_d//设置视频当前时长

        let context = canvas.getContext('2d');
        context.clearRect(0, 0, 400, 200);                                         //清除画布内容
        context.drawImage(video, 0, 0, 400, 200);

        const img = new Image()                                                    //创建img
        img.src = canvas.toDataURL('image/png')
        //将绘制的图像用img显示

        let childImg = preview.childNodes;
        if (childImg.length > 1) {
            preview.removeChild(childImg[1])//清除已有img
        }

        preview.appendChild(img)
    }
    render() {
        return (
            <div className='video_main'>


                <div className='title'>视频播放--video</div>
                <div id='video_div'>
                    <video id='video' src={this.state.inputVideoUrl} crossOrigin="anonymous" controls="controls" className="video_d">
                        您的浏览器不支持 video 标签。
                </video>
                </div>


                <button onClick={this.buttonFun.bind(this)} style={{ margin: '20px' }}>截取视频</button>

                <div className='title'>截取视频--canvas</div>
                <div className='canvas'>
                    <canvas id="canvas" width="700" height="300"></canvas>
                </div>

                {/* <div className='title'>视频预览</div> */}
                <div id='preview'>
                    <div className='scrllo_bg'>
                        <div id='scrllo_val'></div>
                    </div>
                </div>

            </div>
        )
    }
}
