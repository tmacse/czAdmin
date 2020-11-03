import React, { Component } from 'react';
import { Table, Divider, message, Modal, Select, Button, Input, Card,Tag } from 'antd';
import { PAGE_SIZE } from '../../../utils/constants';
import LinkButton from '../../../components/link-button';
import { reqVideos, reqDeleteVideos, reqSearchVideos} from '../../../api'
const { Column } = Table;
const Option = Select.Option



class VideoManage extends Component {
    state = {
        total: 0, // 商品的总数量
        videos: [], // 的数组
        loading: false,//是否正在加载中
        searchName: '', // 搜索的关键字
        searchType: 'videoName', // 根据哪个字段搜索
    }
    //获取指定页码的列表数据表示
    getVideos = async (pageNum) => {
        //发送请求之前，将loading效果设置为true
        this.setState({ loading: true })
        const { searchName, searchType } = this.state
        let result
        if (searchName) {
            result = await reqSearchVideos({ pageNum, pageSize: PAGE_SIZE, searchName, searchType })
        } else { // 一般分页请求
            result = await reqVideos(pageNum, PAGE_SIZE)
        }
        this.setState({ loading: false })
        if (result.status === 0) {
            const { total, list } = result.data
            console.log(list)
            this.setState({
                total,
                videos: list
            })
        }
    }
    /*
删除指定软件
*/
    deleteVideo = (video) => {
        Modal.confirm({
            title: `确认删除****[${video.name}]****吗?`,
            onOk: async () => {
                const result = await reqDeleteVideos(video.name)
                if (result.err === 0) {
                    message.success('删除软件成功!')
                    this.getVideos(1)
                } else if (result.err === -888) {
                    message.error('登陆过期,请重新登陆')
                } else {
                    message.error('other error')
                }
            }
        })
    }
    // //下载指定软件
    // downloadSoftware = async (software) => {
    //     const result = await reqDownloadSoftware(software.url)
    //     if (result.err === 0) {
    //         message.success('download')
    //     }
    // }

    componentDidMount() {
        this.getVideos(1)
    }
    render() {
        const { videos, total, loading, searchName, searchType } = this.state

        const head = (
            <span>
                <Select
                    value={searchType}
                    style={{ width: 150 }}
                    onChange={value => this.setState({ searchType: value })}
                >
                    <Option value='videoName'>按名搜索</Option>
                    <Option value='videoDesc'>按描述搜索</Option>
                    <Option value='videoAttr'>按类型搜索</Option>

                </Select>
                <Input
                    placeholder='关键字'
                    style={{ width: 150, margin: '0 15px' }}
                    value={searchName}
                    onChange={event => this.setState({ searchName: event.target.value })}
                />
                <Button type='primary' onClick={() => this.getVideos(1)}>搜索</Button>
            </span>
        )
        return (
            <Card title={head}>
                <Table rowKey='_id' loading={loading}
                    //分页的配置对象
                    pagination={{ total, defaultPageSize: PAGE_SIZE, showQuickJumper: true, onChange: this.getVideos, }}
                    dataSource={videos}>
                    <Column title="软件名称" dataIndex="name" />
                    <Column title="描述" dataIndex="desc" />
                    <Column title="属性" dataIndex="attr" />
                    <Column title="上传时间" dataIndex='time' />
                    <Column title="地址"  dataIndex='url'
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
                        render={(video) => (
                            <span>
                                <LinkButton onClick={() => this.props.history.push('/media/videodetail', { video })}>详情</LinkButton>
                                <Divider type="vertical" />
                                <LinkButton onClick={() => this.deleteVideo(video)}>删除</LinkButton>
                            </span>
                        )}
                    />
                </Table>
            </Card>
        )

    }
}
export default VideoManage;