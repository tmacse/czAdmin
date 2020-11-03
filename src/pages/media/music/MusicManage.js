import React, { Component } from 'react';
import { Table, Divider, message, Modal, Select, Button, Input, Card, Tag } from 'antd';
import { PAGE_SIZE } from '../../../utils/constants';
import LinkButton from '../../../components/link-button';
import { reqMusics, reqDeleteMusics, reqSearchMusics } from '../../../api'
const { Column } = Table;
const Option = Select.Option



class MusicManage extends Component {
    state = {
        total: 0, // 商品的总数量
        musics: [], // 的数组
        loading: false,//是否正在加载中
        searchName: '', // 搜索的关键字
        searchType: 'musicName', // 根据哪个字段搜索
    }
    //获取指定页码的列表数据表示
    getMusics = async (pageNum) => {
        //发送请求之前，将loading效果设置为true
        this.setState({ loading: true })
        const { searchName, searchType } = this.state
        let result
        if (searchName) {
            result = await reqSearchMusics({ pageNum, pageSize: PAGE_SIZE, searchName, searchType })
        } else { // 一般分页请求
            result = await reqMusics(pageNum, PAGE_SIZE)
        }
        this.setState({ loading: false })
        if (result.status === 0) {
            const { total, list } = result.data
            console.log(list)
            this.setState({
                total,
                musics: list
            })
        }
    }
    /*
删除指定软件
*/
    deleteMusic = (music) => {
        Modal.confirm({
            title: `确认删除****[${music.name}]****吗?`,
            onOk: async () => {
                const result = await reqDeleteMusics(music.name)
                if (result.err === 0) {
                    message.success('删除音乐成功!')
                    this.getMusics(1)
                } else if (result.err === -888) {
                    message.error('登陆过期,请重新登陆')
                }else{
                    message.error('other error')
                }
            }
        })
    }


    componentDidMount() {
        this.getMusics(1)
    }
    render() {
        const { musics, total, loading, searchName, searchType } = this.state

        const head = (
            <span>
                <Select
                    value={searchType}
                    style={{ width: 150 }}
                    onChange={value => this.setState({ searchType: value })}
                >
                    <Option value='musicName'>按名搜索</Option>
                    <Option value='musicActor'>按演唱者搜索</Option>

                </Select>
                <Input
                    placeholder='关键字'
                    style={{ width: 150, margin: '0 15px' }}
                    value={searchName}
                    onChange={event => this.setState({ searchName: event.target.value })}
                />
                <Button type='primary' onClick={() => this.getMusics(1)}>搜索</Button>
            </span>
        )
        return (
            <Card title={head}>
                <Table rowKey='_id' loading={loading}
                    //分页的配置对象
                    pagination={{ total, defaultPageSize: PAGE_SIZE, showQuickJumper: true, onChange: this.getMusics, }}
                    dataSource={musics}>
                    <Column title="音乐名" dataIndex="name" />
                    <Column title="演唱者" dataIndex='actor' />
                    <Column title="地址" dataIndex='url'
                        render={url => (
                            <span>
                                {url.map(tag => (
                                    <Tag color="blue" key={tag}>
                                        {tag}
                                    </Tag>
                                ))}
                            </span>
                        )}
                    />
                    <Column
                        title="处理"
                        key="action"
                        render={(music) => (
                            <span>
                                <LinkButton onClick={() => this.props.history.push('/media/musicdetail', { music })}>详情</LinkButton>
                                <Divider type="vertical" />
                                <LinkButton onClick={() => this.deleteMusic(music)}>删除</LinkButton>
                            </span>
                        )}
                    />
                </Table>
            </Card>
        )

    }
}
export default MusicManage;