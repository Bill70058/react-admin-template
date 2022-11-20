/*
 * @Author: lzr lzr@email.com
 * @Date: 2022-10-15 19:51:34
 * @LastEditors: lzr lzr@email.com
 * @LastEditTime: 2022-11-20 14:06:20
 * @FilePath: /react-admin-template/src/router/Index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const lazyLoad = (moduleName: string) => {
  const Module = lazy(() => import(`../pages/${moduleName}`))
  return <Module />
}

const AppraisalInit = ({ children }: any) => {
  const login = sessionStorage.getItem('login')
  return login ? children : <Navigate to="/login" />
}

const IsLogin = ({ children }: any) => {
  const login = sessionStorage.getItem('login')
  return login ? <Navigate to="/home" /> : children
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
    element: <IsLogin>{lazyLoad('login')}</IsLogin>,
  },
  {
    path: '/',
    element: <AppraisalInit>{lazyLoad('sand-box')}</AppraisalInit>,
    children: [
      {
        path: '',
        element: <Navigate to="home" />,
      },
      {
        path: 'home',
        element: lazyLoad('sand-box/home'),
      },
      {
        path: 'new',
        element: lazyLoad('sand-box/news'),
        children: [
          {
            path: '',
            element: <Navigate to="news1" />,
          },
          {
            path: 'news',
            element: lazyLoad('sand-box/news/news'),
          },
          {
            path: 'news1',
            element: lazyLoad('sand-box/news/news1'),
          },
        ],
      },
      {
        path: '*',
        element: lazyLoad('sand-box/not-found'),
      },
    ],
  },
  {
    path: '/lin',
    element: lazyLoad('lin/Lin'),
  },
  {
    path: '/lin1',
    element: lazyLoad('lin/Lin1'),
  },
  {
    path: '/lin2',
    element: lazyLoad('lin/Lin2'),
  },
  {
    path: '*',
    element: lazyLoad('notfound'),
  },
]

export default routes
