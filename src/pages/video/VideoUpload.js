import React, { Component } from 'react';
import { Card, Form, Input, Button, message, Select } from 'antd';
import VideoWall from './VideoWall'
import { reqAddVideos } from '../../api'
import './index.css'
// import TruncVideo from './TruncVideo';
const { TextArea } = Input
const { Item } = Form
const { Option } = Select;

class VideoUpload extends Component {
    constructor(props) {
        super(props)
        // 创建用来保存ref标识的标签对象的容器
        this.pw = React.createRef()
        // this.state = {
        //     url: '',
        // }
    }
    submit = () => {
        // 进行表单验证, 如果通过了, 才发送请求
        this.props.form.validateFields(async (error, values) => {
            if (!error) {
                //1.收集数据，2调用接口请求函数添加3.根据结果提示
                const { title, desc, attr, main_actor, director } = values
                const url = this.pw.current.getUrls().file;
                const thumbnail = this.pw.current.getUrls().thumbnail
                console.log('thumbnail', thumbnail)
                const video = { title, desc, attr, url, main_actor, director, thumbnail }
                const result = await reqAddVideos(video)
                if (result.err === 0) {
                    message.success('视频上传成功')
                    this.props.history.push('/success', { video })
                }
                else {
                    message.error('视频上传错误')
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
                    <Item label="视频分类">
                        {getFieldDecorator('attr', {
                            rules: [{ required: true, message: '必须选择视频分类!' }],
                        })(
                            <Select
                                placeholder="请选择以下视频分类"
                                onChange={this.handleSelectChange}
                            >
                                <Option value="强军影视">强军影视</Option>
                                <Option value="练兵备战">练兵备战</Option>
                                <Option value="创意视频">创意视频</Option>
                                <Option value="强军新闻">强军新闻</Option>
                            </Select>,
                        )}
                    </Item>
                    <Item label='视频名'>
                        {
                            getFieldDecorator('title', {
                                initialValue: '',
                                rules: [
                                    { required: true, message: '必须输入视频名称' },
                                    { max: 50, message: '输入标题过长' }//设置标题名过长错误提示的规则
                                ]
                            })(<Input placeholder='请输入视频名' />)
                        }
                    </Item>
                    <Item label='导演'>
                        {
                            getFieldDecorator('director', {
                                initialValue: '',
                                rules: [
                                    { required: true, message: '必须输入导演' },
                                    { max: 30, message: '输入标题过长' }//设置标题名过长错误提示的规则
                                ]
                            })(<Input placeholder='请输入导演' />)
                        }
                    </Item>
                    <Item label='演员'>
                        {
                            getFieldDecorator('main_actor', {
                                initialValue: '',
                                rules: [
                                    { required: true, message: '必须输入主演' },
                                    { max: 100, message: '输入标题过长' }//设置标题名过长错误提示的规则
                                ]
                            })(<Input placeholder='请输入导演' />)
                        }
                    </Item>
                    <Item label='视频描述'>
                        {
                            getFieldDecorator('desc', {
                                initialValue: '',
                                rules: [
                                    { required: true, message: '必须输入视频描述' },
                                ]
                            })(<TextArea autosize={{ minRows: 2, maxRows: 6 }} placeholder='请输入视频描述'></TextArea>)
                        }

                    </Item>
                    <Item className='soft'>
                        <VideoWall ref={this.pw} />
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

export default Form.create()(VideoUpload);