import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import RouterBeforeEach from '../../route/RouterBeforeEach'
import { router } from '../../route/index'
import { Layout, Menu, MenuProps } from 'antd'
const { Header, Sider, Content } = Layout

function SelfLayout() {
  const [collapsed, setCollapsed] = useState(false)
  let childItems: any = []
  const location = useLocation()
  const { pathname } = location
  let path = pathname.split('/').pop()
  const [current, setCurrent] = useState(String(path))
  console.log(pathname.split('/'))
  const rootSubmenuKeys: any = []
  const [openKey, setOpenKey] = useState(pathname.split('/')[2])

  // useEffect(() => {
  //   path = pathname.split('/').pop()
  //   setOpenKey(pathname.split('/')[2])
  // })
  router.forEach((item) => {
    if (item.meta.title != '404' && item.meta.title != 'login') {
      if (item.children) {
        item.children.forEach((childItem) => {
          let obj: any = {
            label: <Link to={childItem.key}>{childItem.meta.title}</Link>,
            key: childItem.meta.title,
            children: [],
          }
          // 处理孙子路由
          let childArr: any = []
          if (childItem.children) {
            rootSubmenuKeys.push(childItem.path)
            childArr = childItem.children.map((sunChild) => {
              return {
                label: <Link to={sunChild.key}>{sunChild.meta.title}</Link>,
                key: sunChild.meta.title,
              }
            })
            obj.children = childArr
          } else {
            delete obj.children
          }
          childItems.push(obj)
        })
      }
    }
  })

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e)
    setCurrent(e.key)
  }

  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find((key) => openKey.indexOf(key) === -1)
    if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKey(String(keys))
    } else {
      setOpenKey(latestOpenKey ? latestOpenKey : '')
    }
  }
  return (
    <div>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['home']}
            items={childItems}
            onClick={onClick}
            onOpenChange={onOpenChange}
            selectedKeys={[current]}
            openKeys={[openKey]}
          />
        </Sider>
        <Layout className="site-layout">
          <Header
            className="site-layout-background"
            style={{ paddingLeft: 15, backgroundColor: '#fff' }}
          >
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: 'trigger',
                onClick: () => setCollapsed(!collapsed),
              }
            )}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            <RouterBeforeEach />
          </Content>
        </Layout>
      </Layout>
    </div>
  )
}

export default SelfLayout
