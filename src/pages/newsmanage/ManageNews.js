import React, { Component } from 'react';
import { Table, Divider, message, Modal, Select, Button, Input, Card } from 'antd';
import { PAGE_SIZE } from '../../utils/constants';
import LinkButton from '../../components/link-button';
import { reqCheckedArticles, reqDeleteArticle, reqCheckedSearchArticles } from '../../api'
const { Column } = Table;
const Option = Select.Option



class ManageNews extends Component {
    state = {
        total: 0, // 商品的总数量
        articles: [], // 文章的数组
        loading: false,//是否正在加载中
        searchName: '', // 搜索的关键字
        searchType: 'articleTitle', // 根据哪个字段搜索
    }
    //获取指定页码的列表数据表示
    getNews = async (pageNum) => {
        //发送请求之前，将loading效果设置为true
        this.setState({ loading: true })
        const { searchName, searchType } = this.state
        let result
        if (searchName) {
            result = await reqCheckedSearchArticles({ pageNum, pageSize: PAGE_SIZE, searchName, searchType })
        } else { // 一般分页请求
            result = await reqCheckedArticles(pageNum, PAGE_SIZE)
        }
        // const result = await reqCheckedArticles(pageNum, PAGE_SIZE,searchName,searchType)
        //请求结束之后将loading效果设置为false
        this.setState({ loading: false })
        if (result.status === 0) {
            const { total, list } = result.data
            console.log(list)
            this.setState({
                total,
                articles: list
            })
        }
    }
    /*
删除指定新闻
*/
    deleteArticle = (article) => {
        Modal.confirm({
            title: `确认删除****[${article.title}]****吗?`,
            onOk: async () => {
                const result = await reqDeleteArticle(article.title)
                if (result.err === 0) {
                    message.success('删除文章成功!')
                    this.getNews(1)
                } else if (result.err === -999) {
                    message.error('对不起，你没有该权限')
                } else if (result.err === -888) {
                    message.error('登陆过期,请重新登陆')
                } else {
                    message.error('other error')
                }
            }
        })
    }


    componentDidMount() {
        this.getNews(1)
    }
    render() {
        const { articles, total, loading, searchName, searchType } = this.state

        const head = (
            <span>
                <Select
                    value={searchType}
                    style={{ width: 150 }}
                    onChange={value => this.setState({ searchType: value })}
                >
                    <Option value='articleTitle'>按文章名搜索</Option>
                    {/* <Option value='articleCategory'>按文章分类搜索</Option> */}
                    <Option value='articleAuthor'>按文章作者搜索</Option>
                    <Option value='articleContent'>按文章内容搜索</Option>
                    <Option value='articleDepartment'>按文章单位搜索</Option>

                </Select>
                <Input
                    placeholder='关键字'
                    style={{ width: 150, margin: '0 15px' }}
                    value={searchName}
                    onChange={event => this.setState({ searchName: event.target.value })}
                />
                <Button type='primary' onClick={() => this.getNews(1)}>搜索</Button>
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
                        onChange: this.getNews,

                    }}
                    dataSource={articles}>
                    <Column title="新闻名" dataIndex="title" />
                    <Column title="作者" dataIndex="author" />
                    <Column title="单位" dataIndex="department" />
                    <Column title="发表时间" dataIndex='time' />
                    <Column
                        title="处理"
                        key="action"
                        render={(article) => (
                            <span>
                                <LinkButton onClick={() => this.props.history.push('/article/detail', { article })}>详情</LinkButton>
                                <Divider type="vertical" />
                                <LinkButton onClick={() => this.props.history.push('/writenews', article)}>修改</LinkButton>
                                <Divider type='vertical' />
                                <LinkButton onClick={() => this.deleteArticle(article)}>删除</LinkButton>

                            </span>
                        )}
                    />
                </Table>
            </Card>
        )

    }
}
export default ManageNews;