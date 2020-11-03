import React, { Component } from 'react';
import { Table, Divider, message, Modal, Select, Button, Input, Card } from 'antd';
import { PAGE_SIZE } from '../../utils/constants';
import LinkButton from '../../components/link-button';
import { reqDepartmentMessages, reqDeleteMessages, reqSearchMessages } from '../../api'
const { Column } = Table;
const Option = Select.Option

class MessageManage extends Component {
    state = {
        total: 0, // 商品的总数量
        Dmessages: [], // 文章的数组
        loading: false,//是否正在加载中
        searchName: '', // 搜索的关键字
        searchType: 'noticeTitle', // 根据哪个字段搜索
    }
    //获取指定页码的列表数据表示
    getBookFiles = async (pageNum) => {
        //发送请求之前，将loading效果设置为true
        this.setState({ loading: true })
        const { searchName, searchType } = this.state
        let result
        if (searchName) {
            result = await reqSearchMessages({ pageNum, pageSize: PAGE_SIZE, searchName, searchType })
        } else { // 一般分页请求
            result = await reqDepartmentMessages(pageNum, PAGE_SIZE)
        }
        this.setState({ loading: false })
        if (result.status === 0) {
            const { total, list } = result.data
            console.log(list)
            this.setState({
                total,
                Dmessages: list
            })
        }
    }
    /*
删除指定新闻
*/
    deleteBookFile = (Dmessage) => {
        Modal.confirm({
            title: `确认删除****[${Dmessage.title}]****吗?`,
            onOk: async () => {
                const result = await reqDeleteMessages(Dmessage.title)
                if (result.err === 0) {
                    message.success('删除通知成功!')
                    this.getBookFiles(1)
                } else if (result.err === -888) {
                    message.error('登陆过期,请重新登陆')
                }else{
                    message.error('other error')
                }
            }
        })
    }
    componentDidMount() {
        this.getBookFiles(1)
    }
    render() {
        const { Dmessages, total, loading, searchName, searchType } = this.state

        const head = (
            <span>
                <Select
                    value={searchType}
                    style={{ width: 150 }}
                    onChange={value => this.setState({ searchType: value })}
                >
                    <Option value='noticeTitle'>按标题名搜索</Option>
                    <Option value='noticeAuthor'>按作者搜索</Option>
                    <Option value='noticeContent'>按内容搜索</Option>
                    <Option value='noticeDepartment'>按发布单位搜索</Option>

                </Select>
                <Input
                    placeholder='关键字'
                    style={{ width: 150, margin: '0 15px' }}
                    value={searchName}
                    onChange={event => this.setState({ searchName: event.target.value })}
                />
                <Button type='primary' onClick={() => this.getBookFiles(1)}>搜索</Button>
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
                        onChange: this.getBookFiles,

                    }}
                    dataSource={Dmessages}>
                    <Column title="title" dataIndex="title" />
                    <Column title="作者" dataIndex="author" />
                    <Column title="单位" dataIndex="department" />
                    <Column title="发布时间" dataIndex='time' />
                    <Column
                        title="处理"
                        key="action"
                        render={(Dmessage) => (
                            <span>
                                <LinkButton onClick={() => this.props.history.push('/departmentMessage/detail', {Dmessage })}>详情</LinkButton>
                                <Divider type="vertical" />
                                <LinkButton onClick={() => this.props.history.push('/departmentMessage/write', Dmessage)}>修改</LinkButton>
                                <Divider type='vertical' />
                                <LinkButton onClick={() => this.deleteBookFile(Dmessage)}>删除</LinkButton>
                            </span>
                        )}
                    />
                </Table>
            </Card>
        )

    }
}
export default MessageManage;