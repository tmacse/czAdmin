import React, { Component } from 'react'
import { Card, Icon, List } from 'antd'
import LinkButton from '../../components/link-button';
import './index.css'
const path = require('path');
const Item = List.Item

class PicShowDetail extends Component {
    render() {
        //读取携带过来的states数据
        const { title, author, department,pics } = this.props.location.state.notice
        const titleHead = (
            <span>
                <LinkButton>
                    <Icon
                        type='arrow-left'
                        style={{ marginRight: 15, fontSize: 30 }}
                        onClick={() => this.props.history.goBack()}
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
            
                   {
                       pics.map((item)=>{
                           const url = path.join('/public/image/picshow', item)
                          return(
                              <img alt='img' style={{height:150,width:200}} src={url}></img>
                          )
                       })
                   }
               </Item>
            </Card>
        )
    }
}

export default PicShowDetail