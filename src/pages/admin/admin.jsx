import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Layout } from 'antd'

import memoryUtils from '../../utils/memoryUtils'
import LeftNav from '../../components/left-nav'
import Header from '../../components/header'
import Home from '../home/home'
import WriteNews from '../newsmanage/WriteNews';
import ManageNews from '../newsmanage/ManageNews';
import Role from '../role/role'
import User from '../user/user'
import NotFound from '../not-found/not-found'
import BannerManage from '../bannermanage/BannerManage';
import ArticleDetail from '../newsmanage/ArticleDetail';
import ManageNotice from '../noticesmanage/ManageNotice';
import WriteNotice from '../noticesmanage/WriteNotice';
import NoticeDetail from '../noticesmanage/Detail';
import WriteBookFile from '../bookfile/WriteNBookFile';
import BookFileManage from '../bookfile/BookFileManage';
import BookFileDetail from '../bookfile/BookFileDetail'
import writeMessage from '../departmentMessage/writeMessage';
import MessageManage from '../departmentMessage/MessageManage';
import MessageDetail from '../departmentMessage/detail';
import VideoUpload from '../video/VideoUpload';
import VideoManage from '../video/VideoManage';
import VideoDetail from '../video/VideoDetail';
import Success from '../../components/result/Success'
import MailManage from '../mail/MailManage'
import MailCheck from '../mail/MailCheck'
import MailDetail from '../mail/MailDetail'
import TruncVideo from '../video/TruncVideo';
import PicShowUploads from '../picshow/PicShowUploads';
import PicShowManage from '../picshow/PicShowManage';
import PicShowDetail from '../picshow/PicShowDetail';
import WriteLeader from '../leader/WriteLeader'


const { Footer, Sider, Content } = Layout

/*
后台管理的路由组件
 */
export default class Admin extends Component {
  render() {
    const user = memoryUtils.user
    // 如果内存没有存储user ==> 当前没有登陆
    if (!user || !user._id) {
      // 自动跳转到登陆(在render()中)
      return <Redirect to='/login' />
    }
    return (
      <Layout style={{ minHeight: '100%' }}>
        <Sider>
          <LeftNav />
        </Sider>
        <Layout>
          <Header>Header</Header>
          <Content style={{ margin: 20, backgroundColor: '#fff' }}>
            <Switch>
              <Redirect from='/' exact to='/home' />
              <Route path='/mail/detail' component={MailDetail}></Route>
              <Route path='/mail/unchecked' exact component={MailCheck}></Route>
              <Route path='/mail/checked' component={MailManage}></Route>
              <Route path='/home' component={Home} />
              <Route path='/picshow/manage' component={PicShowManage}></Route>
              <Route path='/picshow/uploads' component={PicShowUploads} />
              <Route path='/picshow/detail' component={PicShowDetail} />
              <Route path='/success' component={Success}></Route>
              <Route path='/writenews' component={WriteNews}></Route>
              <Route path='/managenews' component={ManageNews}></Route>
              <Route path='/noticesManage/manage' component={ManageNotice}></Route>
              <Route path='/noticesManage/add' component={WriteNotice}></Route>
              <Route path='/bannermanage' component={BannerManage}></Route>
              <Route path='/mdeia/videoupload' component={VideoUpload}></Route>
              <Route path='/media/videodetail' component={VideoDetail}></Route>
              <Route path='/media/truncvideo' component={TruncVideo}></Route>
              <Route path='/mdeia/videomanage' component={VideoManage}></Route>
              <Route path='/bookfile/write' component={WriteBookFile}></Route>
              <Route path='/bookfile/manage' component={BookFileManage}></Route>
              <Route path='/bookfile/detail' component={BookFileDetail}></Route>
              <Route path='/departmentMessage/write' component={writeMessage}></Route>
              <Route path='/departmentMessage/manage' component={MessageManage}></Route>
              <Route path='/departmentMessage/detail' component={MessageDetail}></Route>
              <Route path='/article/detail' component={ArticleDetail}></Route>
              <Route path='/notice/detail' component={NoticeDetail}></Route>
              <Route path='/user' component={User} />
              <Route path='/role' component={Role} />
              <Route path='/leader/write' component={WriteLeader}></Route>
              <Route component={NotFound} />
            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center', color: '#cccccc' }}>王冰制作</Footer>
        </Layout>
      </Layout>
    )
  }
}