import React from 'react';
import { Card, Form, Input, Button, message, Select } from 'antd';
// import RichTextEditor from '../newsmanage/RichTextEditor'
import { BASE_ALL_DEPARTMENT } from '../../utils/constants'
import { reqAddOrUpdateBookFile } from '../../api/index';
import EditorDemo from '../newsmanage/RichText';
const { Item } = Form
const { Option } = Select;

const WriteBookFile = (props) => {
    // 创建用来保存ref标识的标签对象的容器
    const editor = React.createRef()
    const { getFieldDecorator } = props.form;
    // 取出携带的state
    let bookfile = props.location.state  // 如果是添加没值, 否则有值
    // 保存是否是更新的标识
    const isUpdate = !!bookfile
    // 保存商品(如果没有, 保存是{})
    bookfile = bookfile || {}
    function submit() {
        // 进行表单验证, 如果通过了, 才发送请求
        props.form.validateFields(async (error, values) => {
            if (!error) {
                //1.收集数据，2调用接口请求函数添加3.根据结果提示
                // console.log('ok')
                const { title, author, department, category } = values
                const content = editor.current.getDetail()
                const bookfile = { title, author, department, category, content }
                // 如果是更新, 需要添加_id
                if (isUpdate) {
                    bookfile._id = this.bookfile._id
                }

                // 2. 调用接口请求函数去添加/更新
                const result = await reqAddOrUpdateBookFile(bookfile)

                // 3. 根据结果提示
                if (result.err === 0) {
                    message.success(`${isUpdate ? '更新' : '添加'}文章成功!`)
                    this.props.history.goBack()
                } else {
                    message.error(`${isUpdate ? '更新' : '添加'}文章失败!`)
                }
            }
        })

    }

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

    const { category, title, author, department, content } = bookfile
    return (
        <Card>
            <Form {...formItemLayout}>
                <Item label="分类">
                    {getFieldDecorator('category', {
                        initialValue: category,
                        rules: [{ required: true, message: '必须选择文章分类!' }],
                    })(
                        <Select
                            placeholder="请选择分类"
                        >
                            <Option value="政工教案">政工教案</Option>
                        </Select>,
                    )}
                </Item>
                <Item label='教案名'>
                    {
                        getFieldDecorator('title', {
                            initialValue: title,
                            rules: [
                                { required: true, message: '必须输入title' },
                                { max: 27, message: '输入标题过长' }//设置标题名过长错误提示的规则
                            ]
                        })(<Input placeholder='请输入title' />)
                    }
                </Item>
                <Item label='作者'>
                    {
                        getFieldDecorator('author', {
                            initialValue: author,
                            rules: [
                                { required: true, message: '必须输入作者' },
                            ]
                        })(<Input placeholder='请输入作者' />)
                    }

                </Item>
                <Item label='单位'>
                    {
                        getFieldDecorator('department', {
                            initialValue: department,
                            rules: [
                                { required: true, message: '必须输入作者单位' },
                                { type: "enum", enum: BASE_ALL_DEPARTMENT }//设置了单位枚举类型

                            ]
                        })(<Input placeholder='请输入单位' />)
                    }

                </Item>

                <Item label="详情" labelCol={{ span: 2 }} wrapperCol={{ span: 20 }}>
                    <EditorDemo ref={editor} detail={content} />
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

export default Form.create()(WriteBookFile)