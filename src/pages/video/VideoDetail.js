import React, { Component } from 'react'
import { Card, Icon, List } from 'antd'
import './index.css'
import LinkButton from '../../components/link-button';
import { BASE_VIDEO_URL } from '../../utils/constants';
import { withRouter } from "react-router-dom";
const Item = List.Item

class VideoDetail extends Component {
    render() {
        const { title, url, desc, attr, time } = this.props.location.state.video
        const titleHead = (
            <span>
                <LinkButton>
                    <Icon type='arrow-left' style={{ marginRight: 15, fontSize: 30 }} onClick={() => this.props.history.goBack()} />
                </LinkButton>
                <span>视频详情</span>
            </span>
        )
        return (
            <Card title={titleHead} >
                <Item className='article-detail'> <span className='left'>视频名：</span><span>{title}</span></Item>
                <Item> <span className='left'>视频描述：</span><span>{desc}</span></Item>
                <Item><span className='left'>视频分类：</span><span>{attr}</span></Item>
                <Item>
                    <span className='left'>视频地址封面：</span>
                    <span>
                        {url.map((item) => { return (<video className='detail-pic' src={BASE_VIDEO_URL + item} alt='video' />) })}
                    </span>
                </Item>
                <Item><span className='left'>发布时间：</span><span>{time}</span></Item>
            </Card>
        )
    }
}

export default withRouter(VideoDetail) 