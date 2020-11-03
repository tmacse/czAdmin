import React, { Component } from 'react';
import { Card, Form, Input, Button, message, Select } from 'antd';
// import RichTextEditor from '../newsmanage/RichTextEditor'
import { BASE_ZZ_DEPARTMENT } from '../../utils/constants'
import { reqAddOrUpdateNotice } from '../../api/index';
import EditorDemo from '../newsmanage/RichText';
const { Item } = Form
const { Option } = Select;


class WriteNotice extends Component {
    constructor(props) {
        super(props)
        // 创建用来保存ref标识的标签对象的容器
        this.editor = React.createRef()
    }
    submit = () => {
        // 进行表单验证, 如果通过了, 才发送请求
        this.props.form.validateFields(async (error, values) => {
            if (!error) {
                //1.收集数据，2调用接口请求函数添加3.根据结果提示
                // console.log('ok')

                const { title, author, department, category } = values
                
                const content = this.editor.current.getDetail()
                const notice = { title, author, department, category, content }
                // 2.如果是更新, 需要添加_id
                if (this.isUpdate) {
                    notice._id = this.notice._id
                }

                // 2. 调用接口请求函数去添加/更新
                const result = await reqAddOrUpdateNotice(notice)

                // 3. 根据结果提示
                if (result.err === 0) {
                    message.success(`${this.isUpdate ? '更新' : '添加'}文章成功!`)
                    this.props.history.goBack()
                }else if(result.err === -999){
                    message.error('没有该权限，不要调皮')
                } else if (result.err === -888) {
                    message.error('登陆过期,请重新登陆')
                }
                 else {
                    message.error(`${this.isUpdate ? '更新' : '添加'}文章失败!`)
                }
            }
        })

    }
    componentWillMount() {
        // 取出携带的state
        const notice = this.props.location.state  // 如果是添加没值, 否则有值
        // 保存是否是更新的标识
        console.log(notice)
        this.isUpdate = !!notice
        // 保存商品(如果没有, 保存是{})
        this.notice = notice || {}
    }
    render() {
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

        const { getFieldDecorator } = this.props.form;
        return (
            <Card>
                <Form {...formItemLayout}>
                    <Item label="分类">
                        {getFieldDecorator('category', {
                            initialValue:this.notice.category,
                            rules: [{ required: true, message: '必须选择文章分类!' }],
                        })(
                            <Select
                                placeholder="请选择分类"
                                onChange={this.handleSelectChange}
                            >
                                <Option value="通知">通知</Option>
                            </Select>,
                        )}
                    </Item>
                    <Item label='通知名'>
                        {
                            getFieldDecorator('title', {
                                initialValue: this.notice.title,
                                rules: [
                                    { required: true, message: '必须输入title' },
                                    { max: 70, message: '输入标题过长' }//设置标题名过长错误提示的规则
                                ]
                            })(<Input placeholder='请输入title' />)
                        }
                    </Item>
                    <Item label='作者'>
                        {
                            getFieldDecorator('author', {
                                initialValue: this.notice.author,
                                rules: [
                                    { required: true, message: '必须输入作者' },
                                ]
                            })(<Input placeholder='请输入作者' />)
                        }

                    </Item>
                    <Item label='单位'>
                        {
                            getFieldDecorator('department', {
                                initialValue: this.notice.department,
                                rules: [
                                    { required: true, message: '必须输入作者单位' },
                                    { type: "enum", enum: BASE_ZZ_DEPARTMENT }//设置了单位枚举类型

                                ]
                            })(<Input placeholder='请输入单位' />)
                        }

                    </Item>
                   
                    <Item label="详情" labelCol={{ span: 2 }} wrapperCol={{ span: 20 }}>
                        {/* <RichTextEditor ref={this.editor} detail = {this.notice.content}/> */}
                        <EditorDemo ref={this.editor} detail={this.notice.content}/>
                    </Item>

                    <Item>
                        <Button style={{ marginLeft: '10%' }}
                            type='primary'
                            block onClick={this.submit}>提交</Button>
                    </Item>
                </Form>
            </Card>
        )
    }
}
export default Form.create() (WriteNotice)