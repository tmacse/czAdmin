import React, { Component } from 'react'
import {
    Card,
    Icon,
    List
} from 'antd'
import './index.css'
import LinkButton from '../../components/link-button';
import { BASE_SOFTWARE_URL } from '../../utils/constants';
import { withRouter } from "react-router-dom";
const Item = List.Item

class SoftwareDetail extends Component {
    render(){
        const { name, url, platform, attr,time} = this.props.location.state.software
        const titleHead = (
            <span>
                <LinkButton>
                    <Icon
                        type='arrow-left'
                        style={{ marginRight: 15, fontSize: 30 }}
                        onClick={() => this.props.history.goBack()}
                    />
                </LinkButton>
                <span>软件详情</span>
            </span>
            )
        return(
            <Card title={titleHead} >
                <Item className='article-detail'>
                    <span className='left'>软件名：</span>
                    <span>{name}</span>
                </Item>
                <Item>
                    <span className='left'>软件平台：</span>
                    <span>{platform}</span>
                </Item>
                <Item>
                    <span className='left'>软件属性：</span>
                    <span>{attr}</span>
                </Item>
                <Item>
                    <span className='left'>缩略图：</span>
                    <span>
                        <img
                            className='detail-pic'
                            src={BASE_SOFTWARE_URL + url}
                            alt='software'
                        />
                    </span>
                </Item>
                <Item>
                    <span className='left'>发布时间：</span>
                    <span>{time}</span>
                </Item>
            </Card>
        )
    }
}

export default withRouter(SoftwareDetail) 