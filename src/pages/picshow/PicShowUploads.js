import React, { Component } from 'react';
import PicShowWall from './PicShowWall'
import { Card, Form, Input, Button, message } from 'antd';
// import RichTextEditor from './RichTextEditor';
import { BASE_ALL_DEPARTMENT } from '../../utils/constants'
import { reqAddOrUpdatePicShow } from '../../api/index';
const { Item } = Form



class PicShowUploads extends Component {
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

                const { title, author, department } = values
                const pics = this.pw.current.getImgs()
                const article = { title, author, department, pics }
                // 如果是更新, 需要添加_id
                if (this.isUpdate) {
                    article._id = this.article._id
                }

                // 2. 调用接口请求函数去添加/更新
                const result = await reqAddOrUpdatePicShow(article)
                console.log(result.err)
                // 3. 根据结果提示
                if (result.err === 0) {
                    message.success(`${this.isUpdate ? '更新' : '添加'}文章成功!`)
                    this.props.history.push('/success', { article })
                } else if (result.err === -999) {
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
        const article = this.props.location.state  // 如果是添加没值, 否则有值
        // 保存是否是更新的标识
        this.isUpdate = !!article
        // 保存商品(如果没有, 保存是{})
        this.article = article || {}
    }

    render() {
        //    console.log(this.article.thumbnail[0])
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
                    <Item label='图片组名'>
                        {
                            getFieldDecorator('title', {
                                initialValue: this.article.title,
                                rules: [
                                    { required: true, message: '必须输入文章名称' },
                                    { max: 60, message: '输入标题过长' }//设置标题名过长错误提示的规则
                                ]
                            })(<Input placeholder='请输入文章名称' />)
                        }
                    </Item>
                    <Item label='图片组作者'>
                        {
                            getFieldDecorator('author', {
                                initialValue: this.article.author,
                                rules: [
                                    { required: true, message: '必须输入文章作者' },
                                    { whitespace: true }
                                ]
                            })(<Input placeholder='请输入作者' />)
                        }

                    </Item>
                    <Item label='图片组单位'>
                        {
                            getFieldDecorator('department', {
                                initialValue: this.article.department,
                                rules: [
                                    { required: true, message: '必须输入作者单位' },
                                    { type: "enum", enum: BASE_ALL_DEPARTMENT }//设置了单位枚举类型

                                ]
                            })(<Input placeholder='请输入单位' />)
                        }

                    </Item>
                    <Item label='图片上传图'>
                        <PicShowWall ref={this.pw} imgs={this.article.pics} />
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
export default Form.create()(PicShowUploads)


/*
1. 子组件调用父组件的方法: 将父组件的方法以函数属性的形式传递给子组件, 子组件就可以调用
2. 父组件调用子组件的方法: 在父组件中通过ref得到子组件标签对象(也就是组件对象), 调用其方法
 */

/*
使用ref
1. 创建ref容器: thi.pw = React.createRef()
2. 将ref容器交给需要获取的标签元素: <PictureWall ref={this.pw} />
3. 通过ref容器读取标签元素: this.pw.current
 */