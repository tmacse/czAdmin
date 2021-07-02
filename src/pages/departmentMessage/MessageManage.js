import React, { useEffect, useState } from 'react';
import { Table, Divider, message, Modal, Select, Button, Input, Card } from 'antd';
import { PAGE_SIZE } from '../../utils/constants';
import LinkButton from '../../components/link-button';
import { reqDepartmentMessages, reqDeleteMessages, reqSearchMessages } from '../../api'
const { Column } = Table;
const Option = Select.Option

const MessageManage = (props) => {
    // state = {
    //     total: 0, // 商品的总数量
    //     Dmessages: [], // 文章的数组
    //     loading: false,//是否正在加载中
    //     searchName: '', // 搜索的关键字
    //     searchType: 'noticeTitle', // 根据哪个字段搜索
    // }
    const [total, setTotal] = useState(0)
    const [Dmessages, setDmessages] = useState([])
    const [loading, setLoading] = useState(false)
    const [searchName, setSearchName] = useState('')
    const [searchType, setSearchType] = useState('noticeTitle')
    //获取指定页码的列表数据表示

    async function getBookFiles(pageNum) {
        //发送请求之前，将loading效果设置为true
        setLoading(true)
        let result
        if (searchName) {
            result = await reqSearchMessages({ pageNum, pageSize: PAGE_SIZE, searchName, searchType })
        } else { // 一般分页请求
            result = await reqDepartmentMessages(pageNum, PAGE_SIZE)
        }
        setLoading(false)
        if (result.status === 0) {
            const { total, list } = result.data
            setTotal(total)
            setDmessages(list)
        }
    }
    /*
删除指定新闻
*/
    function deleteBookFile(bookfile) {
        Modal.confirm({
            title: `确认删除****[${bookfile.title}]****吗?`,
            onOk: async () => {
                const result = await reqDeleteMessages(bookfile.title)
                if (result.err === 0) {
                    message.success('删除通知成功!')
                    getBookFiles(1)
                }
            }
        })
    }
    useEffect(() => {
        getBookFiles(1)
    });


    const head = (
        <span>
            <Select
                value={searchType}
                style={{ width: 150 }}
                onChange={value => setSearchType(value)}
            >
                <Option value='noticeTitle'>按教案名搜索</Option>
                <Option value='noticeAuthor'>按作者搜索</Option>
                <Option value='noticeContent'>按内容搜索</Option>
                <Option value='noticeDepartment'>按发布单位搜索</Option>

            </Select>
            <Input
                placeholder='关键字'
                style={{ width: 150, margin: '0 15px' }}
                value={searchName}
                onChange={e => setSearchName(e.target.value)}
            />
            <Button type='primary' onClick={() => getBookFiles(1)}>搜索</Button>
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
                    onChange: getBookFiles,
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
                            <LinkButton onClick={() => props.history.push('/bookfile/detail', { Dmessage })}>详情</LinkButton>
                            <Divider type="vertical" />
                            <LinkButton onClick={() => props.history.push('/bookfile/write', Dmessage)}>修改</LinkButton>
                            <Divider type='vertical' />
                            <LinkButton onClick={() => deleteBookFile(Dmessage)}>删除</LinkButton>
                        </span>
                    )}
                />
            </Table>
        </Card>
    )

}

export default MessageManage;