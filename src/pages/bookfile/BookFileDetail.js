import React from 'react'
import { Card, Icon, List } from 'antd'
import LinkButton from '../../components/link-button';
const Item = List.Item

const BookFileDetail = (props) => {

    const { title, author, department, content } = props.location.state.bookfile
    const titleHead = (
        <span>
            <LinkButton>
                <Icon
                    type='arrow-left'
                    style={{ marginRight: 15, fontSize: 30 }}
                    onClick={() => props.history.goBack()}
                />
            </LinkButton>
            <span>通知详情</span>
        </span>
    )
    return (
        <Card title={titleHead} >
            <Item className='article-detail'>
                <span className='left'>名称：</span>
                <span>{title}</span>
            </Item>
            <Item>
                <span className='left'>单位：</span>
                <span>{department}</span>
            </Item>
            <Item>
                <span className='left'>作者：</span>
                <span>{author}</span>
            </Item>
            <Item>
                <span className='left'>详情：</span>
                <span className='detail' dangerouslySetInnerHTML={{ __html: content }}>
                </span>
            </Item>
        </Card>
    )
}

export default BookFileDetail;