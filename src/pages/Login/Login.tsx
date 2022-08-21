/*
 * @Author: lzr lzr@email.com
 * @Date: 2022-08-17 20:33:56
 * @LastEditors: lzr lzr@email.com
 * @LastEditTime: 2022-08-21 16:59:22
 * @FilePath: /react-admin-demo/src/pages/Login/Login.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import api from '../../utils/api'
function Login() {
  const todoList = () => {
    api.getTodoList().then((res: any) => {
      console.log(res)
    })
  }
  useEffect(() => {
    todoList()
  })
  console.log(useLocation())
  return <div>Login</div>
}

export default Login
