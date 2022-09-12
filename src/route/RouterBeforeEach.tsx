/*
 * @Author: lzr lzr@email.com
 * @Date: 2022-08-21 22:06:23
 * @LastEditors: lzr lzr@email.com
 * @LastEditTime: 2022-09-12 16:30:31
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
    let path = location.pathname.split('/').pop()
    console.log(path)
    let obj = checkRouterAuth(String(path))
    let blLogin = sessionStorage.getItem('login')
    // 如果访问的是需要登录的页面
    if (obj && obj.meta.needLogin && !blLogin) {
      setAuth(false)
      navigate('/', { replace: true })
    } else {
      setAuth(true)
      // 如果点击的有子路由则跳转到子路由第一个页面
      // if (obj.meta?.isLeaf) {
      //   navigate(`/index/${path}/${obj.children[0].path}`)
      // }
      if (path == 'index' || obj.key == 'login') {
        navigate('/index/home')
      }
    }
  })
  return auth ? <Outlet /> : null
}

export default RouterBeforeEach
