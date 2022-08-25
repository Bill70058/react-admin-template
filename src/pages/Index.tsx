/*
 * @Author: lzr lzr@email.com
 * @Date: 2022-08-17 20:36:33
 * @LastEditors: lzr lzr@email.com
 * @LastEditTime: 2022-08-21 21:32:59
 * @FilePath: /react-admin-demo/src/pages/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Lin1 from './Lin/Lin1'
import { router } from '../route/index'
import { Routes, Route, Navigate, useLocation, Outlet } from 'react-router-dom'
import React from 'react'

function Index() {
  return (
    <>
      {router.map((route, index) => {
        if (route.meta.needLogin) {
          return (
            <Route path={route.path} element={<IsLoginFun />} key={index} />
          )
        } else {
          return (
            <Route path={route.path} element={route.component} key={index}>
              {route.children?.map((childRoute, childIndex) => {
                return (
                  <Route
                    path={childRoute.key}
                    element={childRoute.component}
                    key={childIndex}
                  />
                )
              })}
            </Route>
          )
        }
      })}
    </>
  )
}

function IsLoginFun() {
  const location = useLocation()
  // console.log(location)
  const { pathname } = location
  const isLogin = localStorage.getItem('token')
  const targetRouterConfig = router.find((item) => item.path === pathname)
  // console.log(targetRouterConfig)
  if (targetRouterConfig && !targetRouterConfig.meta.needLogin && !isLogin) {
    const { component } = targetRouterConfig
    return <Route path={pathname} element={component} />
  }
  if (isLogin) {
    // 如果是登陆状态，想要跳转到登陆，重定向到主页
    if (pathname === '/login') {
      return <Navigate to="/" />
    } else {
      // 如果路由合法，就跳转到相应的路由
      if (targetRouterConfig) {
        return <Route path={pathname} element={targetRouterConfig.component} />
      } else {
        // 如果路由不合法，重定向到 404 页面
        return <Navigate to="/404" />
      }
    }
  } else {
    // 非登陆状态下，当路由合法时且需要权限校验时，跳转到登陆页面，要求登陆
    if (targetRouterConfig && targetRouterConfig.meta.needLogin) {
      return <Navigate to="/login" />
    } else {
      // 非登陆状态下，路由不合法时，重定向至 404
      return <Navigate to="/404" />
    }
  }
}
export default Index
