import React, { Component } from 'react'
import { Card, Icon, List } from 'antd'
import LinkButton from '../../components/link-button';
const Item = List.Item

export default class MailDetail extends Component {
    render() {
        const { title, name, department, content } = this.props.location.state.Mailmessage
        const titleHead = (
            <span>
                <LinkButton>
                    <Icon
                        type='arrow-left'
                        style={{ marginRight: 15, fontSize: 30 }}
                        onClick={() => this.props.history.goBack()}
                    />
                </LinkButton>
                <span>邮件详情</span>
            </span>)
        return (
            <Card title={titleHead} >
                <Item className='article-detail'>
                    <span className='left'>邮件名：</span>
                    <span>{title}</span>
                </Item>
                <Item>
                    <span className='left'>投递人单位：</span>
                    <span>{department}</span>
                </Item>
                <Item>
                    <span className='left'>投递人：</span>
                    <span>{name}</span>
                </Item>
                <Item>
                    <span className='left'>邮件正文：</span>
                    <span>{content}</span>
                </Item>
            </Card>
        )
    }
}
