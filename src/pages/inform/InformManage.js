import React, { Component } from 'react';
import { Table, Divider, message, Modal, Select, Button, Input, Card } from 'antd';
import { PAGE_SIZE } from '../../utils/constants';
import LinkButton from '../../components/link-button';
import { reqInformMessages, reqDeleteMail, reqSearchInform } from '../../api'
const { Column } = Table;
const Option = Select.Option



class InformManage extends Component {
    state = {
        total: 0, // 留言的总数量
        Mailmessages: [], // 文章的数组
        loading: false,//是否正在加载中
        searchName: '', // 搜索的关键字
        searchType: 'mailTitle', // 根据哪个字段搜索
    }
    //获取指定页码的列表数据表示
    getMail = async (pageNum) => {
        //发送请求之前，将loading效果设置为true
        this.setState({ loading: true })
        console.log(this.state)
        const { searchName, searchType } = this.state
        let result
        if (searchName) {
            result = await reqSearchInform({ pageNum, pageSize: PAGE_SIZE, searchName, searchType })
        } else { // 一般分页请求
            result = await reqInformMessages(pageNum, PAGE_SIZE)
        }
        this.setState({ loading: false })
        if (result.status === 0) {
            const { total, list } = result.data
            console.log(list)
            this.setState({
                total,
                Mailmessages: list
            })
        }
    }
    /*
删除指定邮件
*/
    deleteMail = (Mailmessage) => {
        Modal.confirm({
            title: `确认删除[${Mailmessage.title}]吗?`,
            onOk: async () => {
                const result = await reqDeleteMail(Mailmessage._id)
                if (result.err === 0) {
                    message.success('删除通知成功!')
                    this.getMail(1)
                } else if (result.err === -888) {
                    message.error('登陆过期,请重新登陆')
                } else {
                    message.error('other error')
                }
            }
        })
    }
    componentDidMount() {
        this.getMail(1)
    }
    render() {
        const { Mailmessages, total, loading, searchName, searchType } = this.state

        const head = (
            <span>
                <Select
                    value={searchType}
                    style={{ width: 150 }}
                    onChange={value => this.setState({ searchType: value })}
                >
                    <Option value='mailTitle'>按邮件名搜索</Option>
                    <Option value='mailAuthor'>按投递人搜索</Option>
                    <Option value='mailContent'>按内容搜索</Option>
                    <Option value='mailDepartment'>按投递单位搜索</Option>

                </Select>
                <Input
                    placeholder='关键字'
                    style={{ width: 150, margin: '0 15px' }}
                    value={searchName}
                    onChange={event => this.setState({ searchName: event.target.value })}
                />
                <Button type='primary' onClick={() => this.getMail(1)}>搜索</Button>
            </span>
        )
        return (
            <Card title={head}>
                <Table
                    rowKey='_id'
                    loading={loading}
                    //分页的配置对象
                    pagination={{
                        total,
                        defaultPageSize: PAGE_SIZE,
                        showQuickJumper: true,
                        onChange: this.getMail,

                    }}
                    dataSource={Mailmessages}>
                    <Column title="邮件名" dataIndex="title" />
                    <Column title="投递人" dataIndex="name" />
                    <Column title="投递单位" dataIndex="department" />
                    <Column title="投递时间" dataIndex='time' />
                    <Column
                        title="处理"
                        key="action"
                        render={(Mailmessage) => (
                            <span>
                                <LinkButton onClick={() => this.props.history.push('/mail/detail', { Mailmessage })}>详情</LinkButton>
                                <Divider type='vertical' />
                                <LinkButton onClick={() => this.deleteMail(Mailmessage)}>删除</LinkButton>
                            </span>
                        )}
                    />
                </Table>
            </Card>
        )

    }
}
export default InformManage;