import React, { Component } from 'react'
import {Icon,Card,Statistic} from 'antd'
// import TimePicker from '../charts/TimePicker'
import { reqGetTotalNewsNum, reqGetTotalNoticesNum, reqGetTotalBookFilesNum, reqGetTotalSoftwaresNum, reqGetTotalMessageNum } from '../../api'

import Bar from './bar'
import './home.less'
import Pie from '../charts/pie';


export default class Home extends Component {

  state = {
    isVisited: true,
    totalArticles: 0,
    totalNotices: 0,
    totalBookFiles: 0,
    totalSoftwares: 0,
    totalDepartmentMessage:0,
  }

  handleChange = (isVisited) => {
    return () => this.setState({ isVisited })
  }
  //获取新闻总数,直接显示到页面首页上
  getTotalNewsNum = async () => {
    let result
    result = await reqGetTotalNewsNum()
    // console.log(result)
    if (result.status === 0) {
      const { totalArticles } = result
      this.setState({
        totalArticles
      })
    }
  }
  getTotalNoticesNum = async () => {
    let result
    result = await reqGetTotalNoticesNum()
    if (result.status === 0) {
      const { totalNotices } = result
      this.setState({ totalNotices })
    }
  }
  getTotalBookFilesNum = async () => {
    let result
    result = await reqGetTotalBookFilesNum()
    // console.log(result)
    if (result.status === 0) {
      const { totalBookFiles } = result
      this.setState({ totalBookFiles })
    }
  }
  getTotalSoftwareNum = async () => {
    let result
    result = await reqGetTotalSoftwaresNum()
    // console.log(result)
    if (result.status === 0) {
      const { totalSoftwares } = result
      this.setState({ totalSoftwares })
    }
  }
  getTotalMessageNum = async () => {
    let result
    result = await reqGetTotalMessageNum()
    // console.log(result)
    if (result.status === 0) {
      const { totalDepartmentMessage } = result
      this.setState({totalDepartmentMessage })
    }
  }
  componentDidMount() {
    this.getTotalNewsNum()
    this.getTotalNoticesNum()
    this.getTotalBookFilesNum()
    this.getTotalSoftwareNum()
    this.getTotalMessageNum()
  }

  render() {
    const { isVisited, totalArticles, totalNotices, totalBookFiles, totalSoftwares,totalDepartmentMessage } = this.state

    return (
      <div className='home'>
        <Pie/>
        <Card
          hoverable
          className="home-card"
          title="新闻总量"
          extra={<Icon style={{ color: 'rgba(0,0,0,.45)' }} type="question-circle" />}
          style={{ width: '15%' }}
          headStyle={{ color: 'rgba(0,0,0,.45)' }}
        >
          <Statistic
            value={totalArticles}
            suffix="个"
            style={{ fontWeight: 'bolder' }}
          />
        </Card>
        <Card
          hoverable
          className="home-card"
          title="通知总量"
          extra={<Icon style={{ color: 'rgba(0,0,0,.45)' }} type="question-circle" />}
          style={{ width: '15%' }}
          headStyle={{ color: 'rgba(0,0,0,.45)' }}
        >
          <Statistic
          
            value={totalNotices}
            suffix="个"
            style={{ fontWeight: 'bolder' }}
          />
        </Card>
        <Card
          hoverable
          className="home-card"
          title="政工教案总量"
          extra={<Icon style={{ color: 'rgba(0,0,0,.45)' }} type="question-circle" />}
          style={{ width: '15%' }}
          headStyle={{ color: 'rgba(0,0,0,.45)' }}
        >
          <Statistic
            value={totalBookFiles}
            suffix="个"
            style={{ fontWeight: 'bolder' }}
          />
        </Card>
        <Card
          className="home-card"
          title="软件总量"
          extra={<Icon style={{ color: 'rgba(0,0,0,.45)' }} type="question-circle" />}
          style={{ width: '15%' }}
          headStyle={{ color: 'rgba(0,0,0,.45)' }}
        >
          <Statistic
            value={totalSoftwares}
            suffix="个"
            style={{ fontWeight: 'bolder' }}
          />
        </Card>
        <Card
          className="home-card"
          title="科室动态总量"
          extra={<Icon style={{ color: 'rgba(0,0,0,.45)' }} type="question-circle" />}
          style={{ width: '15%' }}
          headStyle={{ color: 'rgba(0,0,0,.45)' }}
        >
          <Statistic
            value={totalDepartmentMessage}
            suffix="个"
            style={{ fontWeight: 'bolder' }}
          />
        </Card>

        <Card
          className="home-content"
          title={<div className="home-menu">
            <span className={isVisited ? "home-menu-active home-menu-visited" : 'home-menu-visited'}
              onClick={this.handleChange(true)}>访问量</span>
            <span className={isVisited ? "" : 'home-menu-active'} onClick={this.handleChange(false)}>新闻量</span>
          </div>}
          // extra={<TimePicker/>}
        >
          <Card
            animated="true"
            className="home-table-left"
            title={isVisited ? '访问趋势' : '新闻趋势'}
            bodyStyle={{ padding: 0, height: 275 }}
            extra={<Icon type="reload" />}
          >
            <Bar />
          </Card>

        </Card>
      </div>
    )
  }
}