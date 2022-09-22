/*
 * @Author: lzr lzr@email.com
 * @Date: 2022-08-17 20:36:17
 * @LastEditors: lzr lzr@email.com
 * @LastEditTime: 2022-09-12 21:10:12
 * @FilePath: /react-admin-demo/src/route/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Suspense, lazy } from 'react'
import { useRoutes } from 'react-router-dom'
import { store } from 'redux/store'

// const userInfo = store.getState().userInfo
// const userRoute = store.getState().userInfo.userInfo.route
let userRoute: any[] = store.getState().userInfo.userInfo.route
console.log(userRoute)
if (sessionStorage.getItem('userInfo')) {
  userRoute = JSON.parse(sessionStorage.getItem('userInfo') || '').route
}
console.log(userRoute)

interface Meta {
  needLogin?: boolean
  title: string
  isLeaf?: boolean
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
    key: 'login',
    path: '/',
    meta: {
      title: 'login',
    },
    component: lazy(() => import('../pages/Login/Login')),
  },
  {
    key: '/index',
    path: '/index',
    meta: {
      needLogin: true,
      title: 'index',
      isLeaf: true,
    },
    component: lazy(() => import('../pages/Layout/SelfLayout')),
    children: [
      {
        key: '/index/home',
        path: 'home',
        meta: {
          title: 'home',
          needLogin: true,
        },
        component: lazy(() => import('../pages/Home/Home')),
      },
      {
        key: '/index/view',
        path: 'view',
        exact: true,
        meta: {
          title: 'view',
          needLogin: true,
        },
        component: lazy(() => import('../pages/View/View')),
      },
      {
        key: '/index/users',
        path: 'users',
        meta: {
          title: 'users',
        },
        component: lazy(() => import('../pages/Users/Users')),
      },
      {
        key: '/index/lin',
        path: 'lin',
        meta: {
          title: 'lin',
          isLeaf: true,
        },
        component: lazy(() => import('../pages/Lin/Lin')),
        children: [
          {
            key: '/index/lin/lin1',
            path: 'lin1',
            meta: {
              title: 'lin1',
            },
            component: lazy(() => import('../pages/Lin/Lin1')),
          },
          {
            key: '/index/lin/lin2',
            path: 'lin2',
            meta: {
              title: 'lin2',
            },
            component: lazy(() => import('../pages/Lin/Lin2')),
          },
        ],
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

// 处理动态路由
const mapRouter = (routers: any) => {
  let routeArr: any[] = []
  routers.forEach((item: any) => {
    if (userRoute.includes(item.meta.title) || userRoute.includes(item.path)) {
      routeArr.push(item)
    }
  })
  routeArr.push({
    key: '404',
    path: '*',
    meta: {
      title: '404',
    },
    component: lazy(() => import('../pages/Page404/Page404')),
  })
  return routeArr
}

const Router = () => useRoutes(generateRouter(mapRouter(router)))
const checkRouterAuth = (path: String) => {
  let auth = null
  auth = checkAuth(mapRouter(router), path)
  return auth
}
export { router, checkRouterAuth, Router, mapRouter }
