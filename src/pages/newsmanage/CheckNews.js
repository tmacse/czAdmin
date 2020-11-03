import React, { Component } from 'react';
import { Table, Divider, message, Modal, Button } from 'antd';
import { reqArticles, reqArticleUpdateStatus, reqDeleteArticle } from '../../api';
import { PAGE_SIZE } from '../../utils/constants';
// import LinkButton from '../../components/link-button';
const { Column } = Table;

//最后一个删除案件的效果



class CheckNews extends Component {

    state = {
        total: 0, // 商品的总数量
        articles: [], // 文章的数组
        loading: false,//是否正在加载中
    }
    //获取指定页码的列表数据表示
    getNews = async (pageNum) => {
        //发送请求之前，将loading效果设置为true
        this.setState({ loading: true })
        const result = await reqArticles(pageNum, PAGE_SIZE)
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
            title: `确认删除${article.title}吗?`,
            onOk: async () => {
                const result = await reqDeleteArticle(article.title)
                if (result.err === 0) {
                    message.success('删除文章成功!')
                    this.getNews(1)
                }
            }
        })
    }
    checkedArticle = (article) => {
        Modal.confirm({
            title: `确认审核通过文章${article.title}吗?`,
            onOk: async () => {
                const result = await reqArticleUpdateStatus(article.title)
                if (result.err === 0) {
                    message.success('审核文章成功!')
                    this.getNews(1)
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
        this.getNews(1)
    }
    render() {
        const { articles, total, loading } = this.state

        return (
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
                            <Button
                                type='ghost'
                                onClick={() => this.props.history.push('/article/detail', { article })}>详情</Button>
                            <Divider type="vertical" />
                            {/*点击后跳转到修改界面还没有值，需要下一步修改*/}
                            <Button
                                type='primary'
                                onClick={() => this.checkedArticle(article)}>审核</Button>
                            <Divider type="vertical" />
                            <Button
                                type='danger'
                                onClick={() => this.deleteArticle(article)}>删除</Button>

                        </span>
                    )}
                />
            </Table>
        )
    }

}
export default CheckNews;