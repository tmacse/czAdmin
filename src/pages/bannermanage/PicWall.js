import React, { useState } from 'react';
import { Upload, Icon, Modal, message } from 'antd';
import { reqDeleteImg } from '../../api'


const PicWall = () => {
    const [previewVisible, setPreviewVisible] = useState(false)
    const [previewImage, setPreviewImage] = useState('')
    const [fileList, setFileList] = useState([])
    /*
  获取所有已上传图片文件名的数组
   */
    // function getImgs() {
    //     return fileList.map(file => file.name)
    // };
    //隐藏model
    function handleCancel() {
        setPreviewVisible(false)
    }

    function handlePreview(file) {
        //显示指定file对应的大图
        setPreviewImage(file.url || file.preview)
        setPreviewVisible(true)
    };
    //filelist是所有已上传图片的数组,file是当前操作的图片文件

    async function handleChange({ file, fileList }) {
        // 一旦上传成功, 将当前上传的file的信息修正(name, url)
        if (file.status === 'done') {
            const result = file.response  // {status: 0, data: {name: 'xxx.jpg', url: '图片地址'}}
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
        setFileList(fileList)
    };

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
                onPreview={handlePreview}
                onChange={handleChange}
            >
                {fileList.length >= 1 ? null : uploadButton}
            </Upload>
            <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </div>
    );
}


export default PicWall