import React, { Component } from 'react';
import { Card, Form, Input, Button, message } from 'antd';
import MusicWall from './MusicWall'
import { reqAddMusics } from '../../../api'
import './index.css'

const { Item } = Form


class MusicUpload extends Component {
    constructor(props) {
        super(props)

        // 创建用来保存ref标识的标签对象的容器
        this.pw = React.createRef()
    }
    submit = () => {
        // 进行表单验证, 如果通过了, 才发送请求
        this.props.form.validateFields(async (error, values) => {
            if (!error) {
                //1.收集数据，2调用接口请求函数添加3.根据结果提示
                // console.log('ok')

                const { name, desc, actor } = values
                const url = this.pw.current.getUrls()
                const music = { name, desc, actor,url }
                console.log(music)
                const result = await reqAddMusics(music)
                console.log(result)
                if (result.err === 0) {
                    message.success('音乐上传成功')

                    this.props.history.push('/success', { music })
                }
                else {
                    message.error('音乐上传错误')
                }
            }
        })

    }
    render() {
        const formItemLayout = {
            labelCol: {
                xs: { span: 2 },//左侧的宽度
                sm: { span: 2 },
            },
            wrapperCol: {
                xs: { span: 14 },//右侧的宽度
                sm: { span: 14 },
            },
        };

        const { getFieldDecorator } = this.props.form;
        return (
            <Card>
                <Form {...formItemLayout}>
                    <Item label='音乐名'>
                        {
                            getFieldDecorator('name', {
                                initialValue: '',
                                rules: [
                                    { required: true, message: '必须输入音乐名称' },
                                    { max: 50, message: '输入标题过长' }//设置标题名过长错误提示的规则
                                ]
                            })(<Input placeholder='请输入音乐名' />)
                        }
                    </Item>
                    <Item label='演唱员'>
                        {
                            getFieldDecorator('actor', {
                                initialValue: '',
                                rules: [
                                    { required: true, message: '必须输入主演' },
                                    { max: 100, message: '输入标题过长' }//设置标题名过长错误提示的规则
                                ]
                            })(<Input placeholder='请输入导演' />)
                        }
                    </Item>
                    <Item className='soft'>
                        <MusicWall ref={this.pw} />
                    </Item>
                    <Item>
                        <Button style={{ marginLeft: '14%' }}
                            type='primary' block
                            onClick={this.submit}>提交</Button>
                    </Item>
                </Form>
            </Card>
        )
    }
}

export default Form.create()(MusicUpload);