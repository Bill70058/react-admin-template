/*
 * @Author: lzr lzr@email.com
 * @Date: 2022-11-20 14:03:14
 * @LastEditors: lzr lzr@email.com
 * @LastEditTime: 2022-11-21 22:23:15
 * @FilePath: /react-admin-template/src/components/sand-box/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { memo, useMemo, useState, useEffect } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import { mapIconMenus, deepCopy } from '../../utils/devUtils'
import api from '../../utils/api'
// import { SildeMenuWrapper } from "./style";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons'

const { Sider } = Layout

const SideMenu = memo((props: any) => {
  // 用于监听 props.collapsed 改变 在改变前处理 二级菜单选中回闪的bug
  const [collapsed, setcollapsed] = useState(props.collapsed)
  const [count, setCount] = useState(0)
  const location = useLocation()
  // 路由路径
  const path = location.pathname
  // 默认展开的父节点菜单路径
  const selectOpen = '/' + (path && path.split('/')[1])
  // let menus = [
  //   {
  //     grade: 1,
  //     id: 1,
  //     label: '首页',
  //     key: '/home',
  //     pagepermisson: 1,
  //   },
  //   {
  //     grade: 1,
  //     id: 3,
  //     label: '用户',
  //     key: '/user',
  //     pagepermisson: 1,
  //   },
  //   {
  //     grade: 1,
  //     id: 2,
  //     label: '新闻',
  //     key: '/new',
  //     pagepermisson: 1,
  //     children: [
  //       {
  //         grade: 1,
  //         id: 3,
  //         label: '新闻1',
  //         key: '/new/news1',
  //         pagepermisson: 1,
  //       },
  //     ],
  //   },
  // ]
  const [menus, setMenus] = useState([
    {
      grade: 1,
      id: 1,
      label: '首页',
      key: '/home',
      pagepermisson: 1,
    },
  ])
  //  动态改变openKeys的值
  const [menuProps, setmenuProps] = useState({})
  // 拿到处理后的菜单数据 先深拷贝再处理 不然会影响到redux中的值
  const endMenus = useMemo(() => mapIconMenus(deepCopy(menus)), [menus])

  const navigate = useNavigate()

  // 展开菜单的回调
  const openMenu = (opens: any) => {
    setmenuProps({ openKeys: opens })
  }
  // 选中菜单的回调
  const selectMenu = ({ key, domEvent }: any) => {
    // console.log(navigate);
    navigate(key)
  }

  // 动态菜单栏
  useEffect(() => {
    api.getPages().then((res: any) => {
      if (res.code === 200) {
        setMenus(res.data)
      }
    })
  }, ['count'])

  // 用于监听 props.collapsed 改变 收缩前先关闭所有展开项 打开前先展开当前选中项
  useEffect(() => {
    if (!props.collapsed) {
      setcollapsed(props.collapsed)
      setTimeout(() => {
        setmenuProps({ openKeys: [selectOpen] })
      }, 0)
    } else {
      setmenuProps({ openKeys: [] })
      setcollapsed(props.collapsed)
    }
  }, [props.collapsed, selectOpen])

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[path]}
        defaultOpenKeys={[selectOpen]}
        items={menus}
        {...menuProps}
        onSelect={selectMenu}
        onOpenChange={openMenu}
      />
    </Sider>
  )
})

export default SideMenu
