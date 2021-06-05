//这是一个先进个人填写的组件
import React, { Component } from 'react'
import { Card, Form, Input, Select, Button, message } from 'antd'
import { BASE_ALL_TUPLE_DEPARTMENT } from '../../utils/constants'
import { reqAddSolo } from '../../api/index'

const { Item } = Form
const { Option } = Select;
const { TextArea } = Input;

class Solo extends Component {
    submit = () => {
        // 进行表单验证, 如果通过了, 才发送请求
        this.props.form.validateFields(async (error, values) => {
            if (!error) {
                const unit = values
                console.log(unit)
                // 2. 调用接口请求函数去添加/更新
                const result = await reqAddSolo(unit)
                console.log(result)

                // 3. 根据结果提示
                if (result.err === 0) {
                    message.success('录入成功!')
                    this.props.history.push('/success')
                }
            }
        })
    }
    render() {
        const formItemLayout = {
            labelCol: { xs: { span: 2 }, sm: { span: 2 }, },//左侧的宽度
            wrapperCol: { xs: { span: 22 }, sm: { span: 22 }, },//右侧的宽度
        };
        const { getFieldDecorator } = this.props.form;
        return (
            <Card>
                <Form {...formItemLayout}>
                    <Item label="季度选择">
                        {getFieldDecorator('season', {
                            initialValue: 'season1',
                            rules: [{ required: true, message: '必须选择季度!' }],
                        })(
                            <Select
                                placeholder="请选择以下分类"
                                onChange={this.handleSelectChange}
                            >
                                <Option value="season1">第一季度</Option>
                                <Option value="season2">第二季度</Option>
                                <Option value="season3">第三季度</Option>
                                <Option value="season4">第四季度</Option>
                            </Select>,
                        )}
                    </Item>
                    {
                        BASE_ALL_TUPLE_DEPARTMENT.slice(3).map((item) => {
                            return (
                                <Item key={item.name} label={item.Cname}>
                                    {getFieldDecorator(`${item.name}`, {
                                        initialValue: '',
                                        rules: [{ required: true, message: '必须填写先进个人' }],
                                    })(<TextArea rows={2} />)}
                                </Item>
                            )
                        })
                    }
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
export default Form.create()(Solo)