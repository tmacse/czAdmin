import { Button, Card, Divider, message, Modal, Table } from 'antd';
import React, { Component } from 'react'
import { reqInformUncheckedMessages, reqMailUpdateStatus } from '../../api'
import LinkButton from '../../components/link-button';
import { PAGE_SIZE } from '../../utils/constants';
const { Column } = Table;


export default class InformCheck extends Component {
    state = {
        total: 0, // 未审核留言的总数量
        UnCheckedMails: [], // 未审核留言的数组
        loading: false,//是否正在加载中
    }
    //获取指定页码的列表数据表示
    getUnCheckedMails = async (pageNum) => {
        //发送请求之前，将loading效果设置为true
        this.setState({ loading: true })
        let result
        result = await reqInformUncheckedMessages(pageNum, PAGE_SIZE)
        this.setState({ loading: false })
        if (result.status === 0) {
            const { total, list } = result.data
            this.setState({ total, UnCheckedMails: list })
            console.log(list)
        }
    }
    //审核mail
    checkedMail = (mail) => {
        Modal.confirm({
            content: `确认阅读过来自${mail.department}的${mail.name}邮件:${mail.title}吗?`,
            onOk: async () => {
                const result = await reqMailUpdateStatus(mail.content)
                if (result.err === 0) {
                    message.success('审核文章成功!')
                    this.getUnCheckedMails(1)
                } else if (result.err === -888) {
                    message.error('时间过期，请先登陆')
                } else if (result.err === -999) {
                    message.error('没有该权限')
                } else {
                    message.error('其他错误')
                }
            }
        })
    }

    componentDidMount() {
        this.getUnCheckedMails(1)
    }
    render() {
        const { total, UnCheckedMails, loading } = this.state

        return (
            <Card>
                <Table rowKey='_id' loading={loading}
                    pagination={{
                        total, defaultPageSize: PAGE_SIZE,
                        showQuickJumper: true,
                        onChange: this.getUnCheckedMails,
                    }}
                    dataSource={UnCheckedMails} >
                    <Column title="标题" dataIndex="title" />
                    <Column title="举报人" dataIndex="name" />
                    <Column title="举报单位" dataIndex="department" />
                    <Column title="举报时间" dataIndex='time' />
                    <Column
                        title="处理"
                        key="action"
                        render={(Mailmessage) => (
                            <span>
                                <LinkButton onClick={() => this.props.history.push('/mail/detail', { Mailmessage })}>详情</LinkButton>
                                <Divider type="vertical" />
                                <Button type='primary' onClick={() => this.checkedMail(Mailmessage)}>审阅</Button>
                            </span>
                        )}
                    />
                </Table>
            </Card>
        )
    }
}
