/*
 * @Author: lzr lzr@email.com
 * @Date: 2022-10-15 19:51:34
 * @LastEditors: lzr lzr@email.com
 * @LastEditTime: 2022-10-15 21:42:50
 * @FilePath: /react-admin-template/src/router/Index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const lazyLoad = (moduleName: string) => {
  const Module = lazy(() => import(`../pages/${moduleName}/Index`))
  return <Module />
}

const AppraisalInit = ({ children }: any) => {
  const token = localStorage.getItem('token')
  return token ? lazyLoad('sand-box') : <Navigate to="/login" />
}

interface Router {
  name?: string
  path: string
  children?: Array<Router>
  element: any
}

const routes: Array<Router> = [
  {
    path: '/login',
    element: lazyLoad('login'),
  },
  {
    path: '/',
    element: <AppraisalInit>{lazyLoad('sand-box')}</AppraisalInit>,
    children: [
      {
        path: 'home',
        element: <Navigate to="home" />,
      },
      {
        path: '*',
        element: lazyLoad('sand-box/not-found'),
      },
    ],
  },
  {
    path: '*',
    element: lazyLoad('notfound'),
  },
]

export default routes