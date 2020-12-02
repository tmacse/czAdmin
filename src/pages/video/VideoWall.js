import React from 'react'
import { Upload, Icon, Modal, message } from 'antd'
import { reqDeleteVideo } from '../../api'
import TruncVideo from './TruncVideo';
/*
用于视频上传的组件
 */
export default class VideoWall extends React.Component {
    constructor(props) {
        super()
        this.getThumbnail = React.createRef()
    }

    state = {
        previewVisible: false, // 标识是否显示大图预览Modal
        previewImage: '', // 大图的url
        fileList: [],
        // thumbnail: '123'
    };


    /*
      获取所有已上传视频文件名的数组
       */
    getUrls = () => {
        //通过ref取到子组件截取图片的base值，然后传给父组件，父组件打包后传递给父组件的父组件
        return { file: this.state.fileList.map(file => file.name), thumbnail: this.getThumbnail.current.getThumbnail() }
    };

    /*
    隐藏Modal
     */
    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = file => {
        console.log('handlePreview()', file)
        // 显示指定file对应的大图
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    };

    /*
    file: 当前操作的图片文件(上传/删除)
    fileList: 所有已上传图片文件对象的数组
     */
    handleChange = async ({ file, fileList }) => {
        console.log('handleChange()', file.status, fileList.length, file === fileList[fileList.length - 1])

        // 一旦上传成功, 将当前上传的file的信息修正(name, url)
        if (file.status === 'done') {
            const result = file.response  // {status: 0, data: {name: 'xxx.jpg', url: '图片地址'}}
            console.log('111', result.data.url)
            // this.setState({ url: result.data.url })

            if (result.status === 0) {
                message.success('上传视频成功!')
                const { name, url } = result.data
                file = fileList[fileList.length - 1]
                file.name = name
                file.url = url
                // this.setState({ url: url })
            } else {
                message.error('上传视频失败')
            }
        } else if (file.status === 'removed') { // 删除图片
            const result = await reqDeleteVideo(file.name)
            if (result.status === 0) {
                message.success('删除视频成功!')
            } else {
                message.error('删除视频失败!')
            }
        }

        // 在操作(上传/删除)过程中更新fileList状态
        this.setState({ fileList })
        // console.log(fileList[0].name)
    };


    render() {
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div>Upload</div>
            </div>
        );
        return (
            <div>
                <Upload
                    action="/videoFile/uploads" /*上传视频的接口地址*/
                    accept=".mp4, .rmvb, .avi"  /*只接收视频格式*/
                    name='video' /*请求参数名*/
                    listType="picture-card"  /*卡片样式*/
                    fileList={fileList}  /*所有已上传图片文件对象的数组*/
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                    {fileList.length >= 100 ? null : uploadButton}
                </Upload>

                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <video alt="video" style={{ width: '100%' }} src={previewImage} />
                </Modal>
                <TruncVideo url={fileList} ref={this.getThumbnail} />
            </div>
        );
    }
}