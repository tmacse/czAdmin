import React from 'react'
import { Card, Icon, List } from 'antd'
import './index.css'
import LinkButton from '../../components/link-button';
import { BASE_IMG_URL } from '../../utils/constants';
const Item = List.Item

const ArticleDetail = (props) => {
    //读取携带过来的states数据
    console.log(props.location)
    const { title, author, department, thumbnail, content, time } = props.location.state.message
    const titleHead = (
        <span>
            <LinkButton>
                <Icon
                    type='arrow-left'
                    style={{ marginRight: 15, fontSize: 30 }}
                    onClick={() => props.history.goBack()}
                />
            </LinkButton>
            <span>文章详情</span>
        </span>
    )
    return (
        <Card title={titleHead} >
            <Item className='article-detail'>
                <span className='left'>文章名称：</span>
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
            {
                thumbnail.length === 0 ?
                    '' :
                    <Item >
                        <span className='left'>封面图：</span>
                        <span>
                            <img
                                className='detail-pic'
                                src={BASE_IMG_URL + thumbnail}
                                alt='img'
                            />
                        </span>
                    </Item>
            }
            <Item>
                <span className='left'>发布时间：</span>
                <span>{time}</span>
            </Item>
            <Item>
                <span className='left'>详情：</span>
                <span className='detail' dangerouslySetInnerHTML={{ __html: content }}>
                </span>
            </Item>
        </Card>
    )
}


export default ArticleDetail