import React from 'react';
import { Upload, Icon, Modal,message } from 'antd';
import { reqDeleteImg } from '../../api'


class PicWall extends React.Component {
    state = {
        previewVisible: false,//标识是否显示大图预览
        previewImage: '',//大图的URL地址
        fileList: [],
    };
    /*
  获取所有已上传图片文件名的数组
   */
    getImgs = () => {
        return this.state.fileList.map(file => file.name)
    };
//隐藏model
    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview =  file => {  
    //显示指定file对应的大图
        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        });
    };
//filelist是所有已上传图片的数组,file是当前操作的图片文件
    handleChange = async({ file,fileList }) => {
        console.log('handlechange',file.status,fileList)
        // 一旦上传成功, 将当前上传的file的信息修正(name, url)
        if (file.status === 'done') {
            const result = file.response  // {status: 0, data: {name: 'xxx.jpg', url: '图片地址'}}
            console.log(result)
            if (result.status === 0) {
                message.success('上传图片成功!')
                const { name, url } = result.data
                file = fileList[fileList.length - 1]
                file.name = name
                file.url = url
            } else {
                message.error('上传图片失败')
            }
        } else if (file.status === 'removed') { // 删除图片
            const result = await reqDeleteImg(file.name)
            if (result.status === 0) {
                message.success('删除图片成功!')
            } else {
                message.error('删除图片失败!')
            }
        }
//在操作（上传/删除）过程中更新filelist状态
        this.setState({ fileList })
    };
    render() {
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">上传</div>
            </div>
        );
        return (
            <div>
                <Upload
                    action="/imageFile/banneruploads" /*上传图片的接口地址*/
                    accept='image/*'  /*只接收图片格式*/
                    name='banner-img' /*请求参数名（后台指定）*/
                    listType="picture-card"
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

export default PicWall