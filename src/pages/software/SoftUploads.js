import React, { Component } from 'react';
import { Card, Form, Input, Button, message, Select } from 'antd';
import SoftwareWall from './SoftwareWall';
import {reqAddSoftwares} from '../../api'
import './index.css'
const { Item } = Form
const { Option } = Select;

class SoftUpload extends Component {
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

                const { name,platform,attr} = values
                const url = this.pw.current.getUrls()
                const software = { name,platform,attr,url}
                console.log(software)
                const result = await reqAddSoftwares(software)
                console.log(result)
                if (result.err === 0) {
                    message.success('软件上传成功')
                    //新闻发送成功后，跳转到新闻预览页面 

                    this.props.history.push('/success', { software })
                }
                else {
                    message.error('软件上传错误')
                }
            }
        })

    }
    render() {
        const formItemLayout = {
            labelCol: {
                xs: { span: 2},//左侧的宽度
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
                    <Item label="软件分类">
                        {getFieldDecorator('attr', {
                            rules: [{ required: true, message: '必须选择软件分类!' }],
                        })(
                            <Select
                                placeholder="请选择以下软件分类"
                                onChange={this.handleSelectChange}
                            >
                                <Option value="浏览器">浏览器</Option>
                                <Option value="系统">系统</Option>
                                <Option value="杀毒软件">杀毒软件</Option>
                            </Select>,
                        )}
                    </Item>
                    <Item label='软件名'>
                        {
                            getFieldDecorator('name', {
                                initialValue: '',
                                rules: [
                                    { required: true, message: '必须输入软件名称' },
                                    { max: 10, message: '输入标题过长' }//设置标题名过长错误提示的规则
                                ]
                            })(<Input placeholder='请输入软件名' />)
                        }
                    </Item>
                    <Item label='所属平台'>
                        {
                            getFieldDecorator('platform', {
                                initialValue: '',
                                rules: [
                                    { required: true, message: '必须输入所属平台' },
                                ]
                            })(<Input placeholder='请输入' />)
                        }

                    </Item>
                    <Item className='soft'>
                        <SoftwareWall ref={this.pw}/>
                    </Item>
                    <Item> 
                         <Button style={{ marginLeft: '14%' }}
                        type='primary'  block
                        onClick={this.submit}>提交</Button>
                    </Item>
                </Form>
            </Card>
        )
    }
}

export default Form.create()(SoftUpload);