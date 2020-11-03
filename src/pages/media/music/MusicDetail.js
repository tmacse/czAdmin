import React, { Component } from 'react'
import { Card, Icon, List } from 'antd'
import './index.css'
import LinkButton from '../../../components/link-button';
import { BASE_MUSIC_URL } from '../../../utils/constants';
import { withRouter } from "react-router-dom";
const Item = List.Item

class MusicDetail extends Component {
    render() {
        const { name, url, time,actor } = this.props.location.state.music
        const titleHead = (
            <span>
                <LinkButton>
                    <Icon
                        type='arrow-left'
                        style={{ marginRight: 15, fontSize: 30 }}
                        onClick={() => this.props.history.goBack()}
                    />
                </LinkButton>
                <span>音乐详情</span>
            </span>
        )
        return (
            <Card title={titleHead} >
                <Item className='article-detail'>
                    <span className='left'>音乐名：</span>
                    <span>{name}</span>
                </Item>
                <Item className='article-detail'>
                    <span className='left'>演唱者：</span>
                    <span>{actor}</span>
                </Item>
                <Item>
                    <span className='left'>音乐地址封面：</span>
                    <span>
                        {url.map((item) => {
                            return (
                                <audio
                                    className='detail-pic'
                                    src={BASE_MUSIC_URL + item}
                                    alt='music'
                                />
                            )
                        })}

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

export default withRouter(MusicDetail) 