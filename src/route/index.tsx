/*
 * @Author: lzr lzr@email.com
 * @Date: 2022-08-17 20:36:17
 * @LastEditors: lzr lzr@email.com
 * @LastEditTime: 2022-08-21 22:05:35
 * @FilePath: /react-admin-demo/src/route/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Suspense, lazy } from 'react'
import { useRoutes } from 'react-router-dom'

interface Meta {
  needLogin?: boolean
  title: string
}
interface IRoute {
  key: string
  path: string
  meta: Meta
  exact?: boolean
  icon?: string
  needLogin?: boolean
  component: any
  children?: IRoute[]
}
const router: IRoute[] = [
  {
    key: 'home',
    path: '/home',
    meta: {
      needLogin: true,
      title: 'home',
    },
    component: lazy(() => import('../pages/Home/Home')),
  },
  {
    key: 'view',
    path: '/',
    exact: true,
    meta: {
      title: 'view',
    },
    component: lazy(() => import('../pages/View/View')),
  },
  {
    key: 'login',
    path: '/login',
    meta: {
      title: 'login',
    },
    component: lazy(() => import('../pages/Login/Login')),
  },
  {
    key: 'Lin',
    path: 'lin/*',
    meta: {
      title: 'lin',
    },
    component: lazy(() => import('../pages/Lin/Lin')),
    children: [
      {
        key: 'Lin1',
        path: 'lin1',
        meta: {
          title: 'lin1',
        },
        component: lazy(() => import('../pages/Lin/Lin1')),
      },
      {
        key: 'Lin2',
        path: 'lin2',
        meta: {
          title: 'lin2',
        },
        component: lazy(() => import('../pages/Lin/Lin2')),
      },
    ],
  },
  {
    key: '404',
    path: '*',
    meta: {
      title: '404',
    },
    component: lazy(() => import('../pages/Page404/Page404')),
  },
]

//根据路径获取路由
const checkAuth = (routers: any, path: String) => {
  for (const data of routers) {
    if (data.path == path) return data
    if (data.children) {
      const res: any = checkAuth(data.children, path)
      if (res) return res
    }
  }
  return null
}

// 路由处理方式
const generateRouter = (routers: any) => {
  return routers.map((item: any) => {
    if (item.children) {
      item.children = generateRouter(item.children)
    }
    item.element = (
      <Suspense fallback={<div>加载中...</div>}>
        {/* 把懒加载的异步路由变成组件装载进去 */}
        <item.component />
      </Suspense>
    )
    return item
  })
}

const Router = () => useRoutes(generateRouter(router))
const checkRouterAuth = (path: String) => {
  let auth = null
  auth = checkAuth(router, path)
  return auth
}
export { router, checkRouterAuth, Router }
