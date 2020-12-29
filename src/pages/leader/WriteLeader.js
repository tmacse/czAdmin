import React, { Component } from 'react'
import { Card, Form, Input, Button, message } from 'antd';
import { reqAddLeaderName } from '../../api/index'
const { Item } = Form


class WriteLeader extends Component {
    submit = () => {
        // 进行表单验证, 如果通过了, 才发送请求
        this.props.form.validateFields(async (error, values) => {
            if (!error) {
                //1.收集数据，2调用接口请求函数添加3.根据结果提示
                // console.log('ok')
                const { leader, adviser } = values
                const leadername = { leader, adviser }
                const result = await reqAddLeaderName(leadername)
                console.log(result.err)
                if (result.err === 0) {
                    message.success('添加值班领导成功!')
                    this.props.history.push('/success', { leadername })
                }
                else {
                    message.error('添加值班领导失败!')
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
                xs: { span: 20 },//右侧的宽度
                sm: { span: 20 },
            },
        };
        const { getFieldDecorator } = this.props.form;
        return (
            <Card>
                <Form {...formItemLayout}>
                    <Item label="值班首长">
                        {getFieldDecorator('leader', {
                            initialValue: '',
                            rules: [{ required: true, message: '必须输入首长姓名!' }],
                        })(<Input placeholder='请输入首长姓名' />)}
                    </Item>

                    <Item label='值班参谋'>
                        {
                            getFieldDecorator('adviser', {
                                initialValue: '',
                                rules: [
                                    { required: true, message: '必须输入参谋名字' },
                                    { whitespace: true }
                                ]
                            })(<Input placeholder='请输入参谋名字' />)
                        }

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
export default Form.create()(WriteLeader)