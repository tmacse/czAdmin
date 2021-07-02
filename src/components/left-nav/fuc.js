import './index.less'
import memoryUtils from "../../utils/memoryUtils";


export default function hasAuth(item) {
    const { key, isPublic } = item

    const menus = memoryUtils.user.role.menus
    const username = memoryUtils.user.username
    /*
    1. 如果当前用户是admin
    2. 如果当前item是公开的
    3. 当前用户有此item的权限: key有没有menus中
     */
    if (username === 'admin' || isPublic || menus.indexOf(key) !== -1) {
        return true
    } else if (item.children) { // 4. 如果当前用户有此item的某个子item的权限
        return !!item.children.find(child => menus.indexOf(child.key) !== -1)
    }

    return false
}

