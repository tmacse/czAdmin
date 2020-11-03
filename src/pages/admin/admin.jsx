import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Layout } from 'antd'

import memoryUtils from '../../utils/memoryUtils'
import LeftNav from '../../components/left-nav'
import Header from '../../components/header'
import Home from '../home/home'
import WriteNews from '../newsmanage/WriteNews';
import CheckNews from '../newsmanage/CheckNews';
import ManageNews from '../newsmanage/ManageNews';
import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'
import NotFound from '../not-found/not-found'
import Order from '../order/order'
import BannerManage from '../bannermanage/BannerManage';
import MusicUpload from '../media/music/MusicUpload';
import ArticleDetail from '../newsmanage/ArticleDetail';
import SoftwareDetail from '../software/SoftwareDetail';
import SoftUploads from '../software/SoftUploads';
import SoftManage from '../software/SoftManage';
import ManageNotice from '../noticesmanage/ManageNotice';
import WriteNotice from '../noticesmanage/WriteNotice';
import NoticeDetail from '../noticesmanage/Detail';
import WriteBookFile from '../bookfile/WriteNBookFile';
import BookFileManage from '../bookfile/BookFileManage';
import BookFileDetail from '../bookfile/BookFileDetail'
import writeMessage from '../departmentMessage/writeMessage';
import MessageManage from '../departmentMessage/MessageManage';
import MessageDetail from '../departmentMessage/detail';
import VideoUpload from '../media/video/VideoUpload';
import MusicManage from '../media/music/MusicManage';
import VideoManage from '../media/video/VideoManage';
import VideoDetail from '../media/video/VideoDetail';
import MusicDetail from '../media/music/MusicDetail';
import Success from '../../components/result/Success'
import BigNews from '../newsmanage/BigNews';
import PicShowUploads from '../picshow/PicShowUploads';
import PicShowManage from '../picshow/PicShowManage';
import PicShowDetail from '../picshow/PicShowDetail';
import MailManage from '../mail/MailManage'
import MailCheck from '../mail/MailCheck'
import MailDetail from '../mail/MailDetail'
import InformCheck from '../inform/InformCheck'
import InformManage from '../inform/InformManage'


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
              <Route path='/inform/unchecked' exact component={InformCheck}></Route>
              <Route path='/inform/checked' component={InformManage}></Route>
              <Route path='/mail/detail' component={MailDetail}></Route>
              <Route path='/mail/unchecked' exact component={MailCheck}></Route>
              <Route path='/mail/checked' component={MailManage}></Route>
              <Route path='/home' component={Home} />
              <Route path='/picshow/manage' component={PicShowManage}></Route>
              <Route path='/picshow/uploads' component={PicShowUploads} />
              <Route path='/picshow/detail' component={PicShowDetail} />
              <Route path='/success' component={Success}></Route>
              <Route path='/writenews' component={WriteNews}></Route>
              <Route path='/checknews' component={CheckNews}></Route>
              <Route path='/managenews' component={ManageNews}></Route>
              <Route path='/noticesManage/manage' component={ManageNotice}></Route>
              <Route path='/noticesManage/add' component={WriteNotice}></Route>
              <Route path='/bannermanage' component={BannerManage}></Route>
              <Route path='/media/musicupload' component={MusicUpload}></Route>
              <Route path='/mdeia/videoupload' component={VideoUpload}></Route>
              <Route path='/media/musicmanage' component={MusicManage}></Route>
              <Route path='/media/musicdetail' component={MusicDetail}></Route>
              <Route path='/media/videodetail' component={VideoDetail}></Route>
              <Route path='/mdeia/videomanage' component={VideoManage}></Route>
              <Route path='/bookfile/write' component={WriteBookFile}></Route>
              <Route path='/bookfile/manage' component={BookFileManage}></Route>
              <Route path='/bookfile/detail' component={BookFileDetail}></Route>
              <Route path='/Topnews' component={BigNews}></Route>
              <Route path='/departmentMessage/write' component={writeMessage}></Route>
              <Route path='/departmentMessage/manage' component={MessageManage}></Route>
              <Route path='/departmentMessage/detail' component={MessageDetail}></Route>
              <Route path='/article/detail' component={ArticleDetail}></Route>
              <Route path='/software/detail' component={SoftwareDetail}></Route>
              <Route path='/notice/detail' component={NoticeDetail}></Route>
              <Route path='/software/upload' component={SoftUploads}></Route>
              <Route path='/software/manage' component={SoftManage}></Route>
              <Route path='/product' component={Product} />
              <Route path='/user' component={User} />
              <Route path='/role' component={Role} />
              <Route path="/charts/bar" component={Bar} />
              <Route path="/charts/pie" component={Pie} />
              <Route path="/charts/line" component={Line} />
              <Route path="/order" component={Order} />
              <Route component={NotFound} />
            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center', color: '#cccccc' }}>王冰制作</Footer>
        </Layout>
      </Layout>
    )
  }
}