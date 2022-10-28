/*
 * @Author: lzr lzr@email.com
 * @Date: 2022-10-15 19:54:35
 * @LastEditors: lzr lzr@email.com
 * @LastEditTime: 2022-10-15 19:54:41
 * @FilePath: /react-admin-template/src/pages/Layout/Index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, {useState} from 'react'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import SideMenu from '../../components/sand-box';
import {Button} from 'antd'
const { Header, Sider, Content } = Layout;

function Index() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate()
  const handleLogOut = () => {
    sessionStorage.removeItem('login')
    sessionStorage.removeItem('userInfo')
    navigate('/login')
  }
  return <div>
     <Layout>
      <SideMenu collapsed={collapsed}/>
      <Layout className="site-layout" style={{height: '100vh'}}>
        <Header className="site-layout-background" style={{ paddingLeft: 20, backgroundColor: '#fff' }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
          <Button style={{float: 'right', transform: 'translate(10px, 15px)'}} danger onClick={handleLogOut}>退出</Button>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          <Outlet/>
        </Content>
      </Layout>
    </Layout>
    </div>
}

export default Index
