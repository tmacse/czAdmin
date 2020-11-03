import React, { Component } from 'react'
import { Card, Icon, List } from 'antd'
import LinkButton from '../../components/link-button';
const Item = List.Item

class MessageDetail extends Component {

    render() {
        const { title, author, department, content } = this.props.location.state.Dmessage
        const titleHead = (
            <span>
                <LinkButton>
                    <Icon
                        type='arrow-left'
                        style={{ marginRight: 15, fontSize: 30 }}
                        onClick={() => this.props.history.goBack()}
                    />
                </LinkButton>
                <span>科室动态（新闻）详情</span>
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
}
export default MessageDetail;