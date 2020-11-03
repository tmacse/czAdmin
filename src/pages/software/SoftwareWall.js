import React from 'react'
import { Upload, Icon, Modal, message } from 'antd'
import { reqDeleteSoftware } from '../../api'
/*
用于软件上传的组件
 */
export default class SoftwareWall extends React.Component {


    state = {
        previewVisible: false, // 标识是否显示大图预览Modal
        previewImage: '', // 大图的url
        fileList: [],
    }
    /*
      获取所有已上传软件文件名的数组
       */
    getUrls = () => {
        return this.state.fileList.map(file => file.name)
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
    file: 当前操作的视频文件(上传/删除)
    fileList: 所有已上传视频文件对象的数组
     */
    handleChange = async ({ file, fileList }) => {
        console.log('handleChange()', file.status, fileList.length, file === fileList[fileList.length - 1])

        // 一旦上传成功, 将当前上传的file的信息修正(name, url)
        if (file.status === 'done') {
            const result = file.response  // {status: 0, data: {name: 'xxx.jpg', url: '图片地址'}}
            console.log(result)
            if (result.status === 0) {
                message.success('上传软件成功!')
                const { name, url } = result.data
                file = fileList[fileList.length - 1]
                file.name = name
                file.url = url
            } else {
                message.error('上传软件失败')
            }
        } else if (file.status === 'removed') { // 删除图片
            const result = await reqDeleteSoftware(file.name)
            if (result.status === 0) {
                message.success('删除软件成功!')
            } else {
                message.error('删除软件失败!')
            }
        }

        // 在操作(上传/删除)过程中更新fileList状态
        this.setState({ fileList })
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
                    action="/softwareFile/uploads" /*上传软件的接口地址*/
                    accept=".exe, .rar, .zip, .msi"  /*只接收软件格式*/
                    name='software' /*请求参数名*/
                    listType="picture-card"  /*卡片样式*/
                    fileList={fileList}  /*所有已上传图片文件对象的数组*/
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                    {fileList.length >= 1 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        );
    }
}