import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import hasAuth from './fuc'
import menuList from '../../config/menuConfig'
import './index.less'
import { Menu, Icon } from 'antd';
import './index.less'
const SubMenu = Menu.SubMenu;


/*
左侧导航的组件
 */
const LeftNav = (props) => {
  let openKey;
  const menuNodes = getMenuNodes(menuList)
  function getMenuNodes(menuList) {
    // 得到当前请求的路由路径
    let path = props.location.pathname
    return menuList.reduce((pre, item) => {
      // 如果当前用户有item对应的权限, 才需要显示对应的菜单项
      if (hasAuth(item)) {
        // 向pre添加<Menu.Item>
        if (!item.children) {
          pre.push((
            <Menu.Item key={item.key}>
              <Link to={item.key}>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </Link>
            </Menu.Item>
          ))
        } else {

          // 查找一个与当前请求路径匹配的子Item
          const cItem = item.children.find(cItem => path.indexOf(cItem.key) === 0)
          // 如果存在, 说明当前item的子列表需要打开
          if (cItem) {
            openKey = item.key
          }


          // 向pre添加<SubMenu>
          pre.push((
            <SubMenu
              key={item.key}
              title={
                <span>
                  <Icon type={item.icon} />
                  <span>{item.title}</span>
                </span>
              }
            >
              {getMenuNodes(item.children)}
            </SubMenu>
          ))
        }
      }

      return pre
    }, [])
  }





  // debugger
  // 得到当前请求的路由路径
  let path = props.location.pathname
  console.log('render()', path)
  if (path.indexOf('/article') === 0) { // 当前请求的是新闻列表或其子路由界面
    path = '/checknews'
  }

  // 得到需要打开菜单项的key
  // const openKey = this.openKey

  return (
    <div className="left-nav">
      <Link to='/' className="left-nav-header">
        {/* <img src={logo} alt="logo"/> */}
        <h2>强军网后台管理系统</h2>
      </Link>

      <Menu
        mode="inline"
        theme="dark"
        selectedKeys={[path]}
        defaultOpenKeys={[openKey]}
      >
        {
          menuNodes
        }
      </Menu>
    </div>
  )
}

export default withRouter(LeftNav)