import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { Modal } from 'antd'
import { reqWeather } from '../../api'
import LinkButton from '../link-button'
import menuList from '../../config/menuConfig'
import { formateDate } from '../../utils/dateUtils'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import './index.less'

/*
左侧导航的组件
 */
const Header = (props) => {

  const [currentTime, setCurrentTime] = useState(formateDate(Date.now()))
  //接口有问题，无法获取
  const [dayPictureUrl, setDayPictureUrl] = useState('') // 天气图片url
  const [weather, setWeather] = useState('')// 天气的文本

  //显示时间的副作用
  useEffect(() => {
    const interValID = setInterval(() => {
      setCurrentTime(formateDate(Date.now()))
    }, 1000);
    return () => {
      clearInterval(interValID)
    }
  }, [currentTime])

  //天气的副作用
  useEffect(() => {
    getWeather()
  }, [weather])

  async function getWeather() {
    // 调用接口请求异步获取数据
    const { dayPictureUrl, weather } = await reqWeather('南充')
    // 更新状态
    setDayPictureUrl(dayPictureUrl)
    setWeather(weather)
  }

  function getTitle() {
    // 得到当前请求路径
    const path = props.location.pathname
    let title
    menuList.forEach(item => {
      if (item.key === path) { // 如果当前item对象的key与path一样,item的title就是需要显示的title
        title = item.title
      } else if (item.children) {
        // 在所有子item中查找匹配的
        const cItem = item.children.find(cItem => path.indexOf(cItem.key) === 0)
        // 如果有值才说明有匹配的
        if (cItem) {
          // 取出它的title
          title = cItem.title
        }
      }
    })
    return title
  }


  function logout() {
    // 显示确认框
    Modal.confirm({
      content: '确定退出吗?',
      onOk: () => {
        // 删除保存的user数据
        storageUtils.removeUser()
        memoryUtils.user = {}
        // 跳转到login
        props.history.replace('/login')
      }
    })
  }



  const username = memoryUtils.user.username

  // 得到当前需要显示的title
  const title = getTitle()
  return (
    <div className="header">
      <div className="header-top">
        <span>欢迎, {username}</span>
        <LinkButton onClick={logout}>退出</LinkButton>
      </div>
      <div className="header-bottom">
        <div className="header-bottom-left">{title}</div>
        <div className="header-bottom-right">
          <span>{currentTime}</span>
          <img src={dayPictureUrl} alt="weather" />
          <span>{weather}</span>
        </div>
      </div>
    </div>
  )
}


export default withRouter(Header)

/*
退出登陆
 */
