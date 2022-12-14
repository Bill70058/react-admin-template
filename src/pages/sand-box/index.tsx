/*
 * @Author: lzr lzr@email.com
 * @Date: 2022-10-15 19:54:35
 * @LastEditors: bill Lin_k_Bill@163.com
 * @LastEditTime: 2022-12-11 15:59:16
 * @FilePath: /react-admin-template/src/pages/Layout/Index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useState } from 'react'
import { modifyVars, refreshStyles } from 'less'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons'
import { Layout, Menu, Button, Switch } from 'antd'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import SideMenu from '../../components/sand-box'
const { Header, Sider, Content } = Layout

function Index() {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const handleLogOut = () => {
    sessionStorage.removeItem('login')
    sessionStorage.removeItem('userInfo')
    navigate('/login')
  }
  const changeTheme = (e: boolean) => {
    let thtmeColor = e ? 'rgb(225, 243, 216)' : 'rgb(198, 226, 255)'
    document.body.style.setProperty('--selfThemeColor', thtmeColor)
  }
  return (
    <div>
      <Layout>
        <SideMenu collapsed={collapsed} />
        <Layout className="site-layout" style={{ height: '100vh' }}>
          <Header
            className="site-layout-background"
            style={{ paddingLeft: 20, backgroundColor: '#fff' }}
          >
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: 'trigger',
                onClick: () => setCollapsed(!collapsed),
              }
            )}
            <span style={{ marginLeft: '30px' }}>
              <span>更换侧边栏颜色：</span>
              <Switch
                checkedChildren="开启"
                unCheckedChildren="关闭"
                onChange={changeTheme}
              />
            </span>
            <Button
              style={{ float: 'right', transform: 'translate(10px, 15px)' }}
              danger
              onClick={handleLogOut}
            >
              退出
            </Button>
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  )
}

export default Index
