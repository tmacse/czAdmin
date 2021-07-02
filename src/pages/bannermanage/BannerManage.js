import React from 'react';
import './index.css';
import { Card, Form, Input, Button, message } from 'antd';
// import {  Carousel } from 'antd';
import PicWall from './PicWall';
import { reqAddBannerpic } from '../../api'
const { Item } = Form

const BannerManage = (props) => {

    // 创建用来保存ref标识的标签对象的容器
    const pw = React.createRef()
    const { getFieldDecorator } = props.form

    function submit() {
        // 进行表单验证, 如果通过了, 才发送请求
        props.form.validateFields(async (error, values) => {
            if (!error) {
                //1.收集数据，2调用接口请求函数添加3.根据结果提示
                const { url_address } = values
                const url = pw.current.getImgs()
                const bannerpic = { url, url_address }
                const result = await reqAddBannerpic(bannerpic)
                if (result.err === 0) {
                    message.success('添加成功')
                    props.history.push('/success', { bannerpic })
                }
                else {
                    message.error('添加错误')
                }
            }
        })

    }
    //图片已经跟后台做好连接，现在最多显示5个图片
    const formItemLayout = {
        labelCol: {
            xs: { span: 2 },//左侧的宽度
            sm: { span: 2 },
        },
        wrapperCol: {
            xs: { span: 20 },//右侧的宽度
            sm: { span: 20 },
        },
    };
    return (
        <Card>
            <Form {...formItemLayout}>
                <Item label='链接地址'>
                    {
                        getFieldDecorator('url_address', {
                            initialValue: '',
                            rules: [
                                { required: true, message: '必须输入链接地址' },
                                { max: 300, message: '输入标题过长' }//设置标题名过长错误提示的规则
                            ]
                        })(<Input placeholder='请输入地址' />)
                    }
                </Item>

                <Item label='文章封面图'>
                    <PicWall ref={pw} />
                </Item>
                <Item>
                    <Button style={{ marginLeft: '10%' }}
                        type='primary'
                        block onClick={submit}>提交</Button>
                </Item>
            </Form>
        </Card>
    )
}

export default Form.create()(BannerManage)