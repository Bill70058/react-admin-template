/*
 * @Author: lzr lzr@email.com
 * @Date: 2022-08-21 22:06:23
 * @LastEditors: lzr lzr@email.com
 * @LastEditTime: 2022-08-21 22:06:30
 * @FilePath: /react-admin-demo/src/route/RouterBeforeEach.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useNavigate, useLocation } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import { checkRouterAuth } from './index'
import { useEffect, useState } from 'react'
const RouterBeforeEach = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [auth, setAuth] = useState(false)
  useEffect(() => {
    let obj = checkRouterAuth(location.pathname)
    let blLogin = sessionStorage.getItem('login')
    if (obj && obj.auth && blLogin == 'false') {
      setAuth(false)
      navigate('/', { replace: true })
    } else {
      setAuth(true)
    }
  })
  return auth ? <Outlet /> : null
}

export default RouterBeforeEach
