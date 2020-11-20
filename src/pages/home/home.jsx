import React, { Component } from 'react'
import { Typography } from 'antd';
import './home.less'
import storageUtils from '../../utils/storageUtils'
const { Title } = Typography;


export default class Home extends Component {


  render() {
    const user = storageUtils.getUser()//获取用户登录的用户名
    return (
      <div className='home'>
        <Typography>
          <Title level={2}>{user.username === 'admin' ? '超级管理员' : user.username}，欢迎来到强军网后台管理系统</Title>

        </Typography>
      </div>
    )
  }
}