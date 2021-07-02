import React, { useState, useEffect } from 'react';
import { Table, Divider, message, Modal, Select, Button, Input, Card } from 'antd';
import { PAGE_SIZE } from '../../utils/constants';
import LinkButton from '../../components/link-button';
const { Column } = Table;
const Option = Select.Option


const Manage = (props) => {

    const { reqMessage, reqDeleteMessage, reqSearchMessage, toDetail, toChange } = props

    const [total, setTotal] = useState(0)//总数
    const [messages, setMessages] = useState([]) //获取的列表
    const [loading, setLoading] = useState(false) //是否loading的效果
    const [searchName, setSearchName] = useState('') //搜索的名字
    const [searchType, setSearchType] = useState('Title') //搜索的类型
    //获取指定页码的列表数据表示
    async function getMessages(pageNum = 1) {
        //发送请求之前，将loading效果设置为true
        setLoading(true)
        let result
        if (searchName) {
            result = await reqSearchMessage({ pageNum, pageSize: PAGE_SIZE, searchName, searchType })
        } else { // 一般分页请求
            result = await reqMessage(pageNum, PAGE_SIZE)
        }
        setLoading(false)
        if (result.status === 0) {
            const { total, list } = result.data
            setTotal(total)
            setMessages(list)
        }
    }
    /*
删除指定新闻
*/
    function deleteMessage(mymessage) {
        Modal.confirm({
            title: `确认删除****[${mymessage.title}]****吗?`,
            onOk: async () => {
                const result = await reqDeleteMessage(mymessage.title)
                console.log(result)
                if (result.err === 0) {
                    message.success('删除通知成功!')
                    getMessages()
                }
            }
        })
    }

    useEffect(() => {

        getMessages()

    }, []);


    const head = (
        <span>
            <Select
                value={searchType}
                style={{ width: 150 }}
                onChange={value => setSearchType(value)}
            >
                <Option value='Title'>按教案名搜索</Option>
                <Option value='Author'>按作者搜索</Option>
                <Option value='Content'>按内容搜索</Option>
                <Option value='Department'>按发布单位搜索</Option>

            </Select>
            <Input
                placeholder='关键字'
                style={{ width: 150, margin: '0 15px' }}
                value={searchName}
                onChange={e => setSearchName(e.target.value)}
            />
            <Button type='primary' onClick={() => getMessages()}>搜索</Button>
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
                    onChange: getMessages,
                }}
                dataSource={messages}>
                <Column title="通知名" dataIndex="title" />
                <Column title="作者" dataIndex="author" />
                <Column title="单位" dataIndex="department" />
                <Column title="发表时间" dataIndex='time' />
                <Column
                    title="处理"
                    key="action"
                    render={(message) => (
                        <span>
                            <LinkButton onClick={() => props.history.push(toDetail, { message })}>详情</LinkButton>
                            <Divider type="vertical" />
                            <LinkButton onClick={() => props.history.push(toChange, { message })}>修改</LinkButton>
                            <Divider type='vertical' />
                            <LinkButton onClick={() => deleteMessage(message)}>删除</LinkButton>
                        </span>
                    )}
                />
            </Table>
        </Card>
    )

}

export default Manage;