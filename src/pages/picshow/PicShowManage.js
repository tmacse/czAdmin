import React, { Component } from 'react';
import { Table, Divider, message, Modal, Select, Button, Input, Card } from 'antd';

import { PAGE_SIZE } from '../../utils/constants';
import LinkButton from '../../components/link-button';
import { reqPicShow, reqDeletePicShow, reqSearchPicshow } from '../../api'
const { Column } = Table;
const Option = Select.Option



class PicShowManage extends Component {
    state = {
        total: 0, // 商品的总数量
        notices: [], // 文章的数组
        loading: false,//是否正在加载中
        searchName: '', // 搜索的关键字
        searchType: 'noticeTitle', // 根据哪个字段搜索

    }

    //获取指定页码的列表数据表示
    getNotices = async (pageNum) => {
        //发送请求之前，将loading效果设置为true
        this.setState({ loading: true })
        const { searchName, searchType } = this.state
        let result
        if (searchName) {
            result = await reqSearchPicshow({ pageNum, pageSize: PAGE_SIZE, searchName, searchType })
        } else { // 一般分页请求
            result = await reqPicShow(pageNum, PAGE_SIZE)
        }
        // const result = await reqCheckedArticles(pageNum, PAGE_SIZE,searchName,searchType)
        //请求结束之后将loading效果设置为false
        this.setState({ loading: false })
        if (result.status === 0) {
            const { total, list } = result.data
            console.log(list)
            this.setState({
                total,
                notices: list
            })
        }
    }
    /*
删除指定新闻
*/
    deleteArticle = (notice) => {
        Modal.confirm({
            title: `确认删除****[${notice.title}]****吗?`,
            onOk: async () => {
                const result = await reqDeletePicShow(notice.title)
                if (result.err === 0) {
                    message.success('删除通知成功!')
                    this.getNotices(1)
                } else if (result.err === -999) {
                    message.error('不要调皮，你没有该权限')
                } else if (result.err === -888) {
                    message.error('登陆过期,请重新登陆')
                } else {
                    message.error('出现其他错误')
                }
            }
        })
    }

    componentDidMount() {
        this.getNotices(1)
    }
    render() {
        const { notices, total, loading, searchName, searchType } = this.state

        const head = (
            <span>
                <Select
                    value={searchType}
                    style={{ width: 150 }}
                    onChange={value => this.setState({ searchType: value })}
                >
                    <Option value='noticeTitle'>按图片组搜索</Option>
                    {/* <Option value='articleCategory'>按文章分类搜索</Option> */}
                    <Option value='noticeAuthor'>按图片作者搜索</Option>
                    <Option value='noticeContent'>按图片内容搜索</Option>
                    <Option value='noticeDepartment'>按发布单位搜索</Option>

                </Select>
                <Input
                    placeholder='关键字'
                    style={{ width: 150, margin: '0 15px' }}
                    value={searchName}
                    onChange={event => this.setState({ searchName: event.target.value })}
                />
                <Button type='primary' onClick={() => this.getNotices(1)}>搜索</Button>
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
                        onChange: this.getNotices,

                    }}
                    dataSource={notices}>
                    <Column title="图片组名" dataIndex="title" />
                    <Column title="作者" dataIndex="author" />
                    <Column title="单位" dataIndex="department" />
                    <Column title="发表时间" dataIndex='time' />
                    <Column
                        title="处理"
                        key="action"
                        render={(notice) => (
                            <span>
                                <LinkButton onClick={() => this.props.history.push('/picshow/detail', { notice })}>详情</LinkButton>
                                <Divider type="vertical" />
                                <LinkButton onClick={() => this.props.history.push('/picshow/uploads', notice)}>修改</LinkButton>
                                <Divider type='vertical' />
                                <LinkButton onClick={() => this.deleteArticle(notice)}>删除</LinkButton>
                            </span>
                        )}
                    />
                </Table>
            </Card>
        )

    }
}
export default PicShowManage;