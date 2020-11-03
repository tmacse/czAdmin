import React, { Component } from 'react';
import { Table, Divider, message, Modal,  Button, Card } from 'antd';
import { PAGE_SIZE } from '../../utils/constants';
import LinkButton from '../../components/link-button';
import { reqCheckedTopArticles, reqArticleUpdateStatusToDown } from '../../api'
const { Column } = Table;




class BigNews extends Component {
    state = {
        total: 0, // 商品的总数量
        articles: [], // 文章的数组
        loading: false,//是否正在加载中
        btnStatus: 'primary',
    }
    //获取指定页码的列表数据表示
    getNews = async (pageNum) => {
        //发送请求之前，将loading效果设置为true
        this.setState({ loading: true })

        let result
        
        result = await reqCheckedTopArticles(pageNum, PAGE_SIZE)
        
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

    //下头条
    checkedToTopArticle = (article) => {
        Modal.confirm({
            title: `确认该文章下头条吗${article.title}吗?`,
            onOk: async () => {
                this.setState({
                    btnStatus: "dashed"
                }

                )
                const result = await reqArticleUpdateStatusToDown(article.title)
                if (result.err === 0) {
                    message.success('审核文章成功!')
                    this.getNews(1)
                } else if (result.err === -888) {
                    message.error('登陆过期,请重新登陆')
                }else{
                    
                message.error('other error')
            
                }
            }
        })
    }

    componentDidMount() {
        this.getNews(1)
    }
    render() {
        const { articles, total, loading,  btnStatus } = this.state

        
        return (
            <Card >
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
                    <Column
                        title='下头条'
                        key='down'
                        render={(article) => (
                            <Button
                                type={btnStatus}
                                onClick={() => this.checkedToTopArticle(article)}>下头条
                            </Button>
                        )
                        }
                    />
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
            

                            </span>
                        )}
                    />
                </Table>
            </Card>
        )

    }
}
export default BigNews;