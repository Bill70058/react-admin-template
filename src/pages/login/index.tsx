/*
 * @Author: lzr lzr@email.com
 * @Date: 2022-08-17 20:33:56
 * @LastEditors: lzr lzr@email.com
 * @LastEditTime: 2022-09-12 21:12:56
 * @FilePath: /react-admin-demo/src/pages/Login/Login.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button, Checkbox, Form, Input } from 'antd'
// import { store } from 'redux/store'
// import { setInfo } from 'redux/counterSlice'
import api from 'utils/api'
import './index.css'

function Login() {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [isRemember, setIsRemember] = useState(false)
  useEffect(() => {
    // store.dispatch(
    //   setInfo({
    //     username: 'admin',
    //     route: ['index'],
    //   })
    // )
    if (sessionStorage.getItem('login')) {
      navigate('/')
    }
    // 登录自动填充用户名密码
    form.setFieldsValue({ remember: localStorage.getItem('loginInfo') != null })
    if (form.getFieldValue('remember')) {
      let loginForm = JSON.parse(localStorage.getItem('loginInfo') || '')
      form.setFieldsValue({
        username: loginForm.username,
        password: loginForm.password,
      })
    }
  })
  const onFinish = (values: any) => {
    handleLogin(values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
  const onFormChange = (e: any) => {
    const { remember } = e
    form.setFieldsValue({ remember })
  }
  interface LoginInter {
    username: string
    password: string
  }
  const handleLogin = (loginData: LoginInter) => {
    const reqData = {
      username: loginData.username,
      password: loginData.password,
    }
    if (form.getFieldValue('remember')) {
      localStorage.setItem('loginInfo', JSON.stringify(reqData))
    } else {
      localStorage.removeItem('loginInfo')
    }
    api.login(reqData).then((res: any) => {
      if (res.code == 200) {
        sessionStorage.setItem('login', res.data.token)
        // 将用户信息存入redux与缓存
        sessionStorage.setItem(
          'userInfo',
          JSON.stringify({
            username: res.data.username,
            route: res.data.route,
          })
        )
        // store.dispatch(
        //   setInfo({
        //     username: res.data.username,
        //     route: res.data.route,
        //   })
        // )
        setTimeout(() => {
          navigate('/')
        }, 500)
      }
    })
  }
  return (
    <div className="login-page">
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: false }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        form={form}
        onValuesChange={onFormChange}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: '请输入用户名!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: '请输入密码!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login
